import { z } from "zod";

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date")
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  }, "Choose a valid date")
  .refine((value) => value >= new Date().toISOString().slice(0, 10), "Choose today or a future date");

export const bookingRequestSchema = z.object({
  requestToken: z.string().uuid(),
  experienceSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  preferredDate: isoDate,
  guests: z.number().int().min(1).max(50),
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40),
  message: z.string().trim().max(1_000),
  website: z.string().max(0),
});

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;

export type BookingRequestResult = {
  status: "received";
  reference: string;
};
