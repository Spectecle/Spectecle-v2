"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";

export function ViewAsClientButton({ userId }: { userId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/portal/admin/impersonate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) {
        setError("Failed to start preview");
        return;
      }
      router.push("/portal/dashboard");
    } catch {
      setError("Failed to start preview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="flex items-center gap-1.5 text-xs font-semibold text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] border border-[var(--portal-border)] hover:border-[var(--portal-border-strong)] px-3 py-1.5 cursor-pointer transition-colors disabled:opacity-60"
      >
        <Eye className="w-3.5 h-3.5" />
        {loading ? "Loading…" : "View Client Portal"}
      </button>
      {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
    </div>
  );
}
