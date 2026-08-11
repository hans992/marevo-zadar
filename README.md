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
bun run build
bun run test:smoke
```

The smoke test starts the production server and checks the homepage, search page and an experience detail route.

## Deployment

The app uses TanStack Start with Nitro output and includes a production start command for Vercel-compatible Node deployments:

```bash
bun run build
bun run start
```

## Stack

TanStack Start, React 19, TypeScript, Tailwind CSS 4, shadcn/ui and Nitro.
