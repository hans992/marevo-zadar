import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Clock, MapPin, Minus, Plus, Ruler, Ship, Users, X, Zap } from "lucide-react";
import { Header } from "@/components/marevo/Header";
import { Footer } from "@/components/marevo/Footer";
import { StructuredData } from "@/components/marevo/StructuredData";
import { Stars } from "@/components/marevo/Stars";
import { RequestDialog } from "@/components/marevo/RequestDialog";
import { formatDate } from "@/components/marevo/SearchComposer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getExperience, experiences, type Experience } from "@/data/inventory";
import { ExperienceCard } from "@/components/marevo/ExperienceCard";
import { alternateLinks, experienceStructuredData, SITE_URL } from "@/lib/seo";
import { localizedPath, useI18n } from "@/i18n";
import { localizedCategory, localizedDuration, usePublicCopy } from "@/i18n/public";

export const Route = createFileRoute("/experiences/$slug")({
  loader: ({ params }): { exp: Experience } => {
    const exp = getExperience(params.slug);
    if (!exp) throw notFound();
    return { exp };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Trip not found — MAREVO" }, { name: "robots", content: "noindex" }],
      };
    }
    const { exp } = loaderData;
    const title = `${exp.title} — MAREVO Zadar`;
    return {
      meta: [
        { title },
        { name: "description", content: exp.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: exp.summary },
        { property: "og:image", content: exp.images[0] as string },
        { name: "twitter:image", content: exp.images[0] as string },
        { property: "og:url", content: `${SITE_URL}/experiences/${exp.slug}` },
      ],
      links: [
        {
          rel: "canonical",
          href: `${SITE_URL}/experiences/${exp.slug}`,
        },
        ...alternateLinks(`/experiences/${exp.slug}`),
      ],
    };
  },
  component: ExperienceRoutePage,
});

function ExperienceRoutePage() {
  return <ExperienceDetail exp={(Route.useLoaderData() as { exp: Experience }).exp} />;
}

