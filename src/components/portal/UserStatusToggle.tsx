"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ShieldOff, ShieldCheck, Loader2 } from "lucide-react";

export function UserStatusToggle({
  userId,
  status,
}: {
  userId: string;
  status: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    const next = value === "active" ? "revoked" : "active";
    setLoading(true);
    const res = await fetch(`/api/portal/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setLoading(false);
    if (res.ok) {
      setValue(next);
      startTransition(() => router.refresh());
    }
  };

  const isActive = value === "active";

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading || isPending}
      className={`flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-1.5 cursor-pointer disabled:opacity-60 transition-colors ${
        isActive
          ? "bg-[var(--portal-border)] text-[var(--portal-text-secondary)] hover:text-rose-400 hover:bg-rose-500/10"
          : "bg-rose-500/10 text-rose-400 hover:text-emerald-400 hover:bg-emerald-500/10"
      }`}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : isActive ? (
        <ShieldOff className="w-3.5 h-3.5" />
      ) : (
        <ShieldCheck className="w-3.5 h-3.5" />
      )}
      {isActive ? "Revoke" : "Reactivate"}
    </button>
  );
}
