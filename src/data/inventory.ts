/**
 * Public inventory boundary.
 *
 * The UI imports from this module instead of depending on the demo fixture
 * directly. A live Supabase-backed loader can replace this implementation
 * without changing presentation components.
 */
import {
  categories,
  destinations,
  experiences,
  faqs,
  filters,
  getExperience,
  reviews,
} from "./marevo";

export type { Category, Experience, FilterId } from "./marevo";
export { categories, destinations, experiences, faqs, filters, getExperience, reviews };

export type InventoryMode = "demo" | "live";

export const inventorySnapshot = {
  contractVersion: 1,
  mode: "demo" as const satisfies InventoryMode,
  lastVerifiedAt: null,
  experiences,
};
