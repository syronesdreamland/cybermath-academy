import type { Lesson } from "./lesson-types";
import { AWS_M1 } from "./lessons-aws-1";
import { SQLI_LESSONS } from "./lessons-sqli";
import { AUTH_LESSONS } from "./lessons-auth";

export type { Lesson, QuizQ, LessonSection } from "./lesson-types";

/** Semua lesson internal (hasil rewrite). Tambah modul baru di sini. */
export const ALL_LESSONS: Lesson[] = [...AWS_M1, ...SQLI_LESSONS, ...AUTH_LESSONS];

const bySlug = new Map<string, Lesson>();
const byTid = new Map<string, Lesson>();
for (const l of ALL_LESSONS) {
  bySlug.set(l.slug, l);
  byTid.set(l.tid, l);
}

/** Map eksplisit URL sumber (PortSwigger dll) -> tid lesson internal. */
const SOURCE_URL_TID: Array<[RegExp, string]> = [
  [/portswigger\.net\/web-security\/sql-injection\/cheat-sheet/, "ps-sqli-cheatsheet"],
  [/lab-retrieve-hidden-data|lab-login-bypass/, "ps-sqli-hidden-data"],
  [/sql-injection\/union-attacks/, "ps-sqli-union"],
  [/sql-injection\/examining-the-database/, "ps-sqli-examining-db"],
  [/sql-injection\/blind/, "ps-sqli-blind"],
  [/portswigger\.net\/web-security\/sql-injection/, "ps-sqli-main"],
  // Authentication
  [/auth-lab-usernames/, "ps-auth-enum-responses"],
  [/auth-lab-passwords/, "ps-auth-bruteforce-lab"],
  [/stay-logged-in-cookie/, "ps-auth-stayloggedin"],
  [/password-reset-broken-logic/, "ps-auth-reset-broken"],
  [/authentication\/password-based/, "ps-auth-bruteforce"],
  [/authentication\/other-mechanisms(?!\/lab)/, "ps-auth-stayloggedin"],
  [/authentication\/securing/, "ps-auth-secure"],
  [/portswigger\.net\/web-security\/authentication\/?$/, "ps-auth-main"],
];

export function getLessonBySourceUrl(url: string): Lesson | undefined {
  for (const [re, tid] of SOURCE_URL_TID) {
    if (re.test(url)) return byTid.get(tid);
  }
  return undefined;
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
