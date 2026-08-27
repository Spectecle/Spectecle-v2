import Link from "next/link";

export function StatCard({
  label,
  value,
  icon: Icon,
  href,
  unavailable,
  error,
}: {
  label: string;
  value: number | null;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  unavailable?: boolean;
  error?: boolean;
}) {
  const content = (
    <div className="glass border border-[var(--portal-border)] p-5 h-full">
      <div className="flex items-center justify-between mb-3">
        <Icon className="w-4 h-4 text-[var(--portal-text-faint)]" />
      </div>
      <p className="text-3xl font-light text-[#cb7c46]" style={{ fontFamily: "var(--font-serif, inherit)" }}>
        {unavailable ? "—" : error ? "!" : (value ?? "—")}
      </p>
      <p className="text-sm text-[var(--portal-text-muted)] mt-1">
        {unavailable ? `${label} (not connected)` : error ? `${label} (fetch failed)` : label}
      </p>
    </div>
  );

  return href ? (
    <Link href={href} className="cursor-pointer">
      {content}
    </Link>
  ) : (
    content
  );
}
