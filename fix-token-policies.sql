-- ============================================================
-- QUICK FIX: run this in your EXISTING Supabase project
-- (Dashboard -> SQL Editor -> New query -> paste -> Run)
-- This adds the missing permissions that were blocking "Generate code"
-- and delete/reset buttons in the Owner dashboard. It does not touch
-- any of your existing data.
-- ============================================================

drop policy if exists "public can insert tokens" on tokens;
create policy "public can insert tokens" on tokens
  for insert with check (true);

drop policy if exists "public can delete tokens" on tokens;
create policy "public can delete tokens" on tokens
  for delete using (true);

drop policy if exists "public can delete portfolios" on portfolios;
create policy "public can delete portfolios" on portfolios
  for delete using (true);

alter table portfolios add column if not exists font text not null default 'grotesk';
