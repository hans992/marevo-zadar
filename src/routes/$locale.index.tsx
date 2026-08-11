import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "./index";
import { isLocale, localizedPath } from "@/i18n";
import { alternateLinks, getSeoCopy, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/$locale/")({
  head: ({ params }) => {
    const locale = isLocale(params.locale) ? params.locale : "en";
    const seo = getSeoCopy(locale);
    return {
      meta: [
        { title: seo.homeTitle },
        { name: "description", content: seo.homeDescription },
        { property: "og:title", content: seo.homeTitle },
        { property: "og:description", content: seo.homeDescription },
        { property: "og:locale", content: locale },
        { property: "og:url", content: `${SITE_URL}/${locale}` },
      ],
      links: [
        { rel: "canonical", href: `${SITE_URL}${localizedPath("/", locale)}` },
        ...alternateLinks("/"),
      ],
    };
  },
  component: HomePage,
});
