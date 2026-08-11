import { useState, type FormEvent, type ReactNode } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock,
  Loader2,
  Users,
} from "lucide-react";
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
import { formatDate } from "./SearchComposer";

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
  const [error, setError] = useState("");
  const isLive = import.meta.env.VITE_REQUEST_MODE === "live";

  const total = exp.priceUnit === "total" ? exp.price : exp.price * guests;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!isLive) {
      setCompletion({ mode: "demo", reference: null });
      return;
    }

    const values = new FormData(event.currentTarget);
    const consent = values.get("consent") === "on";

    if (!consent) {
      setError("Please confirm that we may share your request with the operator.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await submitBookingRequest({
        data: {
          requestToken: crypto.randomUUID(),
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

      setCompletion({ mode: "live", reference: result.reference });
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "We could not send your request. Please try again.",
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
        if (!value) {
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
                {completion.mode === "live" ? "Request received" : "Demo request completed"}
              </DialogTitle>
              <DialogDescription className="text-center">
                {completion.mode === "live"
                  ? `Your request is waiting for ${exp.operator.name} to confirm availability. No payment has been taken.`
                  : "This presentation preview did not send your details, contact the operator or create a charge."}
              </DialogDescription>
            </DialogHeader>
            <dl className="mx-auto mt-6 max-w-xs space-y-2 rounded-lg border border-border bg-secondary/60 p-4 text-left text-sm">
              {completion.reference ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Reference</dt>
                  <dd className="font-mono font-medium">{completion.reference}</dd>
                </div>
              ) : null}
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Trip</dt>
                <dd className="text-right font-medium">{exp.title}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Date</dt>
                <dd className="font-medium">{formatDate(date)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Guests</dt>
                <dd className="font-medium">{guests}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Estimated total</dt>
                <dd className="font-medium">€{total}</dd>
              </div>
            </dl>
            <Button className="mt-6" variant="secondary" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl font-medium">
                Request {exp.title}
              </DialogTitle>
              <DialogDescription>
                {isLive
                  ? "Send a request first. The operator confirms availability before any payment."
                  : "Presentation preview only — your details stay in this browser and are not transmitted."}
              </DialogDescription>
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
                    Preferred date
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
                    Guests
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
                  <Label htmlFor="req-name">Full name</Label>
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
                  <Label htmlFor="req-email">Email</Label>
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
                  Phone <span className="text-muted-foreground">(optional)</span>
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
                  Message to {exp.operator.name}{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Textarea
                  id="req-msg"
                  name="message"
                  rows={3}
                  maxLength={1000}
                  placeholder="We're two families with small kids and would love plenty of swim stops."
                />
              </div>

              {isLive ? (
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-secondary/40 p-3 text-xs leading-relaxed text-muted-foreground">
                  <input
                    name="consent"
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 accent-sea"
                  />
                  <span>
                    I agree that MAREVO may store these details and share them with the
                    selected operator to answer this booking request.
                  </span>
                </label>
              ) : null}

              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/60 px-4 py-3 text-sm">
                <span className="text-muted-foreground">Estimated total</span>
                <span className="font-display text-xl font-medium">
                  €{total}{" "}
                  <span className="font-sans text-xs font-normal text-muted-foreground">
                    {exp.priceUnit === "total" ? "for the boat" : `for ${guests}`}
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
                    Sending request…
                  </>
                ) : (
                  "Send request"
                )}
              </Button>
              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {isLive
                  ? "No charge now · operator confirmation required"
                  : "Demo flow · no request is transmitted"}
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
