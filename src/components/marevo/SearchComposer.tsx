import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, MapPin, Minus, Plus, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type SearchState = { q: string; date: string; guests: number; trip: "private" | "shared" };

export const defaultSearch: SearchState = { q: "Zadar", date: "", guests: 4, trip: "private" };

export function formatDate(value: string) {
  if (!value) return "Any date";
  const d = new Date(`${value}T12:00:00`);
  if (Number.isNaN(d.getTime())) return "Any date";
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
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
  const [placeOpen, setPlaceOpen] = useState(false);
  const set = (patch: Partial<SearchState>) => onChange({ ...value, ...patch });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) return onSubmit(value);
    navigate({ to: "/search", search: { q: value.q, date: value.date, guests: value.guests, trip: value.trip } });
  };

  const compact = variant === "compact";

  return (
    <form
      onSubmit={submit}
      className={cn(
        "w-full rounded-xl border border-border bg-background",
        compact ? "shadow-soft" : "shadow-lift",
      )}
      aria-label="Search boats"
    >
      <div className={cn("grid gap-px bg-border", compact ? "sm:grid-cols-[1.1fr_1fr_1fr_auto]" : "lg:grid-cols-[1.2fr_1fr_1fr_1.1fr_auto]")}>
        {/* Where */}
        <Popover open={placeOpen} onOpenChange={setPlaceOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex flex-col items-start gap-0.5 rounded-t-xl bg-background px-5 py-3.5 text-left transition-colors hover:bg-secondary focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-sea sm:rounded-none sm:first:rounded-l-xl"
            >
              <span className="eyebrow text-muted-foreground">Where</span>
              <span className="flex items-center gap-1.5 text-[0.95rem] font-medium text-ink">
                <MapPin className="h-4 w-4 text-sea" aria-hidden="true" />
                {value.q || "Anywhere near Zadar"}
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
        <div className="relative flex flex-col items-start gap-0.5 bg-background px-5 py-3.5 transition-colors focus-within:bg-secondary/60 hover:bg-secondary">
          <Label htmlFor="search-date" className="eyebrow text-muted-foreground">
            Date
          </Label>
          <span className="flex items-center gap-1.5 text-[0.95rem] font-medium text-ink">
            <CalendarDays className="h-4 w-4 text-sea" aria-hidden="true" />
            {formatDate(value.date)}
          </span>
          <input
            id="search-date"
            type="date"
            value={value.date}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => set({ date: e.target.value })}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label="Trip date"
          />
        </div>

        {/* Guests */}
        <div className="flex items-center justify-between gap-2 bg-background px-5 py-3.5">
          <div className="flex flex-col gap-0.5">
            <span className="eyebrow text-muted-foreground" id="guests-label">
              Guests
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap text-[0.95rem] font-medium text-ink">
              <Users className="h-4 w-4 text-sea" aria-hidden="true" />
              {value.guests} {value.guests === 1 ? "guest" : "guests"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              aria-label="Remove one guest"
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
              aria-label="Add one guest"
              disabled={value.guests >= 12}
              onClick={() => set({ guests: Math.min(12, value.guests + 1) })}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Trip type */}
        <fieldset className={cn("flex flex-col gap-1.5 bg-background px-5 py-3.5", compact && "hidden")}>
          <legend className="eyebrow text-muted-foreground">Trip type</legend>
          <div className="flex rounded-md border border-border p-0.5">
            {(["private", "shared"] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={value.trip === t}
                onClick={() => set({ trip: t })}
                className={cn(
                  "flex-1 rounded-[5px] px-3 py-1.5 text-sm capitalize transition-colors",
                  value.trip === t ? "bg-ink text-background" : "text-ink/70 hover:bg-secondary",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="bg-background p-2.5">
          <Button type="submit" variant="sun" size={compact ? "default" : "xl"} className="h-full w-full min-w-[9rem] gap-2">
            <Search className="h-4 w-4" aria-hidden="true" />
            Find boats
          </Button>
        </div>
      </div>
    </form>
  );
}
