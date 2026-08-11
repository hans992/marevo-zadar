import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { Header } from "@/components/marevo/Header";
import { Footer } from "@/components/marevo/Footer";
import { ExperienceCard } from "@/components/marevo/ExperienceCard";
import {
  SearchComposer,
  defaultSearch,
  type SearchState,
} from "@/components/marevo/SearchComposer";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { experiences, filters, type FilterId } from "@/data/inventory";
import { cn } from "@/lib/utils";
import { alternateLinks, getSeoCopy, SITE_URL } from "@/lib/seo";
import { localizedPath, useI18n } from "@/i18n";
import { localizedFilter, usePublicCopy } from "@/i18n/public";

export type BoatSearch = {
  q?: string;
  date?: string;
  guests?: number;
  trip?: "private" | "shared";
  type?: string;
};

export const validateBoatSearch = (raw: Record<string, unknown>): BoatSearch => {
  const out: BoatSearch = {};
  if (typeof raw["q"] === "string" && raw["q"]) out.q = raw["q"];
  if (typeof raw["date"] === "string" && raw["date"]) out.date = raw["date"];
  const g = Number(raw["guests"]);
  if (Number.isFinite(g) && g > 0) out.guests = Math.min(12, Math.round(g));
  if (raw["trip"] === "private" || raw["trip"] === "shared") out.trip = raw["trip"];
  if (typeof raw["type"] === "string" && raw["type"]) out.type = raw["type"];
  return out;
};

