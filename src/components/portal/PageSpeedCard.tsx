"use client";

import { useEffect, useState } from "react";
import { Gauge, RefreshCw } from "lucide-react";

type State = "loading" | "ready" | "error";

function scoreColor(score: number): string {
  if (score >= 90) return "text-emerald-400";
  if (score >= 50) return "text-amber-400";
  return "text-rose-400";
}

export function PageSpeedCard() {
  const [state, setState] = useState<State>("loading");
  const [score, setScore] = useState<number | null>(null);

  const runCheck = async () => {
    try {
      const res = await fetch("/api/portal/dashboard/pagespeed", { method: "POST" });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setState("error");
        return;
      }
      setScore(body?.score ?? null);
      setState("ready");
    } catch {
      setState("error");
    }
  };

  const handleRetry = () => {
    setState("loading");
    runCheck();
  };

  useEffect(() => {
    // A real PageSpeed run is genuinely slow (5-15s), which is exactly why
    // this lives in a client-triggered effect instead of the server-rendered
    // page. runCheck's own setState calls only run after its `await fetch`,
    // never synchronously in this effect body.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    runCheck();
  }, []);

  return (
    <div className="glass border border-[var(--portal-border)] p-5 h-full">
      <div className="flex items-center justify-between mb-3">
        <Gauge className="w-4 h-4 text-[var(--portal-text-faint)]" />
        <button
          type="button"
          onClick={handleRetry}
          disabled={state === "loading"}
          className="text-[var(--portal-text-faint)] hover:text-[var(--portal-text-primary)] cursor-pointer disabled:opacity-60"
          aria-label="Recheck site speed"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${state === "loading" ? "animate-spin" : ""}`} />
        </button>
      </div>
      {state === "loading" ? (
        <p className="text-sm text-[var(--portal-text-faint)]">Checking…</p>
      ) : state === "error" ? (
        <p className="text-3xl font-light text-[#cb7c46]" style={{ fontFamily: "var(--font-serif, inherit)" }}>
          !
        </p>
      ) : (
        <p
          className={`text-3xl font-light ${score !== null ? scoreColor(score) : "text-[#cb7c46]"}`}
          style={{ fontFamily: "var(--font-serif, inherit)" }}
        >
          {score ?? "—"}
        </p>
      )}
      <p className="text-sm text-[var(--portal-text-muted)] mt-1">
        {state === "error" ? "PageSpeed Score (fetch failed)" : "PageSpeed Score"}
      </p>
    </div>
  );
}
