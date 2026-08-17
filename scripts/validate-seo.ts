import { readFileSync } from "node:fs";
import { experiences } from "../src/data/inventory";
import { BRAND_NAME, SITE_URL } from "../src/lib/brand";

const sitemap = readFileSync("public/sitemap.xml", "utf8");
const robots = readFileSync("public/robots.txt", "utf8");
const manifest = JSON.parse(readFileSync("public/manifest.webmanifest", "utf8")) as {
  name?: string;
  start_url?: string;
};

const issues: string[] = [];
for (const path of [
  "/",
  "/search",
  ...experiences.map((experience) => `/experiences/${experience.slug}`),
]) {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) issues.push(`Missing sitemap URL: ${url}`);
}

if (sitemap.includes("/operator")) issues.push("Operator workspace must not be in the sitemap");
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`))
  issues.push("robots.txt sitemap URL is missing");
if (manifest.name !== `${BRAND_NAME} — Zadar from the sea`)
  issues.push("Manifest name is incorrect");
if (manifest.start_url !== "/") issues.push("Manifest start URL is incorrect");

if (issues.length) {
  console.error("SEO validation failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`Validated SEO contract for ${experiences.length + 2} public URLs.`);
