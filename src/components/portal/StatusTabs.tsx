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
}: {
  tabs: StatusTab[];
  active: string;
  paramName?: string;
  defaultValue?: string;
}) {
  return (
    <div className="flex items-center gap-1.5 mb-4 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <Link
            key={tab.value}
            href={tab.value === defaultValue ? "?" : `?${paramName}=${tab.value}`}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              isActive
                ? "bg-[#D25124]/15 text-[#F07A3A] border border-[#D25124]/30"
                : "text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] border border-transparent hover:border-[var(--portal-border)]"
            }`}
          >
            {tab.label}
            <span
              className={`text-[10px] rounded-full px-1.5 py-0.5 ${
                isActive ? "bg-[#D25124]/20" : "bg-[var(--portal-border)]"
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
