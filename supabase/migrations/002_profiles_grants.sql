-- Fix table-level permissions for Supabase roles.
-- RLS policies alone are not enough; authenticated users also need GRANT access.

grant usage on schema public to postgres, anon, authenticated, service_role;

grant select, insert, update, delete on table public.profiles to authenticated;
grant all on table public.profiles to service_role;