export const Route = createFileRoute("/search")({
  validateSearch: validateBoatSearch,
  head: () => {
    const seo = getSeoCopy("en");
    return {
      meta: [
        { title: seo.searchTitle },
        {
          name: "description",
          content: seo.searchDescription,
        },
        { property: "og:title", content: "Find boats in Zadar — MAREVO" },
        {
          property: "og:description",
          content: "Private tours, rentals and sunset trips from Zadar, run by local operators.",
        },
        { property: "og:url", content: `${SITE_URL}/search` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/search` }, ...alternateLinks("/search")],
    };
  },
  component: SearchRoutePage,
});

function SearchRoutePage() {
  return <SearchPage params={Route.useSearch()} />;
}

const sorts = ["recommended", "price-asc", "price-desc", "rating", "duration"] as const;

export function SearchPage({ params }: { params: BoatSearch }) {
  const navigate = useNavigate();
  const { locale, t } = useI18n();
  const c = usePublicCopy(locale);
  const sortLabels = {
    recommended: c.recommended,
    "price-asc": c.priceLow,
    "price-desc": c.priceHigh,
    rating: c.bestRated,
    duration: c.shortest,
  } as const;

  const [composer, setComposer] = useState<SearchState>({
    q: params.q ?? defaultSearch.q,
    date: params.date ?? "",
    guests: params.guests ?? defaultSearch.guests,
    trip: params.trip ?? defaultSearch.trip,
  });
  const [type, setType] = useState<FilterId>(
    (filters.find((f) => f.id === params.type)?.id ?? "all") as FilterId,
  );
  const [sort, setSort] = useState<(typeof sorts)[number]>("recommended");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const results = useMemo(() => {
    let list = experiences.filter((e) => e.capacity >= composer.guests);

    const q = (params.q ?? "").toLowerCase();
    if (q && q !== "zadar") {
      list = list.filter((e) => `${e.title} ${e.location} ${e.summary}`.toLowerCase().includes(q));
    }
    if (type !== "all") list = list.filter((e) => e.tags.includes(type as never));
    if (composer.trip === "shared") {
      list = list.filter((e) => e.category === "Shared trip" || e.priceUnit === "person");
    }
    if (maxPrice)
      list = list.filter(
        (e) => (e.priceUnit === "total" ? e.price : e.price * composer.guests) <= maxPrice,
      );

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    if (sort === "duration") sorted.sort((a, b) => a.durationHours - b.durationHours);
    return sorted;
  }, [composer.guests, composer.trip, params.q, type, sort, maxPrice]);

  const reset = () => {
    setType("all");
    setMaxPrice(null);
    setComposer({ ...composer, trip: "private", guests: 4 });
  };

  const FilterControls = (
    <div className="space-y-8">
      <div>
        <h3 className="eyebrow text-muted-foreground">{c.tripType}</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={type === f.id}
              onClick={() => setType(f.id)}
              className={cn(
                "rounded-md border px-3.5 py-2 text-sm transition-all",
                type === f.id
                  ? "border-ink bg-ink text-background"
                  : "border-border bg-background text-ink/75 hover:border-ink/30 hover:bg-secondary",
              )}
            >
              {localizedFilter(f.id, c)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="eyebrow text-muted-foreground">{c.budget}</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { label: c.any, value: null },
            { label: `${c.under} €400`, value: 400 },
            { label: `${c.under} €700`, value: 700 },
            { label: `${c.under} €800`, value: 800 },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              aria-pressed={maxPrice === b.value}
              onClick={() => setMaxPrice(b.value)}
              className={cn(
                "rounded-md border px-3.5 py-2 text-sm transition-all",
                maxPrice === b.value
                  ? "border-ink bg-ink text-background"
                  : "border-border bg-background text-ink/75 hover:border-ink/30 hover:bg-secondary",
              )}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <Button variant="ghost" onClick={reset} className="px-0 text-sm underline underline-offset-4">
        {c.clearFilters}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-[74px]">
        <div className="border-b border-border bg-sand">
          <div className="mx-auto max-w-[1240px] px-5 py-7 sm:px-8">
            <h1 className="font-display text-2xl leading-tight font-medium sm:text-3xl">
              {c.searchTitle} {params.q ?? "Zadar"}
            </h1>
            <div className="mt-5">
              <SearchComposer
                value={composer}
                onChange={setComposer}
                variant="compact"
                onSubmit={(v) =>
                  navigate({
                    to: localizedPath("/search", locale) as never,
                    search: { q: v.q, date: v.date, guests: v.guests, trip: v.trip } as never,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[16rem_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28">{FilterControls}</div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground" aria-live="polite">
                <span className="font-medium text-ink">{results.length}</span>{" "}
                {results.length === 1 ? c.boat : c.boats} {c.availableFor} {composer.guests}{" "}
                {composer.guests === 1 ? t("search.guest") : t("search.guestsLower")}
              </p>

              <div className="flex items-center gap-2">
                <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 lg:hidden">
                      <SlidersHorizontal className="h-4 w-4" /> {c.filters}
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="bottom"
                    className="max-h-[85dvh] overflow-y-auto rounded-t-2xl p-0 [&>button]:hidden"
                  >
                    <SheetTitle className="sr-only">{c.filters}</SheetTitle>
                    <div className="flex items-center justify-between border-b border-border px-5 py-4">
                      <span className="font-display text-lg">{c.filters}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={c.closeFilters}
                        onClick={() => setDrawerOpen(false)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="px-5 py-6">{FilterControls}</div>
                    <div className="sticky bottom-0 border-t border-border bg-background px-5 py-4">
                      <Button
                        variant="sun"
                        size="lg"
                        className="w-full"
                        onClick={() => setDrawerOpen(false)}
                      >
                        {c.show} {results.length} {results.length === 1 ? c.boat : c.boats}
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
                  <SelectTrigger className="h-9 w-[11.5rem]" aria-label={c.recommended}>
                    <SelectValue placeholder={c.recommended} />
                  </SelectTrigger>
                  <SelectContent>
                    {sorts.map((s) => (
                      <SelectItem key={s} value={s}>
                        {sortLabels[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {results.length > 0 ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((exp) => (
                  <ExperienceCard key={exp.slug} exp={exp} />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-border bg-sand/60 px-6 py-16 text-center">
                <h2 className="font-display text-2xl font-medium">{c.noMatch}</h2>
                <p className="mx-auto mt-3 max-w-sm leading-relaxed text-muted-foreground">
                  {c.noMatchText}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button variant="ink" onClick={reset}>
                    {c.clearFilters}
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="mailto:hello@marevo.example">{c.askTeam}</a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
