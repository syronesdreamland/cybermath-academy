"use client";

import TrackView from "@/components/TrackView";
import { MLP_PHASES } from "@/lib/data";

export default function MlpPage() {
  return (
    <TrackView
      category="mlp"
      phases={MLP_PHASES}
      accent="mlp"
      sourceLabel="Kaggle Learn"
      sourceUrl="https://www.kaggle.com/learn"
      sourceIcon="youtube"
    />
  );
}
