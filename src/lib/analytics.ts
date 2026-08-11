import { track } from "@vercel/analytics";

type GuestBucket = "1-2" | "3-5" | "6-8" | "9+";
type PriceBand = "under-400" | "400-699" | "700-plus";
type Destination = "zadar" | "kornati" | "dugi-otok" | "ugljan" | "telascica" | "other";

type AnalyticsEvents = {
  boat_search_submitted: {
    surface: "hero" | "search";
    destination: Destination;
    guest_bucket: GuestBucket;
    trip_type: "private" | "shared";
    has_date: boolean;
  };
  booking_request_opened: {
    experience_slug: string;
    mode: "demo" | "live";
    guest_bucket: GuestBucket;
    price_band: PriceBand;
  };
  booking_request_completed: {
    experience_slug: string;
    mode: "demo" | "live";
    guest_bucket: GuestBucket;
    price_band: PriceBand;
  };
  booking_request_failed: {
    experience_slug: string;
    stage: "validation" | "persistence";
  };
  operator_application_opened: {
    surface: "header" | "page";
  };
  operator_application_demo_completed: {
    surface: "header" | "page";
  };
  operator_demo_request_updated: {
    action: "accepted" | "declined";
  };
  newsletter_demo_completed: {
    surface: "homepage";
  };
};

export function guestBucket(guests: number): GuestBucket {
  if (guests <= 2) return "1-2";
  if (guests <= 5) return "3-5";
  if (guests <= 8) return "6-8";
  return "9+";
}

export function priceBand(amount: number): PriceBand {
  if (amount < 400) return "under-400";
  if (amount < 700) return "400-699";
  return "700-plus";
}

export function destinationBucket(value: string): Destination {
  const normalized = value.trim().toLowerCase();
  if (normalized === "zadar") return "zadar";
  if (normalized === "kornati") return "kornati";
  if (normalized === "dugi otok") return "dugi-otok";
  if (normalized === "ugljan") return "ugljan";
  if (normalized === "telašćica" || normalized === "telascica") return "telascica";
  return "other";
}

export function trackEvent<Name extends keyof AnalyticsEvents>(
  name: Name,
  properties: AnalyticsEvents[Name],
) {
  if (typeof window === "undefined") return;
  track(name, properties);
}
