"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Phone, MapPin, Star, ExternalLink, Trash2, Pencil, Check, X, Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/portal/ConfirmDialog";
import type { Prospect, ProspectStatus } from "@/lib/prospects";

const STATUS_LABELS: Record<ProspectStatus, string> = {
  new: "New",
  contacted: "Contacted",
  not_interested: "Not Interested",
  converted: "Converted",
};

const STATUS_STYLES: Record<ProspectStatus, string> = {
  new: "bg-sky-500/10 text-sky-400",
  contacted: "bg-amber-500/10 text-amber-400",
  not_interested: "bg-rose-500/10 text-rose-400",
  converted: "bg-emerald-500/10 text-emerald-400",
};

export function ProspectCard({ prospect }: { prospect: Prospect }) {
  const router = useRouter();
  const [status, setStatus] = useState(prospect.status);
  const [statusSaving, setStatusSaving] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState(prospect.notes ?? "");
  const [notesSaving, setNotesSaving] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [, startTransition] = useTransition();

  const handleStatusChange = async (next: ProspectStatus) => {
    setStatus(next);
    setStatusSaving(true);
    const res = await fetch(`/api/portal/admin/prospects/${prospect.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setStatusSaving(false);
    if (res.ok) startTransition(() => router.refresh());
  };

  const handleSaveNotes = async () => {
    setNotesSaving(true);
    const res = await fetch(`/api/portal/admin/prospects/${prospect.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    setNotesSaving(false);
    if (res.ok) {
      setEditingNotes(false);
      startTransition(() => router.refresh());
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    const res = await fetch(`/api/portal/admin/prospects/${prospect.id}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteOpen(false);
    if (res.ok) startTransition(() => router.refresh());
  };

  return (
    <div className="glass border border-[var(--portal-border)] p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-[var(--portal-text-primary)]">{prospect.business_name}</h3>
            {prospect.category && (
              <span className="text-xs text-[var(--portal-text-faint)] bg-[var(--portal-border)] px-2 py-0.5 rounded-full capitalize">
                {prospect.category}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap text-xs text-[var(--portal-text-muted)]">
            {prospect.address && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {prospect.address}
              </span>
            )}
            {prospect.phone && (
              <a
                href={`tel:${prospect.phone}`}
                className="flex items-center gap-1 text-[var(--portal-accent)] hover:underline cursor-pointer"
              >
                <Phone className="w-3 h-3" />
                {prospect.phone}
              </a>
            )}
            {prospect.rating !== null && (
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-current text-amber-400" />
                {prospect.rating.toFixed(1)}
                {prospect.review_count !== null ? ` (${prospect.review_count})` : ""}
              </span>
            )}
            <a
              href={`https://www.google.com/maps/place/?q=place_id:${prospect.place_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[var(--portal-text-secondary)] cursor-pointer"
            >
              <ExternalLink className="w-3 h-3" />
              View on Maps
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as ProspectStatus)}
            disabled={statusSaving}
            className={`text-xs font-medium rounded-full px-2.5 py-1 outline-none cursor-pointer disabled:opacity-60 border-0 ${STATUS_STYLES[status]}`}
          >
            {(Object.keys(STATUS_LABELS) as ProspectStatus[]).map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="p-1.5 text-[var(--portal-text-muted)] hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer transition-colors"
            aria-label="Delete prospect"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-[var(--portal-border)]">
        {editingNotes ? (
          <div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Call notes…"
              rows={2}
              autoFocus
              className="w-full bg-[var(--portal-input-bg)] border border-[var(--portal-border-strong)] text-[var(--portal-text-primary)] px-2 py-1.5 text-sm outline-none focus:border-[var(--portal-accent)]/50 resize-none"
            />
            <div className="flex items-center gap-1.5 mt-1.5">
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={notesSaving}
                className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 cursor-pointer disabled:opacity-60"
              >
                {notesSaving ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setNotes(prospect.notes ?? "");
                  setEditingNotes(false);
                }}
                className="p-1.5 text-[var(--portal-text-muted)] hover:bg-[var(--portal-border)] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditingNotes(true)}
            className="flex items-center gap-1.5 text-left cursor-pointer group"
          >
            <span className="text-xs text-[var(--portal-text-muted)]">
              {prospect.notes || "Add call notes…"}
            </span>
            <Pencil className="w-3 h-3 text-[var(--portal-text-faint)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        )}
      </div>

      <ConfirmDialog
        open={deleteOpen}
        title="Remove this prospect?"
        message={`This will permanently remove ${prospect.business_name} from your prospect list.`}
        confirmLabel="Remove"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}
