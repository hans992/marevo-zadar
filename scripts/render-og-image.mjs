/**
 * Rasterizes public/og-image.svg into public/og-image.png (1200x630).
 *
 * Social crawlers do not render SVG, so the committed PNG is the file that
 * actually ships. Re-run this whenever og-image.svg changes.
 *
 * The rasterizer is intentionally not a project dependency — it is needed only
 * when the artwork changes, and adding a native binary to every CI install to
 * regenerate a static asset is not a trade worth making. Install it on demand:
 *
 *   npm install --no-save @resvg/resvg-js
 *   node scripts/render-og-image.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

let Resvg;
try {
  ({ Resvg } = await import("@resvg/resvg-js"));
} catch {
  console.error("Missing rasterizer. Run: npm install --no-save @resvg/resvg-js");
  process.exit(1);
}

const svg = readFileSync("public/og-image.svg", "utf8");
const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  background: "#082a35",
  font: { loadSystemFonts: true, defaultFontFamily: "Arial" },
});

const png = resvg.render().asPng();
writeFileSync("public/og-image.png", png);
console.log(`Rendered public/og-image.png (${resvg.width}x${resvg.height}, ${png.length} bytes).`);
