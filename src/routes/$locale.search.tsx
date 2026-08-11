import { createFileRoute } from "@tanstack/react-router";
import { SearchPage, validateBoatSearch } from "./search";
import { isLocale, localizedPath } from "@/i18n";
import { alternateLinks, getSeoCopy, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/$locale/search")({
  validateSearch: validateBoatSearch,
  head: ({ params }) => {
    const locale = isLocale(params.locale) ? params.locale : "en";
    const seo = getSeoCopy(locale);
    return {
      meta: [
        { title: seo.searchTitle },
        { name: "description", content: seo.searchDescription },
        { property: "og:title", content: seo.searchTitle },
        { property: "og:description", content: seo.searchDescription },
        { property: "og:locale", content: params.locale },
        { property: "og:url", content: `${SITE_URL}/${params.locale}/search` },
      ],
      links: [
        { rel: "canonical", href: `${SITE_URL}${localizedPath("/search", locale)}` },
        ...alternateLinks("/search"),
      ],
    };
  },
  component: LocalizedSearchPage,
});

function LocalizedSearchPage() {
  return <SearchPage params={Route.useSearch()} />;
}
