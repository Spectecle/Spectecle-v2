"use client";

import { useState } from "react";
import { Megaphone, Send, CheckCircle2, Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/portal/ConfirmDialog";

type SendResult = { sent: number; failed: string[] };

export function AnnouncePortalButton({ activeCount }: { activeCount: number }) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);
  const [error, setError] = useState("");

  const [targetEmail, setTargetEmail] = useState("");
  const [individualSending, setIndividualSending] = useState(false);
  const [individualResult, setIndividualResult] = useState<SendResult | null>(null);
  const [individualError, setIndividualError] = useState("");

  const handleSend = async () => {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/portal/admin/announce", { method: "POST" });
      if (!res.ok) {
        setError("Failed to send announcement");
        setOpen(false);
        return;
      }
      const data = await res.json();
      setResult(data);
      setOpen(false);
    } catch {
      setError("Failed to send announcement");
      setOpen(false);
    } finally {
      setSending(false);
    }
  };

  const handleIndividualSend = async () => {
    if (!targetEmail.trim()) return;
    setIndividualSending(true);
    setIndividualError("");
    setIndividualResult(null);
    try {
      const res = await fetch("/api/portal/admin/announce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        setIndividualError(data?.error ?? "Failed to send");
        return;
      }
      setIndividualResult(data);
    } catch {
      setIndividualError("Failed to send");
    } finally {
      setIndividualSending(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <input
          type="email"
          value={targetEmail}
          onChange={(e) => {
            setTargetEmail(e.target.value);
            setIndividualError("");
            setIndividualResult(null);
          }}
          placeholder="client@company.com"
          className="bg-[var(--portal-card)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] placeholder-[var(--portal-text-faint)] px-3 py-2 text-xs outline-none focus:border-[#f87444]/50 w-56"
        />
        <button
          type="button"
          onClick={handleIndividualSend}
          disabled={individualSending || !targetEmail.trim()}
          className="flex items-center gap-1.5 text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] bg-[var(--portal-border)] text-xs font-medium px-3 py-2 cursor-pointer disabled:opacity-50 transition-colors"
        >
          {individualSending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          Send Portal Info
        </button>
        {individualResult && !individualError && (
          <span
            className={`flex items-center gap-1.5 text-xs ${
              individualResult.sent > 0 ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {individualResult.sent > 0 ? "Sent" : "Send failed — check server logs"}
          </span>
        )}
      </div>
      {individualError && <p className="text-xs text-rose-400">{individualError}</p>}
      <p className="text-[11px] text-[var(--portal-text-faint)]">
        Send the portal info to one client at a time — handy for onboarding a new client individually.
      </p>

      <div className="pt-1">
        {result ? (
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-2 w-fit">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Sent to {result.sent} client{result.sent === 1 ? "" : "s"}
            {result.failed.length > 0 && ` (${result.failed.length} failed)`}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            disabled={activeCount === 0}
            className="flex items-center gap-1.5 bg-[#f87444]/15 hover:bg-[#f87444]/25 text-[#f87444] text-xs font-medium px-3 py-2 cursor-pointer disabled:opacity-50 transition-colors"
          >
            <Megaphone className="w-3.5 h-3.5" />
            Announce Portal to All Clients
          </button>
        )}
        {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
      </div>

      <ConfirmDialog
        open={open}
        title="Send the portal announcement?"
        message={`This emails all ${activeCount} active client${activeCount === 1 ? "" : "s"} with their sign-in email and a one-click link to the portal. This cannot be undone.`}
        confirmLabel="Send"
        destructive={false}
        loading={sending}
        onConfirm={handleSend}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}
