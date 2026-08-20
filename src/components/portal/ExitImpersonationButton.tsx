"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function ExitImpersonationButton() {
  const router = useRouter();
  const [stopping, setStopping] = useState(false);
  const [, startTransition] = useTransition();

  const handleStop = async () => {
    setStopping(true);
    await fetch("/api/portal/admin/impersonate", { method: "DELETE" });
    startTransition(() => {
      router.push("/portal/admin");
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleStop}
      disabled={stopping}
      className="flex items-center gap-1.5 text-sm text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] transition-colors cursor-pointer disabled:opacity-60"
    >
      <LogOut className="w-3.5 h-3.5" />
      {stopping ? "Exiting…" : "Exit Preview"}
    </button>
  );
}
