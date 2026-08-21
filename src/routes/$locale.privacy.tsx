import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPolicy } from "@/components/marketplace/PrivacyPolicy";
import { isLocale } from "@/i18n";
import { getPolicy } from "@/i18n/legal";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/$locale/privacy")({
  head: ({ params }) => {
    const locale = isLocale(params.locale) ? params.locale : "en";
    const policy = getPolicy(locale);
    return buildHead({
      path: "/privacy",
      locale,
      title: `${policy.title} — Adriatic by Boat`,
      description: policy.intro,
    });
  },
  component: PrivacyPolicy,
});
