import { createServerFn } from "@tanstack/react-start";
import {
  bookingRequestSchema,
  type BookingRequestResult,
} from "./booking-request";
import { persistBookingRequest } from "./booking-request.server";

export const submitBookingRequest = createServerFn({ method: "POST" })
  .validator(bookingRequestSchema)
  .handler(async ({ data }): Promise<BookingRequestResult> => {
    return persistBookingRequest(data);
  });
