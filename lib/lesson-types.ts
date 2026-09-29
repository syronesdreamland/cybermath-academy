// Tipe untuk materi internal (hasil rewrite mentor, bukan salinan sumber).

export type QuizQ = {
  q: string;
  options: string[];
  /** index jawaban benar */
  answer: number;
  why: string;
};

export type LessonTable = {
  head: string[];
  rows: string[][];
};

export type LessonSection = {
  h?: string;
  p?: string[];
  list?: string[];
  table?: LessonTable;
  code?: string;
  callout?: string;
};

export type Lesson = {
  slug: string; // contoh: "aws-01-02"
  /** id tutorial sumber — dipakai untuk mapping link dari tracker */
  tid: string;
  title: string;
  minutes: number;
  /** Link sumber belajar (PortSwigger/Kaggle/docs resmi) — materi tetap tulisan ulangan internal */
  source?: { label: string; url: string };
  untukApa: string[];
  sections: LessonSection[];
  lab?: { title: string; intro?: string; steps: string[]; hint?: string };
  quiz: QuizQ[];
};
