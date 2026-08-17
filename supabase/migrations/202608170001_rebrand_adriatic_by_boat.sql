-- Keep existing booking history intact while applying the new public brand
-- to all requests created after the Adriatic by Boat launch.

alter table public.booking_requests
  alter column source set default 'adriatic_by_boat_web';
