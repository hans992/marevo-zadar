import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, MapPin, Minus, Plus, Search, Users } from "lucide-react";
import { cs, de, enGB, es, fr, hr, hu, pl, sk, sl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { destinationBucket, guestBucket, trackEvent } from "@/lib/analytics";
import { guestNoun, localizedPath, useI18n, type Locale } from "@/i18n";

export type SearchState = { q: string; date: string; guests: number; trip: "private" | "shared" };

export const defaultSearch: SearchState = { q: "Zadar", date: "", guests: 4, trip: "private" };

const calendarLocales = { en: enGB, hr, sl, de, pl, hu, sk, cs, fr, es } as const;

export function formatDate(value: string, locale: Locale = "en", empty = "Any date") {
  if (!value) return empty;
  const d = new Date(`${value}T12:00:00`);
  if (Number.isNaN(d.getTime())) return empty;
  return d.toLocaleDateString(locale === "en" ? "en-GB" : locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

const places = ["Zadar", "Kornati", "Dugi Otok", "Ugljan", "Telašćica"];

export function SearchComposer({
  value,
  onChange,
  variant = "hero",
  onSubmit,
}: {
  value: SearchState;
  onChange: (next: SearchState) => void;
  variant?: "hero" | "compact";
  onSubmit?: (v: SearchState) => void;
}) {
  const navigate = useNavigate();
  const { locale, t } = useI18n();
  const [placeOpen, setPlaceOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const set = (patch: Partial<SearchState>) => onChange({ ...value, ...patch });

  const selectedDate = value.date ? new Date(`${value.date}T12:00:00`) : undefined;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("boat_search_submitted", {
      surface: variant === "compact" ? "search" : "hero",
      destination: destinationBucket(value.q),
      guest_bucket: guestBucket(value.guests),
      trip_type: value.trip,
      has_date: Boolean(value.date),
    });
    if (onSubmit) return onSubmit(value);
    navigate({
      to: localizedPath("/search", locale) as never,
      search: { q: value.q, date: value.date, guests: value.guests, trip: value.trip } as never,
    });
  };

  const compact = variant === "compact";

  return (
    <form
      onSubmit={submit}
      className={cn(
        "w-full rounded-xl border border-border bg-background",
        compact ? "shadow-soft" : "shadow-lift",
      )}
      aria-label={t("search.aria")}
    >
      <div
        className={cn(
          "grid gap-px bg-border",
          compact ? "sm:grid-cols-[1.1fr_1fr_1fr_auto]" : "lg:grid-cols-[1.2fr_1fr_1fr_1.1fr_auto]",
        )}
      >
        {/* Where */}
        <Popover open={placeOpen} onOpenChange={setPlaceOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex flex-col items-start gap-0.5 rounded-t-xl bg-background px-5 py-3.5 text-left transition-colors hover:bg-secondary focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-sea sm:rounded-none sm:first:rounded-l-xl"
            >
              <span className="eyebrow text-muted-foreground">{t("search.where")}</span>
              <span className="flex items-center gap-1.5 text-[0.95rem] font-medium text-ink">
                <MapPin className="h-4 w-4 text-sea" aria-hidden="true" />
                {value.q || t("search.anywhere")}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-60 p-1.5">
            {places.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  set({ q: p });
                  setPlaceOpen(false);
                }}
                className={cn(
                  "block w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-secondary",
                  value.q === p && "bg-secondary font-medium",
                )}
              >
                {p}
              </button>
            ))}
          </PopoverContent>
        </Popover>

        {/* Date */}
        <Popover open={dateOpen} onOpenChange={setDateOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label={`${t("search.tripDate")}: ${formatDate(value.date, locale, t("search.anyDate"))}`}
              className="flex flex-col items-start gap-0.5 bg-background px-5 py-3.5 text-left transition-colors hover:bg-secondary focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-sea"
            >
              <span className="eyebrow text-muted-foreground">{t("search.date")}</span>
              <span className="flex items-center gap-1.5 text-[0.95rem] font-medium text-ink">
                <CalendarDays className="h-4 w-4 text-sea" aria-hidden="true" />
                {formatDate(value.date, locale, t("search.anyDate"))}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar
              mode="single"
              locale={calendarLocales[locale]}
              labels={{
                labelNext: () => `${t("search.date")} →`,
                labelPrevious: () => `← ${t("search.date")}`,
                labelGrid: () => t("search.tripDate"),
                labelDayButton: (day) =>
                  day.toLocaleDateString(locale === "en" ? "en-GB" : locale, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }),
              }}
              selected={selectedDate}
              disabled={{ before: today }}
              onSelect={(date) => {
                if (!date) return;
                const nextDate = [
                  date.getFullYear(),
                  String(date.getMonth() + 1).padStart(2, "0"),
                  String(date.getDate()).padStart(2, "0"),
                ].join("-");
                set({ date: nextDate });
                setDateOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>

        {/* Guests */}
        <div className="flex items-start justify-between gap-2 bg-background px-5 py-3.5">
          <div className="flex flex-col gap-0.5">
            <span className="eyebrow text-muted-foreground" id="guests-label">
              {t("search.guests")}
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap text-[0.95rem] font-medium text-ink">
              <Users className="h-4 w-4 text-sea" aria-hidden="true" />
              {value.guests} {guestNoun(value.guests, locale)}
            </span>
          </div>
          <div className="flex self-end items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              aria-label={t("search.removeGuest")}
              disabled={value.guests <= 1}
              onClick={() => set({ guests: Math.max(1, value.guests - 1) })}
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              aria-label={t("search.addGuest")}
              disabled={value.guests >= 12}
              onClick={() => set({ guests: Math.min(12, value.guests + 1) })}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Trip type */}
        <div
          role="group"
          aria-labelledby="trip-type-label"
          className={cn("flex flex-col gap-0.5 bg-background px-5 py-3.5", compact && "hidden")}
        >
          <span id="trip-type-label" className="eyebrow text-muted-foreground">
            {t("search.tripType")}
          </span>
          <div className="flex h-8 items-stretch rounded-md border border-border p-0.5">
            {(["private", "shared"] as const).map((tripType) => (
              <button
                key={tripType}
                type="button"
                aria-pressed={value.trip === tripType}
                onClick={() => set({ trip: tripType })}
                className={cn(
                  "flex-1 rounded-[5px] px-3 text-sm leading-none capitalize transition-colors",
                  value.trip === tripType
                    ? "bg-ink text-background"
                    : "text-ink/70 hover:bg-secondary",
                )}
              >
                {tripType === "private" ? t("search.private") : t("search.shared")}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-background p-2.5">
          <Button
            type="submit"
            variant="sun"
            size={compact ? "default" : "xl"}
            className="h-full w-full min-w-[9rem] gap-2"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            {t("search.findBoats")}
          </Button>
        </div>
      </div>
    </form>
  );
}
