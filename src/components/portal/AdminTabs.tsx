import Link from "next/link";

export type AdminTab = {
  value: string;
  label: string;
  count?: number;
};

/** Sibling to StatusTabs.tsx — same visual/active-state treatment, but a
 * plain section switcher rather than a status filter: no forced count
 * badge on every tab (an "Overview" tab has no natural count the way
 * "Tickets" does), and its own query param name/default so it can sit
 * alongside StatusTabs on the same page without colliding. */
export function AdminTabs({
  tabs,
  active,
  paramName = "tab",
  defaultValue,
}: {
  tabs: AdminTab[];
  active: string;
  paramName?: string;
  defaultValue?: string;
}) {
  return (
    <div className="flex items-center gap-1.5 mb-6 overflow-x-auto border-b border-[var(--portal-border)]">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <Link
            key={tab.value}
            href={tab.value === defaultValue ? "?" : `?${paramName}=${tab.value}`}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer border-b-2 -mb-px ${
              isActive
                ? "text-[var(--portal-accent)] border-[var(--portal-accent)]"
                : "text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] border-transparent"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`text-xs rounded-full px-1.5 py-0.5 ${
                  isActive ? "bg-[var(--portal-accent)]/20" : "bg-[var(--portal-border)]"
                }`}
              >
                {tab.count}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
