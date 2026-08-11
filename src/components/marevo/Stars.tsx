import { Star } from "lucide-react";

export function Stars({ rating, reviews, className = "" }: { rating: number; reviews: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[0.8rem] ${className}`}>
      <Star className="h-3.5 w-3.5 fill-sun text-sun" aria-hidden="true" />
      <span className="font-medium">{rating.toFixed(1)}</span>
      <span className="text-muted-foreground">({reviews})</span>
      <span className="sr-only">rating out of 5 from {reviews} reviews</span>
    </span>
  );
}
