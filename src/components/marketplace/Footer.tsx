import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { ListYourBoatDialog } from "./ListYourBoatDialog";
import { localizedPath, useI18n, type MessageKey } from "@/i18n";

const cols = [
  {
    title: "footer.explore" as MessageKey,
    links: [
      { label: "footer.allExperiences" as MessageKey, to: "/search", search: undefined },
      { label: "footer.privateTours" as MessageKey, to: "/search", search: { type: "private" } },
      { label: "footer.boatRentals" as MessageKey, to: "/search", search: { type: "rental" } },
      { label: "footer.sunsetTrips" as MessageKey, to: "/search", search: { type: "sunset" } },
    ],
  },
  {
    title: "footer.destinations" as MessageKey,
    links: [
      { label: "Kornati", to: "/search" as const, search: { q: "Kornati" } },
      { label: "Dugi Otok", to: "/search" as const, search: { q: "Dugi Otok" } },
      { label: "Ugljan & Pašman", to: "/search" as const, search: { q: "Ugljan" } },
      { label: "Telašćica", to: "/search" as const, search: { q: "Telašćica" } },
    ],
  },
];

export function Footer() {
  const { locale, t } = useI18n();

  return (
    <footer className="bg-ink text-background/70">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">{t("footer.about")}</p>
            <p className="mt-5 flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-sun" aria-hidden="true" /> {t("footer.location")}
            </p>
          </div>

          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow font-sans text-background">{t(col.title)}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={localizedPath(l.to, locale) as never}
                      {...(l.search ? { search: l.search as never } : {})}
                      className="underline-offset-4 hover:text-background hover:underline"
                    >
                      {l.label.startsWith("footer.") ? t(l.label as MessageKey) : l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="eyebrow font-sans text-background">{t("footer.company")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <ListYourBoatDialog>
                  <button className="underline-offset-4 hover:text-background hover:underline">
                    {t("nav.listBoat")}
                  </button>
                </ListYourBoatDialog>
              </li>
              <li>
                <Link
                  to={localizedPath("/operator", locale) as never}
                  className="underline-offset-4 hover:text-background hover:underline"
                >
                  {t("footer.operatorDemo")}
                </Link>
              </li>
              <li>
                <Link
                  to={localizedPath("/", locale) as never}
                  hash="operators"
                  className="underline-offset-4 hover:text-background hover:underline"
                >
                  {t("footer.aboutBrand")}
                </Link>
              </li>
              <li>
                <Link
                  to={localizedPath("/", locale) as never}
                  hash="faq"
                  className="underline-offset-4 hover:text-background hover:underline"
                >
                  {t("footer.helpFaq")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-background/15 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Adriatic by Boat. {t("footer.rights")}
          </p>
          <p className="font-display text-sm tracking-wide text-background/85">
            {t("footer.made")}
          </p>
          <p>{t("footer.prototype")}</p>
        </div>
      </div>
    </footer>
  );
}
