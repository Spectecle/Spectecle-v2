import { CalendarClock } from "lucide-react";
import { formatUsd } from "@/lib/payment-reminder-format";
import type { ZohoRecurringInvoice } from "@/lib/zoho-books";

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Read-only mirror of a Zoho Books recurring invoice -- no admin action
// needed here (pause/send-now live on the Reminders tab once an invoice
// generated from this schedule actually goes overdue), so this stays a
// plain server-rendered row, not a client component.
export function RecurringPaymentRow({ invoice }: { invoice: ZohoRecurringInvoice }) {
  const isActive = invoice.status === "active";

  return (
    <div className="glass border border-[var(--portal-border)] p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-[var(--portal-text-primary)]">
              {invoice.customerName ?? "Unknown customer"}
            </h3>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                isActive ? "bg-emerald-500/10 text-emerald-400" : "bg-[var(--portal-border)] text-[var(--portal-text-faint)]"
              }`}
            >
              {invoice.status ?? "unknown"}
            </span>
          </div>
          {invoice.name && (
            <p className="text-xs text-[var(--portal-text-faint)] mt-0.5">{invoice.name}</p>
          )}
          <div className="flex items-center gap-3 mt-1.5 flex-wrap text-xs text-[var(--portal-text-muted)]">
            <span className="text-[var(--portal-text-secondary)] font-medium">
              {formatUsd(invoice.total ?? 0)}
            </span>
            {invoice.frequency && <span>{invoice.frequency}</span>}
            {invoice.nextInvoiceDate && (
              <span className="flex items-center gap-1">
                <CalendarClock className="w-3 h-3" />
                Next: {formatDate(invoice.nextInvoiceDate)}
              </span>
            )}
            <span>Last sent {formatDate(invoice.lastSentDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
