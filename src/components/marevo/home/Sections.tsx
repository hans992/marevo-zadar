import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, CheckCircle2, CreditCard, Quote, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categories, destinations, faqs, reviews } from "@/data/inventory";
import { ListYourBoatDialog } from "../ListYourBoatDialog";
import { trackEvent } from "@/lib/analytics";

export function Categories() {
  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <h2 className="max-w-lg font-display text-3xl leading-tight font-medium text-balance sm:text-4xl">
          How do you want to spend the day?
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Link
              key={c.title}
              to="/search"
              search={{ type: c.filter }}
              className="group relative block overflow-hidden rounded-xl border border-ink/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea"
              style={{
                borderBottomRightRadius: i % 2 === 0 ? "4rem" : undefined,
                borderTopLeftRadius: i % 2 === 1 ? "4rem" : undefined,
              }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-ink/10 sm:aspect-[4/5]">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 295px, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 35%, oklch(0.267 0.043 223.7 / 0.78) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-xl leading-snug text-background">{c.title}</h3>
                <p className="mt-1 text-sm text-background/80">{c.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Destinations() {
  return (
    <section
      id="destinations"
      className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="max-w-xl">
        <p className="eyebrow text-sea">Destinations</p>
        <h2 className="mt-3 font-display text-3xl leading-tight font-medium text-balance sm:text-4xl">
          Explore beyond the old town
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Zadar sits in front of a wall of islands. Everything below is a day trip, and most of it
          is unreachable without a boat.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {destinations.map((d) => (
          <Link
            key={d.name}
            to="/search"
            search={{ q: d.name.split(" ")[0] as string }}
            className="group grid grid-cols-[7.5rem_1fr] items-stretch overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea sm:grid-cols-[12rem_1fr]"
          >
            <div className="overflow-hidden bg-secondary">
              <img
                src={d.image}
                alt={`${d.name}, near Zadar`}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 768px) 192px, 120px"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-5">
              <h3 className="text-xl leading-snug">{d.name}</h3>
              <p className="mt-1 text-xs tracking-wide text-sea">{d.context}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                See trips{" "}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function MatchTeaser() {
  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow flex items-center gap-2 text-sea">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Smart matching
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight font-medium text-balance sm:text-4xl">
            Tell us your kind of perfect.
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink/75">
            Describe the day you have in mind and we match it against the boats we actually know —
            capacity, shade, departure point, how far the skipper is willing to go and what the wind
            is doing that week. A person from the Zadar team checks every match before it reaches
            you.
          </p>
          <Button asChild variant="ink" size="lg" className="mt-7">
            <Link to="/search">Match me with a boat</Link>
          </Button>
        </div>

        <figure className="relative rounded-xl border border-ink/10 bg-background p-6 shadow-soft sm:p-8">
          <Quote
            className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-sun p-1.5 text-ink"
            aria-hidden="true"
          />
          <figcaption className="eyebrow text-muted-foreground">Example request</figcaption>
          <blockquote className="mt-3 font-display text-xl leading-relaxed text-balance sm:text-2xl">
            “We're 6 people in Zadar tomorrow. Private boat, lots of swimming, somewhere quiet, max
            €700.”
          </blockquote>
          <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5 text-xs">
            {["6 guests", "Private", "Quiet coves", "Under €700", "Tomorrow"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-secondary px-3 py-1 text-ink/80"
              >
                {t}
              </span>
            ))}
          </div>
        </figure>
      </div>
    </section>
  );
}

const steps = [
  {
    icon: CalendarCheck,
    title: "Choose your day",
    text: "Pick a trip, a date and your group size, then send a request with anything the skipper should know.",
  },
  {
    icon: CheckCircle2,
    title: "Operator confirms",
    text: "The owner checks the boat, the crew and the forecast, then replies — usually within 30 minutes.",
  },
  {
    icon: CreditCard,
    title: "Pay securely",
    text: "Only once the boat is confirmed do you pay. Free cancellation applies on selected trips.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28">
      <div className="max-w-xl">
        <p className="eyebrow text-sea">How requests work</p>
        <h2 className="mt-3 font-display text-3xl leading-tight font-medium text-balance sm:text-4xl">
          No calendar roulette. Your operator confirms the boat before you pay.
        </h2>
      </div>

      <ol className="mt-12 grid gap-10 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="relative">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-sm text-background">
                {i + 1}
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
              <s.icon className="h-5 w-5 text-sea" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-xl">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Operators() {
  return (
    <section id="operators" className="scroll-mt-24 bg-ink py-20 text-background lg:py-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div className="cove border border-background/10">
          <img
            src="https://images.unsplash.com/photo-1744996999291-84081fe12f05?auto=format&fit=crop&w=1200&q=80"
            alt="Local boats moored in Zadar harbour"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 592px, 100vw"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>

        <div>
          <p className="eyebrow text-sun">Our operators</p>
          <h2 className="mt-3 font-display text-3xl leading-tight font-medium text-balance text-background sm:text-4xl">
            Built with Zadar's boat people
          </h2>
          <p className="mt-5 leading-relaxed text-background/75">
            MAREVO started because good local skippers were losing their season to platforms that
            treat a boat like a hotel room. We work with a small number of families who own their
            boats, know the channels and answer their own phones. If a bay is crowded, they will
            take you somewhere else. If the bura comes, they will tell you honestly.
          </p>
          <p className="mt-4 leading-relaxed text-background/75">
            No fleet resellers, no last-minute substitutions, no boat you have never seen a
            photograph of.
          </p>

          <dl className="mt-9 grid grid-cols-3 gap-6 border-t border-background/15 pt-7">
            {[
              ["Zadar-first", "focused marketplace"],
              ["Request-first", "no stale calendars"],
              ["Human", "trip support"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl leading-none font-medium text-background">
                  {n}
                </dt>
                <dd className="mt-1.5 text-sm text-background/65">{l}</dd>
              </div>
            ))}
          </dl>

          <ListYourBoatDialog>
            <Button variant="sun" size="lg" className="mt-9">
              List your boat with us
            </Button>
          </ListYourBoatDialog>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28">
      <h2 className="max-w-lg font-display text-3xl leading-tight font-medium text-balance sm:text-4xl">
        Days people still talk about
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <figure
            key={r.name}
            className="flex flex-col rounded-xl border border-border bg-card p-6"
          >
            <blockquote className="flex-1 leading-relaxed text-ink/85">“{r.text}”</blockquote>
            <figcaption className="mt-6 border-t border-border pt-4 text-sm">
              <span className="font-medium">
                {r.name}, {r.country}
              </span>
              <span className="mt-1 block text-muted-foreground">
                {r.trip} · {r.date}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="bg-sand py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow text-sea">Good to know</p>
          <h2 className="mt-3 font-display text-3xl leading-tight font-medium text-balance sm:text-4xl">
            Questions before you sail
          </h2>
          <p className="mt-4 max-w-sm leading-relaxed text-ink/70">
            Still unsure? Send a request without paying — the operator confirms availability before
            anything else happens.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-ink/10">
              <AccordionTrigger className="py-5 text-left font-sans text-base font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[0.95rem] leading-relaxed text-ink/70">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function EmailCapture() {
  const [done, setDone] = useState(false);
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8">
      <div className="grid items-center gap-8 rounded-xl border border-border bg-card p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
        <div>
          <h2 className="font-display text-2xl leading-tight font-medium sm:text-3xl">
            Not ready to choose?
          </h2>
          <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
            One short email a month: new boats, quieter weeks and the best days to be on the water
            around Zadar.
          </p>
        </div>
        {done ? (
          <p className="flex items-center gap-2 text-sm font-medium text-sea">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> Demo signup completed — no email
            was transmitted.
          </p>
        ) : (
          <form
            className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto"
            onSubmit={(e) => {
              e.preventDefault();
              trackEvent("newsletter_demo_completed", { surface: "homepage" });
              setDone(true);
            }}
          >
            <div className="sm:w-64">
              <Label htmlFor="newsletter" className="sr-only">
                Email address
              </Label>
              <Input
                id="newsletter"
                type="email"
                required
                placeholder="you@example.com"
                className="h-11"
              />
            </div>
            <Button type="submit" variant="ink" size="lg">
              Keep me posted
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
