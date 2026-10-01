"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import {
  ShieldCheck,
  Sigma,
  Crosshair,
  Cloud,
  Bug,
  KeyRound,
  Lock,
  FlaskConical,
  BrainCircuit,
  Dumbbell,
  FileCode2,
  ArrowRight,
} from "lucide-react";
import {
  CYBER_PHASES,
  MATH_PHASES,
  PENTEST_PHASES,
  AWS_PHASES,
  SQLI_PHASES,
  AUTH_PHASES,
  ACL_PHASES,
  XSS_PHASES,
  MLP_PHASES,
  DICODING_ML_PHASES,
  PYTHON_PHASES,
} from "@/lib/data";
import {
  loadProgress,
  categoryProgress,
  type ProgressMap,
} from "@/lib/storage";

export default function Home() {
  const [state, setState] = useState<ProgressMap>({});

  useEffect(() => {
    setState(loadProgress());
  }, []);

  const cyber = categoryProgress(state, "cyber", CYBER_PHASES);
  const math = categoryProgress(state, "math", MATH_PHASES);
  const pentest = categoryProgress(state, "pentest", PENTEST_PHASES);
  const aws = categoryProgress(state, "aws", AWS_PHASES);
  const sqli = categoryProgress(state, "sqli", SQLI_PHASES);
  const auth = categoryProgress(state, "auth", AUTH_PHASES);
  const acl = categoryProgress(state, "acl", ACL_PHASES);
  const xss = categoryProgress(state, "xss", XSS_PHASES);
  const ml = categoryProgress(state, "ml", DICODING_ML_PHASES);
  const mlp = categoryProgress(state, "mlp", MLP_PHASES);
  const py = categoryProgress(state, "python", PYTHON_PHASES);

  const cards: Array<{
    href: string;
    icon: ReactNode;
    accent: string;
    label: string;
    title: string;
    meta: { done: number; total: number; pct: number };
  }> = [
    { href: "/cyber", icon: <ShieldCheck size={28} />, accent: "cyber", label: "Cybersecurity", title: "90-Day Plan", meta: cyber },
    { href: "/math", icon: <Sigma size={28} />, accent: "math", label: "Mathematics", title: "Professor Dave", meta: math },
    { href: "/pentest", icon: <Crosshair size={28} />, accent: "pentest", label: "Pentest", title: "Problem-First Path", meta: pentest },
    { href: "/aws", icon: <Cloud size={28} />, accent: "aws", label: "AWS Cloud ☁️", title: "Dicoding — Dasar Cloud & Gen AI", meta: aws },
    { href: "/sqli", icon: <Bug size={28} />, accent: "sqli", label: "Web Security", title: "PortSwigger — SQL Injection", meta: sqli },
    { href: "/auth", icon: <KeyRound size={28} />, accent: "auth", label: "Web Security", title: "PortSwigger — Authentication", meta: auth },
    { href: "/acl", icon: <Lock size={28} />, accent: "acl", label: "Web Security", title: "PortSwigger — Access Control", meta: acl },
    { href: "/xss", icon: <FlaskConical size={28} />, accent: "xss", label: "Web Security", title: "PortSwigger — Cross-Site Scripting", meta: xss },
    { href: "/ml", icon: <BrainCircuit size={28} />, accent: "ml", label: "Machine Learning 🤖", title: "Dicoding — ML untuk Pemula", meta: ml },
    { href: "/mlp", icon: <Dumbbell size={28} />, accent: "mlp", label: "Machine Learning", title: "Practice — Kaggle Learn", meta: mlp },
    { href: "/python", icon: <FileCode2 size={28} />, accent: "py", label: "Programming 🐍", title: "Python — Dasar sampai Profesional", meta: py },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      {/* header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-line">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyber to-math grid place-items-center text-white">
              <Sigma size={18} />
            </div>
            <div>
              <div className="font-extrabold leading-none">
                CyberMath <span className="text-cyber">Academy</span>
              </div>
              <div className="text-xs text-muted">Structured Learning Tracker</div>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            <span className="pill pill--cyber">
              <ShieldCheck size={14} /> <b>{cyber.pct}%</b>
            </span>
            <span className="pill pill--math">
              <Sigma size={14} /> <b>{math.pct}%</b>
            </span>
            <span className="pill pill--pentest">
              <Crosshair size={14} /> <b>{pentest.pct}%</b>
            </span>
            <span className="pill pill--aws">
              <Cloud size={14} /> <b>{aws.pct}%</b>
            </span>
            <span className="pill pill--ml">
              <BrainCircuit size={14} /> <b>{ml.pct}%</b>
            </span>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="flex-1 flex items-center">
        <div className="max-w-5xl mx-auto px-5 py-16 w-full">
          <div className="flex flex-col items-center text-center">
            <span className="eyebrow hero-in hero-in-1">Self-paced curriculum</span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] mt-4 hero-in hero-in-2">
              Sepuluh jalur belajar,
              <br />
              <span className="text-gradient">satu tracker</span> yang rapi.
            </h1>
            <p className="mt-5 text-soft max-w-xl text-base sm:text-lg hero-in hero-in-3">
              Lacak progres Cybersecurity, Matematika, Penetration Testing, AWS,
              Machine Learning (Dicoding &amp; Kaggle), dan lab PortSwigger
              (SQL Injection, Authentication, Access Control, XSS). Track
              PortSwigger dibuat linear — selesaikan urutannya. Setiap materi
              jadi ceklis interaktif yang tersimpan di perangkat Anda.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto mt-12 hero-in hero-in-4">
            {cards.map((c) => (
              <Link key={c.href} href={c.href} className="track-card group">
                <div className={`track-icon track-icon--${c.accent}`}>{c.icon}</div>
                <div className="track-body">
                  <div className="track-label">{c.label}</div>
                  <div className="track-title">{c.title}</div>
                  <div className="track-meta">
                    {c.meta.done}/{c.meta.total} · {c.meta.pct}%
                  </div>
                </div>
                <ArrowRight
                  size={20}
                  className="text-muted group-hover:text-ink group-hover:translate-x-1 transition"
                />
              </Link>
            ))}
          </div>

          <p className="text-center text-muted text-sm mt-10 hero-in hero-in-4">
            Progres tersimpan otomatis di perangkat Anda.
          </p>
        </div>
      </section>
    </main>
  );
}
