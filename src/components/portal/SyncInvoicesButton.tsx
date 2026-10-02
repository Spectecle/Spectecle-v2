"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export function SyncInvoicesButton() {
  const router = useRouter();
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState("");
  const [, startTransition] = useTransition();

  const handleSync = async () => {
    setSyncing(true);
    setMessage("");
    const res = await fetch("/api/portal/admin/invoice-reminders/sync", { method: "POST" });
    const data = await res.json().catch(() => null);
    setSyncing(false);
    if (res.ok) {
      setMessage(
        `Synced — ${data.tracked} overdue, ${data.resolved} newly marked paid.`
      );
      startTransition(() => router.refresh());
    } else {
      setMessage(data?.error ?? "Sync failed");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleSync}
        disabled={syncing}
        className="flex items-center gap-1.5 text-sm font-medium rounded-lg px-3 py-1.5 cursor-pointer disabled:opacity-60 bg-[var(--portal-border)] text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] transition-colors"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
        Sync with Zoho
      </button>
      {message && <span className="text-xs text-[var(--portal-text-muted)]">{message}</span>}
    </div>
  );
}
