import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Link } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { Button } from "@/components/ui/button";
import { localizedPath, useI18n } from "@/i18n";
import { getConsentCopy } from "@/i18n/consent";
import { legalLabels } from "@/i18n/legal";
import { readConsent, writeConsent, type ConsentChoice } from "@/lib/consent";

type ConsentContextValue = {
  choice: ConsentChoice | null;
  /** True once the stored choice has been read, so nothing renders on the server pass. */
  ready: boolean;
  decide: (next: ConsentChoice) => void;
  openPreferences: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
  const value = useContext(ConsentContext);
  if (value === null) throw new Error("useConsent must be used inside ConsentProvider.");
  return value;
}

/**
 * Analytics consent.
 *
 * The only optional processing on this site is Vercel Web Analytics, which is
 * cookieless — so this banner is not gating a cookie, it is gating whether the
 * collector loads at all. Opting out therefore has to mean the script never
 * mounts and trackEvent stays silent; anything less makes the reject button
 * decorative. Analytics stays off until it is explicitly accepted.
 */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setChoice(stored);
    setBannerOpen(stored === null);
    setReady(true);
  }, []);

  const decide = useCallback((next: ConsentChoice) => {
    setChoice(next);
    setBannerOpen(false);
    writeConsent(next);
  }, []);

  const openPreferences = useCallback(() => setBannerOpen(true), []);

  const value = useMemo<ConsentContextValue>(
    () => ({ choice, ready, decide, openPreferences }),
    [choice, ready, decide, openPreferences],
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {ready && choice === "accepted" ? <Analytics /> : null}
      {ready && bannerOpen ? (
        <ConsentBanner choice={choice} onDecide={decide} onDismiss={() => setBannerOpen(false)} />
      ) : null}
    </ConsentContext.Provider>
  );
}

function ConsentBanner({
  choice,
  onDecide,
  onDismiss,
}: {
  choice: ConsentChoice | null;
  onDecide: (next: ConsentChoice) => void;
  onDismiss: () => void;
}) {
  const { locale } = useI18n();
  const c = getConsentCopy(locale);

  return (
    <div
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-body"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 id="consent-title" className="font-display text-lg font-medium text-foreground">
            {c.title}
          </h2>
          <p id="consent-body" className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            {c.body}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.note}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="sun" onClick={() => onDecide("accepted")}>
            {c.accept}
          </Button>
          <Button variant="secondary" onClick={() => onDecide("rejected")}>
            {c.reject}
          </Button>
          {choice !== null ? (
            <Button variant="ghost" onClick={onDismiss}>
              {c.keep}
            </Button>
          ) : null}
          <Link
            to={localizedPath("/privacy", locale) as never}
            className="px-2 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            {legalLabels[locale].privacy}
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Footer entry point for changing a recorded choice. Renders nothing until the
 * stored value has been read, so it cannot flash during hydration.
 */
export function ConsentPreferencesButton({ className }: { className?: string }) {
  const { ready, choice, openPreferences } = useConsent();
  const { locale } = useI18n();
  const c = getConsentCopy(locale);

  if (!ready) return null;

  const state = choice === null ? "" : ` · ${choice === "accepted" ? c.on : c.off}`;

  return (
    <button type="button" onClick={openPreferences} className={className}>
      {c.preferences}
      {state}
    </button>
  );
}
