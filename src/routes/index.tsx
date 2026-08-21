import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/marketplace/Header";
import { Footer } from "@/components/marketplace/Footer";
import { StructuredData } from "@/components/marketplace/StructuredData";
import { buildHead, getSeoCopy, homeStructuredData } from "@/lib/seo";
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
    return buildHead({
      path: "/",
      locale: "en",
      title: seo.homeTitle,
      description: seo.homeDescription,
    });
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
