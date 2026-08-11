import type { BookingRequestInput, BookingRequestResult } from "./booking-request";

type ExperienceRow = {
  id: string;
  operator_id: string;
  capacity: number;
  price_cents: number;
  price_unit: "total" | "person";
  currency: string;
};

type BookingRequestRow = {
  id: string;
};

function getSupabaseConfig() {
  const url = process.env["SUPABASE_URL"]?.replace(/\/$/, "");
  const secretKey = process.env["SUPABASE_SECRET_KEY"] ?? process.env["SUPABASE_SERVICE_ROLE_KEY"];

  if (!url || !secretKey) {
    throw new Error("Request intake is not configured.");
  }

  return { url, secretKey };
}

function headers(secretKey: string, prefer?: string) {
  return {
    apikey: secretKey,
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

export async function persistBookingRequest(
  input: BookingRequestInput,
): Promise<BookingRequestResult> {
  if (input.website) {
    throw new Error("Request could not be accepted.");
  }

  const { url, secretKey } = getSupabaseConfig();
  const listingUrl = new URL(`${url}/rest/v1/experiences`);
  listingUrl.searchParams.set(
    "select",
    "id,operator_id,capacity,price_cents,price_unit,currency",
  );
  listingUrl.searchParams.set("slug", `eq.${input.experienceSlug}`);
  listingUrl.searchParams.set("status", "eq.published");
  listingUrl.searchParams.set("limit", "1");

  const listingResponse = await fetch(listingUrl, {
    headers: headers(secretKey),
  });

  if (!listingResponse.ok) {
    throw new Error("Request intake is temporarily unavailable.");
  }

  const listings = (await listingResponse.json()) as ExperienceRow[];
  const listing = listings[0];

  if (!listing) {
    throw new Error("This experience is not accepting requests.");
  }

  if (input.guests > listing.capacity) {
    throw new Error(`This boat accepts up to ${listing.capacity} guests.`);
  }

  const quotedAmount =
    listing.price_unit === "person"
      ? listing.price_cents * input.guests
      : listing.price_cents;

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1_000).toISOString();
  const rateLimitUrl = new URL(`${url}/rest/v1/booking_requests`);
  rateLimitUrl.searchParams.set("select", "id");
  rateLimitUrl.searchParams.set("email", `eq.${input.email.toLowerCase()}`);
  rateLimitUrl.searchParams.set("created_at", `gte.${oneHourAgo}`);
  rateLimitUrl.searchParams.set("limit", "5");

  const rateLimitResponse = await fetch(rateLimitUrl, {
    headers: headers(secretKey),
  });

  if (!rateLimitResponse.ok) {
    throw new Error("Request intake is temporarily unavailable.");
  }

  const recentRequests = (await rateLimitResponse.json()) as BookingRequestRow[];
  if (recentRequests.length >= 5) {
    throw new Error("Too many recent requests. Please try again later.");
  }

  const createResponse = await fetch(`${url}/rest/v1/booking_requests`, {
    method: "POST",
    headers: headers(secretKey, "return=representation"),
    body: JSON.stringify({
      request_token: input.requestToken,
      experience_id: listing.id,
      operator_id: listing.operator_id,
      preferred_date: input.preferredDate,
      guests: input.guests,
      full_name: input.fullName,
      email: input.email.toLowerCase(),
      phone: input.phone || null,
      message: input.message || null,
      quoted_amount_cents: quotedAmount,
      currency: listing.currency,
      source: "marevo_web",
      consent_at: new Date().toISOString(),
      privacy_version: "2026-08-11",
    }),
  });

  if (!createResponse.ok) {
    if (createResponse.status === 409) {
      throw new Error("This request was already received.");
    }
    throw new Error("We could not save your request. Please try again.");
  }

  const rows = (await createResponse.json()) as BookingRequestRow[];
  const request = rows[0];

  if (!request) {
    throw new Error("We could not verify your request.");
  }

  return {
    status: "received",
    reference: request.id.slice(0, 8).toUpperCase(),
  };
}
