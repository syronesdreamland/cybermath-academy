"use client";

import TrackView from "@/components/TrackView";
import { MATH_PHASES } from "@/lib/data";

export default function MathPage() {
  return (
    <TrackView
      category="math"
      phases={MATH_PHASES}
      accent="math"
      sourceLabel="Professor Dave Explains"
      sourceUrl="https://www.youtube.com/@ProfessorDaveExplains"
      sourceIcon="youtube"
    />
  );
}
