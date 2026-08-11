import { createFileRoute, notFound } from "@tanstack/react-router";
import { ExperienceDetail } from "./experiences.$slug";
import { getExperience, type Experience } from "@/data/inventory";
import { isLocale, localizedPath } from "@/i18n";
import { alternateLinks, getSeoCopy, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/$locale/experiences/$slug")({
  loader: ({ params }): { exp: Experience } => {
    const exp = getExperience(params.slug);
    if (!exp) throw notFound();
    return { exp };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Trip not found — MAREVO" }] };
    const { exp } = loaderData;
    const locale = isLocale(params.locale) ? params.locale : "en";
    const seo = getSeoCopy(locale);
    return {
      meta: [
        { title: `${exp.title} — MAREVO Zadar` },
        { name: "description", content: `${exp.title}. ${seo.searchDescription}` },
        { property: "og:locale", content: params.locale },
        { property: "og:image", content: exp.images[0] as string },
        {
          property: "og:url",
          content: `${SITE_URL}/${params.locale}/experiences/${exp.slug}`,
        },
      ],
      links: [
        {
          rel: "canonical",
          href: `${SITE_URL}${localizedPath(`/experiences/${exp.slug}`, locale)}`,
        },
        ...alternateLinks(`/experiences/${exp.slug}`),
      ],
    };
  },
  component: LocalizedExperiencePage,
});

function LocalizedExperiencePage() {
  return <ExperienceDetail exp={(Route.useLoaderData() as { exp: Experience }).exp} />;
}
