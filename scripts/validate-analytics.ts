import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, sep } from "node:path";

// join() yields backslashes on Windows, which never match the forward-slash
// paths this script compares against, so the wrapper would flag itself and the
// check would fail for everyone not on Linux.
function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry).split(sep).join("/");
    return statSync(path).isDirectory()
      ? sourceFiles(path)
      : /\.(ts|tsx)$/.test(path)
        ? [path]
        : [];
  });
}

const issues: string[] = [];
const analyticsPath = "src/lib/analytics.ts";
const consentGatePath = "src/components/marketplace/ConsentProvider.tsx";
const analyticsSource = readFileSync(analyticsPath, "utf8");

for (const property of ["email", "fullName", "phone", "message", "requestToken", "preferredDate"]) {
  const propertyPattern = new RegExp(`\\b${property}\\s*:`);
  if (propertyPattern.test(analyticsSource)) {
    issues.push(`Forbidden analytics property in event catalog: ${property}`);
  }
}

for (const path of sourceFiles("src")) {
  if (path === analyticsPath) continue;
  const source = readFileSync(path, "utf8");
  if (source.includes('from "@vercel/analytics"')) {
    issues.push(`Direct Vercel Analytics import outside wrapper: ${path}`);
  }

  // Mounting <Analytics /> anywhere else would load the collector before the
  // visitor has accepted it, which is the whole thing the gate exists to stop.
  if (path !== consentGatePath && source.includes('from "@vercel/analytics/react"')) {
    issues.push(`Analytics collector mounted outside the consent gate: ${path}`);
  }
}

for (const event of [
  "boat_search_submitted",
  "booking_request_opened",
  "booking_request_completed",
  "operator_demo_request_updated",
]) {
  if (!analyticsSource.includes(event)) issues.push(`Missing core event: ${event}`);
}

// A tracked event sent before consent would make the reject button decorative.
if (!analyticsSource.includes("analyticsAllowed()")) {
  issues.push("trackEvent must check analyticsAllowed() before sending");
}

if (issues.length) {
  console.error("Analytics validation failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("Validated privacy-safe conversion event catalog.");
