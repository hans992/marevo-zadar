import { useState, type ReactNode } from "react";
import { Anchor, CalendarX2, CheckCircle2, Coins, Inbox } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const points = [
  { icon: Inbox, title: "Direct, qualified requests", text: "Real dates, real group sizes, sent straight to your phone. No lead lists, no cold enquiries." },
  { icon: CheckCircle2, title: "You confirm every booking", text: "Nothing is sold before you say the boat is free. Guests only pay after you accept." },
  { icon: Coins, title: "Simple pricing", text: "One clear commission on confirmed trips. No listing fee, no subscription, no lock-in." },
  { icon: CalendarX2, title: "Blackout dates later", text: "Start with a simple listing. Calendars and blackout dates arrive as we grow the fleet." },
];

export function ListYourBoatDialog({ children }: { children: ReactNode }) {
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setTimeout(() => setSent(false), 200);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90dvh] gap-0 overflow-y-auto p-0 sm:max-w-2xl">
        <div className="bg-ink px-6 py-8 text-background sm:px-9">
          <DialogHeader className="space-y-3 text-left">
            <span className="eyebrow flex items-center gap-2 text-sun">
              <Anchor className="h-3.5 w-3.5" aria-hidden="true" /> For Zadar operators
            </span>
            <DialogTitle className="font-display text-3xl leading-tight font-medium text-background">
              List your boat on MAREVO
            </DialogTitle>
            <DialogDescription className="max-w-md text-background/70">
              We are building a small, carefully chosen fleet of Zadar boats — not a directory of everything that floats.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-7 sm:px-9">
          {sent ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-sea" aria-hidden="true" />
              <h3 className="mt-4 text-2xl">Thanks — you're on the list</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                We review every boat personally. Someone from the Zadar team will be in touch within two working days.
              </p>
              <Button className="mt-6" variant="secondary" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          ) : (
            <>
              <ul className="grid gap-5 sm:grid-cols-2">
                {points.map((p) => (
                  <li key={p.title} className="flex gap-3">
                    <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-sea" aria-hidden="true" />
                    <div>
                      <h4 className="text-base leading-snug">{p.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <form
                className="mt-7 border-t border-border pt-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="op-name">Your name</Label>
                    <Input id="op-name" required placeholder="Ante Jurić" autoComplete="name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="op-email">Email or phone</Label>
                    <Input id="op-email" required placeholder="ante@example.com" />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="op-boat">Your boat</Label>
                    <Input id="op-boat" required placeholder="8.5 m cabin motorboat, up to 8 guests, Gaženica" />
                  </div>
                </div>
                <Button type="submit" variant="sun" size="lg" className="mt-5 w-full sm:w-auto">
                  Join the founding fleet
                </Button>
                <p className="mt-3 text-xs text-muted-foreground">
                  No commitment. We will only contact you about listing your boat.
                </p>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
