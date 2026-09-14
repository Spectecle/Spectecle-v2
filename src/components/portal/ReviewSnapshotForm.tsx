"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import type { HighlightedReview } from "@/lib/reviews-snapshots";

function currentMonthValue(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function ReviewSnapshotForm({ organizationId }: { organizationId: string }) {
  const router = useRouter();
  const [periodMonth, setPeriodMonth] = useState(currentMonthValue());
  const [rating, setRating] = useState("");
  const [reviewCount, setReviewCount] = useState("");
  const [notes, setNotes] = useState("");
  const [highlightedReviews, setHighlightedReviews] = useState<HighlightedReview[]>([
    { reviewer: "", rating: 5, text: "" },
  ]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [, startTransition] = useTransition();

  const updateReview = (i: number, patch: Partial<HighlightedReview>) => {
    setHighlightedReviews((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch(`/api/portal/admin/organizations/${organizationId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          periodMonth,
          rating: rating.trim() ? Number(rating) : null,
          reviewCount: reviewCount.trim() ? Number(reviewCount) : null,
          notes: notes.trim() || null,
          highlightedReviews: highlightedReviews.filter((r) => r.reviewer.trim()),
        }),
      });
      if (!res.ok) {
        setError("Failed to save");
        return;
      }
      setSuccess(true);
      startTransition(() => router.refresh());
    } catch {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-[var(--portal-text-faint)] uppercase tracking-wide mb-1">
            Month
          </label>
          <input
            type="month"
            value={periodMonth}
            onChange={(e) => setPeriodMonth(e.target.value)}
            required
            className="w-full bg-[var(--portal-input-bg)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] px-2.5 py-1.5 text-sm outline-none focus:border-[#cb7c46]/50"
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--portal-text-faint)] uppercase tracking-wide mb-1">
            Rating
          </label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="e.g. 4.8"
            className="w-full bg-[var(--portal-input-bg)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] px-2.5 py-1.5 text-sm outline-none focus:border-[#cb7c46]/50"
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--portal-text-faint)] uppercase tracking-wide mb-1">
            Review Count
          </label>
          <input
            type="number"
            min="0"
            value={reviewCount}
            onChange={(e) => setReviewCount(e.target.value)}
            placeholder="—"
            className="w-full bg-[var(--portal-input-bg)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] px-2.5 py-1.5 text-sm outline-none focus:border-[#cb7c46]/50"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-[var(--portal-text-faint)] uppercase tracking-wide mb-1.5">
          Highlighted Reviews
        </label>
        <div className="space-y-2">
          {highlightedReviews.map((r, i) => (
            <div key={i} className="flex items-start gap-2">
              <input
                type="text"
                value={r.reviewer}
                onChange={(e) => updateReview(i, { reviewer: e.target.value })}
                placeholder="Reviewer name"
                className="w-40 bg-[var(--portal-input-bg)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] px-2.5 py-1.5 text-sm outline-none focus:border-[#cb7c46]/50"
              />
              <input
                type="number"
                min="0"
                max="5"
                step="0.5"
                value={r.rating}
                onChange={(e) => updateReview(i, { rating: Number(e.target.value) })}
                placeholder="Stars"
                className="w-20 bg-[var(--portal-input-bg)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] px-2.5 py-1.5 text-sm outline-none focus:border-[#cb7c46]/50"
              />
              <input
                type="text"
                value={r.text}
                onChange={(e) => updateReview(i, { text: e.target.value })}
                placeholder="Review text"
                className="flex-1 bg-[var(--portal-input-bg)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] px-2.5 py-1.5 text-sm outline-none focus:border-[#cb7c46]/50"
              />
              <button
                type="button"
                onClick={() => setHighlightedReviews((prev) => prev.filter((_, idx) => idx !== i))}
                className="p-1.5 text-[var(--portal-text-faint)] hover:text-rose-400 cursor-pointer"
                aria-label="Remove review"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setHighlightedReviews((prev) => [...prev, { reviewer: "", rating: 5, text: "" }])}
          className="flex items-center gap-1.5 text-sm text-[#cb7c46] hover:text-[#cb7c46]/80 mt-2 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Add review
        </button>
      </div>

      <div>
        <label className="block text-xs text-[var(--portal-text-faint)] uppercase tracking-wide mb-1">
          Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="Anything worth highlighting for the client this month…"
          className="w-full bg-[var(--portal-input-bg)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] px-2.5 py-1.5 text-sm outline-none focus:border-[#cb7c46]/50 resize-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#cb7c46]/15 hover:bg-[#cb7c46]/25 text-[#cb7c46] text-sm font-semibold px-4 py-2 cursor-pointer transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Snapshot"}
        </button>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        {success && !error && <p className="text-sm text-emerald-400">Saved.</p>}
      </div>
    </form>
  );
}
