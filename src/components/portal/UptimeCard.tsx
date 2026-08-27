"use client";

import { useEffect, useState } from "react";

type State = "checking" | "up" | "down";

/** Checks reachability from the viewer's own browser, not the server —
 * see the comment in site-status.ts for why. mode: "no-cors" means the
 * response body/status can't be read (most client sites don't send
 * Access-Control-Allow-Origin for spectecle.com), but that's fine here:
 * a resolved promise means the browser completed a real TCP/TLS/HTTP round
 * trip, which is exactly the "is it reachable" signal this card needs.
 * Only a genuine network failure (DNS, connection refused, timeout) rejects. */
export function UptimeCard({ websiteUrl }: { websiteUrl: string }) {
  const [state, setState] = useState<State>("checking");

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    async function run() {
      try {
        await fetch(websiteUrl, {
          mode: "no-cors",
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });
        setState("up");
      } catch {
        setState("down");
      }
    }
    run();

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [websiteUrl]);

  return (
    <div className="glass border border-[var(--portal-border)] p-5">
      <div className="flex items-center gap-3">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            state === "checking"
              ? "bg-[var(--portal-text-faint)] animate-pulse"
              : state === "up"
                ? "bg-emerald-400"
                : "bg-rose-400"
          }`}
        />
        <div>
          <p className="text-sm font-semibold text-[var(--portal-text-primary)]">
            {state === "checking" ? "Checking…" : state === "up" ? "Site is up" : "Site is down"}
          </p>
          <p className="text-xs text-[var(--portal-text-faint)]">{websiteUrl}</p>
        </div>
      </div>
    </div>
  );
}
