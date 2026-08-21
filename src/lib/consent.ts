/**
 * Analytics consent, kept out of the React tree so the plain analytics wrapper
 * can read it too. Rejecting has to mean nothing is sent — not that the
 * collector loads and is asked to behave — or the reject button is decorative.
 */
export type ConsentChoice = "accepted" | "rejected";

const STORAGE_KEY = "abb-consent-analytics";

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "accepted" || stored === "rejected" ? stored : null;
  } catch {
    // Private mode or blocked storage: treat as undecided rather than throwing.
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // The choice still applies for this session even if it cannot be persisted.
  }
}

/** Analytics stays off until explicitly accepted — opt-in, not opt-out. */
export function analyticsAllowed(): boolean {
  return readConsent() === "accepted";
}
