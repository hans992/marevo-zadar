# MAREVO

**Zadar, from the sea.**

MAREVO is a focused marketplace concept for private boat rentals and curated boat experiences around Zadar, Croatia. The current release is a presentation-ready frontend prototype built around a request-to-book flow.

## Current scope

- Search by date, guests and trip type
- Curated experience results and filters
- Detailed boat, route and operator pages
- Request-to-book presentation flow
- Founding operator acquisition flow
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
bun run build
bun run test:smoke
```

The inventory and request checks validate demo fixtures and the Request-to-Book payload contract. The smoke test starts the production server and checks the homepage, search page and an experience detail route.

## Inventory foundation

The frontend reads through `src/data/inventory.ts`. It currently exposes the presentation dataset in `demo` mode. The versioned Supabase migration, publishing rules and partner intake template live in `supabase/` and `docs/`; no production database or invented live records are connected yet.

## Request-to-Book

The app defaults to local presentation mode. With `VITE_REQUEST_MODE=demo`, form details never leave the browser. The server-side Supabase persistence path is activated only after deploying the migrations and setting the variables documented in `.env.example`. No payment is taken by this flow.

## Deployment

The app uses TanStack Start with Nitro output and includes a production start command for Vercel-compatible Node deployments:

```bash
bun run build
bun run start
```

## Stack

TanStack Start, React 19, TypeScript, Tailwind CSS 4, shadcn/ui and Nitro.
