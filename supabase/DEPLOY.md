# Supabase Sync — CyberMath Academy

Progres tracker ter-sync lintas device via Supabase (Auth + Postgres + RLS).

## Arsitektur

- 1 tabel `public.tracker_progress`: `user_id uuid PK`, `payload jsonb`, `updated_at timestamptz`.
- 1 row per user — payload = seluruh `ProgressMap` (`{category → phaseId → itemId → done}`).
- RLS: user hanya boleh SELECT/INSERT/UPDATE/DELETE baris miliknya sendiri (`auth.uid() = user_id`).
- Merge policy: union item "done" (max menang) — progres tidak pernah turun saat merge antar device.
- localStorage tetap berfungsi sebagai cache + fallback penuh saat belum login.

## Setup (sekali, ± 5 menit)

1. Buat project gratis di https://supabase.com → catat **Project URL** & **anon public key**
   (Dashboard → Settings → API).
2. Dashboard → SQL Editor → jalankan isi `supabase/setup.sql` (bikin tabel + RLS + trigger).
3. Vercel → project `cybermath-masterpiece` → Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon key
   (add to Production + Preview), lalu redeploy.
4. (Opsional, disarankan) Dashboard → Authentication → Providers → Email:
   matikan "Confirm email" untuk pemakaian personal, biarkan ON jika mau verifikasi email.

Setelah redeploy, tombol **Sync** muncul di toolbar tiap track. Masuk sekali per device →
progres otomatis merge + push. Dot status: 🟢 sync aktif · 🟡 sedang push · 🔴 error · ⚪️ belum login.

## Keamanan

- anon key aman dipakai di browser — data dilindungi RLS, bukan oleh kerahasiaan key.
- Password akun dikelola Supabase Auth (bcrypt, rate-limited).
- Tanpa env Supabase, app jalan 100% seperti sebelumnya (tombol Sync tidak muncul).
