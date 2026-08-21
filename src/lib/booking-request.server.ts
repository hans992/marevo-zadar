import { getRequestIP } from "@tanstack/react-start/server";
import type { BookingRequestInput, BookingRequestResult } from "./booking-request";
import { BOOKING_SOURCE, PRIVACY_VERSION } from "./brand";
import { isRequestErrorCode, requestError, type RequestErrorCode } from "@/i18n/request-errors";

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

/**
 * A salted hash of the client address, used only to compare one submission
 * against another. Salted because the IPv4 space is small enough that an
 * unsalted hash is a reversible record of who visited.
 *
 * With no salt configured we store nothing rather than store something
 * reversible. The per-email limit still applies, and the warning says so.
 */
async function hashClientAddress(): Promise<string | null> {
  const address = getRequestIP({ xForwardedFor: true });
  if (!address) return null;

  const salt = process.env["REQUEST_IP_SALT"];
  if (!salt) {
    console.warn("REQUEST_IP_SALT is not set — per-address rate limiting is inactive.");
    return null;
  }

  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${salt}:${address}`),
  );

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function persistBookingRequest(
  input: BookingRequestInput,
): Promise<BookingRequestResult> {
  if (input.website) {
    reject("unavailable", "honeypot field was filled");
  }

  const { url, secretKey } = getSupabaseConfig();
  const ipHash = await hashClientAddress();

  // One call, one transaction. The listing lookup, capacity check, rate limit
  // and insert used to be three separate round-trips, so the count could be
  // read by two submissions before either of them had inserted.
  const response = await fetch(`${url}/rest/v1/rpc/create_booking_request`, {
    method: "POST",
    headers: {
      apikey: secretKey,
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      p_request_token: input.requestToken,
      p_experience_slug: input.experienceSlug,
      p_preferred_date: input.preferredDate,
      p_guests: input.guests,
      p_full_name: input.fullName,
      p_email: input.email,
      p_phone: input.phone,
      p_message: input.message,
      p_source: BOOKING_SOURCE,
      p_privacy_version: PRIVACY_VERSION,
      p_ip_hash: ipHash,
    }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: unknown } | null;
    const raised = typeof payload?.message === "string" ? payload.message : "";
    const [code = ""] = raised.split(":");

    // The function raises our own codes; anything else is a fault on our side.
    if (isRequestErrorCode(code)) {
      console.error(`Booking request rejected (${code}) by create_booking_request`);
      throw new Error(raised);
    }

    reject("unavailable", `create_booking_request returned ${response.status}: ${raised}`);
  }

  const id = (await response.json()) as unknown;

  if (typeof id !== "string" || id.length === 0) {
    reject("unavailable", "create_booking_request returned no id");
  }

  return {
    status: "received",
    reference: id.slice(0, 8).toUpperCase(),
  };
}
