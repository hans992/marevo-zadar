import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory()
      ? sourceFiles(path)
      : /\.(ts|tsx)$/.test(path)
        ? [path]
        : [];
  });
}

const issues: string[] = [];
const analyticsPath = "src/lib/analytics.ts";
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
}

for (const event of [
  "boat_search_submitted",
  "booking_request_opened",
  "booking_request_completed",
  "operator_demo_request_updated",
]) {
  if (!analyticsSource.includes(event)) issues.push(`Missing core event: ${event}`);
}

if (issues.length) {
  console.error("Analytics validation failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("Validated privacy-safe conversion event catalog.");
