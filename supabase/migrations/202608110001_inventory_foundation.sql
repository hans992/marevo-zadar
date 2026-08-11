-- MAREVO inventory foundation
-- Public catalogue data is intentionally separated from private operator data.
-- This migration creates no demo rows and does not enable public writes.

create extension if not exists pgcrypto;

create type public.operator_status as enum ('pending', 'active', 'suspended');
create type public.boat_status as enum ('draft', 'active', 'archived');
create type public.experience_status as enum ('draft', 'published', 'archived');
create type public.experience_category as enum ('private_tour', 'rental', 'shared_trip');
create type public.price_unit as enum ('total', 'person');

create table public.operators (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  display_name text not null check (char_length(display_name) between 2 and 100),
  role text,
  bio text,
  avatar_url text,
  response_minutes integer check (response_minutes is null or response_minutes > 0),
  status public.operator_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.operator_contacts (
  operator_id uuid primary key references public.operators(id) on delete cascade,
  email text,
  phone text,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (email is not null or phone is not null)
);

create table public.boats (
  id uuid primary key default gen_random_uuid(),
  operator_id uuid not null references public.operators(id) on delete restrict,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 2 and 100),
  boat_type text not null,
  length_m numeric(5,2) check (length_m is null or length_m > 0),
  engine text,
  capacity integer not null check (capacity > 0),
  amenities text[] not null default '{}',
  status public.boat_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  operator_id uuid not null references public.operators(id) on delete restrict,
  boat_id uuid not null references public.boats(id) on delete restrict,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 3 and 140),
  category public.experience_category not null,
  tags text[] not null default '{}',
  duration_minutes integer not null check (duration_minutes > 0),
  capacity integer not null check (capacity > 0),
  price_cents integer not null check (price_cents > 0),
  price_unit public.price_unit not null,
  currency char(3) not null default 'EUR' check (currency = upper(currency)),
  departure_location text not null,
  meeting_point text not null,
  badge text,
  summary text not null,
  description text[] not null check (cardinality(description) > 0),
  included text[] not null default '{}',
  not_included text[] not null default '{}',
  status public.experience_status not null default 'draft',
  featured_rank integer check (featured_rank is null or featured_rank >= 0),
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.experience_images (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.experiences(id) on delete cascade,
  url text not null,
  alt_text text not null,
  position integer not null default 0 check (position >= 0),
  created_at timestamptz not null default now(),
  unique (experience_id, position)
);

create table public.itinerary_steps (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.experiences(id) on delete cascade,
  time_label text,
  title text not null,
  description text not null,
  position integer not null default 0 check (position >= 0),
  created_at timestamptz not null default now(),
  unique (experience_id, position)
);

create table public.availability_blocks (
  id uuid primary key default gen_random_uuid(),
  boat_id uuid not null references public.boats(id) on delete cascade,
  experience_id uuid references public.experiences(id) on delete cascade,
  starts_on date not null,
  ends_on date not null,
  reason text,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_on >= starts_on)
);

create index boats_operator_id_idx on public.boats(operator_id);
create index experiences_operator_id_idx on public.experiences(operator_id);
create index experiences_boat_id_idx on public.experiences(boat_id);
create index experiences_status_featured_idx on public.experiences(status, featured_rank);
create index experience_images_experience_id_idx on public.experience_images(experience_id);
create index itinerary_steps_experience_id_idx on public.itinerary_steps(experience_id);
create index availability_blocks_boat_dates_idx on public.availability_blocks(boat_id, starts_on, ends_on);

create function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger operators_set_updated_at
before update on public.operators
for each row execute function public.set_updated_at();

create trigger operator_contacts_set_updated_at
before update on public.operator_contacts
for each row execute function public.set_updated_at();

create trigger boats_set_updated_at
before update on public.boats
for each row execute function public.set_updated_at();

create trigger experiences_set_updated_at
before update on public.experiences
for each row execute function public.set_updated_at();

create trigger availability_blocks_set_updated_at
before update on public.availability_blocks
for each row execute function public.set_updated_at();

alter table public.operators enable row level security;
alter table public.operator_contacts enable row level security;
alter table public.boats enable row level security;
alter table public.experiences enable row level security;
alter table public.experience_images enable row level security;
alter table public.itinerary_steps enable row level security;
alter table public.availability_blocks enable row level security;

create policy "public can read active operators"
on public.operators for select
to anon, authenticated
using (status = 'active');

create policy "public can read active boats"
on public.boats for select
to anon, authenticated
using (
  status = 'active'
  and exists (
    select 1 from public.operators
    where operators.id = boats.operator_id
      and operators.status = 'active'
  )
);

create policy "public can read published experiences"
on public.experiences for select
to anon, authenticated
using (
  status = 'published'
  and exists (
    select 1 from public.operators
    where operators.id = experiences.operator_id
      and operators.status = 'active'
  )
  and exists (
    select 1 from public.boats
    where boats.id = experiences.boat_id
      and boats.status = 'active'
  )
);

create policy "public can read published experience images"
on public.experience_images for select
to anon, authenticated
using (
  exists (
    select 1 from public.experiences
    where experiences.id = experience_images.experience_id
      and experiences.status = 'published'
  )
);

create policy "public can read published itineraries"
on public.itinerary_steps for select
to anon, authenticated
using (
  exists (
    select 1 from public.experiences
    where experiences.id = itinerary_steps.experience_id
      and experiences.status = 'published'
  )
);

grant select on public.operators, public.boats, public.experiences,
  public.experience_images, public.itinerary_steps to anon, authenticated;

revoke insert, update, delete on public.operators, public.boats, public.experiences,
  public.experience_images, public.itinerary_steps from anon, authenticated;

revoke all on public.operator_contacts, public.availability_blocks from anon, authenticated;
