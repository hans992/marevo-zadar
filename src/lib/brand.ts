export const BRAND_NAME = "Adriatic by Boat";
export const BRAND_NAME_UPPER = "ADRIATIC BY BOAT";

// The apex domain 308-redirects to www, so www is the only address that answers
// directly. Canonical, og:url, hreflang and the sitemap must all name it, or every
// public URL we publish points at a redirect instead of the page itself.
export const SITE_URL = "https://www.adriaticbyboat.com";

export const CONTACT_EMAIL = "hello@adriaticbyboat.com";
export const BOOKING_SOURCE = "adriatic_by_boat_web";

// Social crawlers (Facebook, LinkedIn, WhatsApp, X) do not render image/svg+xml,
// so the share preview has to be a raster file. Generated from og-image.svg by
// scripts/render-og-image.mjs — regenerate the PNG whenever the SVG changes.
export const OG_IMAGE_PATH = "/og-image.png";

// Recorded alongside every consented booking request so it stays provable which
// text a guest actually agreed to. Bump it whenever the policy wording changes;
// the privacy page reads the same constant, so the two cannot disagree.
export const PRIVACY_VERSION = "2026-08-21";
