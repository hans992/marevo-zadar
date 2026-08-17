import { Star } from "lucide-react";
import { useI18n } from "@/i18n";

const ratingLabel = {
  en: (reviews: number) => `rating out of 5 from ${reviews} reviews`,
  hr: (reviews: number) => `ocjena od 5 na temelju ${reviews} recenzija`,
  sl: (reviews: number) => `ocena od 5 na podlagi ${reviews} mnenj`,
  de: (reviews: number) => `Bewertung von 5 aus ${reviews} Rezensionen`,
  pl: (reviews: number) => `ocena na 5 na podstawie ${reviews} opinii`,
  hu: (reviews: number) => `5-ből kapott értékelés ${reviews} vélemény alapján`,
  sk: (reviews: number) => `hodnotenie z 5 na základe ${reviews} recenzií`,
  cs: (reviews: number) => `hodnocení z 5 na základě ${reviews} recenzí`,
  fr: (reviews: number) => `note sur 5 d’après ${reviews} avis`,
  es: (reviews: number) => `valoración sobre 5 basada en ${reviews} reseñas`,
} as const;

export function Stars({ rating, reviews, className = "" }: { rating: number; reviews: number; className?: string }) {
  const { locale } = useI18n();
  return (
    <span className={`inline-flex items-center gap-1 text-[0.8rem] ${className}`}>
      <Star className="h-3.5 w-3.5 fill-sun text-sun" aria-hidden="true" />
      <span className="font-medium">{rating.toFixed(1)}</span>
      <span className="text-muted-foreground">({reviews})</span>
      <span className="sr-only">{ratingLabel[locale](reviews)}</span>
    </span>
  );
}
