import { useState, type ReactNode } from "react";
import { CalendarDays, CheckCircle2, Clock, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Experience } from "@/data/inventory";
import { formatDate } from "./SearchComposer";

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
  const [sent, setSent] = useState(false);

  const total = exp.priceUnit === "total" ? exp.price : exp.price * guests;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setTimeout(() => setSent(false), 250);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[92dvh] overflow-y-auto sm:max-w-lg">
        {sent ? (
          <div className="py-6 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sea/10">
              <CheckCircle2 className="h-7 w-7 text-sea" aria-hidden="true" />
            </div>
            <DialogHeader className="mt-5">
              <DialogTitle className="text-center font-display text-2xl font-medium">
                Demo request completed
              </DialogTitle>
              <DialogDescription className="text-center">
                This presentation preview does not send an email, contact the operator or create a charge.
              </DialogDescription>
            </DialogHeader>
            <dl className="mx-auto mt-6 max-w-xs space-y-2 rounded-lg border border-border bg-secondary/60 p-4 text-left text-sm">
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
              <DialogTitle className="font-display text-2xl font-medium">Request {exp.title}</DialogTitle>
              <DialogDescription>
                Presentation preview only — this request will not be transmitted.
              </DialogDescription>
            </DialogHeader>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="req-date" className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-sea" aria-hidden="true" /> Preferred date
                  </Label>
                  <Input
                    id="req-date"
                    type="date"
                    required
                    min={new Date().toISOString().slice(0, 10)}
                    value={date}
                    onChange={(e) => onDateChange(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="req-guests" className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-sea" aria-hidden="true" /> Guests
                  </Label>
                  <Input
                    id="req-guests"
                    type="number"
                    min={1}
                    max={exp.capacity}
                    value={guests}
                    onChange={(e) => onGuestsChange(Math.min(exp.capacity, Math.max(1, Number(e.target.value) || 1)))}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="req-name">Full name</Label>
                  <Input id="req-name" required autoComplete="name" placeholder="Sophie Martin" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="req-email">Email</Label>
                  <Input id="req-email" type="email" required autoComplete="email" placeholder="sophie@example.com" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="req-phone">
                  Phone <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input id="req-phone" type="tel" autoComplete="tel" placeholder="+33 6 12 34 56 78" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="req-msg">
                  Message to {exp.operator.name} <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Textarea
                  id="req-msg"
                  rows={3}
                  placeholder="We're two families with small kids and would love plenty of swim stops."
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/60 px-4 py-3 text-sm">
                <span className="text-muted-foreground">Estimated total</span>
                <span className="font-display text-xl font-medium">
                  €{total}{" "}
                  <span className="font-sans text-xs font-normal text-muted-foreground">
                    {exp.priceUnit === "total" ? "for the boat" : `for ${guests}`}
                  </span>
                </span>
              </div>

              <Button type="submit" variant="sun" size="lg" className="w-full">
                Send request
              </Button>
              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Demo flow · no request is transmitted
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
