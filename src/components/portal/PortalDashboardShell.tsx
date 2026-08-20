"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronLeft, Inbox, BarChart3, Radar, Receipt } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import { SignOutButton } from "@/components/portal/SignOutButton";
import { ExitImpersonationButton } from "@/components/portal/ExitImpersonationButton";

const NAV_ITEMS = [
  { value: "requests", label: "Requests", icon: Inbox },
  { value: "analytics", label: "Analytics", icon: BarChart3 },
  { value: "reports", label: "Reports", icon: Radar },
  { value: "invoices", label: "Invoices", icon: Receipt },
];

export function PortalDashboardShell({
  active,
  email,
  impersonating = false,
  children,
}: {
  active: string;
  email: string;
  impersonating?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative">
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-[var(--portal-card)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] cursor-pointer shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100%-4rem)] bg-[var(--portal-surface)] border-r border-[var(--portal-border)] transition-all duration-300 ease-in-out z-40 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${isCollapsed ? "lg:w-20" : "lg:w-64"} w-64`}
      >
        <div className="flex items-center justify-end p-3 border-b border-[var(--portal-border)]">
          <button
            type="button"
            onClick={() => setIsCollapsed((v) => !v)}
            className="hidden lg:block p-1.5 text-[var(--portal-text-muted)] hover:text-[var(--portal-text-primary)] cursor-pointer transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              size={18}
              className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.value;
            return (
              <Link
                key={item.value}
                href={`/portal/dashboard?section=${item.value}`}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#f87444]/15 text-[#f87444]"
                    : "text-[var(--portal-text-secondary)] hover:bg-[var(--portal-border)] hover:text-[var(--portal-text-primary)]"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
                {isActive && !isCollapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#f87444]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--portal-border)]">
          <div className="flex items-center gap-2.5 mb-3">
            <LogoMark className="w-7 h-7 shrink-0" />
            {!isCollapsed && (
              <p className="text-sm text-[var(--portal-text-muted)] truncate">{email}</p>
            )}
          </div>
          {!isCollapsed && (impersonating ? <ExitImpersonationButton /> : <SignOutButton />)}
        </div>
      </aside>

      {/* Content area, offset for the sidebar on desktop */}
      <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? "lg:pl-20" : "lg:pl-64"}`}>
        {children}
      </div>
    </div>
  );
}
