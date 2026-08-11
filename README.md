# MAREVO

**Zadar, from the sea.**

MAREVO is a focused marketplace concept for private boat rentals and curated boat experiences around Zadar, Croatia. The current release is a presentation-ready frontend prototype built around a request-to-book flow.

## Current scope

- Search by date, guests and trip type
- Curated experience results and filters
- Detailed boat, route and operator pages
- Request-to-book presentation flow
- Founding operator acquisition flow
- Presentation-ready operator workspace at `/operator`
- Responsive desktop and mobile layouts

The inventory, reviews and operator profiles are demonstration content. Requests, newsletter signups and operator applications are not transmitted in this release. No payment or live availability is enabled yet.

## Development

Requirements: Bun and Node.js 20+.

```bash
bun install
bun run dev
```

## Validation

```bash
bun run lint
bun run typecheck
bun run inventory:validate
bun run request:validate
bun run seo:validate
bun run build
bun run test:smoke
```

The inventory and request checks validate demo fixtures and the Request-to-Book payload contract. The smoke test starts the production server and checks the homepage, search page and an experience detail route.

## Inventory foundation

The frontend reads through `src/data/inventory.ts`. It currently exposes the presentation dataset in `demo` mode. The versioned Supabase migration, publishing rules and partner intake template live in `supabase/` and `docs/`; no production database or invented live records are connected yet.

## Operator workspace

`/operator` is a responsive presentation prototype for requests, booking value, availability, fleet and experience management. Its sample guest requests and actions remain local demo data until operator authentication and private Supabase reads are implemented.

## Request-to-Book

The public form supports a consented live mode backed by a validated server-only Supabase persistence path. It remains a local presentation demo unless `VITE_REQUEST_MODE=live` and the server-only variables in `.env.example` are configured. Live submissions verify inventory and capacity on the server, store a price snapshot and take no payment.

## SEO and analytics

Public marketplace routes include canonical URLs, structured data, a sitemap, crawler policy and web-app manifest. Presentation-only `/operator` remains `noindex` and is excluded from the sitemap. Vercel Web Analytics is mounted at the application root; it begins collecting only after Analytics is enabled for the Vercel project.

## Deployment

The app uses TanStack Start with Nitro output and includes a production start command for Vercel-compatible Node deployments:

```bash
bun run build
bun run start
```

## Stack

TanStack Start, React 19, TypeScript, Tailwind CSS 4, shadcn/ui and Nitro.
