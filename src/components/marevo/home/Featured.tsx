import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { experiences, filters, type FilterId } from "@/data/inventory";
import { ExperienceCard } from "../ExperienceCard";
import { cn } from "@/lib/utils";
import { localizedPath, useI18n } from "@/i18n";

export function Featured() {
  const [active, setActive] = useState<FilterId>("all");
  const { locale } = useI18n();

  const list = useMemo(
    () =>
      active === "all" ? experiences : experiences.filter((e) => e.tags.includes(active as never)),
    [active],
  );

  return (
    <section
      id="experiences"
      className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-sea">Featured this season</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight font-medium text-balance sm:text-4xl">
            The best of Zadar, by boat
          </h2>
        </div>
        <Button asChild variant="outline">
          <Link to={localizedPath("/search", locale) as never}>See all boats</Link>
        </Button>
      </div>

      <div role="group" aria-label="Filter experiences" className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={active === f.id}
            onClick={() => setActive(f.id)}
            className={cn(
              "rounded-md border px-4 py-2 text-sm transition-all duration-200",
              active === f.id
                ? "border-ink bg-ink text-background"
                : "border-border bg-background text-ink/75 hover:border-ink/30 hover:bg-secondary",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {list.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((exp) => (
            <ExperienceCard key={exp.slug} exp={exp} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Nothing in this category yet — try another filter.
        </p>
      )}
    </section>
  );
}
