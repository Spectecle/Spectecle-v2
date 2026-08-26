import type { AnalyticsSnapshot } from "@/lib/analytics-snapshots";

function formatMonth(periodMonth: string): string {
  const [year, month] = periodMonth.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function AnalyticsSnapshotCard({
  snapshot,
  showRankings,
  actions,
}: {
  snapshot: AnalyticsSnapshot;
  showRankings: boolean;
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
            {snapshot.visitors ?? "—"}
          </p>
          <p className="text-xs text-[var(--portal-text-faint)] uppercase tracking-wide">Visitors</p>
        </div>
        <div>
          <p className="text-2xl font-light text-[#cb7c46]" style={{ fontFamily: "var(--font-serif, inherit)" }}>
            {snapshot.page_views ?? "—"}
          </p>
          <p className="text-xs text-[var(--portal-text-faint)] uppercase tracking-wide">Page Views</p>
        </div>
      </div>

      {showRankings && snapshot.rankings.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-[var(--portal-text-faint)] uppercase tracking-wide mb-1.5">
            Rankings
          </p>
          <ul className="space-y-1">
            {snapshot.rankings.map((r, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <span className="text-[var(--portal-text-secondary)]">{r.keyword}</span>
                <span className="text-[var(--portal-text-primary)] font-medium">
                  {r.position !== null ? `#${r.position}` : "Not ranking"}
                </span>
              </li>
            ))}
          </ul>
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
