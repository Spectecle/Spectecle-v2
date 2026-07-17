"use client";

import { useState } from "react";
import { ChevronDown, MessageSquare, Pencil } from "lucide-react";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { AdminStatusSelect } from "@/components/portal/AdminStatusSelect";
import { RequestDetails, type RequestFile } from "@/components/portal/RequestDetails";
import { TicketThread } from "@/components/portal/TicketThread";
import { EditRequestForm } from "@/components/portal/EditRequestForm";
import type { TicketMessage } from "@/lib/request-messages";

export function TicketCard({
  id,
  serviceType,
  message,
  budget,
  createdAt,
  status,
  details,
  files,
  messages,
  viewerRole,
  clientEmail,
}: {
  id: string;
  serviceType: string;
  message: string;
  budget: string | null;
  createdAt: string;
  status: string;
  details: Record<string, unknown>;
  files: RequestFile[];
  messages: TicketMessage[];
  viewerRole: "admin" | "client";
  clientEmail?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const dateLabel = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="glass rounded-2xl border border-[var(--portal-border)]">
      <div className="flex items-start justify-between gap-4 p-6">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex-1 min-w-0 text-left cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <h3 className="text-[var(--portal-text-primary)] font-semibold text-sm truncate">{serviceType}</h3>
            {messages.length > 0 && (
              <span className="flex items-center gap-1 text-[10px] text-[var(--portal-text-muted)] bg-[var(--portal-border)] rounded-full px-1.5 py-0.5 shrink-0">
                <MessageSquare className="w-2.5 h-2.5" />
                {messages.length}
              </span>
            )}
          </div>
          {viewerRole === "admin" && clientEmail && (
            <p className="text-xs text-[var(--portal-text-muted)] mt-0.5">{clientEmail}</p>
          )}
          {!expanded && (
            <p className="text-[var(--portal-text-muted)] text-xs mt-1.5 truncate">{message}</p>
          )}
          <div className="flex items-center gap-3 text-xs text-[var(--portal-text-faint)] mt-2">
            {budget && <span>{budget}</span>}
            <span>{dateLabel}</span>
          </div>
        </button>

        <div className="flex items-center gap-3 shrink-0">
          {viewerRole === "admin" ? (
            <div className="flex flex-col items-start gap-1">
              <span className="text-[10px] text-[var(--portal-text-muted)] uppercase tracking-wider">
                Current Status
              </span>
              <AdminStatusSelect requestId={id} status={status} />
            </div>
          ) : (
            <StatusBadge status={status} />
          )}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="p-1 rounded-lg text-[var(--portal-text-muted)] hover:text-[var(--portal-text-primary)] hover:bg-[var(--portal-border)] cursor-pointer transition-colors"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-6 pb-6">
          {editing ? (
            <EditRequestForm
              requestId={id}
              serviceType={serviceType}
              initialBudget={budget}
              initialMessage={message}
              initialDetails={details}
              onDone={() => setEditing(false)}
            />
          ) : (
            <>
              <div className="flex items-start justify-between gap-4 border-t border-[var(--portal-border)] pt-4 mb-3">
                <p className="text-[var(--portal-text-secondary)] text-sm leading-relaxed whitespace-pre-wrap">
                  {message}
                </p>
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 text-xs text-[var(--portal-text-muted)] hover:text-[var(--portal-text-primary)] cursor-pointer shrink-0"
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
              </div>
              <RequestDetails serviceType={serviceType} details={details} files={files} />
            </>
          )}
          <TicketThread requestId={id} messages={messages} viewerRole={viewerRole} />
        </div>
      )}
    </div>
  );
}
