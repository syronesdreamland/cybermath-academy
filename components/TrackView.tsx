"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ExternalLink,
  Download,
  Upload,
  Github,
  Youtube,
  Lock,
  BookOpen,
} from "lucide-react";
import { type Phase, type TrackItem } from "@/lib/data";
import { getLessonByTid, getLessonBySourceUrl } from "@/lib/lessons";
import {
  loadProgress,
  saveProgress,
  isDone,
  categoryProgress,
  type ProgressMap,
} from "@/lib/storage";
import {
  pullProgress,
  mergeProgress,
  getSyncState,
  onSyncState,
  signInWithPassword,
  signUpWithPassword,
  signOutSync,
  type SyncState,
} from "@/lib/sync";

type TrackViewProps = {
  category: string;
  phases: Phase[];
  accent: "cyber" | "math" | "pentest" | "aws" | "sqli" | "auth" | "acl" | "xss" | "ml" | "mlp" | "py";
  sourceLabel: string;
  sourceUrl: string;
  sourceIcon?: "github" | "youtube" | "dicoding";
  /** Kategori prasyarat: track terkunci sampai prasyarat 100% */
  requiresCategory?: string;
  requiresPhases?: { id: string; items: unknown[] }[];
  requiresLabel?: string;
  requiresHref?: string;
};

export type Accent =
  | "cyber"
  | "math"
  | "pentest"
  | "aws"
  | "sqli"
  | "auth"
  | "acl"
  | "xss"
  | "ml"
  | "mlp"
  | "py";

const CAT_META: Record<string, { label: string; title: string }> = {
  cyber: { label: "Cybersecurity", title: "90-Day Study Plan" },
  math: { label: "Mathematics", title: "Professor Dave Explains" },
  pentest: { label: "Penetration Testing", title: "Problem-First Path" },
  aws: { label: "AWS Cloud", title: "Dasar Cloud & Gen AI — Dicoding" },
  sqli: { label: "Web Security", title: "PortSwigger — SQL Injection" },
  auth: { label: "Web Security", title: "PortSwigger — Authentication" },
  acl: { label: "Web Security", title: "PortSwigger — Access Control" },
  xss: { label: "Web Security", title: "PortSwigger — Cross-Site Scripting" },
  ml: { label: "Machine Learning", title: "Belajar ML untuk Pemula — Dicoding" },
  mlp: { label: "Machine Learning", title: "ML Practice — Kaggle Learn" },
  python: { label: "Programming", title: "Python — Dasar sampai Profesional — Dicoding" },
};

function pct(done: number, total: number) {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

function Ring({ value, accent }: { value: number; accent: Accent }) {
  const size = 72;
  const stroke = 7;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        className="ring-bg"
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        strokeWidth={stroke}
      />
      <circle
        className={`ring-fg ring-fg--${accent}`}
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={off}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-ink font-extrabold"
        fontSize="17"
      >
        {value}%
      </text>
    </svg>
  );
}

