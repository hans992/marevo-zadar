# Request-to-book v1

The public form has two explicit modes:

- `demo` (default): completion happens locally and guest details never leave the browser.
- `live`: a consented submission calls a same-origin TanStack server function and stores a request in the configured Supabase project.

Set `VITE_REQUEST_MODE=live` only after all migrations and server-only environment variables are deployed.

## Live flow

1. The guest chooses a date and group size.
2. The guest enters contact details and explicitly consents to storage and operator sharing.
3. The server validates the payload and basic bot honeypot.
4. The server verifies that the experience is published and checks live capacity.
5. The quoted amount is calculated from the database, never from the browser.
6. A per-email hourly threshold rejects excessive repeated requests.
7. The request is stored with a consent timestamp, privacy version and unique request token.
8. The guest receives a short reference. No payment is taken.

## Security boundary

- Zod validates every value at the server-function boundary.
- TanStack Start applies same-origin protection to server functions when no custom `src/start.ts` is present.
- Supabase secret keys exist only in the server environment.
- Anonymous and authenticated Data API roles have no access to booking requests or request events.
- The browser never supplies operator IDs, database IDs, prices or status.
- A request token prevents accidental duplicate insertion.
- A honeypot and server-side request threshold reduce basic automated abuse.

Before broad public promotion, add infrastructure-level rate limiting, transactional email delivery, formal retention/deletion automation and operator authentication.

## State model

`requested → accepted | declined | expired | cancelled`

Payment/deposit starts only after an operator accepts. This flow does not create a charge or claim real-time availability.
