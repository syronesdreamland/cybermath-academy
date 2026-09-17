"use client";

const STORE_KEY = "cyberMathProgress.v2";

export type ProgressMap = Record<string, Record<string, Record<string, boolean>>>;
// category -> phaseId -> itemId -> done

export function loadProgress(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveProgress(state: ProgressMap) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function isDone(
  state: ProgressMap,
  category: string,
  phaseId: string,
  itemId: string
): boolean {
  return !!(state[category]?.[phaseId]?.[itemId]);
}

export function computeDone(
  state: ProgressMap,
  category: string,
  phaseId: string,
  total: number
): number {
  let done = 0;
  const map = state[category]?.[phaseId];
  if (map) done = Object.keys(map).length;
  return done;
}

export function categoryProgress(
  state: ProgressMap,
  category: string,
  phases: { id: string; items: unknown[] }[]
) {
  let done = 0;
  let total = 0;
  for (const p of phases) {
    total += p.items.length;
    done += computeDone(state, category, p.id, p.items.length);
  }
  return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
}
