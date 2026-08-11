import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Clock, Heart, MapPin, Users } from "lucide-react";
import type { Experience } from "@/data/inventory";
import { Stars } from "./Stars";
import { cn } from "@/lib/utils";
import { localizedPath, useI18n } from "@/i18n";
import { localizedBadge, localizedCategory, localizedDuration, localizedSummary, usePublicCopy } from "@/i18n/public";

export function ExperienceCard({ exp }: { exp: Experience }) {
  const [fav, setFav] = useState(false);
  const { locale } = useI18n();
  const c = usePublicCopy(locale);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={exp.images[0]}
          alt={`${exp.title} — boat trip from Zadar`}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {exp.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-background/95 px-2.5 py-1 text-[0.7rem] font-medium tracking-wide text-ink shadow-soft">
            {localizedBadge(exp.badge, c)}
          </span>
        )}
        <button
          type="button"
          onClick={() => setFav((f) => !f)}
          aria-pressed={fav}
          aria-label={fav ? `${c.remove} ${exp.title}` : `${c.save} ${exp.title}`}
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-ink transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
        >
          <Heart
            className={cn("h-4 w-4 transition-colors", fav ? "fill-sun text-sun" : "text-ink/70")}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow text-sea">{localizedCategory(exp.category, c)}</span>
          <Stars rating={exp.rating} reviews={exp.reviews} />
        </div>

        <h3 className="mt-2 text-xl leading-snug text-balance">
          <Link
            to={localizedPath(`/experiences/${exp.slug}`, locale) as never}
            className="after:absolute after:inset-0 focus-visible:outline-none group-focus-within:underline decoration-sun decoration-2 underline-offset-4 hover:underline"
          >
            {exp.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {localizedSummary(exp.category, locale)}
        </p>

        <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.8rem] text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />{" "}
            {localizedDuration(exp.durationHours, c)}
          </li>
          <li className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" aria-hidden="true" /> {c.upTo} {exp.capacity}
          </li>
          <li className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />{" "}
            {exp.location.replace("Departs ", "")}
          </li>
        </ul>

        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            {c.from}{" "}
            <span className="font-display text-2xl leading-none font-medium text-ink">
              €{exp.price}
            </span>{" "}
            {exp.priceUnit === "total" ? c.total : c.perPerson}
          </p>
          <span className="text-sm font-medium text-sea transition-transform group-hover:translate-x-0.5">
            {c.view} →
          </span>
        </div>
      </div>
    </article>
  );
}
