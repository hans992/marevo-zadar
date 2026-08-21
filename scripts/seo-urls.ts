/**
 * The canonical list of public URLs, shared by the sitemap generator and the
 * SEO validator so the two can never disagree about what should be indexed.
 *
 * Every URL is built from `SITE_URL` + `localizedPath`, which is exactly how the
 * routes build their canonical tag. Deriving both from the same helper is what
 * keeps the sitemap and the canonical tags pointing at the same address.
 */
import { experiences } from "../src/data/inventory";
import { locales, localizedPath } from "../src/i18n";
import { SITE_URL } from "../src/lib/brand";

export type PublicUrl = {
  loc: string;
  priority: string;
};

export const publicPaths = [
  "/",
  "/search",
  ...experiences.map((experience) => `/experiences/${experience.slug}`),
  "/privacy",
];

function priorityFor(path: string) {
  if (path === "/") return "1.0";
  if (path === "/search") return "0.9";
  if (path === "/privacy") return "0.3";
  return "0.8";
}

export const publicUrls: PublicUrl[] = locales.flatMap((locale) =>
  publicPaths.map((path) => ({
    loc: `${SITE_URL}${localizedPath(path, locale)}`,
    priority: priorityFor(path),
  })),
);
