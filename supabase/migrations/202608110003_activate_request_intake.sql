-- Activate Request-to-Book consent audit fields.

alter table public.booking_requests
  add column consent_at timestamptz,
  add column privacy_version text;

-- Existing environments should have no rows because the UI was previously disconnected.
-- The two-step constraint allows the migration to fail visibly if that assumption is wrong.
alter table public.booking_requests
  add constraint booking_requests_consent_required
  check (consent_at is not null and privacy_version is not null);

alter table public.booking_requests
  alter column consent_at set not null,
  alter column privacy_version set not null;
