# Request-to-book v1

This PR prepares persistence but does not connect the public form. The presentation flow remains local: guest details do not leave the browser and nothing is stored.

## Prepared live path

After explicit product and privacy approval, the public form can call the same-origin TanStack server function. The server contract is designed to:

1. validate the payload;
2. verify the published experience and capacity;
3. calculate the price snapshot from live inventory;
4. write the request using a server-only Supabase secret;
5. return a short request reference without taking payment.

## Security boundary

- Zod validates every value at the server-function boundary.
- TanStack Start applies same-origin protection to server functions when no custom `src/start.ts` is present.
- Supabase secret keys exist only in the server environment.
- Anonymous and authenticated Data API roles have no access to booking requests or request events.
- The browser must never supply operator IDs, database IDs, prices or status.
- A request token prevents accidental duplicate insertion.
- The input contract includes a honeypot for basic automated submissions.

Before activation, approve the data destination and privacy copy, then add infrastructure-level rate limiting, retention/deletion rules, transactional email delivery and operator authentication.

## State model

`requested → accepted | declined | expired | cancelled`

Payment/deposit starts only after an operator accepts. This PR does not create a charge or claim real-time availability.
