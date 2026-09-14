import Link from "next/link";

export type StatusTab = {
  value: string;
  label: string;
  count: number;
};

export function StatusTabs({
  tabs,
  active,
  paramName = "status",
  defaultValue = "all",
  extraParams,
}: {
  tabs: StatusTab[];
  active: string;
  paramName?: string;
  defaultValue?: string;
  /** Other query params on the current page (e.g. `{ section: "requests" }`
   * or `{ tab: "tickets" }`) to preserve on every tab link -- without this,
   * clicking a status tab drops any other param the page relies on. */
  extraParams?: Record<string, string>;
}) {
  const buildHref = (value: string) => {
    const params = new URLSearchParams(extraParams);
    if (value !== defaultValue) params.set(paramName, value);
    const qs = params.toString();
    return qs ? `?${qs}` : "?";
  };

  return (
    <div className="flex items-center gap-1.5 mb-4 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <Link
            key={tab.value}
            href={buildHref(tab.value)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
              isActive
                ? "bg-[var(--portal-accent)]/15 text-[var(--portal-accent)] border border-[var(--portal-accent)]/30"
                : "text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] border border-transparent hover:border-[var(--portal-border)]"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs rounded-full px-1.5 py-0.5 ${
                isActive ? "bg-[var(--portal-accent)]/20" : "bg-[var(--portal-border)]"
              }`}
            >
              {tab.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
