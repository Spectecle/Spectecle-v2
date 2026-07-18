"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ExternalLink, Building2 } from "lucide-react";
import { InviteUserForm } from "@/components/portal/InviteUserForm";
import { UserStatusToggle } from "@/components/portal/UserStatusToggle";
import { UserDeleteButton } from "@/components/portal/UserDeleteButton";
import { OrganizationNameEditor } from "@/components/portal/OrganizationNameEditor";
import { AnnouncePortalButton } from "@/components/portal/AnnouncePortalButton";
import { groupByOrganization, type OrgUser } from "@/lib/organizations";

export function UserManagementPanel({
  users,
  orgNames,
  ticketCountByUserId,
}: {
  users: OrgUser[];
  orgNames: Record<string, string>;
  ticketCountByUserId: Record<string, number>;
}) {
  const [search, setSearch] = useState("");

  const groups = useMemo(
    () => groupByOrganization(users, orgNames, ticketCountByUserId),
    [users, orgNames, ticketCountByUserId]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return groups;
    return groups.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.domain.includes(q) ||
        g.users.some((u) => u.email.toLowerCase().includes(q))
    );
  }, [groups, search]);

  const activeCount = users.filter((u) => u.status === "active").length;

  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl border border-[var(--portal-border)] p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-3.5 h-3.5 text-[var(--portal-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search organizations or users…"
              className="w-full bg-[var(--portal-card)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] placeholder-[var(--portal-text-faint)] rounded-lg pl-8 pr-3 py-2 text-xs outline-none focus:border-[#D25124]/50"
            />
          </div>
          <InviteUserForm />
        </div>
        <div className="pt-4 border-t border-[var(--portal-border)]">
          <AnnouncePortalButton activeCount={activeCount} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl border border-[var(--portal-border)] p-10 text-center">
          <p className="text-[var(--portal-text-muted)] text-sm">No organizations match your search.</p>
        </div>
      ) : (
        filtered.map((group) => (
          <div
            key={group.domain}
            className="glass rounded-2xl border border-[var(--portal-border)] p-6"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap mb-4 pb-4 border-b border-[var(--portal-border)]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D25124]/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-[#F07A3A]" />
                </div>
                <div>
                  <OrganizationNameEditor domain={group.domain} name={group.name} />
                  <p className="text-[10px] text-[var(--portal-text-faint)]">
                    {group.domain} · {group.users.length} user{group.users.length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
              <Link
                href={`?section=requests&org=${encodeURIComponent(group.domain)}`}
                className="flex items-center gap-1.5 text-xs text-[#F07A3A] hover:text-[#D25124] bg-[#D25124]/10 rounded-lg px-3 py-1.5 cursor-pointer transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View All Tickets ({group.ticketCount})
              </Link>
            </div>

            <div className="divide-y divide-[var(--portal-border)]">
              {group.users.map((u) => (
                <div key={u.id} className="flex items-center justify-between gap-4 py-2.5">
                  <div className="min-w-0">
                    <p className="text-sm text-[var(--portal-text-primary)] truncate">{u.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-[10px] rounded-full px-2 py-0.5 ${
                          u.status === "active"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-rose-500/10 text-rose-400"
                        }`}
                      >
                        {u.status === "active" ? "Active" : "Revoked"}
                      </span>
                      <span className="text-[10px] text-[var(--portal-text-muted)]">
                        {ticketCountByUserId[u.id] ?? 0} ticket
                        {(ticketCountByUserId[u.id] ?? 0) === 1 ? "" : "s"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`?section=requests&user=${encodeURIComponent(u.email)}`}
                      className="flex items-center gap-1.5 text-xs text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] rounded-lg px-3 py-1.5 cursor-pointer transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Tickets
                    </Link>
                    <UserStatusToggle userId={u.id} status={u.status} />
                    <UserDeleteButton
                      userId={u.id}
                      email={u.email}
                      ticketCount={ticketCountByUserId[u.id] ?? 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
