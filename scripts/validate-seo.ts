import { existsSync, readFileSync } from "node:fs";
import { BRAND_NAME, OG_IMAGE_PATH, SITE_URL } from "../src/lib/brand";
import { publicUrls } from "./seo-urls";

const sitemap = readFileSync("public/sitemap.xml", "utf8");
const robots = readFileSync("public/robots.txt", "utf8");
const manifest = JSON.parse(readFileSync("public/manifest.webmanifest", "utf8")) as {
  name?: string;
  start_url?: string;
};

const issues: string[] = [];

// The sitemap must list exactly the localized URLs the routes emit as canonical —
// no missing locales, and no leftovers from a previous domain or catalogue.
const expected = new Set(publicUrls.map((url) => url.loc));
const actual = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]!));

for (const loc of expected) {
  if (!actual.has(loc)) issues.push(`Missing sitemap URL: ${loc}`);
}
for (const loc of actual) {
  if (!expected.has(loc)) issues.push(`Stale sitemap URL: ${loc}`);
}

if (sitemap.includes("/operator")) issues.push("Operator workspace must not be in the sitemap");
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`))
  issues.push("robots.txt sitemap URL is missing");
if (manifest.name !== `${BRAND_NAME} — Zadar from the sea`)
  issues.push("Manifest name is incorrect");
if (manifest.start_url !== "/") issues.push("Manifest start URL is incorrect");

// Facebook, LinkedIn, WhatsApp and X refuse image/svg+xml, so the share card has
// to stay a raster file that is actually present in the build output.
if (/\.svgx?$/.test(OG_IMAGE_PATH)) issues.push("Share image must be a raster format, not SVG");
if (!existsSync(`public${OG_IMAGE_PATH}`))
  issues.push(`Share image is missing: public${OG_IMAGE_PATH}`);

if (SITE_URL.endsWith("/")) issues.push("SITE_URL must not end with a slash");
if (!SITE_URL.startsWith("https://")) issues.push("SITE_URL must be https");

if (issues.length) {
  console.error("SEO validation failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  console.error("\nRun `bun run seo:generate` if the sitemap is out of date.");
  process.exit(1);
}

console.log(`Validated SEO contract for ${expected.size} public URLs on ${SITE_URL}.`);
