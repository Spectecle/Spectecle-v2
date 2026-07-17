const STATUS_STYLES: Record<string, string> = {
  new: "bg-[#D25124]/10 text-[#F07A3A] border-[#D25124]/20",
  in_progress: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  done: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  deleted: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  in_progress: "In Progress",
  done: "Done",
  deleted: "Deleted",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
        STATUS_STYLES[status] ?? "bg-[var(--portal-border)] text-[var(--portal-text-secondary)] border-[var(--portal-border)]"
      }`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
