"use client";

import TrackView from "@/components/TrackView";
import { SQLI_PHASES } from "@/lib/data";

export default function SqliPage() {
  return (
    <TrackView
      category="sqli"
      phases={SQLI_PHASES}
      accent="sqli"
      sourceLabel="PortSwigger Web Security Academy"
      sourceUrl="https://portswigger.net/web-security/sql-injection"
      sourceIcon="github"
    />
  );
}
