"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  ExternalLink,
  Download,
  Upload,
  Github,
  Youtube,
} from "lucide-react";
import { type Phase, type TrackItem } from "@/lib/data";
import {
  loadProgress,
  saveProgress,
  isDone,
  type ProgressMap,
} from "@/lib/storage";

type TrackViewProps = {
  category: string;
  phases: Phase[];
  accent: "cyber" | "math" | "pentest";
  sourceLabel: string;
  sourceUrl: string;
  sourceIcon?: "github" | "youtube";
};

function pct(done: number, total: number) {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

function Ring({ value, accent }: { value: number; accent: "cyber" | "math" | "pentest" }) {
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
}: TrackViewProps) {
  const [state, setState] = useState<ProgressMap>({});
  const [openPhase, setOpenPhase] = useState<string | null>(null);
  const [rangeStart, setRangeStart] = useState<string | null>(null);

  useEffect(() => {
    setState(loadProgress());
  }, []);

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
      {/* head */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <span className={`eyebrow ${accent === "cyber" ? "text-cyber" : accent === "math" ? "text-math" : "text-pentest"}`}>
            {category === "cyber" ? "Cybersecurity" : category === "math" ? "Mathematics" : "Penetration Testing"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
            {category === "cyber" ? "90-Day Study Plan" : category === "math" ? "Professor Dave Explains" : "Problem-First Path"}
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
        </div>
      </div>

      {/* graph nodes */}
      <div className="flex flex-wrap gap-3 mb-4">
        {phases.map((p, idx) => {
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
        })}
      </div>

      {/* accordion detail */}
      {openPhase && (
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
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-line">
        <a href="/" className="font-semibold text-soft hover:text-ink">
          ← Pilih jalur
        </a>
      </div>
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
  accent: "cyber" | "math" | "pentest";
}) {
  const items = phase.items;
  const total = items.length;

  const renderList = (list: TrackItem[], offset: number) => (
    <ul className="flex flex-col gap-1.5">
      {list.map((it, i) => {
        const globalIdx = offset + i;
        const done = isDone(globalIdx);
        const typeIcon =
          it.type === "video" ? "🎬" : it.type === "resource" ? "🔗" : "✅";
        return (
          <li
            key={globalIdx}
            className={`check-item ${done ? "is-done" : ""}`}
            onClick={(e) => {
              if ((e.target as HTMLElement).tagName === "A") return;
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
              {it.url && (
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
              )}
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
                : `${total} video · ${done} selesai`}
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
