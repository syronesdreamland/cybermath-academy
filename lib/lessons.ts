import type { Lesson } from "./lesson-types";
import { AWS_M1 } from "./lessons-aws-1";
import { SQLI_LESSONS } from "./lessons-sqli";
import { AUTH_LESSONS } from "./lessons-auth";
import { ACL_LESSONS } from "./lessons-acl";
import { XSS_LESSONS } from "./lessons-xss";
import { PYTHON_LESSONS } from "./lessons-python";

export type { Lesson, QuizQ, LessonSection } from "./lesson-types";

/** Semua lesson internal (hasil rewrite). Tambah modul baru di sini. */
export const ALL_LESSONS: Lesson[] = [
  ...AWS_M1,
  ...SQLI_LESSONS,
  ...AUTH_LESSONS,
  ...ACL_LESSONS,
  ...XSS_LESSONS,
  ...PYTHON_LESSONS,
];

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
  // Access control
  [/lab-unprotected-admin-functionality/, "ps-acl-admin-unprotected"],
  [/lab-user-role-controlled-by-request-parameter/, "ps-acl-role-param"],
  [/lab-user-id-controlled-by-request-parameter/, "ps-acl-idor"],
  [/lab-url-based-access-control-can-be-circumvented/, "ps-acl-url-bypass"],
  [/portswigger\.net\/web-security\/access-control\/?$/, "ps-acl-main"],
  // XSS
  [/reflected\/lab-html-context-nothing-encoded/, "ps-xss-reflected"],
  [/stored\/lab-html-context-nothing-encoded/, "ps-xss-stored"],
  [/dom-based\/lab-document-write-sink/, "ps-xss-dom"],
  [/dom-based\/lab-jquery-selector-hash-change-event/, "ps-xss-jquery"],
  [/cross-site-scripting\/reflected/, "ps-xss-reflected"],
  [/cross-site-scripting\/stored/, "ps-xss-stored"],
  [/cross-site-scripting\/dom-based/, "ps-xss-dom"],
  [/portswigger\.net\/web-security\/cross-site-scripting\/?$/, "ps-xss-main"],
  // Dicoding 86 — item tanpa lesson khusus (rangkuman dll) -> buka lesson terkait
  [/tutorials\/4758/, "py-08"],
  [/tutorials\/4759/, "py-09"],
  [/tutorials\/6416/, "py-18"],
  [/tutorials\/5084/, "py-21"],
  [/tutorials\/32958/, "py-24"],
  // Fase 12 — rangkuman per domain -> buka lesson domain terkait
  [/tutorials\/33278/, "py-36"],
  [/tutorials\/33298/, "py-37"],
  [/tutorials\/33353/, "py-39"],
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
