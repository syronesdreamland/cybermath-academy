"use client";

import TrackView from "@/components/TrackView";
import { ACL_PHASES } from "@/lib/data";

export default function AclPage() {
  return (
    <TrackView
      category="acl"
      phases={ACL_PHASES}
      accent="acl"
      sourceLabel="PortSwigger Web Security Academy"
      sourceUrl="https://portswigger.net/web-security/access-control"
      sourceIcon="github"
    />
  );
}
