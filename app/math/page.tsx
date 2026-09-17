"use client";

import TrackView from "@/components/TrackView";
import { MATH_TRACK } from "@/lib/data";

export default function MathPage() {
  return (
    <TrackView
      category="math"
      phases={[MATH_TRACK]}
      accent="math"
      sourceLabel="Professor Dave Explains"
      sourceUrl="https://www.youtube.com/@ProfessorDaveExplains"
      sourceIcon="youtube"
    />
  );
}
