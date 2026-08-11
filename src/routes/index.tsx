import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/marevo/Header";
import { Footer } from "@/components/marevo/Footer";
import { StructuredData } from "@/components/marevo/StructuredData";
import { homeStructuredData, SITE_URL } from "@/lib/seo";
import { Hero } from "@/components/marevo/home/Hero";
import { Featured } from "@/components/marevo/home/Featured";
import {
  Categories,
  Destinations,
  EmailCapture,
  Faq,
  HowItWorks,
  MatchTeaser,
  Operators,
  Reviews,
} from "@/components/marevo/home/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAREVO — Boat rentals & experiences in Zadar" },
      {
        name: "description",
        content:
          "Private boats, island tours and sunset sailing from Zadar, Croatia. Handpicked local operators, no instant booking — the skipper confirms before you pay.",
      },
      { property: "og:title", content: "MAREVO — Boat rentals & experiences in Zadar" },
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
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: HomePage,
});

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header overlay />
      <StructuredData data={homeStructuredData} />
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
