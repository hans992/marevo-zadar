# Supabase inventory

The migration in this directory defines Adriatic by Boat's live inventory contract. It is intentionally not connected to the runtime yet.

## Activation checklist

1. Create or choose the production Supabase project.
2. Link the project with the Supabase CLI.
3. Review and apply migrations in a preview environment first.
4. Import verified partner inventory as draft records.
5. Confirm image rights, prices, inclusions and operator consent.
6. Publish records only after the operator approves the listing.
7. Add server-side environment variables and replace the demo inventory adapter.

## Request intake

Public submissions never write to `booking_requests` directly. They go through
`public.create_booking_request`, which looks up the published listing, checks
capacity, snapshots the price, applies the per-email and per-address rate limits
and inserts — all in one transaction, under an advisory lock, so two submissions
arriving together cannot both pass the same count. The function is granted to
`service_role` only.

Per-address limiting needs `REQUEST_IP_SALT` in the server environment. Without
it the address is not stored at all, rather than stored as a reversible hash,
and only the per-email limit applies.

Migrations and the intake function can be exercised against a throwaway Postgres
without any local database:

```bash
npm install --no-save @electric-sql/pglite
node scripts/verify-migrations.mjs
```

Do not expose the service-role key to the browser. Public catalogue reads are protected by row-level security. Operator contacts and availability notes have no public policies and remain server-only.
