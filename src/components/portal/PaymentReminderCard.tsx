"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Clock, Loader2, Send } from "lucide-react";
import { formatUsd, type PaymentReminder } from "@/lib/payment-reminders";

function daysOverdue(dueDate: string | null): number | null {
  if (!dueDate) return null;
  const [y, m, d] = dueDate.split("-").map(Number);
  if (!y || !m || !d) return null;
  const due = new Date(y, m - 1, d).getTime();
  return Math.max(0, Math.floor((Date.now() - due) / (24 * 60 * 60 * 1000)));
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function PaymentReminderCard({ reminder }: { reminder: PaymentReminder }) {
  const router = useRouter();
  const [paused, setPaused] = useState(reminder.paused);
  const [pauseSaving, setPauseSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);
  const [, startTransition] = useTransition();

  const resolved = !!reminder.resolved_at;
  const overdueDays = daysOverdue(reminder.due_date);

  const handleTogglePause = async () => {
    const next = !paused;
    setPaused(next);
    setPauseSaving(true);
    const res = await fetch(`/api/portal/admin/payment-reminders/${reminder.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paused: next }),
    });
    setPauseSaving(false);
    if (res.ok) startTransition(() => router.refresh());
  };

  const handleSendNow = async () => {
    setSending(true);
    setSendError("");
    setSendSuccess(false);
    const res = await fetch(`/api/portal/admin/payment-reminders/${reminder.id}/send-now`, { method: "POST" });
    setSending(false);
    if (res.ok) {
      setSendSuccess(true);
      startTransition(() => router.refresh());
    } else {
      const data = await res.json().catch(() => null);
      setSendError(data?.error ?? "Failed to send");
    }
  };

  return (
    <div className={`glass border border-[var(--portal-border)] p-5 ${resolved ? "opacity-60" : ""}`}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-[var(--portal-text-primary)]">
              {reminder.customer_name ?? "Unknown customer"}
            </h3>
            {reminder.invoice_number && (
              <span className="text-xs text-[var(--portal-text-faint)] bg-[var(--portal-border)] px-2 py-0.5 rounded-full">
                {reminder.invoice_number}
              </span>
            )}
            {resolved ? (
              <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                Paid — stopped
              </span>
            ) : overdueDays !== null ? (
              <span className="flex items-center gap-1 text-xs text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                <Clock className="w-3 h-3" />
                {overdueDays === 0 ? "Due today" : `${overdueDays} day${overdueDays === 1 ? "" : "s"} overdue`}
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap text-xs text-[var(--portal-text-muted)]">
            <span className="text-[var(--portal-text-secondary)] font-medium">
              {formatUsd(reminder.balance ?? 0)}
            </span>
            <span>{reminder.email ?? "no email on file"}</span>
            <span>Due {formatDate(reminder.due_date)}</span>
            <span>
              {reminder.reminder_count} reminder{reminder.reminder_count === 1 ? "" : "s"} sent
              {reminder.last_reminder_sent_at ? ` · last ${formatDate(reminder.last_reminder_sent_at)}` : ""}
            </span>
            {reminder.invoice_url && (
              <a
                href={reminder.invoice_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--portal-accent)] hover:underline cursor-pointer"
              >
                View Invoice
              </a>
            )}
          </div>
        </div>

        {!resolved && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleSendNow}
              disabled={sending}
              className="flex items-center gap-1.5 text-sm font-medium rounded-lg px-3 py-1.5 cursor-pointer disabled:opacity-60 bg-[var(--portal-accent)]/15 text-[var(--portal-accent)] hover:bg-[var(--portal-accent)]/25 transition-colors"
            >
              {sending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              Send Now
            </button>
            <button
              type="button"
              onClick={handleTogglePause}
              disabled={pauseSaving}
              className={`text-sm font-medium rounded-lg px-3 py-1.5 cursor-pointer disabled:opacity-60 transition-colors ${
                paused
                  ? "bg-rose-500/10 text-rose-400 hover:bg-emerald-500/10 hover:text-emerald-400"
                  : "bg-[var(--portal-border)] text-[var(--portal-text-secondary)] hover:text-rose-400 hover:bg-rose-500/10"
              }`}
            >
              {paused ? "Paused" : "Pause"}
            </button>
          </div>
        )}
      </div>

      {sendSuccess && <p className="text-sm text-emerald-400 mt-2">Reminder sent.</p>}
      {sendError && <p className="text-sm text-rose-400 mt-2">{sendError}</p>}
    </div>
  );
}
