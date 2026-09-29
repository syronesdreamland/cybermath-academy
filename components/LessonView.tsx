"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock,
  FlaskConical,
  Target,
  XCircle,
} from "lucide-react";
import { type Lesson, type QuizQ } from "@/lib/lessons";

const DONE_KEY = "cyberMathLessonsDone.v1";

function loadDone(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(DONE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveDone(map: Record<string, boolean>) {
  try {
    localStorage.setItem(DONE_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

function QuizBlock({ quiz, onAllCorrect }: { quiz: QuizQ[]; onAllCorrect: () => void }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredAll = Object.keys(answers).length === quiz.length;
  const score = useMemo(
    () => quiz.reduce((a, q, i) => a + (answers[i] === q.answer ? 1 : 0), 0),
    [answers, quiz]
  );

  const submit = () => {
    setSubmitted(true);
    if (quiz.every((q, i) => answers[i] === q.answer)) onAllCorrect();
  };

  return (
    <div className="space-y-4">
      {quiz.map((q, qi) => (
        <div key={qi} className="bg-white border border-line rounded-2xl shadow-card p-5">
          <div className="font-bold mb-3">
            <span className="text-[#c2410c] mr-2">{qi + 1}.</span>
            {q.q}
          </div>
          <div className="flex flex-col gap-2">
            {q.options.map((opt, oi) => {
              const picked = answers[qi] === oi;
              const isCorrect = oi === q.answer;
              let cls =
                "text-left border border-line rounded-xl px-4 py-2.5 text-sm transition-colors ";
              if (!submitted) {
                cls += picked
                  ? "border-[#c2410c] bg-orange-50 font-semibold"
                  : "hover:bg-[#f7f8fa] cursor-pointer";
              } else {
                if (isCorrect) cls += "border-green-500 bg-green-50 font-semibold";
                else if (picked) cls += "border-red-400 bg-red-50";
                else cls += "opacity-60";
              }
              return (
                <button
                  key={oi}
                  type="button"
                  disabled={submitted}
                  className={cls}
                  onClick={() => setAnswers((p) => ({ ...p, [qi]: oi }))}
                >
                  <span className="inline-flex items-center gap-2">
                    {submitted && isCorrect && <CheckCircle2 size={15} className="text-green-600" />}
                    {submitted && picked && !isCorrect && (
                      <XCircle size={15} className="text-red-500" />
                    )}
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>
          {submitted && (
            <p className="mt-3 text-sm text-soft bg-[#f7f8fa] border border-line rounded-xl px-4 py-3">
              <b>Kenapa:</b> {q.why}
            </p>
          )}
        </div>
      ))}

      {!submitted ? (
        <button
          type="button"
          disabled={!answeredAll}
          onClick={submit}
          className="w-full rounded-2xl px-5 py-3 font-bold text-white bg-[#c2410c] hover:bg-[#9a3412] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {answeredAll ? "Kumpulkan jawaban" : `Jawab semua soal dulu (${Object.keys(answers).length}/${quiz.length})`}
        </button>
      ) : (
        <div className="bg-white border border-line rounded-2xl shadow-card p-5 text-center">
          <div className="text-3xl font-extrabold">
            {score}/{quiz.length}
          </div>
          {score === quiz.length ? (
            <p className="mt-1 font-bold text-green-600">
              Sempurna — lesson ini ditandai selesai ✅ Lanjut materi berikutnya!
            </p>
          ) : (
            <p className="mt-1 text-soft">
              Baca ulang penjelasan di atas, lalu{" "}
              <button
                type="button"
                className="underline font-semibold text-[#c2410c]"
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
              >
                coba lagi
              </button>{" "}
              sampai paham. Ujian aslinya pakai pool soal acak — pahami konsepnya.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function LessonView({
  lesson,
  doneMap: initialDone,
}: {
  lesson: Lesson;
  doneMap?: Record<string, boolean>;
}) {
  const [done, setDone] = useState<Record<string, boolean>>(initialDone ?? {});
  useEffect(() => {
    setDone(loadDone());
  }, []);
  const isDone = !!done[lesson.slug];

  const markDone = () => {
    const next = { ...done, [lesson.slug]: true };
    setDone(next);
    saveDone(next);
  };

  // nav prev/next by order in ALL_LESSONS
  const idx = ALL_LESSONS_INDEX.findIndex((s) => s === lesson.slug);
  const prev = idx > 0 ? ALL_LESSONS_INDEX[idx - 1] : null;
  const next = idx >= 0 && idx < ALL_LESSONS_INDEX.length - 1 ? ALL_LESSONS_INDEX[idx + 1] : null;

  return (
    <div className="max-w-3xl mx-auto px-5 py-8">
      {/* header */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <Link href="/aws" className="source-link">
          <ArrowLeft size={15} /> Kembali ke tracker AWS
        </Link>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c2410c] bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
          <Clock size={13} /> {lesson.minutes} menit
        </span>
      </div>

      <span className="eyebrow text-[#c2410c]">Materi Internal</span>
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 mb-4 flex items-start gap-3">
        <BookOpen size={30} className="mt-1.5 shrink-0 text-[#c2410c]" />
        {lesson.title}
      </h1>
      {lesson.source && (
        <p className="mb-4 text-xs text-muted">
          📚 Sumber belajar:{" "}
          <a
            href={lesson.source.url}
            target="_blank"
            rel="noopener"
            className="font-semibold underline hover:text-ink"
          >
            {lesson.source.label}
          </a>{" "}
          — materi ini tulisan ulangan internal, bukan salinan sumber.
        </p>
      )}

      {/* untuk apa */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-2 font-extrabold text-[#9a3412] mb-2">
          <Target size={17} /> Untuk apa materi ini?
        </div>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[#7c2d12]">
          {lesson.untukApa.map((u, i) => (
            <li key={i}>{u}</li>
          ))}
        </ul>
      </div>

      {/* sections */}
      <div className="space-y-6 mb-8">
        {lesson.sections.map((s, si) => (
          <section key={si} className="bg-white border border-line rounded-2xl shadow-card p-5">
            {s.h && <h2 className="font-extrabold text-lg mb-3">{s.h}</h2>}
            {s.p?.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-soft mb-3 last:mb-0">
                {p}
              </p>
            ))}
            {s.list && (
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-soft">
                {s.list.map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
            )}
            {s.table && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      {s.table.head.map((h, i) => (
                        <th
                          key={i}
                          className="text-left border border-line bg-[#f7f8fa] px-3 py-2 font-bold"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((r, ri) => (
                      <tr key={ri}>
                        {r.map((c, ci) => (
                          <td key={ci} className="border border-line px-3 py-2 align-top text-soft">
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {s.code && (
              <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-xs leading-relaxed">
                <code>{s.code}</code>
              </pre>
            )}
            {s.callout && (
              <div className="border-l-4 border-[#c2410c] bg-orange-50 rounded-r-xl px-4 py-3 text-sm text-[#7c2d12]">
                💡 {s.callout}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* lab */}
      {lesson.lab && (
        <section className="bg-white border border-line rounded-2xl shadow-card p-5 mb-8">
          <h2 className="font-extrabold text-lg mb-1 flex items-center gap-2">
            <FlaskConical size={18} className="text-[#c2410c]" /> {lesson.lab.title}
          </h2>
          {lesson.lab.intro && <p className="text-sm text-soft mb-3">{lesson.lab.intro}</p>}
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-soft">
            {lesson.lab.steps.map((st, i) => (
              <li key={i}>{st}</li>
            ))}
          </ol>
          {lesson.lab.hint && (
            <details className="mt-3 group">
              <summary className="cursor-pointer text-sm font-semibold text-[#c2410c] inline-flex items-center gap-1">
                Lihat petunjuk <ChevronDown size={14} className="group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm text-soft bg-[#f7f8fa] border border-line rounded-xl px-4 py-3">
                {lesson.lab.hint}
              </p>
            </details>
          )}
        </section>
      )}

      {/* quiz */}
      <section className="mb-10">
        <h2 className="font-extrabold text-lg mb-1">Cek Pemahaman</h2>
        <p className="text-sm text-soft mb-4">
          Pilih jawaban, kumpulkan, dan baca penjelasannya. Salah itu bagian dari belajar.
        </p>
        <QuizBlock quiz={lesson.quiz} onAllCorrect={markDone} />
      </section>

      {/* completion + nav */}
      <div className="flex items-center justify-between gap-3 flex-wrap border-t border-line pt-5">
        {isDone ? (
          <span className="inline-flex items-center gap-2 font-bold text-green-600">
            <CheckCircle2 size={18} /> Lesson selesai
          </span>
        ) : (
          <button
            type="button"
            onClick={markDone}
            className="btn-ghost inline-flex items-center gap-2"
          >
            <CheckCircle2 size={15} /> Tandai selesai (manual)
          </button>
        )}
        <div className="flex gap-2">
          {prev && (
            <Link href={`/lesson/${prev}`} className="btn-ghost">
              ← Sebelumnya
            </Link>
          )}
          {next && (
            <Link
              href={`/lesson/${next}`}
              className="rounded-xl px-4 py-2 text-sm font-bold text-white bg-[#c2410c] hover:bg-[#9a3412]"
            >
              Lanjut: {next.split("-").pop()} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// diisi oleh lessons.ts via side-effect import agar stabil di static export
import { ALL_LESSONS } from "@/lib/lessons";
const ALL_LESSONS_INDEX: string[] = ALL_LESSONS.map((l) => l.slug);
