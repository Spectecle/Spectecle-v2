"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/portal/ConfirmDialog";

export function DeleteSnapshotButton({
  organizationId,
  snapshotId,
  monthLabel,
}: {
  organizationId: string;
  snapshotId: string;
  monthLabel: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [, startTransition] = useTransition();

  const handleDelete = async () => {
    setDeleting(true);
    const res = await fetch(
      `/api/portal/admin/organizations/${organizationId}/analytics?snapshotId=${snapshotId}`,
      { method: "DELETE" }
    );
    setDeleting(false);
    setOpen(false);
    if (res.ok) {
      startTransition(() => router.refresh());
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-[var(--portal-text-faint)] hover:text-rose-400 transition-colors cursor-pointer"
        aria-label={`Delete ${monthLabel} snapshot`}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>

      <ConfirmDialog
        open={open}
        title="Delete this snapshot?"
        message={`This will remove the ${monthLabel} analytics entry. This cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}
