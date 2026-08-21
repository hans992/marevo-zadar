import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CalendarDays, CheckCircle2, Clock, Loader2, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Experience } from "@/data/inventory";
import { submitBookingRequest } from "@/lib/booking-request.functions";
import { guestBucket, priceBand, trackEvent } from "@/lib/analytics";
import { formatDate } from "./SearchComposer";
import { Link } from "@tanstack/react-router";
import { guestNoun, localizedPath, useI18n } from "@/i18n";
import { legalLabels } from "@/i18n/legal";
import { localizeRequestError } from "@/i18n/request-errors";
import { usePublicCopy } from "@/i18n/public";
import { useMiscCopy } from "@/i18n/misc";

type Completion = {
  mode: "demo" | "live";
  reference: string | null;
};

export function RequestDialog({
  exp,
  date,
  guests,
  onDateChange,
  onGuestsChange,
  children,
}: {
  exp: Experience;
  date: string;
  guests: number;
  onDateChange: (v: string) => void;
  onGuestsChange: (v: number) => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [completion, setCompletion] = useState<Completion | null>(null);
  const [submitting, setSubmitting] = useState(false);
  // One token per request the guest is composing, not per submit attempt. A retry
  // after a failed send has to carry the same token, or the unique constraint on
  // booking_requests can never recognise the duplicate it exists to catch.
  const requestToken = useRef<string | null>(null);
  const [error, setError] = useState("");
  const { locale } = useI18n();
  const c = usePublicCopy(locale);
  const m = useMiscCopy(locale);
  const isLive = import.meta.env["VITE_REQUEST_MODE"] === "live";

  const total = exp.priceUnit === "total" ? exp.price : exp.price * guests;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!isLive) {
      trackEvent("booking_request_completed", {
        experience_slug: exp.slug,
        mode: "demo",
        guest_bucket: guestBucket(guests),
        price_band: priceBand(total),
      });
      setCompletion({ mode: "demo", reference: null });
      return;
    }

    const values = new FormData(event.currentTarget);
    const consent = values.get("consent") === "on";

    if (!consent) {
      trackEvent("booking_request_failed", {
        experience_slug: exp.slug,
        stage: "validation",
      });
      setError(c.consentError);
      return;
    }

    setSubmitting(true);

    try {
      requestToken.current ??= crypto.randomUUID();

      const result = await submitBookingRequest({
        data: {
          requestToken: requestToken.current,
          experienceSlug: exp.slug,
          preferredDate: date,
          guests,
          fullName: String(values.get("fullName") ?? ""),
          email: String(values.get("email") ?? ""),
          phone: String(values.get("phone") ?? ""),
          message: String(values.get("message") ?? ""),
          website: String(values.get("website") ?? ""),
          consent,
        },
      });

      trackEvent("booking_request_completed", {
        experience_slug: exp.slug,
        mode: "live",
        guest_bucket: guestBucket(guests),
        price_band: priceBand(total),
      });
      requestToken.current = null;
      setCompletion({ mode: "live", reference: result.reference });
    } catch (cause) {
      trackEvent("booking_request_failed", {
        experience_slug: exp.slug,
        stage: "persistence",
      });
      // The server speaks in codes so this flow stays in the guest's language
      // even when it fails; anything unrecognised falls back to generic copy.
      setError(
        cause instanceof Error
          ? localizeRequestError(cause.message, locale, c.sendError)
          : c.sendError,
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (value) {
          trackEvent("booking_request_opened", {
            experience_slug: exp.slug,
            mode: isLive ? "live" : "demo",
            guest_bucket: guestBucket(guests),
            price_band: priceBand(total),
          });
        }
        if (!value) {
          requestToken.current = null;
          setTimeout(() => {
            setCompletion(null);
            setError("");
            setSubmitting(false);
          }, 250);
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[92dvh] overflow-y-auto sm:max-w-lg">
        {completion ? (
          <div className="py-6 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sea/10">
              <CheckCircle2 className="h-7 w-7 text-sea" aria-hidden="true" />
            </div>
            <DialogHeader className="mt-5">
              <DialogTitle className="text-center font-display text-2xl font-medium">
                {completion.mode === "live" ? c.requestReceived : c.demoCompleted}
              </DialogTitle>
              <DialogDescription className="text-center">
                {completion.mode === "live" ? c.liveComplete : c.demoComplete}
              </DialogDescription>
            </DialogHeader>
            <dl className="mx-auto mt-6 max-w-xs space-y-2 rounded-lg border border-border bg-secondary/60 p-4 text-left text-sm">
              {completion.reference ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{c.reference}</dt>
                  <dd className="font-mono font-medium">{completion.reference}</dd>
                </div>
              ) : null}
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{c.trip}</dt>
                <dd className="text-right font-medium">{exp.title}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{c.date}</dt>
                <dd className="font-medium">{formatDate(date, locale)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{c.guests}</dt>
                <dd className="font-medium">{guests}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{c.estimatedTotal}</dt>
                <dd className="font-medium">€{total}</dd>
              </div>
            </dl>
            <Button className="mt-6" variant="secondary" onClick={() => setOpen(false)}>
              {c.done}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl font-medium">
                {c.request} {exp.title}
              </DialogTitle>
              <DialogDescription>{isLive ? c.liveIntro : c.demoIntro}</DialogDescription>
            </DialogHeader>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="absolute -left-[10000px]" aria-hidden="true">
                <Label htmlFor="req-website">Website</Label>
                <Input
                  id="req-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="req-date" className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-sea" aria-hidden="true" />
                    {c.preferredDate}
                  </Label>
                  <Input
                    id="req-date"
                    type="date"
                    required
                    min={new Date().toISOString().slice(0, 10)}
                    value={date}
                    onChange={(event) => onDateChange(event.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="req-guests" className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-sea" aria-hidden="true" />
                    {c.guests}
                  </Label>
                  <Input
                    id="req-guests"
                    type="number"
                    min={1}
                    max={exp.capacity}
                    value={guests}
                    onChange={(event) =>
                      onGuestsChange(
                        Math.min(exp.capacity, Math.max(1, Number(event.target.value) || 1)),
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="req-name">{c.fullName}</Label>
                  <Input
                    id="req-name"
                    name="fullName"
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Sophie Martin"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="req-email">{m.email}</Label>
                  <Input
                    id="req-email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    placeholder="sophie@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="req-phone">
                  {c.phone} <span className="text-muted-foreground">({c.optional})</span>
                </Label>
                <Input
                  id="req-phone"
                  name="phone"
                  type="tel"
                  maxLength={40}
                  autoComplete="tel"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="req-msg">
                  {c.messageTo} {exp.operator.name}{" "}
                  <span className="text-muted-foreground">({c.optional})</span>
                </Label>
                <Textarea
                  id="req-msg"
                  name="message"
                  rows={3}
                  maxLength={1000}
                  placeholder={c.messagePlaceholder}
                />
              </div>

              {isLive ? (
                <div className="space-y-2">
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-secondary/40 p-3 text-xs leading-relaxed text-muted-foreground">
                    <input
                      name="consent"
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 accent-sea"
                    />
                    <span>{c.consent}</span>
                  </label>
                  {/* Outside the label: clicking a link nested in one toggles the box. */}
                  <Link
                    to={localizedPath("/privacy", locale) as never}
                    target="_blank"
                    className="block px-1 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    {legalLabels[locale].readPolicy}
                  </Link>
                </div>
              ) : null}

              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/60 px-4 py-3 text-sm">
                <span className="text-muted-foreground">{c.estimatedTotal}</span>
                <span className="font-display text-xl font-medium">
                  €{total}{" "}
                  <span className="font-sans text-xs font-normal text-muted-foreground">
                    {exp.priceUnit === "total"
                      ? c.forBoat
                      : `${guests} ${guestNoun(guests, locale)}`}
                  </span>
                </span>
              </div>

              {error ? (
                <p
                  className="flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive"
                  role="alert"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {error}
                </p>
              ) : null}

              <Button
                type="submit"
                variant="sun"
                size="lg"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    {c.sending}
                  </>
                ) : (
                  c.sendRequest
                )}
              </Button>
              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {isLive ? c.liveFoot : c.demoFoot}
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
