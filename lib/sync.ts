"use client";

// Cloud sync untuk progress tracker CyberMath.
// Model: satu tabel `tracker_progress` — 1 row per user, payload = seluruh ProgressMap.
// Prinsip:
//  - localStorage tetap sumber kebenaran lokal & fallback penuh saat belum login/belum dikonfigurasi.
//  - Login → pull row user → MERGE dengan lokal (max "done" per item menang, tanpa pernah un-check).
//  - Setiap saveProgress → push (upsert) ter-debounce ke Supabase.
//  - Semua error di-swallow + status tersedia untuk UI kecil (dot hijau/abu di tracker).

import type { ProgressMap } from "./storage";
import { getSupabase } from "./supabase";

export type SyncState = {
  configured: boolean; // env Supabase terpasang?
  signedIn: boolean; // ada session Supabase?
  email: string | null;
  status: "idle" | "syncing" | "error" | "offline";
  lastSyncAt: number | null;
};

let state: SyncState = {
  configured: false,
  signedIn: false,
  email: null,
  status: "idle",
  lastSyncAt: null,
};

const listeners = new Set<(s: SyncState) => void>();
let pushTimer: ReturnType<typeof setTimeout> | null = null;
let lastPayload: string | null = null;

export function getSyncState(): SyncState {
  return state;
}

export function onSyncState(fn: (s: SyncState) => void): () => void {
  listeners.add(fn);
  fn(state);
  return () => listeners.delete(fn);
}

function setState(patch: Partial<SyncState>) {
  state = { ...state, ...patch };
  listeners.forEach((fn) => fn(state));
}

// ------------------------------------------------------------
// Merge: union item "done" (max menang). Progress tidak pernah turun.
function mergeProgress(local: ProgressMap, remote: ProgressMap): ProgressMap {
  const merged: ProgressMap = JSON.parse(JSON.stringify(local));
  for (const cat of Object.keys(remote)) {
    merged[cat] = merged[cat] ?? {};
    for (const phase of Object.keys(remote[cat])) {
      merged[cat][phase] = merged[cat][phase] ?? {};
      for (const item of Object.keys(remote[cat][phase])) {
        if (remote[cat][phase][item]) merged[cat][phase][item] = true;
      }
    }
  }
  return merged;
}

// ------------------------------------------------------------
// Pull on login/restore: DB menang untuk item done; lokal tetap ada (di-merge).
export async function pullProgress(): Promise<ProgressMap | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data: userData } = await sb.auth.getUser();
    if (!userData.user) {
      setState({ signedIn: false, email: null });
      return null;
    }
    setState({ configured: true, signedIn: true, email: userData.user.email ?? null });
    const { data, error } = await sb
      .from("tracker_progress")
      .select("payload")
      .eq("user_id", userData.user.id)
      .maybeSingle();
    if (error) {
      setState({ status: "error" });
      return null;
    }
    setState({ status: "idle", lastSyncAt: Date.now() });
    return (data?.payload as ProgressMap) ?? null;
  } catch {
    setState({ status: "offline" });
    return null;
  }
}

// ------------------------------------------------------------
// Push ter-debounce (dipanggil dari saveProgress).
export function queuePushProgress(next: ProgressMap) {
  const sb = getSupabase();
  if (!sb || !state.signedIn) return;
  const serialized = JSON.stringify(next);
  if (serialized === lastPayload) return; // tidak ada perubahan sejak sync terakhir
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    void pushNow(next);
  }, 800);
}

async function pushNow(next: ProgressMap) {
  const sb = getSupabase();
  if (!sb) return;
  try {
    setState({ status: "syncing" });
    const { data: userData } = await sb.auth.getUser();
    if (!userData.user) {
      setState({ status: "error", signedIn: false });
      return;
    }
    const payload = JSON.stringify(next);
    lastPayload = payload;
    const { error } = await sb
      .from("tracker_progress")
      .upsert(
        { user_id: userData.user.id, payload: next },
        { onConflict: "user_id" }
      );
    setState({ status: error ? "error" : "idle", lastSyncAt: error ? state.lastSyncAt : Date.now() });
  } catch {
    setState({ status: "offline" });
  }
}

// ------------------------------------------------------------
// Auth helpers untuk UI kecil di tracker
export async function signInWithPassword(email: string, password: string): Promise<string | null> {
  const sb = getSupabase();
  if (!sb) return "Sync belum dikonfigurasi";
  try {
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    setState({ configured: true, signedIn: true, email, status: "idle" });
    lastPayload = null; // paksa push berikutnya
    return null;
  } catch {
    return "Gagal terhubung";
  }
}

export async function signOutSync() {
  const sb = getSupabase();
  if (!sb) return;
  try {
    await sb.auth.signOut();
  } finally {
    setState({ signedIn: false, email: null, status: "idle" });
    lastPayload = null;
  }
}

export async function signUpWithPassword(email: string, password: string): Promise<string | null> {
  const sb = getSupabase();
  if (!sb) return "Sync belum dikonfigurasi";
  try {
    const { error } = await sb.auth.signUp({ email, password });
    if (error) return error.message;
    return null; // konfirmasi email tergantung setting project
  } catch {
    return "Gagal terhubung";
  }
}

export { mergeProgress };
