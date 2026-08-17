import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/marketplace/Header";
import { Footer } from "@/components/marketplace/Footer";
import { StructuredData } from "@/components/marketplace/StructuredData";
import { alternateLinks, getSeoCopy, homeStructuredData, SITE_URL } from "@/lib/seo";
import { Hero } from "@/components/marketplace/home/Hero";
import { Featured } from "@/components/marketplace/home/Featured";
import {
  Categories,
  Destinations,
  EmailCapture,
  Faq,
  HowItWorks,
  MatchTeaser,
  Operators,
  Reviews,
} from "@/components/marketplace/home/Sections";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/")({
  head: () => {
    const seo = getSeoCopy("en");
    return {
      meta: [
        { title: seo.homeTitle },
        { name: "description", content: seo.homeDescription },
        { property: "og:title", content: "Adriatic by Boat — Boat rentals & experiences in Zadar" },
        {
          property: "og:description",
          content:
            "Private boats and unforgettable island experiences, handpicked by people who know Zadar.",
        },
        {
          property: "og:image",
          content:
            "https://images.unsplash.com/photo-1523496922380-91d5afba98a3?auto=format&fit=crop&w=1200&q=80",
        },
        {
          name: "twitter:image",
          content:
            "https://images.unsplash.com/photo-1523496922380-91d5afba98a3?auto=format&fit=crop&w=1200&q=80",
        },
        { property: "og:url", content: SITE_URL },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/` }, ...alternateLinks("/")],
    };
  },
  component: HomePage,
});

export function HomePage() {
  const { locale } = useI18n();
  return (
    <div className="min-h-screen bg-background">
      <Header overlay />
      <StructuredData data={homeStructuredData(locale)} />
      <main>
        <Hero />
        <Featured />
        <Categories />
        <Destinations />
        <MatchTeaser />
        <HowItWorks />
        <Operators />
        <Reviews />
        <Faq />
        <EmailCapture />
      </main>
      <Footer />
    </div>
  );
}
