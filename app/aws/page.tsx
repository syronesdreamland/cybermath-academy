"use client";

import TrackView from "@/components/TrackView";
import { AWS_PHASES } from "@/lib/data";

export default function AwsPage() {
  return (
    <TrackView
      category="aws"
      phases={AWS_PHASES}
      accent="aws"
      sourceLabel="Dicoding — Belajar Dasar Cloud dan Gen AI di AWS"
      sourceUrl="https://www.dicoding.com/academies/251"
      sourceIcon="github"
    />
  );
}
