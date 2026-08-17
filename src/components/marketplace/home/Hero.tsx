import { useState } from "react";
import { Anchor, MessageCircle, ShieldCheck } from "lucide-react";
import { SearchComposer, defaultSearch, type SearchState } from "../SearchComposer";
import { useI18n, type MessageKey } from "@/i18n";

const HERO =
  "https://images.unsplash.com/photo-1523496922380-91d5afba98a3?auto=format&fit=crop&w=2000&q=80";

const proof = [
  {
    icon: Anchor,
    title: "hero.local.title" as MessageKey,
    text: "hero.local.text" as MessageKey,
  },
  {
    icon: ShieldCheck,
    title: "hero.verified.title" as MessageKey,
    text: "hero.verified.text" as MessageKey,
  },
  {
    icon: MessageCircle,
    title: "hero.replies.title" as MessageKey,
    text: "hero.replies.text" as MessageKey,
  },
];

export function Hero() {
  const [search, setSearch] = useState<SearchState>(defaultSearch);
  const { t } = useI18n();

  return (
    <section className="relative">
      <div className="relative min-h-[86svh] overflow-hidden bg-ink lg:min-h-[92svh]">
        <img
          src={HERO}
          alt="A small boat anchored above clear turquoise water in the Zadar archipelago"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.267 0.043 223.7 / 0.62) 0%, oklch(0.267 0.043 223.7 / 0.22) 42%, oklch(0.267 0.043 223.7 / 0.72) 100%)",
          }}
        />

        <div className="relative mx-auto flex min-h-[86svh] max-w-[1240px] flex-col justify-end px-5 pt-28 pb-32 sm:px-8 lg:min-h-[92svh] lg:pb-40">
          <p className="eyebrow text-sun">{t("hero.eyebrow")}</p>
          <h1 className="mt-4 max-w-3xl font-display text-[2.6rem] leading-[1.02] font-medium text-balance text-background sm:text-6xl lg:text-[4.5rem]">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-background/85 sm:text-lg">
            {t("hero.subtitle")}
          </p>
          <p className="mt-6 font-display text-lg tracking-wide text-background/70 italic">
            {t("hero.tagline")}
          </p>
        </div>
      </div>

      {/* Search composer overlapping the hero edge */}
      <div className="relative z-10 mx-auto -mt-24 max-w-[1100px] px-5 sm:px-8 lg:-mt-16">
        <SearchComposer value={search} onChange={setSearch} />
        <p className="mt-3 px-1 text-center text-xs text-muted-foreground sm:text-left">
          {t("hero.assurance")}
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-[1240px] px-5 sm:px-8">
        <ul className="grid gap-8 border-y border-border py-8 sm:grid-cols-3">
          {proof.map((p) => (
            <li key={p.title} className="flex gap-3.5">
              <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-sea" aria-hidden="true" />
              <div>
                <h2 className="font-sans text-sm font-semibold tracking-tight text-ink">
                  {t(p.title)}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(p.text)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
