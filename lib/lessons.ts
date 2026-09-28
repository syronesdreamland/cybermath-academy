import type { Lesson } from "./lesson-types";
import { AWS_M1 } from "./lessons-aws-1";

export type { Lesson, QuizQ, LessonSection } from "./lesson-types";

/** Semua lesson internal (hasil rewrite). Tambah modul baru di sini. */
export const ALL_LESSONS: Lesson[] = [...AWS_M1];

const bySlug = new Map<string, Lesson>();
const byTid = new Map<string, Lesson>();
for (const l of ALL_LESSONS) {
  bySlug.set(l.slug, l);
  byTid.set(l.tid, l);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return bySlug.get(slug);
}

export function getLessonByTid(tid: string): Lesson | undefined {
  return byTid.get(tid);
}

export function allLessonSlugs(): string[] {
  return ALL_LESSONS.map((l) => l.slug);
}
