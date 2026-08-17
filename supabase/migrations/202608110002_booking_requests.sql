-- Request-to-book persistence
-- Guest contact data is private and only accessible to trusted server processes.

create type public.booking_request_status as enum (
  'requested',
  'accepted',
  'declined',
  'expired',
  'cancelled'
);

create table public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  request_token uuid not null unique,
  experience_id uuid not null references public.experiences(id) on delete restrict,
  operator_id uuid not null references public.operators(id) on delete restrict,
  preferred_date date not null,
  guests integer not null check (guests > 0),
  full_name text not null check (char_length(full_name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  phone text,
  message text check (message is null or char_length(message) <= 1000),
  quoted_amount_cents integer not null check (quoted_amount_cents > 0),
  currency char(3) not null default 'EUR' check (currency = upper(currency)),
  status public.booking_request_status not null default 'requested',
  source text not null default 'adriatic_by_boat_web',
  operator_response_note text,
  responded_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.booking_request_events (
  id uuid primary key default gen_random_uuid(),
  booking_request_id uuid not null references public.booking_requests(id) on delete cascade,
  from_status public.booking_request_status,
  to_status public.booking_request_status not null,
  actor text not null,
  note text,
  created_at timestamptz not null default now()
);

create index booking_requests_operator_status_idx
  on public.booking_requests(operator_id, status, created_at desc);
create index booking_requests_experience_date_idx
  on public.booking_requests(experience_id, preferred_date);
create index booking_request_events_request_idx
  on public.booking_request_events(booking_request_id, created_at);

create trigger booking_requests_set_updated_at
before update on public.booking_requests
for each row execute function public.set_updated_at();

alter table public.booking_requests enable row level security;
alter table public.booking_request_events enable row level security;

revoke all on public.booking_requests, public.booking_request_events from anon, authenticated;
grant all on public.booking_requests, public.booking_request_events to service_role;
