"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Check, X, Loader2 } from "lucide-react";

export function OrganizationNameEditor({
  id,
  domain,
  name,
  websiteUrl,
}: {
  id: string | null;
  domain: string | null;
  name: string;
  websiteUrl: string | null;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);
  const [website, setWebsite] = useState(websiteUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [, startTransition] = useTransition();

  const handleSave = async () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/portal/admin/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, domain, name: trimmed, websiteUrl: website.trim() }),
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
      <div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") setEditing(false);
            }}
            placeholder="Business name"
            autoFocus
            className="bg-[var(--portal-card)] border border-[var(--portal-border-strong)] text-[var(--portal-text-primary)] px-2 py-1 text-sm outline-none focus:border-[#f87444]/50 w-44"
          />
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") setEditing(false);
            }}
            placeholder="Website (optional)"
            className="bg-[var(--portal-card)] border border-[var(--portal-border-strong)] text-[var(--portal-text-primary)] px-2 py-1 text-sm outline-none focus:border-[#f87444]/50 w-44"
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
              setValue(name);
              setWebsite(websiteUrl ?? "");
              setEditing(false);
              setError("");
            }}
            className="p-1.5 text-[var(--portal-text-muted)] hover:bg-[var(--portal-border)] cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className="flex items-center gap-1.5 text-left cursor-pointer group"
    >
      <span className="text-sm font-semibold text-[var(--portal-text-primary)]">{name}</span>
      <Pencil className="w-3 h-3 text-[var(--portal-text-faint)] opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
