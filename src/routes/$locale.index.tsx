import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "./index";
import { isLocale } from "@/i18n";
import { buildHead, getSeoCopy } from "@/lib/seo";

export const Route = createFileRoute("/$locale/")({
  head: ({ params }) => {
    const locale = isLocale(params.locale) ? params.locale : "en";
    const seo = getSeoCopy(locale);
    return buildHead({
      path: "/",
      locale,
      title: seo.homeTitle,
      description: seo.homeDescription,
    });
  },
  component: HomePage,
});
