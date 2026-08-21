/**
 * Regenerates public/sitemap.xml and public/robots.txt from the live route and
 * inventory data. Run after changing SITE_URL, the locale list or the catalogue:
 *
 *   bun run seo:generate
 *
 * Hand-editing 80 URLs is how the sitemap drifted from the canonical tags.
 */
import { writeFileSync } from "node:fs";
import { SITE_URL } from "../src/lib/brand";
import { publicUrls } from "./seo-urls";

// Bumped deliberately when public content changes, not on every run — a lastmod
// that moves with the clock tells crawlers nothing.
const LAST_MODIFIED = "2026-08-21";

const entries = publicUrls
  .map(
    ({ loc, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;

const robots = `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync("public/sitemap.xml", sitemap);
writeFileSync("public/robots.txt", robots);
console.log(`Generated sitemap.xml with ${publicUrls.length} URLs and robots.txt for ${SITE_URL}.`);
