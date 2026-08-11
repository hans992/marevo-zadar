import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { ListYourBoatDialog } from "./ListYourBoatDialog";

const cols = [
  {
    title: "Explore",
    links: [
      { label: "All experiences", to: "/search" as const, search: undefined },
      { label: "Private tours", to: "/search" as const, search: { type: "private" } },
      { label: "Boat rentals", to: "/search" as const, search: { type: "rental" } },
      { label: "Sunset trips", to: "/search" as const, search: { type: "sunset" } },
    ],
  },
  {
    title: "Destinations",
    links: [
      { label: "Kornati", to: "/search" as const, search: { q: "Kornati" } },
      { label: "Dugi Otok", to: "/search" as const, search: { q: "Dugi Otok" } },
      { label: "Ugljan & Pašman", to: "/search" as const, search: { q: "Ugljan" } },
      { label: "Telašćica", to: "/search" as const, search: { q: "Telašćica" } },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-background/70">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              A small marketplace for boat days around Zadar, run by people who live on this coast.
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-sun" aria-hidden="true" /> Zadar, Croatia
            </p>
            <a
              href="mailto:hello@marevo.example"
              className="mt-2 inline-flex items-center gap-2 text-sm underline-offset-4 hover:text-background hover:underline"
            >
              <Mail className="h-4 w-4 text-sun" aria-hidden="true" /> hello@marevo.example
            </a>
          </div>

          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow font-sans text-background">{col.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} {...(l.search ? { search: l.search as never } : {})} className="underline-offset-4 hover:text-background hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="eyebrow font-sans text-background">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <ListYourBoatDialog>
                  <button className="underline-offset-4 hover:text-background hover:underline">List your boat</button>
                </ListYourBoatDialog>
              </li>
              <li>
                <Link to="/" hash="operators" className="underline-offset-4 hover:text-background hover:underline">
                  About MAREVO
                </Link>
              </li>
              <li>
                <Link to="/" hash="faq" className="underline-offset-4 hover:text-background hover:underline">
                  Help & FAQ
                </Link>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 underline-offset-4 hover:text-background hover:underline"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" /> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-background/15 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MAREVO. All rights reserved.</p>
          <p className="font-display text-sm tracking-wide text-background/85">Made in Zadar. Best enjoyed at sea.</p>
          <p className="flex gap-4">
            <span>Terms</span>
            <span>Privacy</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
