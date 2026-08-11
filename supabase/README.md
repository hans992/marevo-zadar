# Supabase inventory

The migration in this directory defines MAREVO's live inventory contract. It is intentionally not connected to the runtime yet.

## Activation checklist

1. Create or choose the production Supabase project.
2. Link the project with the Supabase CLI.
3. Review and apply migrations in a preview environment first.
4. Import verified partner inventory as draft records.
5. Confirm image rights, prices, inclusions and operator consent.
6. Publish records only after the operator approves the listing.
7. Add server-side environment variables and replace the demo inventory adapter.

Do not expose the service-role key to the browser. Public catalogue reads are protected by row-level security. Operator contacts and availability notes have no public policies and remain server-only.
