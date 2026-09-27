"use client";

import TrackView from "@/components/TrackView";
import { SQLI_PHASES, AUTH_PHASES } from "@/lib/data";

export default function AuthPage() {
  return (
    <TrackView
      category="auth"
      phases={AUTH_PHASES}
      accent="auth"
      sourceLabel="PortSwigger Web Security Academy"
      sourceUrl="https://portswigger.net/web-security/authentication"
      sourceIcon="github"
      requiresCategory="sqli"
      requiresPhases={SQLI_PHASES}
      requiresLabel="track SQL Injection"
      requiresHref="/sqli"
    />
  );
}
