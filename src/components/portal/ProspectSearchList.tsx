"use client";

import { useMemo, useState } from "react";
import { Search, Users } from "lucide-react";
import { ProspectCard } from "@/components/portal/ProspectCard";
import type { Prospect } from "@/lib/prospects";

/** Client-side text search over an already status-filtered prospect list --
 * same pattern as RequestSearchList.tsx. */
export function ProspectSearchList({ prospects }: { prospects: Prospect[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return prospects;
    return prospects.filter(
      (p) =>
        p.business_name.toLowerCase().includes(q) ||
        (p.category ?? "").toLowerCase().includes(q) ||
        (p.search_location ?? "").toLowerCase().includes(q) ||
        (p.address ?? "").toLowerCase().includes(q)
    );
  }, [prospects, search]);

  return (
    <div>
      <div className="relative max-w-xs mb-4">
        <Search className="w-3.5 h-3.5 text-[var(--portal-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search prospects…"
          className="w-full bg-[var(--portal-card)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] placeholder-[var(--portal-text-faint)] pl-8 pr-3 py-2 text-sm outline-none focus:border-[var(--portal-accent)]/50"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="glass border border-[var(--portal-border)] p-14 text-center">
          <div className="w-14 h-14 mx-auto bg-[var(--portal-border)] flex items-center justify-center mb-5">
            <Users className="w-6 h-6 text-[var(--portal-text-muted)]" />
          </div>
          <p className="text-[var(--portal-text-secondary)] text-sm">
            {prospects.length === 0 ? "No prospects yet — run a search above." : "No prospects match your search."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <ProspectCard key={p.id} prospect={p} />
          ))}
        </div>
      )}
    </div>
  );
}
