"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/portal/ConfirmDialog";

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
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [, startTransition] = useTransition();

  const handleDelete = async () => {
    setDeleting(true);
    const res = await fetch(`/api/portal/admin/users/${userId}`, { method: "DELETE" });
    setDeleting(false);
    setOpen(false);
    if (res.ok) {
      startTransition(() => router.refresh());
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Failed to delete user");
    }
  };

  const ticketNote =
    ticketCount > 0
      ? ` and their ${ticketCount} ticket${ticketCount === 1 ? "" : "s"} (including all messages and files)`
      : "";

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setError("");
          setOpen(true);
        }}
        className="flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-1.5 cursor-pointer text-[var(--portal-text-muted)] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
        Delete
      </button>
      {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}

      <ConfirmDialog
        open={open}
        title="Permanently delete this user?"
        message={`This will delete ${email}${ticketNote}. This cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}
