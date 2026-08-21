import type { BookingRequestInput, BookingRequestResult } from "./booking-request";
import { BOOKING_SOURCE, PRIVACY_VERSION } from "./brand";
import { requestError, type RequestErrorCode } from "@/i18n/request-errors";

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

/**
 * Rejects the request with a code the client can translate, while keeping the
 * reason we actually hit in the server log. A guest cannot act on "secret key
 * missing", but whoever is on call needs to see exactly that.
 */
function reject(code: RequestErrorCode, detail: string, argument?: string | number): never {
  console.error(`Booking request rejected (${code}): ${detail}`);
  throw new Error(requestError(code, argument));
}

function getSupabaseConfig() {
  const url = process.env["SUPABASE_URL"]?.replace(/\/$/, "");
  const secretKey = process.env["SUPABASE_SECRET_KEY"] ?? process.env["SUPABASE_SERVICE_ROLE_KEY"];

  if (!url || !secretKey) {
    reject("unavailable", "SUPABASE_URL or SUPABASE_SECRET_KEY is not configured");
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
    reject("unavailable", "honeypot field was filled");
  }

  const { url, secretKey } = getSupabaseConfig();
  const listingUrl = new URL(`${url}/rest/v1/experiences`);
  listingUrl.searchParams.set("select", "id,operator_id,capacity,price_cents,price_unit,currency");
  listingUrl.searchParams.set("slug", `eq.${input.experienceSlug}`);
  listingUrl.searchParams.set("status", "eq.published");
  listingUrl.searchParams.set("limit", "1");

  const listingResponse = await fetch(listingUrl, {
    headers: headers(secretKey),
  });

  if (!listingResponse.ok) {
    reject("unavailable", `experience lookup returned ${listingResponse.status}`);
  }

  const listings = (await listingResponse.json()) as ExperienceRow[];
  const listing = listings[0];

  if (!listing) {
    reject("not_accepting", `no published experience for slug ${input.experienceSlug}`);
  }

  if (input.guests > listing.capacity) {
    reject(
      "capacity_exceeded",
      `requested ${input.guests} guests, capacity ${listing.capacity}`,
      listing.capacity,
    );
  }

  const quotedAmount =
    listing.price_unit === "person" ? listing.price_cents * input.guests : listing.price_cents;

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
    reject("unavailable", `rate-limit lookup returned ${rateLimitResponse.status}`);
  }

  const recentRequests = (await rateLimitResponse.json()) as BookingRequestRow[];
  if (recentRequests.length >= 5) {
    reject("rate_limited", "five or more requests from this email in the last hour");
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
      source: BOOKING_SOURCE,
      consent_at: new Date().toISOString(),
      privacy_version: PRIVACY_VERSION,
    }),
  });

  if (!createResponse.ok) {
    if (createResponse.status === 409) {
      reject("duplicate", "request_token already exists");
    }
    reject("unavailable", `insert returned ${createResponse.status}`);
  }

  const rows = (await createResponse.json()) as BookingRequestRow[];
  const request = rows[0];

  if (!request) {
    reject("unavailable", "insert returned no representation row");
  }

  return {
    status: "received",
    reference: request.id.slice(0, 8).toUpperCase(),
  };
}
