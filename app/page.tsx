"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShieldCheck, Sigma, Crosshair, ArrowRight } from "lucide-react";
import { CYBER_PHASES, MATH_PHASES, PENTEST_PHASES } from "@/lib/data";
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
          <div className="flex gap-2">
            <span className="pill pill--cyber">
              <ShieldCheck size={14} /> <b>{cyber.pct}%</b>
            </span>
            <span className="pill pill--math">
              <Sigma size={14} /> <b>{math.pct}%</b>
            </span>
            <span className="pill pill--pentest">
              <Crosshair size={14} /> <b>{pentest.pct}%</b>
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
              Dua jalur belajar,
              <br />
              <span className="text-gradient">satu tracker</span> yang rapi.
            </h1>
            <p className="mt-5 text-soft max-w-xl text-base sm:text-lg hero-in hero-in-3">
              Lacak progres Cybersecurity, Matematika, dan Penetration Testing.
              Setiap video &amp; materi jadi ceklis interaktif yang tersimpan di
              perangkat Anda.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto mt-12 hero-in hero-in-4">
            <Link href="/cyber" className="track-card group">
              <div className="track-icon track-icon--cyber">
                <ShieldCheck size={28} />
              </div>
              <div className="track-body">
                <div className="track-label">Cybersecurity</div>
                <div className="track-title">90-Day Plan</div>
                <div className="track-meta">
                  {cyber.done}/{cyber.total} · {cyber.pct}%
                </div>
              </div>
              <ArrowRight
                size={20}
                className="text-muted group-hover:text-ink group-hover:translate-x-1 transition"
              />
            </Link>

            <Link href="/math" className="track-card group">
              <div className="track-icon track-icon--math">
                <Sigma size={28} />
              </div>
              <div className="track-body">
                <div className="track-label">Mathematics</div>
                <div className="track-title">Professor Dave</div>
                <div className="track-meta">
                  {math.done}/{math.total} · {math.pct}%
                </div>
              </div>
              <ArrowRight
                size={20}
                className="text-muted group-hover:text-ink group-hover:translate-x-1 transition"
              />
            </Link>

            <Link href="/pentest" className="track-card group">
              <div className="track-icon track-icon--pentest">
                <Crosshair size={28} />
              </div>
              <div className="track-body">
                <div className="track-label">Pentest</div>
                <div className="track-title">Problem-First Path</div>
                <div className="track-meta">
                  {pentest.done}/{pentest.total} · {pentest.pct}%
                </div>
              </div>
              <ArrowRight
                size={20}
                className="text-muted group-hover:text-ink group-hover:translate-x-1 transition"
              />
            </Link>
          </div>

          <p className="text-center text-muted text-sm mt-10 hero-in hero-in-4">
            Progres tersimpan otomatis di perangkat Anda.
          </p>
        </div>
      </section>
    </main>
  );
}
