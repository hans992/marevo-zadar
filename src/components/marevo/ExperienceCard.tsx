import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Clock, Heart, MapPin, Users } from "lucide-react";
import type { Experience } from "@/data/marevo";
import { Stars } from "./Stars";
import { cn } from "@/lib/utils";

export function ExperienceCard({ exp }: { exp: Experience }) {
  const [fav, setFav] = useState(false);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={exp.images[0]}
          alt={`${exp.title} — boat trip from Zadar`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {exp.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-background/95 px-2.5 py-1 text-[0.7rem] font-medium tracking-wide text-ink shadow-soft">
            {exp.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => setFav((f) => !f)}
          aria-pressed={fav}
          aria-label={fav ? `Remove ${exp.title} from favourites` : `Save ${exp.title} to favourites`}
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-ink transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
        >
          <Heart className={cn("h-4 w-4 transition-colors", fav ? "fill-sun text-sun" : "text-ink/70")} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow text-sea">{exp.category}</span>
          <Stars rating={exp.rating} reviews={exp.reviews} />
        </div>

        <h3 className="mt-2 text-xl leading-snug text-balance">
          <Link
            to="/experiences/$slug"
            params={{ slug: exp.slug }}
            className="after:absolute after:inset-0 focus-visible:outline-none group-focus-within:underline decoration-sun decoration-2 underline-offset-4 hover:underline"
          >
            {exp.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{exp.summary}</p>

        <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.8rem] text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {exp.duration}
          </li>
          <li className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" aria-hidden="true" /> Up to {exp.capacity}
          </li>
          <li className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {exp.location.replace("Departs ", "")}
          </li>
        </ul>

        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            from{" "}
            <span className="font-display text-2xl leading-none font-medium text-ink">€{exp.price}</span>{" "}
            {exp.priceUnit === "total" ? "total" : "per person"}
          </p>
          <span className="text-sm font-medium text-sea transition-transform group-hover:translate-x-0.5">View →</span>
        </div>
      </div>
    </article>
  );
}
