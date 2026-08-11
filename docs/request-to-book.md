# Request-to-book v1

## Runtime modes

- `VITE_REQUEST_MODE=demo`: the form completes locally. Guest details never leave the browser and nothing is stored.
- `VITE_REQUEST_MODE=live`: the form calls a same-origin TanStack server function. The server validates the payload, verifies the published experience and capacity, calculates the price snapshot from live inventory, then writes the request with a server-only Supabase secret.

The application defaults to demo mode.

## Security boundary

- Zod validates every value at the server-function boundary.
- TanStack Start applies same-origin protection to server functions when no custom `src/start.ts` is present.
- Supabase secret keys exist only in the server environment.
- Anonymous and authenticated Data API roles have no access to booking requests or request events.
- The browser never supplies operator IDs, database IDs, prices or status.
- A request token prevents accidental duplicate insertion.
- A honeypot rejects basic automated submissions.

Before public launch, add infrastructure-level rate limiting, transactional email delivery, retention/deletion rules, privacy copy and operator authentication.

## State model

`requested → accepted | declined | expired | cancelled`

Payment/deposit starts only after an operator accepts. This PR does not create a charge or claim real-time availability.
