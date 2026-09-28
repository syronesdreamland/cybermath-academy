"use client";

import TrackView from "@/components/TrackView";
import { AWS_PHASES } from "@/lib/data";

export default function AwsPage() {
  return (
    <TrackView
      category="aws"
      phases={AWS_PHASES}
      accent="aws"
      sourceLabel="Belajar Dasar Cloud & Gen AI di AWS"
      sourceUrl="/aws"
      sourceIcon="github"
    />
  );
}
