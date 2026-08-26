"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Download } from "lucide-react";
import type { RankingEntry } from "@/lib/analytics-snapshots";

function currentMonthValue(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function AnalyticsSnapshotForm({
  organizationId,
  ga4Connected,
}: {
  organizationId: string;
  ga4Connected: boolean;
}) {
  const router = useRouter();
  const [periodMonth, setPeriodMonth] = useState(currentMonthValue());
  const [visitors, setVisitors] = useState("");
  const [pageViews, setPageViews] = useState("");
  const [notes, setNotes] = useState("");
  const [rankings, setRankings] = useState<RankingEntry[]>([{ keyword: "", position: null }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [, startTransition] = useTransition();

  const handleFetchGA4 = async () => {
    setFetching(true);
    setFetchError("");
    try {
      const res = await fetch(`/api/portal/admin/organizations/${organizationId}/ga4-fetch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ periodMonth }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setFetchError(data?.error ?? "Failed to fetch from GA4");
        return;
      }
      setVisitors(String(data.visitors));
      setPageViews(String(data.pageViews));
    } catch {
      setFetchError("Failed to fetch from GA4");
    } finally {
      setFetching(false);
    }
  };

  const updateRanking = (i: number, patch: Partial<RankingEntry>) => {
    setRankings((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch(`/api/portal/admin/organizations/${organizationId}/analytics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          periodMonth,
          visitors: visitors.trim() ? Number(visitors) : null,
          pageViews: pageViews.trim() ? Number(pageViews) : null,
          notes: notes.trim() || null,
          rankings: rankings.filter((r) => r.keyword.trim()),
        }),
      });
      if (!res.ok) {
        setError("Failed to save");
        return;
      }
      setSuccess(true);
      startTransition(() => router.refresh());
    } catch {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-[var(--portal-text-faint)] uppercase tracking-wide mb-1">
            Month
          </label>
          <input
            type="month"
            value={periodMonth}
            onChange={(e) => setPeriodMonth(e.target.value)}
            required
            className="w-full bg-[var(--portal-input-bg)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] px-2.5 py-1.5 text-sm outline-none focus:border-[#cb7c46]/50"
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--portal-text-faint)] uppercase tracking-wide mb-1">
            Visitors
          </label>
          <input
            type="number"
            min="0"
            value={visitors}
            onChange={(e) => setVisitors(e.target.value)}
            placeholder="—"
            className="w-full bg-[var(--portal-input-bg)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] px-2.5 py-1.5 text-sm outline-none focus:border-[#cb7c46]/50"
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--portal-text-faint)] uppercase tracking-wide mb-1">
            Page Views
          </label>
          <input
            type="number"
            min="0"
            value={pageViews}
            onChange={(e) => setPageViews(e.target.value)}
            placeholder="—"
            className="w-full bg-[var(--portal-input-bg)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] px-2.5 py-1.5 text-sm outline-none focus:border-[#cb7c46]/50"
          />
        </div>
      </div>

      {ga4Connected && (
        <div>
          <button
            type="button"
            onClick={handleFetchGA4}
            disabled={fetching}
            className="flex items-center gap-1.5 text-sm font-semibold text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] border border-[var(--portal-border)] hover:border-[var(--portal-border-strong)] px-3 py-1.5 cursor-pointer transition-colors disabled:opacity-60"
          >
            <Download className="w-3.5 h-3.5" />
            {fetching ? "Fetching…" : "Fetch from GA4"}
          </button>
          {fetchError && <p className="text-sm text-rose-400 mt-1">{fetchError}</p>}
        </div>
      )}

      <div>
        <label className="block text-xs text-[var(--portal-text-faint)] uppercase tracking-wide mb-1.5">
          Rankings
        </label>
        <div className="space-y-2">
          {rankings.map((r, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={r.keyword}
                onChange={(e) => updateRanking(i, { keyword: e.target.value })}
                placeholder="Search term, e.g. eye exam dearborn"
                className="flex-1 bg-[var(--portal-input-bg)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] px-2.5 py-1.5 text-sm outline-none focus:border-[#cb7c46]/50"
              />
              <input
                type="number"
                min="1"
                value={r.position ?? ""}
                onChange={(e) =>
                  updateRanking(i, { position: e.target.value ? Number(e.target.value) : null })
                }
                placeholder="Position"
                className="w-24 bg-[var(--portal-input-bg)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] px-2.5 py-1.5 text-sm outline-none focus:border-[#cb7c46]/50"
              />
              <button
                type="button"
                onClick={() => setRankings((prev) => prev.filter((_, idx) => idx !== i))}
                className="p-1.5 text-[var(--portal-text-faint)] hover:text-rose-400 cursor-pointer"
                aria-label="Remove keyword"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setRankings((prev) => [...prev, { keyword: "", position: null }])}
          className="flex items-center gap-1.5 text-sm text-[#cb7c46] hover:text-[#cb7c46]/80 mt-2 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Add keyword
        </button>
      </div>

      <div>
        <label className="block text-xs text-[var(--portal-text-faint)] uppercase tracking-wide mb-1">
          Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="Anything worth highlighting for the client this month…"
          className="w-full bg-[var(--portal-input-bg)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] px-2.5 py-1.5 text-sm outline-none focus:border-[#cb7c46]/50 resize-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#cb7c46]/15 hover:bg-[#cb7c46]/25 text-[#cb7c46] text-sm font-semibold px-4 py-2 cursor-pointer transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Snapshot"}
        </button>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        {success && !error && <p className="text-sm text-emerald-400">Saved.</p>}
      </div>
    </form>
  );
}
