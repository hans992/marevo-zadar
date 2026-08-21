import { createFileRoute } from "@tanstack/react-router";
import { SearchPage, validateBoatSearch } from "./search";
import { isLocale } from "@/i18n";
import { buildHead, getSeoCopy } from "@/lib/seo";

export const Route = createFileRoute("/$locale/search")({
  validateSearch: validateBoatSearch,
  head: ({ params }) => {
    const locale = isLocale(params.locale) ? params.locale : "en";
    const seo = getSeoCopy(locale);
    return buildHead({
      path: "/search",
      locale,
      title: seo.searchTitle,
      description: seo.searchDescription,
    });
  },
  component: LocalizedSearchPage,
});

function LocalizedSearchPage() {
  return <SearchPage params={Route.useSearch()} />;
}
