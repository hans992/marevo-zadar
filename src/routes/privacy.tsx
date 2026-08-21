import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPolicy } from "@/components/marketplace/PrivacyPolicy";
import { getPolicy } from "@/i18n/legal";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => {
    const policy = getPolicy("en");
    return buildHead({
      path: "/privacy",
      locale: "en",
      title: `${policy.title} — Adriatic by Boat`,
      description: policy.intro,
    });
  },
  component: PrivacyPolicy,
});