export function ExperienceDetail({ exp }: { exp: Experience }) {
  const { locale, t } = useI18n();
  const c = usePublicCopy(locale);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(Math.min(4, exp.capacity));

  const unitTotal = exp.priceUnit === "total" ? exp.price : exp.price * guests;
  const total = unitTotal;
  const related = experiences.filter((e) => e.slug !== exp.slug).slice(0, 3);

  const BookingControls = (
    <>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
        <div className="relative bg-background px-4 py-3">
          <Label htmlFor="book-date" className="eyebrow text-muted-foreground">
            {c.date}
          </Label>
          <p className="mt-0.5 text-sm font-medium">
            {formatDate(date, locale, t("search.anyDate"))}
          </p>
          <input
            id="book-date"
            type="date"
            value={date}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setDate(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label={c.chooseDate}
          />
        </div>
        <div className="flex items-center justify-between bg-background px-4 py-3">
          <div>
            <span className="eyebrow text-muted-foreground">{c.guests}</span>
            <p className="mt-0.5 text-sm font-medium">{guests}</p>
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              aria-label={t("search.removeGuest")}
              disabled={guests <= 1}
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              aria-label={t("search.addGuest")}
              disabled={guests >= exp.capacity}
              onClick={() => setGuests((g) => Math.min(exp.capacity, g + 1))}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      <dl className="mt-5 space-y-2.5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">
            {exp.priceUnit === "total"
              ? c.boatForDay
              : `€${exp.price} × ${guests} ${c.guests.toLocaleLowerCase(locale)}`}
          </dt>
          <dd>€{unitTotal}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-border pt-3 text-base font-medium">
          <dt>{c.displayedPrice}</dt>
          <dd className="font-display text-xl">€{total}</dd>
        </div>
      </dl>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <StructuredData data={experienceStructuredData(exp, locale)} />
      <main className="pt-16 pb-28 lg:pt-[74px] lg:pb-0">
        {/* Gallery */}
        <div className="mx-auto max-w-[1240px] px-5 pt-6 sm:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  to={localizedPath("/", locale) as never}
                  className="underline-offset-4 hover:text-ink hover:underline"
                >
                  {c.home}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  to={localizedPath("/search", locale) as never}
                  className="underline-offset-4 hover:text-ink hover:underline"
                >
                  {c.zadarExperiences}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink">{exp.title}</li>
            </ol>
          </nav>

          <div className="mt-5 grid gap-2 overflow-hidden rounded-xl sm:grid-cols-4 sm:grid-rows-2">
            <div className="sm:col-span-2 sm:row-span-2">
              <img
                src={exp.images[0]}
                alt={`${exp.title} — main photo`}
                decoding="async"
                sizes="(min-width: 640px) 50vw, 100vw"
                className="aspect-[4/3] h-full w-full object-cover sm:aspect-auto"
              />
            </div>
            {exp.images.slice(1, 5).map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${exp.title} — photo ${i + 2}`}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 640px) 25vw, 100vw"
                className="hidden aspect-[4/3] h-full w-full object-cover sm:block"
              />
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_22rem]">
          <div>
            <p className="eyebrow text-sea">{localizedCategory(exp.category, c)}</p>
            <h1 className="mt-3 font-display text-3xl leading-tight font-medium text-balance sm:text-[2.6rem]">
              {exp.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <Stars rating={exp.rating} reviews={exp.reviews} className="text-ink" />
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" aria-hidden="true" /> {exp.location}
              </span>
            </div>

            <ul className="mt-8 grid gap-5 border-y border-border py-6 sm:grid-cols-4">
              {[
                { icon: Clock, label: c.duration, value: localizedDuration(exp.durationHours, c) },
                {
                  icon: Users,
                  label: c.groupSize,
                  value: `${c.upTo} ${exp.capacity} ${c.guests.toLocaleLowerCase(locale)}`,
                },
                { icon: Ship, label: c.boat, value: exp.boat.type },
                { icon: Zap, label: c.booking, value: c.requestFirst },
              ].map((f) => (
                <li key={f.label} className="flex gap-3">
                  <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-sea" aria-hidden="true" />
                  <div>
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">
                      {f.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium">{f.value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <section className="mt-10">
              <h2 className="text-2xl">{c.aboutDay}</h2>
              {exp.description.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4 leading-relaxed text-ink/80">
                  {p}
                </p>
              ))}
            </section>

            <section className="mt-12">
              <h2 className="text-2xl">{c.dayRoughly}</h2>
              <ol className="mt-6 space-y-6 border-l border-border pl-6">
                {exp.itinerary.map((s) => (
                  <li key={s.title} className="relative">
                    <span
                      className="absolute top-1.5 -left-[1.68rem] h-2.5 w-2.5 rounded-full bg-sun ring-4 ring-background"
                      aria-hidden="true"
                    />
                    <p className="text-xs tracking-widest text-sea uppercase">{s.time}</p>
                    <h3 className="mt-1 text-lg leading-snug">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-12 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="text-xl">{c.included}</h2>
                <ul className="mt-4 space-y-2.5">
                  {exp.included.map((i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-ink/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sea" aria-hidden="true" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl">{c.notIncluded}</h2>
                <ul className="mt-4 space-y-2.5">
                  {exp.notIncluded.map((i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                      <X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-12 rounded-xl border border-border bg-sand/70 p-6 sm:p-8">
              <h2 className="text-xl">
                {c.theBoat} — {exp.boat.name}
              </h2>
              <dl className="mt-5 grid gap-5 sm:grid-cols-3">
                {[
                  [Ship, c.type, exp.boat.type],
                  [Ruler, c.length, exp.boat.length],
                  [Zap, c.engine, exp.boat.engine],
                ].map(([Icon, k, v]) => {
                  const I = Icon as typeof Ship;
                  return (
                    <div key={k as string} className="flex gap-3">
                      <I className="mt-0.5 h-4.5 w-4.5 shrink-0 text-sea" aria-hidden="true" />
                      <div>
                        <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                          {k as string}
                        </dt>
                        <dd className="mt-0.5 text-sm font-medium">{v as string}</dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
              <ul className="mt-6 flex flex-wrap gap-2">
                {exp.boat.extras.map((e) => (
                  <li
                    key={e}
                    className="rounded-full border border-ink/10 bg-background px-3 py-1 text-xs text-ink/80"
                  >
                    {e}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                <span className="font-medium text-ink">{c.meetingPoint}:</span> {exp.meeting}
              </p>
            </section>

            <section className="mt-12 flex flex-col gap-5 rounded-xl border border-border p-6 sm:flex-row sm:items-center sm:p-8">
              <img
                src={exp.operator.avatar}
                alt={`${exp.operator.name}, ${exp.operator.role}`}
                loading="lazy"
                className="h-20 w-20 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="eyebrow text-sea">{c.yourOperator}</p>
                <h2 className="mt-1.5 text-xl">
                  {exp.operator.name} · {exp.operator.role}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {exp.operator.blurb} {exp.operator.since}, and {exp.operator.replies}.
                </p>
              </div>
            </section>
          </div>

          {/* Sticky booking card */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-xl border border-border bg-card p-6 shadow-soft">
              <p className="flex items-baseline gap-1.5">
                <span className="text-sm text-muted-foreground">{c.from}</span>
                <span className="font-display text-3xl leading-none font-medium">€{exp.price}</span>
                <span className="text-sm text-muted-foreground">
                  {exp.priceUnit === "total" ? c.total : c.perPerson}
                </span>
              </p>
              <div className="mt-5">{BookingControls}</div>
              <RequestDialog
                exp={exp}
                date={date}
                guests={guests}
                onDateChange={setDate}
                onGuestsChange={setGuests}
              >
                <Button variant="sun" size="lg" className="mt-6 w-full">
                  {c.requestToBook}
                </Button>
              </RequestDialog>
              <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
                {c.noCharge}
              </p>
            </div>
          </aside>
        </div>

        <section className="mx-auto max-w-[1240px] px-5 pb-4 sm:px-8 lg:hidden">
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-xl">{c.planDay}</h2>
            <div className="mt-4">{BookingControls}</div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{c.noCharge}</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 pt-10 pb-16 sm:px-8">
          <h2 className="text-2xl">{c.otherDays}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => (
              <ExperienceCard key={e.slug} exp={e} />
            ))}
          </div>
        </section>
      </main>

      {/* Mobile booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/97 px-5 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-4">
          <div className="min-w-0">
            <p className="truncate text-sm">
              <span className="font-display text-xl font-medium">€{exp.price}</span>{" "}
              <span className="text-muted-foreground">
                {exp.priceUnit === "total" ? c.total : c.perPerson}
              </span>
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {formatDate(date, locale, t("search.anyDate"))} · {guests}{" "}
              {guests === 1 ? t("search.guest") : t("search.guestsLower")}
            </p>
          </div>
          <RequestDialog
            exp={exp}
            date={date}
            guests={guests}
            onDateChange={setDate}
            onGuestsChange={setGuests}
          >
            <Button variant="sun" size="lg" className="ml-auto shrink-0">
              {c.requestToBook}
            </Button>
          </RequestDialog>
        </div>
      </div>

      <Footer />
    </div>
  );
}
