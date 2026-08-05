"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ExternalLink, Building2, UserPlus } from "lucide-react";
import { UserStatusToggle } from "@/components/portal/UserStatusToggle";
import { UserDeleteButton } from "@/components/portal/UserDeleteButton";
import { OrganizationNameEditor } from "@/components/portal/OrganizationNameEditor";
import { AnnouncePortalButton } from "@/components/portal/AnnouncePortalButton";
import { groupByOrganization, type OrgUser, type OrgRecord } from "@/lib/organizations";

export function UserManagementPanel({
  users,
  orgNames,
  orgsById,
  ticketCountByUserId,
}: {
  users: OrgUser[];
  orgNames: Record<string, string>;
  orgsById: Record<string, OrgRecord>;
  ticketCountByUserId: Record<string, number>;
}) {
  const [search, setSearch] = useState("");

  const groups = useMemo(
    () => groupByOrganization(users, orgNames, ticketCountByUserId, orgsById),
    [users, orgNames, ticketCountByUserId, orgsById]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return groups;
    return groups.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        (g.domain ?? "").includes(q) ||
        g.users.some((u) => u.email.toLowerCase().includes(q))
    );
  }, [groups, search]);

  const activeCount = users.filter((u) => u.status === "active").length;

  return (
    <div className="space-y-4">
      <div className="glass border border-[var(--portal-border)] p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-3.5 h-3.5 text-[var(--portal-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search organizations or users…"
              className="w-full bg-[var(--portal-card)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] placeholder-[var(--portal-text-faint)] pl-8 pr-3 py-2 text-xs outline-none focus:border-[#c69947]/50"
            />
          </div>
          <Link
            href="/portal/admin/clients/new"
            className="flex items-center gap-1.5 bg-[#c69947]/15 hover:bg-[#c69947]/25 text-[#c69947] text-xs font-medium px-3 py-2 cursor-pointer transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Add Client
          </Link>
        </div>
        <div className="pt-4 border-t border-[var(--portal-border)]">
          <AnnouncePortalButton activeCount={activeCount} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass border border-[var(--portal-border)] p-10 text-center">
          <p className="text-[var(--portal-text-muted)] text-sm">No organizations match your search.</p>
        </div>
      ) : (
        filtered.map((group) => (
          <div
            key={group.key}
            className="glass border border-[var(--portal-border)] p-6"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap mb-4 pb-4 border-b border-[var(--portal-border)]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#c69947]/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-[#c69947]" />
                </div>
                <div>
                  <OrganizationNameEditor
                    id={group.id}
                    domain={group.domain}
                    name={group.name}
                    websiteUrl={group.websiteUrl}
                  />
                  <p className="text-[10px] text-[var(--portal-text-faint)]">
                    {group.websiteUrl ?? group.domain} · {group.users.length} user
                    {group.users.length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
              <Link
                href={`?section=requests&org=${encodeURIComponent(group.key)}`}
                className="flex items-center gap-1.5 text-xs text-[#c69947] hover:text-[#c69947] bg-[#c69947]/10 px-3 py-1.5 cursor-pointer transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View All Tickets ({group.ticketCount})
              </Link>
            </div>

            <div className="divide-y divide-[var(--portal-border)]">
              {group.users.map((u) => (
                <div key={u.id} className="flex items-center justify-between gap-4 py-2.5">
                  <div className="min-w-0">
                    <p className="text-sm text-[var(--portal-text-primary)] truncate">
                      {u.name ? `${u.name} · ${u.email}` : u.email}
                    </p>
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
                      href={`/portal/admin/clients/${u.id}`}
                      className="flex items-center gap-1.5 text-xs text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] px-3 py-1.5 cursor-pointer transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Client
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
