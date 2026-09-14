"use client";

import { useMemo, useState } from "react";
import { Search, Inbox } from "lucide-react";
import { TicketCard } from "@/components/portal/TicketCard";
import type { RequestFile } from "@/components/portal/RequestDetails";
import type { TicketMessage } from "@/lib/request-messages";

export type SearchableRequest = {
  id: string;
  ticketNumber: number;
  serviceType: string;
  message: string;
  budget: string | null;
  createdAt: string;
  updatedAt: string;
  status: string;
  details: Record<string, unknown>;
  files: RequestFile[];
  messages: TicketMessage[];
  clientEmail?: string;
  orgName?: string;
};

/** Client-side text search over an already-status/org/user-filtered
 * request list -- no new data fetch, no new query param, just narrows
 * what the server already sent down, same pattern as the org/user search
 * already proven in UserManagementPanel.tsx. */
export function RequestSearchList({ requests }: { requests: SearchableRequest[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return requests;
    return requests.filter(
      (r) =>
        r.message.toLowerCase().includes(q) ||
        (r.clientEmail ?? "").toLowerCase().includes(q) ||
        (r.orgName ?? "").toLowerCase().includes(q) ||
        r.serviceType.toLowerCase().includes(q) ||
        String(r.ticketNumber).includes(q)
    );
  }, [requests, search]);

  return (
    <div>
      <div className="relative max-w-xs mb-4">
        <Search className="w-3.5 h-3.5 text-[var(--portal-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search requests…"
          className="w-full bg-[var(--portal-card)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] placeholder-[var(--portal-text-faint)] pl-8 pr-3 py-2 text-sm outline-none focus:border-[var(--portal-accent)]/50"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="glass border border-[var(--portal-border)] p-14 text-center">
          <div className="w-14 h-14 mx-auto bg-[var(--portal-border)] flex items-center justify-center mb-5">
            <Inbox className="w-6 h-6 text-[var(--portal-text-muted)]" />
          </div>
          <p className="text-[var(--portal-text-secondary)] text-sm">
            {requests.length === 0 ? "No requests yet." : "No requests match your search."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <TicketCard
              key={r.id}
              id={r.id}
              ticketNumber={r.ticketNumber}
              serviceType={r.serviceType}
              message={r.message}
              budget={r.budget}
              createdAt={r.createdAt}
              updatedAt={r.updatedAt}
              status={r.status}
              details={r.details}
              files={r.files}
              messages={r.messages}
              viewerRole="admin"
              clientEmail={r.clientEmail}
            />
          ))}
        </div>
      )}
    </div>
  );
}
