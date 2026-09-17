"use client";

import TrackView from "@/components/TrackView";
import { CYBER_PHASES } from "@/lib/data";

export default function CyberPage() {
  return (
    <TrackView
      category="cyber"
      phases={CYBER_PHASES}
      accent="cyber"
      sourceLabel="90DaysOfCyberSecurity"
      sourceUrl="https://github.com/farhanashrafdev/90DaysOfCyberSecurity"
      sourceIcon="github"
    />
  );
}
