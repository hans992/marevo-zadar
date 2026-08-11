import { createFileRoute } from "@tanstack/react-router";
import { SearchPage, validateBoatSearch } from "./search";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/$locale/search")({
  validateSearch: validateBoatSearch,
  head: ({ params }) => ({
    meta: [
      { title: "Find boats in Zadar — MAREVO" },
      {
        name: "description",
        content: "Browse private boat tours, rentals and sunset sailing around Zadar.",
      },
      { property: "og:locale", content: params.locale },
      { property: "og:url", content: `${SITE_URL}/${params.locale}/search` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/${params.locale}/search` }],
  }),
  component: LocalizedSearchPage,
});

function LocalizedSearchPage() {
  return <SearchPage params={Route.useSearch()} />;
}
