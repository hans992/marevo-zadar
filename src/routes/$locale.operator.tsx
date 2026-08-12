import { createFileRoute } from "@tanstack/react-router";
import { OperatorWorkspace } from "./operator";
import { isLocale } from "@/i18n";
import { getOperatorCopy } from "@/i18n/operator";

export const Route = createFileRoute("/$locale/operator")({
  head: ({ params }) => {
    const locale = isLocale(params.locale) ? params.locale : "en";
    const c = getOperatorCopy(locale);
    return {
      meta: [
        { title: c.metaTitle },
        { name: "description", content: c.metaDescription },
        { name: "robots", content: "noindex,nofollow" },
      ],
    };
  },
  component: OperatorWorkspace,
});
