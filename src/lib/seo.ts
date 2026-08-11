import type { Experience } from "@/data/inventory";

export const SITE_URL = "https://marevo-zadar.vercel.app";

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

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    marevoOrganization,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "MAREVO",
      description: "Private boat rentals and island experiences from Zadar, Croatia.",
      inLanguage: "en",
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

export function experienceStructuredData(experience: Experience) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: experience.title,
    description: experience.summary,
    url: `${SITE_URL}/experiences/${experience.slug}`,
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
