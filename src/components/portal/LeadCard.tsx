import { Mail, Phone } from "lucide-react";
import type { Lead } from "@/lib/leads";

export function LeadCard({ lead }: { lead: Lead }) {
  const receivedAt = new Date(lead.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="glass border border-[var(--portal-border)] p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
        <p className="text-sm font-semibold text-[var(--portal-text-primary)]">{lead.name || "Unknown"}</p>
        <p className="text-xs text-[var(--portal-text-faint)]">{receivedAt}</p>
      </div>
      <div className="flex items-center gap-4 flex-wrap mb-3">
        {lead.email && (
          <a
            href={`mailto:${lead.email}`}
            className="flex items-center gap-1.5 text-xs text-[#cb7c46] hover:underline"
          >
            <Mail className="w-3 h-3" />
            {lead.email}
          </a>
        )}
        {lead.phone && (
          <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-xs text-[#cb7c46] hover:underline">
            <Phone className="w-3 h-3" />
            {lead.phone}
          </a>
        )}
      </div>
      {lead.message && (
        <p className="text-sm text-[var(--portal-text-secondary)] whitespace-pre-wrap">{lead.message}</p>
      )}
    </div>
  );
}
