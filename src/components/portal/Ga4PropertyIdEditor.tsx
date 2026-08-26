"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Check, X, Loader2 } from "lucide-react";

export function Ga4PropertyIdEditor({
  organizationId,
  domain,
  orgName,
  websiteUrl,
  currentPropertyId,
}: {
  organizationId: string;
  domain: string | null;
  orgName: string;
  websiteUrl: string | null;
  currentPropertyId: string | null;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(currentPropertyId ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [, startTransition] = useTransition();

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/portal/admin/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: organizationId,
          domain,
          name: orgName,
          websiteUrl,
          ga4PropertyId: value.trim() || null,
        }),
      });
      if (!res.ok) {
        setError("Failed to save");
        return;
      }
      setEditing(false);
      startTransition(() => router.refresh());
    } catch {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <div className="mb-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") setEditing(false);
            }}
            placeholder="GA4 property ID, e.g. 123456789"
            autoFocus
            className="bg-[var(--portal-input-bg)] border border-[var(--portal-border-strong)] text-[var(--portal-text-primary)] px-2 py-1 text-sm outline-none focus:border-[#cb7c46]/50 w-56"
          />
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 cursor-pointer disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => {
              setValue(currentPropertyId ?? "");
              setEditing(false);
              setError("");
            }}
            className="p-1.5 text-[var(--portal-text-muted)] hover:bg-[var(--portal-border)] cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        {error && <p className="text-sm text-rose-400 mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className="flex items-center gap-1.5 text-left cursor-pointer group mb-4"
    >
      <span className="text-sm text-[var(--portal-text-muted)]">
        GA4 Property:{" "}
        <span className="text-[var(--portal-text-secondary)]">{currentPropertyId ?? "Not connected"}</span>
      </span>
      <Pencil className="w-3 h-3 text-[var(--portal-text-faint)] opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
