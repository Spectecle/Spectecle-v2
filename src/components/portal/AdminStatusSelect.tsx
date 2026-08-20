"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
  { value: "deleted", label: "Delete" },
];

export function AdminStatusSelect({
  requestId,
  status,
}: {
  requestId: string;
  status: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [isPending, startTransition] = useTransition();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value;
    setValue(next);
    const res = await fetch(`/api/portal/admin/requests/${requestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok) {
      startTransition(() => router.refresh());
    } else {
      setValue(status);
    }
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={isPending}
      className="bg-[var(--portal-card)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] px-3 py-1.5 text-sm cursor-pointer outline-none focus:border-[#f87444]/50 disabled:opacity-60"
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
