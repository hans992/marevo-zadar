import type { Experience } from "@/data/inventory";
import { locales, localizedPath, type Locale } from "@/i18n";

export const SITE_URL = "https://marevo-zadar.vercel.app";

const seoCopy: Record<
  Locale,
  { homeTitle: string; homeDescription: string; searchTitle: string; searchDescription: string }
> = {
  en: {
    homeTitle: "MAREVO — Boat rentals & experiences in Zadar",
    homeDescription:
      "Private boats, island tours and sunset sailing from Zadar with handpicked local operators.",
    searchTitle: "Find boats in Zadar — MAREVO",
    searchDescription: "Browse private boat tours, rentals and sunset sailing around Zadar.",
  },
  hr: {
    homeTitle: "MAREVO — Najam brodova i izleti u Zadru",
    homeDescription:
      "Privatni brodovi, otočne ture i plovidbe u zalazak sunca iz Zadra s pažljivo odabranim lokalnim operaterima.",
    searchTitle: "Pronađite brod u Zadru — MAREVO",
    searchDescription: "Istražite privatne ture, najam brodova i izlete u zalazak sunca oko Zadra.",
  },
  sl: {
    homeTitle: "MAREVO — Najem plovil in doživetja v Zadru",
    homeDescription:
      "Zasebna plovila, otoški izleti in plovbe ob sončnem zahodu iz Zadra z izbranimi lokalnimi ponudniki.",
    searchTitle: "Poiščite plovilo v Zadru — MAREVO",
    searchDescription:
      "Odkrijte zasebne izlete, najem plovil in plovbe ob sončnem zahodu okoli Zadra.",
  },
  de: {
    homeTitle: "MAREVO — Bootsverleih und Erlebnisse in Zadar",
    homeDescription:
      "Private Boote, Inseltouren und Sonnenuntergangsfahrten ab Zadar mit ausgewählten lokalen Anbietern.",
    searchTitle: "Boote in Zadar finden — MAREVO",
    searchDescription:
      "Entdecken Sie private Bootstouren, Vermietungen und Sonnenuntergangsfahrten rund um Zadar.",
  },
  pl: {
    homeTitle: "MAREVO — Wynajem łodzi i atrakcje w Zadarze",
    homeDescription:
      "Prywatne łodzie, wycieczki na wyspy i rejsy o zachodzie słońca z Zadaru od wybranych lokalnych operatorów.",
    searchTitle: "Znajdź łódź w Zadarze — MAREVO",
    searchDescription:
      "Przeglądaj prywatne wycieczki, wynajem łodzi i rejsy o zachodzie słońca w okolicy Zadaru.",
  },
  hu: {
    homeTitle: "MAREVO — Hajóbérlés és élmények Zadarban",
    homeDescription:
      "Privát hajók, szigettúrák és naplementés hajózások Zadarból, válogatott helyi szolgáltatókkal.",
    searchTitle: "Hajók Zadarban — MAREVO",
    searchDescription:
      "Fedezze fel a privát túrákat, hajóbérlést és naplementés programokat Zadar környékén.",
  },
  sk: {
    homeTitle: "MAREVO — Prenájom lodí a zážitky v Zadare",
    homeDescription:
      "Súkromné lode, ostrovné výlety a plavby pri západe slnka zo Zadaru od vybraných miestnych prevádzkovateľov.",
    searchTitle: "Nájdite loď v Zadare — MAREVO",
    searchDescription:
      "Objavte súkromné výlety, prenájom lodí a plavby pri západe slnka v okolí Zadaru.",
  },
  cs: {
    homeTitle: "MAREVO — Pronájem lodí a zážitky v Zadaru",
    homeDescription:
      "Soukromé lodě, ostrovní výlety a plavby při západu slunce ze Zadaru od vybraných místních provozovatelů.",
    searchTitle: "Najděte loď v Zadaru — MAREVO",
    searchDescription:
      "Objevte soukromé výlety, pronájem lodí a plavby při západu slunce v okolí Zadaru.",
  },
  fr: {
    homeTitle: "MAREVO — Location de bateaux et expériences à Zadar",
    homeDescription:
      "Bateaux privés, excursions dans les îles et sorties au coucher du soleil depuis Zadar avec des opérateurs locaux sélectionnés.",
    searchTitle: "Trouver un bateau à Zadar — MAREVO",
    searchDescription:
      "Découvrez les excursions privées, locations et sorties au coucher du soleil autour de Zadar.",
  },
  es: {
    homeTitle: "MAREVO — Alquiler de barcos y experiencias en Zadar",
    homeDescription:
      "Barcos privados, tours por las islas y salidas al atardecer desde Zadar con operadores locales seleccionados.",
    searchTitle: "Encuentra barcos en Zadar — MAREVO",
    searchDescription:
      "Descubre tours privados, alquileres y salidas al atardecer alrededor de Zadar.",
  },
};

export const getSeoCopy = (locale: Locale) => seoCopy[locale];

export function alternateLinks(pathname: string) {
  return [
    ...locales.map((locale) => ({
      rel: "alternate",
      hrefLang: locale,
      href: `${SITE_URL}${localizedPath(pathname, locale)}`,
    })),
    {
      rel: "alternate",
      hrefLang: "x-default",
      href: `${SITE_URL}${localizedPath(pathname, "en")}`,
    },
  ];
}

const marevoOrganization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "MAREVO",
  url: SITE_URL,
  description:
    "A focused marketplace concept for private boat rentals and curated boat experiences around Zadar, Croatia.",
  areaServed: {
    "@type": "City",
    name: "Zadar",
    addressCountry: "HR",
  },
};

export function homeStructuredData(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@graph": [
      marevoOrganization,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "MAREVO",
        description: "Private boat rentals and island experiences from Zadar, Croatia.",
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

export function experienceStructuredData(experience: Experience, locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: experience.title,
    description: experience.summary,
    url: `${SITE_URL}${localizedPath(`/experiences/${experience.slug}`, locale)}`,
    inLanguage: locale,
    image: experience.images,
    touristType: experience.category,
    itinerary: {
      "@type": "ItemList",
      itemListElement: experience.itinerary.map((step, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: step.title,
        description: step.text,
      })),
    },
    provider: marevoOrganization,
  };
}
