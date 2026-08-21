-- Move Request-to-Book intake into one atomic function.
--
-- The server previously made three round-trips: look up the listing, count
-- recent requests by email, then insert. That left two holes. Two submissions
-- arriving together both read the same count and both passed it, and the count
-- was keyed on the email address alone, so changing one character defeated it
-- entirely. Counting and inserting inside one transaction, under an advisory
-- lock, closes both.

-- A salted SHA-256 of the client address. Salted because the IPv4 space is
-- small enough to reverse an unsalted hash, and we only ever need to compare
-- one submission against another, never to recover the address.
alter table public.booking_requests
  add column ip_hash text check (ip_hash is null or ip_hash ~ '^[0-9a-f]{64}$');

create index booking_requests_email_recent_idx
  on public.booking_requests (lower(email), created_at desc);

create index booking_requests_ip_recent_idx
  on public.booking_requests (ip_hash, created_at desc)
  where ip_hash is not null;

create function public.create_booking_request(
  p_request_token uuid,
  p_experience_slug text,
  p_preferred_date date,
  p_guests integer,
  p_full_name text,
  p_email text,
  p_phone text,
  p_message text,
  p_source text,
  p_privacy_version text,
  p_ip_hash text
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_listing public.experiences%rowtype;
  v_email text := lower(btrim(p_email));
  v_amount integer;
  v_id uuid;
  v_window constant interval := interval '1 hour';
  v_email_limit constant integer := 5;
  v_ip_limit constant integer := 10;
begin
  select * into v_listing
  from public.experiences
  where slug = p_experience_slug
    and status = 'published';

  if not found then
    raise exception 'not_accepting' using errcode = 'P0001';
  end if;

  if p_guests > v_listing.capacity then
    raise exception 'capacity_exceeded:%', v_listing.capacity using errcode = 'P0001';
  end if;

  -- Held until this transaction ends, so a second submission from the same
  -- guest waits here rather than reading the count concurrently with the first.
  perform pg_advisory_xact_lock(hashtext('booking_request_email:' || v_email)::bigint);
  if p_ip_hash is not null then
    perform pg_advisory_xact_lock(hashtext('booking_request_ip:' || p_ip_hash)::bigint);
  end if;

  if (
    select count(*)
    from public.booking_requests
    where lower(email) = v_email
      and created_at >= now() - v_window
  ) >= v_email_limit then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  if p_ip_hash is not null and (
    select count(*)
    from public.booking_requests
    where ip_hash = p_ip_hash
      and created_at >= now() - v_window
  ) >= v_ip_limit then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  -- The price is snapshotted from the published listing, never from the client.
  v_amount := case
    when v_listing.price_unit = 'person' then v_listing.price_cents * p_guests
    else v_listing.price_cents
  end;

  insert into public.booking_requests (
    request_token,
    experience_id,
    operator_id,
    preferred_date,
    guests,
    full_name,
    email,
    phone,
    message,
    quoted_amount_cents,
    currency,
    source,
    consent_at,
    privacy_version,
    ip_hash
  ) values (
    p_request_token,
    v_listing.id,
    v_listing.operator_id,
    p_preferred_date,
    p_guests,
    btrim(p_full_name),
    v_email,
    nullif(btrim(p_phone), ''),
    nullif(btrim(p_message), ''),
    v_amount,
    v_listing.currency,
    p_source,
    now(),
    p_privacy_version,
    p_ip_hash
  )
  returning id into v_id;

  return v_id;
exception
  -- Only request_token is unique on this table, so this is a resubmission of a
  -- request we already stored.
  when unique_violation then
    raise exception 'duplicate' using errcode = 'P0001';
end;
$$;

revoke all on function public.create_booking_request(
  uuid, text, date, integer, text, text, text, text, text, text, text
) from public, anon, authenticated;

grant execute on function public.create_booking_request(
  uuid, text, date, integer, text, text, text, text, text, text, text
) to service_role;
