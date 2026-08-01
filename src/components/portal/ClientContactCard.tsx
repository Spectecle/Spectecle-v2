"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Check, X, Loader2, Phone, User } from "lucide-react";
import { inputClass } from "@/components/portal/DynamicField";
import type { OrgRecord } from "@/lib/organizations";

type OrgMode = "existing" | "new";

export function ClientContactCard({
  userId,
  initialName,
  initialPhone,
  organizationId,
  orgs,
}: {
  userId: string;
  initialName: string | null;
  initialPhone: string | null;
  organizationId: string | null;
  orgs: OrgRecord[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initialName ?? "");
  const [phone, setPhone] = useState(initialPhone ?? "");
  const [orgMode, setOrgMode] = useState<OrgMode>("existing");
  const [selectedOrgId, setSelectedOrgId] = useState(organizationId ?? "");
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgWebsite, setNewOrgWebsite] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [, startTransition] = useTransition();

  const reset = () => {
    setName(initialName ?? "");
    setPhone(initialPhone ?? "");
    setOrgMode("existing");
    setSelectedOrgId(organizationId ?? "");
    setNewOrgName("");
    setNewOrgWebsite("");
    setError("");
  };

  const handleSave = async () => {
    if (orgMode === "existing" && !selectedOrgId) {
      setError("Select a business");
      return;
    }
    if (orgMode === "new" && !newOrgName.trim()) {
      setError("Enter a business name");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/portal/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          organizationId: orgMode === "existing" ? selectedOrgId : undefined,
          newOrganization:
            orgMode === "new" ? { name: newOrgName, websiteUrl: newOrgWebsite } : undefined,
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

  if (!editing) {
    return (
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <p className="flex items-center gap-2 text-sm text-[var(--portal-text-secondary)]">
            <User className="w-3.5 h-3.5 text-[var(--portal-text-faint)]" />
            {initialName || <span className="text-[var(--portal-text-faint)]">No contact name</span>}
          </p>
          <p className="flex items-center gap-2 text-sm text-[var(--portal-text-secondary)]">
            <Phone className="w-3.5 h-3.5 text-[var(--portal-text-faint)]" />
            {initialPhone || <span className="text-[var(--portal-text-faint)]">No phone</span>}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="flex items-center gap-1.5 text-xs text-[var(--portal-text-muted)] hover:text-[var(--portal-text-primary)] cursor-pointer shrink-0"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contact name"
          className={inputClass(false)}
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          className={inputClass(false)}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
          Business
        </label>
        <div className="flex gap-2 mb-3">
          {(["existing", "new"] as OrgMode[]).map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => setOrgMode(m)}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                orgMode === m
                  ? "bg-[#D25124]/15 border-[#D25124]/40 text-[#F07A3A]"
                  : "bg-[var(--portal-card)] border-[var(--portal-border)] text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)]"
              }`}
            >
              {m === "existing" ? "Existing Business" : "New Business"}
            </button>
          ))}
        </div>
        {orgMode === "existing" ? (
          <select
            value={selectedOrgId}
            onChange={(e) => setSelectedOrgId(e.target.value)}
            className={`${inputClass(false)} cursor-pointer`}
          >
            <option value="" disabled>Select a business</option>
            {orgs.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
                {o.website_url ? ` — ${o.website_url}` : o.domain ? ` — ${o.domain}` : ""}
              </option>
            ))}
          </select>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
              placeholder="Business name"
              className={inputClass(false)}
            />
            <input
              type="text"
              value={newOrgWebsite}
              onChange={(e) => setNewOrgWebsite(e.target.value)}
              placeholder="Website (optional)"
              className={inputClass(false)}
            />
          </div>
        )}
      </div>

      {error && <p className="text-xs text-rose-400">{error}</p>}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 bg-[#D25124]/15 hover:bg-[#D25124]/25 text-[#F07A3A] text-xs font-medium rounded-lg px-3 py-2 cursor-pointer disabled:opacity-60 transition-colors"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            reset();
            setEditing(false);
          }}
          className="flex items-center gap-1.5 text-xs text-[var(--portal-text-muted)] hover:text-[var(--portal-text-primary)] rounded-lg px-3 py-2 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
          Cancel
        </button>
      </div>
    </div>
  );
}
