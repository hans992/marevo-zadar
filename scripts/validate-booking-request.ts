import { bookingRequestSchema } from "../src/lib/booking-request";

const validRequest = {
  requestToken: "550e8400-e29b-41d4-a716-446655440000",
  experienceSlug: "kornati-private-escape",
  preferredDate: "2099-07-15",
  guests: 6,
  fullName: "Sophie Martin",
  email: "sophie@example.com",
  phone: "",
  message: "We would love several swim stops.",
  website: "",
};

const cases = [
  { name: "valid request", input: validRequest, expected: true },
  { name: "invalid email", input: { ...validRequest, email: "not-an-email" }, expected: false },
  { name: "zero guests", input: { ...validRequest, guests: 0 }, expected: false },
  { name: "invalid slug", input: { ...validRequest, experienceSlug: "../admin" }, expected: false },
  { name: "bot honeypot", input: { ...validRequest, website: "https://spam.example" }, expected: false },
];

const failures = cases.filter(
  ({ input, expected }) => bookingRequestSchema.safeParse(input).success !== expected,
);

if (failures.length) {
  for (const failure of failures) console.error(`Validation case failed: ${failure.name}`);
  process.exit(1);
}

console.log(`Validated ${cases.length} booking request contract cases.`);
