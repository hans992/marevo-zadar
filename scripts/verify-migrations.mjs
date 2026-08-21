/**
 * Applies every migration to a throwaway Postgres and exercises
 * create_booking_request against it.
 *
 * The rate limit is the only part of the intake path that cannot be checked by
 * reading the code: it depends on transaction boundaries and on a count taken
 * under a lock. So it gets a real database.
 *
 * PGlite is not a project dependency for the same reason the OG rasterizer is
 * not — it is a native/WASM payload needed occasionally, and CI should not pay
 * for it on every install. Run it with:
 *
 *   npm install --no-save @electric-sql/pglite
 *   node scripts/verify-migrations.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
let PGlite;
try {
  ({ PGlite } = await import("@electric-sql/pglite"));
} catch {
  console.error("Missing test database. Run: npm install --no-save @electric-sql/pglite");
  process.exit(1);
}

const migrationsDir = join("supabase", "migrations");

const db = await new PGlite();

// Supabase ships these roles; the migrations grant to them.
await db.exec(`
  create role anon;
  create role authenticated;
  create role service_role;
`);

const files = readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();
for (const file of files) {
  // PGlite does not bundle pgcrypto, and nothing here needs it: gen_random_uuid
  // has been in core since PG13. Harness-only substitution; the file is untouched.
  const sql = readFileSync(join(migrationsDir, file), "utf8").replace(
    /create extension if not exists pgcrypto;/g,
    "",
  );
  try {
    await db.exec(sql);
    console.log(`  applied ${file}`);
  } catch (error) {
    console.error(`FAILED ${file}: ${error.message}`);
    process.exit(1);
  }
}

// Minimal published listing to request against.
await db.exec(`
  insert into public.operators (id, slug, display_name, status)
  values ('11111111-1111-1111-1111-111111111111', 'luka', 'Luka', 'active');

  insert into public.boats (id, operator_id, slug, name, boat_type, capacity, status)
  values ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111',
          'leut', 'Leut', 'Leut', 8, 'active');

  insert into public.experiences (
    id, operator_id, boat_id, slug, title, category, duration_minutes, capacity,
    price_cents, price_unit, currency, departure_location, meeting_point,
    summary, description, status
  ) values (
    '33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222', 'kornati-private-escape', 'Kornati Private Escape',
    'private_tour', 480, 8, 60000, 'total', 'EUR', 'Zadar', 'Gat', 'Summary',
    array['Body'], 'published'
  ), (
    '44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222', 'shared-sunset', 'Shared Sunset',
    'shared_trip', 150, 12, 4500, 'person', 'EUR', 'Zadar', 'Gat', 'Summary',
    array['Body'], 'published'
  ), (
    '55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222', 'draft-trip', 'Draft Trip',
    'rental', 120, 4, 20000, 'total', 'EUR', 'Zadar', 'Gat', 'Summary',
    array['Body'], 'draft'
  );
`);

let uuidCounter = 0;
const nextToken = () => `aaaaaaaa-0000-4000-8000-${String(++uuidCounter).padStart(12, "0")}`;

async function call({
  token = nextToken(),
  slug = "kornati-private-escape",
  guests = 4,
  email = "sophie@example.com",
  ip = null,
}) {
  const result = await db.query(
    `select public.create_booking_request(
       $1::uuid, $2, $3::date, $4, $5, $6, $7, $8, $9, $10, $11
     ) as id`,
    [token, slug, "2099-07-15", guests, "Sophie Martin", email, "", "", "web", "2026-08-21", ip],
  );
  return result.rows[0].id;
}

const results = [];
async function expectRaise(name, fn, expected) {
  try {
    await fn();
    results.push([name, false, "no error raised"]);
  } catch (error) {
    const message = error.message
      .replace(/^ERROR:\s*/, "")
      .split("\n")[0]
      .trim();
    results.push([name, message === expected, `${message} (wanted ${expected})`]);
  }
}
async function expectOk(name, fn, check) {
  try {
    const value = await fn();
    const detail = await check(value);
    results.push([name, detail === true, detail === true ? "ok" : String(detail)]);
  } catch (error) {
    results.push([name, false, error.message.split("\n")[0]]);
  }
}

await expectOk(
  "happy path stores a row with a total price snapshot",
  () => call({ email: "a@example.com" }),
  async (id) => {
    const { rows } = await db.query(
      `select quoted_amount_cents, currency, email, consent_at, privacy_version, ip_hash
       from public.booking_requests where id = $1`,
      [id],
    );
    const row = rows[0];
    if (!row) return "no row inserted";
    if (row.quoted_amount_cents !== 60000) return `amount ${row.quoted_amount_cents}`;
    if (row.consent_at === null) return "consent_at null";
    if (row.privacy_version !== "2026-08-21") return "privacy_version wrong";
    return true;
  },
);

await expectOk(
  "per-person price is multiplied by guests",
  () => call({ slug: "shared-sunset", guests: 3, email: "b@example.com" }),
  async (id) => {
    const { rows } = await db.query(
      `select quoted_amount_cents from public.booking_requests where id = $1`,
      [id],
    );
    return rows[0].quoted_amount_cents === 13500 ? true : `amount ${rows[0].quoted_amount_cents}`;
  },
);

await expectOk(
  "email is lowercased and blank phone becomes null",
  () => call({ email: "  MiXeD@Example.COM  " }),
  async (id) => {
    const { rows } = await db.query(
      `select email, phone, message from public.booking_requests where id = $1`,
      [id],
    );
    const row = rows[0];
    if (row.email !== "mixed@example.com") return `email ${row.email}`;
    if (row.phone !== null) return `phone ${row.phone}`;
    if (row.message !== null) return `message ${row.message}`;
    return true;
  },
);

await expectRaise(
  "unknown slug is rejected",
  () => call({ slug: "does-not-exist", email: "c@example.com" }),
  "not_accepting",
);

await expectRaise(
  "draft listing is not requestable",
  () => call({ slug: "draft-trip", email: "c@example.com" }),
  "not_accepting",
);

await expectRaise(
  "over capacity is rejected and reports the capacity",
  () => call({ guests: 9, email: "c@example.com" }),
  "capacity_exceeded:8",
);

await expectRaise(
  "a repeated request token is a duplicate",
  async () => {
    const token = nextToken();
    await call({ token, email: "dup@example.com" });
    await call({ token, email: "dup@example.com" });
  },
  "duplicate",
);

await expectRaise(
  "the sixth request from one email in an hour is refused",
  async () => {
    for (let i = 0; i < 6; i++) await call({ email: "flood@example.com" });
  },
  "rate_limited",
);

// The hole this migration exists to close: rotating the email address used to
// defeat the limit entirely.
await expectRaise(
  "rotating the email does not defeat the per-address limit",
  async () => {
    const ip = "f".repeat(64);
    for (let i = 0; i < 11; i++) await call({ email: `rotate${i}@example.com`, ip });
  },
  "rate_limited",
);

await expectOk(
  "a different address is unaffected by another address hitting the limit",
  () => call({ email: "clean@example.com", ip: "a".repeat(64) }),
  async (id) => (typeof id === "string" && id.length === 36 ? true : `id ${id}`),
);

await expectRaise(
  "a malformed address hash is refused by the column constraint",
  () => call({ email: "bad@example.com", ip: "not-a-hash" }),
  'new row for relation "booking_requests" violates check constraint "booking_requests_ip_hash_check"',
);

console.log();
let failed = 0;
for (const [name, ok, detail] of results) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : `  → ${detail}`}`);
  if (!ok) failed++;
}
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
