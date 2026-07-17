"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export function UserDeleteButton({
  userId,
  email,
  ticketCount,
}: {
  userId: string;
  email: string;
  ticketCount: number;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [, startTransition] = useTransition();

  const handleDelete = async () => {
    const ticketNote =
      ticketCount > 0
        ? ` and their ${ticketCount} ticket${ticketCount === 1 ? "" : "s"} (including all messages and files)`
        : "";
    const confirmed = window.confirm(
      `Permanently delete ${email}${ticketNote}? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeleting(true);
    const res = await fetch(`/api/portal/admin/users/${userId}`, { method: "DELETE" });
    setDeleting(false);
    if (res.ok) {
      startTransition(() => router.refresh());
    } else {
      const data = await res.json().catch(() => null);
      alert(data?.error ?? "Failed to delete user");
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-1.5 cursor-pointer disabled:opacity-60 text-[var(--portal-text-muted)] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
    >
      {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
      Delete
    </button>
  );
}
