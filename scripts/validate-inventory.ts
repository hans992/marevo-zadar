import { inventorySnapshot } from "../src/data/inventory";

const issues: string[] = [];
const seenSlugs = new Set<string>();

for (const experience of inventorySnapshot.experiences) {
  const label = experience.slug || experience.title || "unnamed experience";

  if (!experience.slug.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)) {
    issues.push(`${label}: slug must be lowercase kebab-case`);
  }
  if (seenSlugs.has(experience.slug)) {
    issues.push(`${label}: duplicate slug`);
  }
  seenSlugs.add(experience.slug);

  if (!experience.title.trim()) issues.push(`${label}: title is required`);
  if (experience.price <= 0) issues.push(`${label}: price must be positive`);
  if (experience.capacity <= 0) issues.push(`${label}: capacity must be positive`);
  if (experience.durationHours <= 0) issues.push(`${label}: duration must be positive`);
  if (!experience.images.length) issues.push(`${label}: at least one image is required`);
  if (!experience.summary.trim()) issues.push(`${label}: summary is required`);
  if (!experience.description.length) issues.push(`${label}: description is required`);
  if (!experience.included.length) issues.push(`${label}: included items are required`);
  if (!experience.itinerary.length) issues.push(`${label}: itinerary is required`);
  if (!experience.operator.name.trim()) issues.push(`${label}: operator name is required`);
  if (!experience.boat.name.trim()) issues.push(`${label}: boat name is required`);
}

if (!inventorySnapshot.experiences.length) {
  issues.push("inventory must contain at least one experience");
}

if (issues.length) {
  console.error("Inventory validation failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(
  `Validated ${inventorySnapshot.experiences.length} ${inventorySnapshot.mode} experiences against contract v${inventorySnapshot.contractVersion}.`,
);
