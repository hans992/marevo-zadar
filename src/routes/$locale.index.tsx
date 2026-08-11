import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "./index";
import { isLocale } from "@/i18n";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/$locale/")({
  head: ({ params }) => {
    const locale = isLocale(params.locale) ? params.locale : "en";
    return {
      meta: [
        { title: "MAREVO — Boat rentals & experiences in Zadar" },
        {
          name: "description",
          content:
            "Private boats, island tours and sunset sailing from Zadar with handpicked local operators.",
        },
        { property: "og:locale", content: locale },
        { property: "og:url", content: `${SITE_URL}/${locale}` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/${locale}` }],
    };
  },
  component: HomePage,
});
