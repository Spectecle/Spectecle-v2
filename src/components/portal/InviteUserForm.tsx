"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Loader2 } from "lucide-react";

export function InviteUserForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [warning, setWarning] = useState("");
  const [, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setWarning("");
    try {
      const res = await fetch("/api/portal/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setStatus("error");
        return;
      }
      if (data?.emailWarning) setWarning(data.emailWarning);
      setEmail("");
      setStatus("idle");
      startTransition(() => router.refresh());
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="client@company.com"
          className={`bg-[var(--portal-card)] border ${
            status === "error" ? "border-rose-500/60" : "border-[var(--portal-border)]"
          } text-[var(--portal-text-primary)] placeholder-[var(--portal-text-faint)] rounded-lg px-3 py-2 text-xs outline-none focus:border-[#D25124]/50 w-56`}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex items-center gap-1.5 bg-[#D25124]/15 hover:bg-[#D25124]/25 text-[#F07A3A] text-xs font-medium rounded-lg px-3 py-2 cursor-pointer disabled:opacity-60 transition-colors"
        >
          {status === "submitting" ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <UserPlus className="w-3.5 h-3.5" />
          )}
          Add User
        </button>
      </form>
      {warning && <p className="text-xs text-amber-400 mt-1.5">{warning}</p>}
    </div>
  );
}