export default function TrackView({
  category,
  phases,
  accent,
  sourceLabel,
  sourceUrl,
  sourceIcon = "github",
  requiresCategory,
  requiresPhases,
  requiresLabel,
  requiresHref,
}: TrackViewProps) {
  const [state, setState] = useState<ProgressMap>({});
  const [openPhase, setOpenPhase] = useState<string | null>(null);
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [sync, setSync] = useState<SyncState>(getSyncState());

  useEffect(() => {
    setState(loadProgress());
    const unsub = onSyncState(setSync);
    // Pull progress dari cloud saat mount (merge, tanpa pernah un-check item lokal)
    void (async () => {
      const remote = await pullProgress();
      if (remote && Object.keys(remote).length > 0) {
        setState((prev) => mergeProgress(prev, remote));
      }
    })();
    return unsub;
  }, []);

  // Prasyarat linear: track terkunci sampai kategori prasyarat 100% selesai
  const prereqPct = requiresCategory && requiresPhases
    ? categoryProgress(state, requiresCategory, requiresPhases).pct
    : 100;
  const gated = prereqPct < 100;

  const totalItems = useMemo(
    () => phases.reduce((a, p) => a + p.items.length, 0),
    [phases]
  );
  const totalDone = useMemo(
    () => phases.reduce((a, p) => a + (state[category]?.[p.id] ? Object.keys(state[category][p.id]).length : 0), 0),
    [state, phases, category]
  );

  const toggleItem = useCallback(
    (phaseId: string, itemId: string, val: boolean) => {
      setState((prev) => {
        const next = structuredClone(prev);
        if (!next[category]) next[category] = {};
        if (!next[category][phaseId]) next[category][phaseId] = {};
        if (val) next[category][phaseId][itemId] = true;
        else delete next[category][phaseId][itemId];
        saveProgress(next);
        return next;
      });
    },
    [category]
  );

  // Sign in / daftar sync → setelah sukses, langsung pull + merge ke state
  const handleSyncSignIn = useCallback(
    (email: string, password: string, mode: "in" | "up") => {
      void (async () => {
        const err =
          mode === "in" ? await signInWithPassword(email, password) : await signUpWithPassword(email, password);
        if (err) {
          alert(`Sync gagal: ${err}`);
          return;
        }
        if (mode === "up") {
          alert("Akun dibuat. Cek email untuk verifikasi (jika diminta), lalu Masuk.");
        }
        const remote = await pullProgress();
        setState((prev) => {
          const merged = remote ? mergeProgress(prev, remote) : prev;
          saveProgress(merged); // dorong hasil merge ke cloud juga
          return merged;
        });
      })();
    },
    []
  );

  // shift+click range select
  const handleCheck = (
    phaseId: string,
    itemIdx: number,
    checked: boolean,
    e: React.MouseEvent
  ) => {
    const phase = phases.find((p) => p.id === phaseId);
    if (!phase) return;
    const itemId = String(itemIdx);

    if (e.shiftKey && rangeStart) {
      // range select from rangeStart to current — apply the SAME new value
      const [startPhase, startIdx] = rangeStart.split(":");
      if (startPhase === phaseId) {
        const a = Number(startIdx);
        const b = itemIdx;
        const [lo, hi] = a < b ? [a, b] : [b, a];
        for (let i = lo; i <= hi; i++) {
          toggleItem(phaseId, String(i), checked);
        }
      }
      return;
    }
    setRangeStart(`${phaseId}:${itemId}`);
    toggleItem(phaseId, itemId, checked);
  };

  // map item -> stable id (plain number string)
  const itemKey = (idx: number) => String(idx);

  const phaseDone = (p: Phase) =>
    state[category]?.[p.id] ? Object.keys(state[category][p.id]).length : 0;

  return (
    <div className="max-w-5xl mx-auto px-5 py-8">
      {/* back link — kiri atas */}
      <div className="mb-3">
        <a href="/" className="font-semibold text-soft hover:text-ink text-sm inline-flex items-center gap-1">
          ← Pilih jalur
        </a>
      </div>
      {/* head */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <span className={`eyebrow text-${accent}`}>
            {CAT_META[category]?.label ?? category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
            {CAT_META[category]?.title ?? category}
          </h1>
        </div>
        <a className="source-link" href={sourceUrl} target="_blank" rel="noopener">
          {sourceIcon === "github" ? <Github size={15} /> : <Youtube size={15} />}
          {sourceLabel}
          <ExternalLink size={13} />
        </a>
      </div>

      {/* toolbar */}
      <div className="flex items-center gap-5 bg-white border border-line rounded-2xl p-4 shadow-card mb-5 flex-wrap">
        <Ring value={pct(totalDone, totalItems)} accent={accent} />
        <div className="flex-1 min-w-[120px]">
          <div className="text-xs text-muted font-semibold">Progres</div>
          <div className="text-2xl font-extrabold tracking-tight">
            {totalDone}/{totalItems}
          </div>
        </div>
        <div className="flex gap-2">
          <ExportButton state={state} />
          <ImportButton onImport={(s) => { setState(s); saveProgress(s); }} />
          <SyncButton sync={sync} onSignIn={handleSyncSignIn} onSignOut={signOutSync} />
        </div>
      </div>

      {/* graph nodes */}
      <div className="flex flex-wrap gap-3 mb-4">
        {gated ? (
          <div className="w-full bg-white border border-line rounded-2xl shadow-card p-8 text-center">
            <Lock size={32} className="mx-auto text-muted" />
            <p className="mt-3 font-bold text-lg">🔒 Track terkunci</p>
            <p className="mt-1 text-soft text-sm max-w-md mx-auto">
              Selesaikan dulu <b>{requiresLabel}</b> sampai 100% sebelum masuk
              track ini. Urutan belajar dibuat linear:{" "}
              {requiresHref && (
                <a href={requiresHref} className="text-cyber font-semibold underline">
                  lanjutkan track sebelumnya →
                </a>
              )}
            </p>
            <p className="mt-2 text-xs text-muted">
              Progres prasyarat: {prereqPct}%
            </p>
          </div>
        ) : (
          phases.map((p, idx) => {
          const done = phaseDone(p);
          const total = p.items.length;
          const stateCls =
            done === total && total > 0 ? "is-done" : done > 0 ? "is-active" : "";
          const isOpen = openPhase === p.id;
          return (
            <button
              key={p.id}
              className={`node node--${accent} ${stateCls} ${isOpen ? "is-open" : ""} flex-1 min-w-[200px]`}
              onClick={() => setOpenPhase(isOpen ? null : p.id)}
              aria-expanded={isOpen}
            >
              <span className="node-num">{String(idx + 1).padStart(2, "0")}</span>
              <span className="node-icon">{p.icon}</span>
              <span className="node-body">
                <span className="node-name">{p.name}</span>
                <span className="node-range">
                  {category === "cyber"
                    ? `Day ${p.days![0]}–${p.days![1]} · ${pct(done, total)}%`
                    : `${total} item · ${pct(done, total)}%`}
                </span>
              </span>
              <ChevronDown
                size={18}
                className={`text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
          );
          })
        )}
      </div>

      {/* accordion detail */}
      {openPhase && !gated && (
        <PhasePanel
          key={openPhase}
          phase={phases.find((p) => p.id === openPhase)!}
          category={category}
          done={phaseDone(phases.find((p) => p.id === openPhase)!)}
          isDone={(itemIdx) =>
            isDone(state, category, openPhase, itemKey(itemIdx))
          }
          onCheck={handleCheck}
          onClose={() => setOpenPhase(null)}
          accent={accent}
        />
      )}

      {/* footer */}
      <div className="mt-8 pt-4 border-t border-line" />
    </div>
  );
}

function PhasePanel({
  phase,
  category,
  done,
  isDone,
  onCheck,
  onClose,
  accent,
}: {
  phase: Phase;
  category: string;
  done: number;
  isDone: (itemIdx: number) => boolean;
  onCheck: (phaseId: string, itemIdx: number, checked: boolean, e: React.MouseEvent) => void;
  onClose: () => void;
  accent: Accent;
}) {
  const items = phase.items;
  const total = items.length;

// Ambil id tutorial dari URL sumber untuk dicocokkan ke lesson internal
// - Dicoding: tutorials/<tid>
// - Lainnya (PortSwigger, dll): map eksplisit getLessonBySourceUrl
const TID_RE = /tutorials\/(\d+)/;
function internalLesson(item: TrackItem) {
  if (!item.url) return null;
  const m = item.url.match(TID_RE);
  if (m) return getLessonByTid(m[1]) ?? getLessonBySourceUrl(item.url) ?? null;
  return getLessonBySourceUrl(item.url) ?? null;
}

  const renderList = (list: TrackItem[], offset: number) => (
    <ul className="flex flex-col gap-1.5">
      {list.map((it, i) => {
        const globalIdx = offset + i;
        const done = isDone(globalIdx);
        const typeIcon =
          it.type === "video" ? "🎬" : it.type === "resource" ? "🔗" : "✅";
        const lesson = internalLesson(it);
        return (
          <li
            key={globalIdx}
            className={`check-item ${done ? "is-done" : ""}`}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) return;
              onCheck(phase.id, globalIdx, !done, e as unknown as React.MouseEvent);
            }}
          >
            <input
              type="checkbox"
              checked={done}
              readOnly
              className="pointer-events-none"
              tabIndex={-1}
            />
            <span className="check-num">{String(globalIdx + 1).padStart(2, "0")}</span>
            <span aria-hidden="true">{typeIcon}</span>
            <div className="check-body">
              <span className="check-label">{it.label}</span>
              {lesson ? (
                <>
                  {" "}
                  <Link
                    className="check-link"
                    href={`/lesson/${lesson.slug}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BookOpen size={12} className="inline -mt-0.5" /> baca
                  </Link>
                </>
              ) : it.url ? (
                <>
                  {" "}
                  <a
                    className="check-link"
                    href={it.url}
                    target="_blank"
                    rel="noopener"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={12} className="inline -mt-0.5" /> buka
                  </a>
                </>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="bg-white border border-line rounded-2xl shadow-card overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{phase.icon}</span>
          <div>
            <div className="font-extrabold text-lg leading-tight">{phase.name}</div>
            <div className="text-sm text-soft">
              {phase.days
                ? `Day ${phase.days[0]}–${phase.days[1]} · ${done}/${total} selesai`
                : `${total} item · ${done} selesai`}
            </div>
          </div>
        </div>
        {phase.url && (
          <a className="source-link" href={phase.url} target="_blank" rel="noopener">
            <Youtube size={15} /> Buka playlist <ExternalLink size={13} />
          </a>
        )}
      </div>

      <div className="px-5 py-4">
        <div className="h-1.5 bg-line rounded-full overflow-hidden mb-4">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyber to-math transition-all duration-500"
            style={{ width: `${pct(done, total)}%` }}
          />
        </div>
        <p className="text-sm text-soft mb-3">{phase.desc}</p>

        {renderList(items, 0)}
      </div>
    </div>
  );
}

function ExportButton({ state }: { state: ProgressMap }) {
  return (
    <button
      className="btn-ghost flex items-center gap-2"
      onClick={() => {
        const blob = new Blob([JSON.stringify(state, null, 2)], {
          type: "application/json",
        });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "cybermath-progress.json";
        a.click();
        URL.revokeObjectURL(a.href);
      }}
    >
      <Download size={14} /> Export
    </button>
  );
}

function ImportButton({ onImport }: { onImport: (s: ProgressMap) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <button
        className="btn-ghost flex items-center gap-2"
        onClick={() => ref.current?.click()}
      >
        <Upload size={14} /> Import
      </button>
      <input
        ref={ref}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          const reader = new FileReader();
          reader.onload = () => {
            try {
              onImport(JSON.parse(reader.result as string));
              alert("Progres berhasil diimpor.");
            } catch {
              alert("File tidak valid.");
            }
          };
          reader.readAsText(f);
          e.target.value = "";
        }}
      />
    </>
  );
}

// ------------------------------------------------------------
// Sync cloud: tombol kecil di toolbar — login/logout + status dot.
// Saat env Supabase belum diset, tombol disembunyikan (tracker tetap berfungsi penuh).
function SyncButton({
  sync,
  onSignIn,
  onSignOut,
}: {
  sync: SyncState;
  onSignIn: (email: string, password: string, mode: "in" | "up") => void;
  onSignOut: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);

  if (!sync.configured && !sync.signedIn) return null;

  const dot =
    sync.status === "error" ? "🔴" : sync.status === "syncing" ? "🟡" : sync.signedIn ? "🟢" : "⚪️";

  return (
    <>
      {sync.signedIn ? (
        <button
          className="btn-ghost flex items-center gap-2"
          title={`Sync aktif: ${sync.email ?? ""}`}
          onClick={() => {
            if (confirm(`Logout dari sync (${sync.email ?? "akun"})? Progres tetap aman di device ini.`)) {
              onSignOut();
            }
          }}
        >
          <span>{dot}</span> Sync: {sync.email?.split("@")[0]}
        </button>
      ) : (
        <button className="btn-ghost flex items-center gap-2" onClick={() => setOpen((v) => !v)}>
          <span>{dot}</span> Sync
        </button>
      )}
      {open && !sync.signedIn && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-line rounded-2xl shadow-card p-4 z-50">
          <div className="flex gap-2 mb-3 text-sm font-semibold">
            <button
              className={`px-3 py-1 rounded-full ${mode === "in" ? "bg-cyber text-white" : "bg-line"}`}
              onClick={() => setMode("in")}
            >
              Masuk
            </button>
            <button
              className={`px-3 py-1 rounded-full ${mode === "up" ? "bg-cyber text-white" : "bg-line"}`}
              onClick={() => setMode("up")}
            >
              Daftar
            </button>
          </div>
          <input
            className="w-full border border-line rounded-lg px-3 py-2 text-sm mb-2"
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border border-line rounded-lg px-3 py-2 text-sm mb-3"
            placeholder="password (min. 6 karakter)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn-ghost w-full justify-center"
            disabled={busy || !email || !password}
            onClick={() => {
              setBusy(true);
              onSignIn(email, password, mode);
              setTimeout(() => setBusy(false), 800);
              setOpen(false);
            }}
          >
            {mode === "in" ? "Masuk & sync" : "Daftar & sync"}
          </button>
          <p className="text-[11px] text-muted mt-2 leading-snug">
            Progres tersimpan di akun & ter-sync ke semua device. Merge aman: item yang sudah
            dicentang tidak akan hilang.
          </p>
        </div>
      )}
    </>
  );
}
