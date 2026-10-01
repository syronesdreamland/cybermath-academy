"use client";

import TrackView from "@/components/TrackView";
import { PYTHON_PHASES } from "@/lib/data";

export default function PythonPage() {
  return (
    <TrackView
      category="python"
      phases={PYTHON_PHASES}
      accent="py"
      sourceLabel="Dicoding — Memulai Pemrograman dengan Python"
      sourceUrl="https://www.dicoding.com/academies/86"
      sourceIcon="dicoding"
    />
  );
}
