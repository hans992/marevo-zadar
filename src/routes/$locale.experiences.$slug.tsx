import { createFileRoute, notFound } from "@tanstack/react-router";
import { ExperienceDetail } from "./experiences.$slug";
import { getExperience, type Experience } from "@/data/inventory";
import { isLocale } from "@/i18n";
import { buildHead } from "@/lib/seo";
import { localizeExperience } from "@/i18n/content";
import { getStatusCopy } from "@/i18n/status";

export const Route = createFileRoute("/$locale/experiences/$slug")({
  loader: ({ params }): { exp: Experience } => {
    const exp = getExperience(params.slug);
    if (!exp) throw notFound();
    return { exp };
  },
  head: ({ loaderData, params }) => {
    const locale = isLocale(params.locale) ? params.locale : "en";
    if (!loaderData) {
      return {
        meta: [
          { title: `${getStatusCopy(locale).notFound} — Adriatic by Boat` },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const exp = localizeExperience(loaderData.exp, locale);
    return buildHead({
      path: `/experiences/${exp.slug}`,
      locale,
      title: `${exp.title} — Adriatic by Boat Zadar`,
      description: exp.summary,
      image: exp.images[0] as string,
    });
  },
  component: LocalizedExperiencePage,
});

function LocalizedExperiencePage() {
  return <ExperienceDetail exp={(Route.useLoaderData() as { exp: Experience }).exp} />;
}
