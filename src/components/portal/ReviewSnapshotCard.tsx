import { Star } from "lucide-react";
import type { ReviewSnapshot } from "@/lib/reviews-snapshots";

function formatMonth(periodMonth: string): string {
  const [year, month] = periodMonth.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < Math.round(rating) ? "fill-[#cb7c46] text-[#cb7c46]" : "text-[var(--portal-border)]"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewSnapshotCard({
  snapshot,
  actions,
}: {
  snapshot: ReviewSnapshot;
  actions?: React.ReactNode;
}) {
  return (
    <div className="glass border border-[var(--portal-border)] p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <p className="text-sm font-semibold text-[var(--portal-text-primary)]">
          {formatMonth(snapshot.period_month)}
        </p>
        {actions}
      </div>

      <div className="flex gap-8 mb-3">
        <div>
          <p className="text-2xl font-light text-[#cb7c46]" style={{ fontFamily: "var(--font-serif, inherit)" }}>
            {snapshot.rating !== null ? snapshot.rating.toFixed(1) : "—"}
          </p>
          <p className="text-xs text-[var(--portal-text-faint)] uppercase tracking-wide">Rating</p>
        </div>
        <div>
          <p className="text-2xl font-light text-[#cb7c46]" style={{ fontFamily: "var(--font-serif, inherit)" }}>
            {snapshot.review_count ?? "—"}
          </p>
          <p className="text-xs text-[var(--portal-text-faint)] uppercase tracking-wide">Reviews</p>
        </div>
      </div>

      {snapshot.highlighted_reviews.length > 0 && (
        <div className="mb-3 space-y-3">
          <p className="text-xs text-[var(--portal-text-faint)] uppercase tracking-wide">
            Highlighted Reviews
          </p>
          {snapshot.highlighted_reviews.map((r, i) => (
            <div key={i} className="border-l-2 border-[var(--portal-border)] pl-3">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-sm font-medium text-[var(--portal-text-primary)]">{r.reviewer}</span>
                <Stars rating={r.rating} />
              </div>
              {r.text && <p className="text-sm text-[var(--portal-text-secondary)] leading-relaxed">&ldquo;{r.text}&rdquo;</p>}
            </div>
          ))}
        </div>
      )}

      {snapshot.notes && (
        <p className="text-sm text-[var(--portal-text-muted)] leading-relaxed pt-2 border-t border-[var(--portal-border)]">
          {snapshot.notes}
        </p>
      )}
    </div>
  );
}
