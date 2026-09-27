"use client";

import TrackView from "@/components/TrackView";
import { DICODING_ML_PHASES } from "@/lib/data";

export default function MlPage() {
  return (
    <TrackView
      category="ml"
      phases={DICODING_ML_PHASES}
      accent="ml"
      sourceLabel="Dicoding — Belajar Machine Learning untuk Pemula"
      sourceUrl="https://www.dicoding.com/academies/184"
      sourceIcon="dicoding"
    />
  );
}
