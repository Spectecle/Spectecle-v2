import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Inbox, X, ArrowUpRight } from "lucide-react";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { getFilesForRequests } from "@/lib/request-files";
import { getMessagesForRequests } from "@/lib/request-messages";
import { TicketCard } from "@/components/portal/TicketCard";
import { UserManagementPanel } from "@/components/portal/UserManagementPanel";
import { StatusTabs, type StatusTab } from "@/components/portal/StatusTabs";
import { organizationKeyFor, prettifyDomain, type OrgRecord } from "@/lib/organizations";

type AdminRequest = {
  id: string;
  service_type: string;
  budget: string | null;
  message: string;
  status: string;
  created_at: string;
  details: Record<string, unknown>;
  user_id: string;
  portal_users:
    | { email: string; organization_id: string | null }
    | { email: string; organization_id: string | null }[]
    | null;
};

const ADMIN_TAB_STATUSES = new Set(["new", "in_progress", "done", "deleted"]);

function clientInfo(row: AdminRequest): { email: string; organization_id: string | null } {
  const rel = row.portal_users;
  if (!rel) return { email: "unknown", organization_id: null };
  return Array.isArray(rel) ? rel[0] ?? { email: "unknown", organization_id: null } : rel;
}

export default async function PortalAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; section?: string; user?: string; org?: string }>;
}) {
  const user = await getSession();
  if (!user) redirect("/portal/sign-in?next=/portal/admin");
  if (!isAdmin(user.email)) notFound();

  const {
    status: statusParam,
    section: sectionParam,
    user: userFilter,
    org: orgFilter,
  } = await searchParams;
  const section = sectionParam === "users" ? "users" : "requests";

  const { data: allRequests } = await supabase
    .from("service_requests")
    .select(
      "id, service_type, budget, message, status, created_at, details, user_id, portal_users(email, organization_id)"
    )
    .order("created_at", { ascending: false })
    .returns<AdminRequest[]>();

  const requests = allRequests ?? [];

  const { data: registeredUsers } = await supabase
    .from("portal_users")
    .select("id, email, status, organization_id")
    .order("email", { ascending: true });

  const { data: orgRows } = await supabase
    .from("organizations")
    .select("id, domain, name, website_url");
  const orgs = (orgRows ?? []) as OrgRecord[];
  const orgNames: Record<string, string> = {};
  const orgsById: Record<string, OrgRecord> = {};
  for (const o of orgs) {
    orgsById[o.id] = o;
    if (o.domain) orgNames[o.domain] = o.name;
  }

  const ticketCountByUserId: Record<string, number> = {};
  for (const r of requests) {
    ticketCountByUserId[r.user_id] = (ticketCountByUserId[r.user_id] ?? 0) + 1;
  }

  const sectionTabs: StatusTab[] = [
    { value: "requests", label: "Requests", count: requests.length },
    { value: "users", label: "Users", count: registeredUsers?.length ?? 0 },
  ];

  return (
    <section className="relative min-h-[80vh] pt-32 pb-20 px-6 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.12) 0%, transparent 70%)" }}
      />
      <div className="relative max-w-4xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1
            className="text-2xl font-bold text-[var(--portal-text-primary)]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Admin
          </h1>
        </div>

        <StatusTabs
          tabs={sectionTabs}
          active={section}
          paramName="section"
          defaultValue="requests"
        />

        {section === "users" ? (
          <UserManagementPanel
            users={registeredUsers ?? []}
            orgNames={orgNames}
            orgsById={orgsById}
            ticketCountByUserId={ticketCountByUserId}
          />
        ) : (
          <RequestsSection
            requests={requests}
            statusParam={statusParam}
            userFilter={userFilter}
            orgFilter={orgFilter}
            orgNames={orgNames}
            orgsById={orgsById}
          />
        )}
      </div>
    </section>
  );
}

async function RequestsSection({
  requests,
  statusParam,
  userFilter,
  orgFilter,
  orgNames,
  orgsById,
}: {
  requests: AdminRequest[];
  statusParam?: string;
  userFilter?: string;
  orgFilter?: string;
  orgNames: Record<string, string>;
  orgsById: Record<string, OrgRecord>;
}) {
  const active = statusParam && ADMIN_TAB_STATUSES.has(statusParam) ? statusParam : "all";
  let filtered = active === "all" ? requests : requests.filter((r) => r.status === active);
  if (userFilter) {
    filtered = filtered.filter((r) => clientInfo(r).email === userFilter);
  }
  if (orgFilter) {
    filtered = filtered.filter(
      (r) => organizationKeyFor(clientInfo(r), orgNames, orgsById).key === orgFilter
    );
  }

  const tabs: StatusTab[] = [
    { value: "new", label: "New", count: requests.filter((r) => r.status === "new").length },
    {
      value: "in_progress",
      label: "In Progress",
      count: requests.filter((r) => r.status === "in_progress").length,
    },
    { value: "done", label: "Done", count: requests.filter((r) => r.status === "done").length },
    {
      value: "deleted",
      label: "Deleted",
      count: requests.filter((r) => r.status === "deleted").length,
    },
    { value: "all", label: "All", count: requests.length },
  ];

  const requestIds = filtered.map((r) => r.id);
  const filesByRequest = await getFilesForRequests(requestIds);
  const messagesByRequest = await getMessagesForRequests(requestIds);

  const orgFilterLabel = orgFilter
    ? orgsById[orgFilter]?.name ?? prettifyDomain(orgFilter.replace(/^domain:/, ""))
    : null;

  return (
    <>
      <div className="flex items-center justify-end gap-2 mb-4">
        <Link
          href="/portal/admin/email"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border border-[var(--portal-border)] text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] hover:border-[var(--portal-border-strong)] transition-colors"
        >
          <span>Send Client Email</span>
        </Link>
        <Link
          href="/portal/admin/request"
          className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
        >
          <span>Create Request for Client</span>
          <ArrowUpRight className="w-4 h-4 relative z-10" />
        </Link>
      </div>

      {(userFilter || orgFilter) && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-[var(--portal-text-secondary)]">Filtered by:</span>
          <span className="flex items-center gap-1.5 text-xs text-[#F07A3A] bg-[#D25124]/10 rounded-full px-2.5 py-1">
            {userFilter ?? orgFilterLabel}
            <Link href="?section=requests" className="hover:text-[var(--portal-text-primary)] cursor-pointer">
              <X className="w-3 h-3" />
            </Link>
          </span>
        </div>
      )}

      <StatusTabs tabs={tabs} active={active} />

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl border border-[var(--portal-border)] p-14 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-[var(--portal-border)] flex items-center justify-center mb-5">
            <Inbox className="w-6 h-6 text-[var(--portal-text-muted)]" />
          </div>
          <p className="text-[var(--portal-text-secondary)] text-sm">
            {requests.length === 0 ? "No requests yet." : "No requests in this view."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <TicketCard
              key={r.id}
              id={r.id}
              serviceType={r.service_type}
              message={r.message}
              budget={r.budget}
              createdAt={r.created_at}
              status={r.status}
              details={r.details}
              files={filesByRequest[r.id] ?? []}
              messages={messagesByRequest[r.id] ?? []}
              viewerRole="admin"
              clientEmail={clientInfo(r).email}
            />
          ))}
        </div>
      )}
    </>
  );
}
