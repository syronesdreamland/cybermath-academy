-- ============================================================
-- CyberMath Academy — sync progress lintas device
-- 1 tabel, 1 row per user, payload = seluruh ProgressMap (jsonb)
-- Jalankan di: Supabase Dashboard → SQL Editor → New query
-- ============================================================

create extension if not exists pgcrypto;

-- 1) Tabel progres: satu baris per user
create table if not exists public.tracker_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

comment on table public.tracker_progress is
  'Progress tracker CyberMath: payload = seluruh ProgressMap {category -> phaseId -> itemId -> done}';

-- 2) Row Level Security: user hanya boleh lihat/tulis barisnya sendiri
alter table public.tracker_progress enable row level security;

drop policy if exists "select own progress" on public.tracker_progress;
create policy "select own progress"
  on public.tracker_progress for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "insert own progress" on public.tracker_progress;
create policy "insert own progress"
  on public.tracker_progress for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "update own progress" on public.tracker_progress;
create policy "update own progress"
  on public.tracker_progress for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "delete own progress" on public.tracker_progress;
create policy "delete own progress"
  on public.tracker_progress for delete
  to authenticated
  using (auth.uid() = user_id);

-- 3) updated_at otomatis
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tracker_progress_touch on public.tracker_progress;
create trigger tracker_progress_touch
  before update on public.tracker_progress
  for each row execute function public.touch_updated_at();

-- Verifikasi cepat (jalankan di SQL Editor):
--   select tablename, rowsecurity from pg_tables where tablename = 'tracker_progress';
--   select policyname, cmd from pg_policies where tablename = 'tracker_progress';
