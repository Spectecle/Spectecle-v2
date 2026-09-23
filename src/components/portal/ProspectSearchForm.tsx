"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { PLACE_TYPE_GROUPS } from "@/lib/google-place-types";

export function ProspectSearchForm() {
  const router = useRouter();
  const [includedType, setIncludedType] = useState("");
  const [location, setLocation] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [lastResult, setLastResult] = useState<{ count: number; nextPageToken: string | null } | null>(
    null
  );

  const runSearch = async (pageToken?: string) => {
    if (!includedType || !location.trim()) return;
    setSearching(true);
    setError("");
    try {
      const res = await fetch("/api/portal/admin/prospects/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ includedType, location, pageToken }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Search failed");
        return;
      }
      setLastResult({ count: data.count, nextPageToken: data.nextPageToken });
      router.refresh();
    } catch {
      setError("Search failed");
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="glass border border-[var(--portal-border)] p-5 mb-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLastResult(null);
          runSearch();
        }}
        className="flex items-end gap-3 flex-wrap"
      >
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs text-[var(--portal-text-muted)] mb-1">Category</label>
          <select
            value={includedType}
            onChange={(e) => setIncludedType(e.target.value)}
            className="w-full bg-[var(--portal-input-bg)] border border-[var(--portal-border-strong)] text-[var(--portal-text-primary)] px-3 py-2 text-sm outline-none focus:border-[var(--portal-accent)]/50"
          >
            <option value="">Select a category…</option>
            {PLACE_TYPE_GROUPS.map((group) => (
              <optgroup key={group.group} label={group.group}>
                {group.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs text-[var(--portal-text-muted)] mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Dearborn, MI"
            className="w-full bg-[var(--portal-input-bg)] border border-[var(--portal-border-strong)] text-[var(--portal-text-primary)] placeholder-[var(--portal-text-faint)] px-3 py-2 text-sm outline-none focus:border-[var(--portal-accent)]/50"
          />
        </div>
        <button
          type="submit"
          disabled={searching || !includedType || !location.trim()}
          className="btn-primary flex items-center gap-2 px-4 py-2.5 text-sm font-semibold cursor-pointer disabled:opacity-60"
        >
          {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          Search
        </button>
      </form>

      {error && <p className="text-sm text-rose-400 mt-3">{error}</p>}

      {lastResult && (
        <div className="flex items-center gap-3 mt-3 text-sm text-[var(--portal-text-secondary)]">
          <span>
            Found {lastResult.count} business{lastResult.count === 1 ? "" : "es"} without a website.
          </span>
          {lastResult.nextPageToken && (
            <button
              type="button"
              onClick={() => runSearch(lastResult.nextPageToken!)}
              disabled={searching}
              className="text-[var(--portal-accent)] hover:underline cursor-pointer disabled:opacity-60"
            >
              Load more results
            </button>
          )}
        </div>
      )}
    </div>
  );
}
