"use client";

import TrackView from "@/components/TrackView";
import { ACL_PHASES, XSS_PHASES } from "@/lib/data";

export default function XssPage() {
  return (
    <TrackView
      category="xss"
      phases={XSS_PHASES}
      accent="xss"
      sourceLabel="PortSwigger Web Security Academy"
      sourceUrl="https://portswigger.net/web-security/cross-site-scripting"
      sourceIcon="github"
      requiresCategory="acl"
      requiresPhases={ACL_PHASES}
      requiresLabel="track Access Control"
      requiresHref="/acl"
    />
  );
}
