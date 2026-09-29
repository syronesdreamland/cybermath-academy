"use client";

// Supabase client untuk sync progress lintas device.
// Return null saat env belum diset → app tetap jalan normal (localStorage only),
// partial deploy tidak pernah merusak tracker.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getSupabase(): SupabaseClient | null {
  if (!URL_ || !ANON) return null;
  if (!client) {
    try {
      client = createClient(URL_, ANON, {
        auth: { persistSession: true, autoRefreshToken: true },
      });
    } catch {
      return null;
    }
  }
  return client;
}

export function supabaseConfigured(): boolean {
  return !!(URL_ && ANON);
}
