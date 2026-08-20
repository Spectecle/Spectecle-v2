import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Inbox, X, ArrowUpRight, Trash2, Users as UsersIcon, Radio, TrendingUp, Send, MailOpen } from "lucide-react";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { getFilesForRequests } from "@/lib/request-files";
import { getMessagesForRequests } from "@/lib/request-messages";
import { TicketCard } from "@/components/portal/TicketCard";
import { UserManagementPanel } from "@/components/portal/UserManagementPanel";
import { StatusTabs, type StatusTab } from "@/components/portal/StatusTabs";
import { organizationKeyFor, prettifyDomain, type OrgRecord } from "@/lib/organizations";
import { fetchGA4ActiveUsersNow, fetchGA4MonthToDate } from "@/lib/ga4";
import { fetchEmailCountsThisMonth } from "@/lib/gmail";

type AdminRequest = {
  id: string;
  ticket_number: number;
  service_type: string;
  budget: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
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
  const section = sectionParam === "users" ? "users" : sectionParam === "requests" ? "requests" : "dashboard";

  const { data: allRequests } = await supabase
    .from("service_requests")
    .select(
      "id, ticket_number, service_type, budget, message, status, created_at, updated_at, details, user_id, portal_users(email, organization_id)"
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
    .select("id, domain, name, website_url, dashboard_tier");
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

  return (
    <section className="relative min-h-[80vh] pt-32 pb-20 px-6 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(198,153,71,0.12) 0%, transparent 70%)" }}
      />
      <div className="relative max-w-4xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1
            className="text-2xl font-bold text-[var(--portal-text-primary)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {section === "dashboard" ? "Dashboard" : section === "users" ? "Clients" : "Requests"}
          </h1>
        </div>

        {section === "dashboard" && <DashboardSection requests={requests} activeClientCount={(registeredUsers ?? []).filter((u) => u.status === "active").length} />}

        {section === "users" && (
          <UserManagementPanel
            users={registeredUsers ?? []}
            orgNames={orgNames}
            orgsById={orgsById}
            ticketCountByUserId={ticketCountByUserId}
          />
        )}

        {section === "requests" && (
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

async function DashboardSection({
  requests,
  activeClientCount,
}: {
  requests: AdminRequest[];
  activeClientCount: number;
}) {
  const openTickets = requests.filter((r) => r.status === "new" || r.status === "in_progress").length;

  const spectecleGa4PropertyId = process.env.SPECTECLE_GA4_PROPERTY_ID;
  let activeNow: number | null = null;
  let monthVisitors: number | null = null;
  let ga4Error = false;

  if (spectecleGa4PropertyId) {
    try {
      const [active, monthToDate] = await Promise.all([
        fetchGA4ActiveUsersNow(spectecleGa4PropertyId),
        fetchGA4MonthToDate(spectecleGa4PropertyId),
      ]);
      activeNow = active;
      monthVisitors = monthToDate.visitors;
    } catch (error) {
      console.error("[admin/dashboard] GA4 fetch error:", error);
      ga4Error = true;
    }
  }

  const gmailConfigured = !!(
    process.env.GOOGLE_OAUTH_CLIENT_ID &&
    process.env.GOOGLE_OAUTH_CLIENT_SECRET &&
    process.env.GMAIL_OAUTH_REFRESH_TOKEN
  );
  let emailsSent: number | null = null;
  let emailsReceived: number | null = null;
  let gmailAccount: string | null = null;
  let gmailError = false;

  if (gmailConfigured) {
    try {
      const counts = await fetchEmailCountsThisMonth();
      emailsSent = counts.sent;
      emailsReceived = counts.received;
      gmailAccount = counts.account;
    } catch (error) {
      console.error("[admin/dashboard] Gmail fetch error:", error);
      gmailError = true;
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open Tickets" value={openTickets} icon={Inbox} href="/portal/admin?section=requests" />
        <StatCard label="Active Clients" value={activeClientCount} icon={UsersIcon} href="/portal/admin?section=users" />
        <StatCard
          label="Active on Site Now"
          value={activeNow}
          icon={Radio}
          unavailable={!spectecleGa4PropertyId}
          error={ga4Error}
        />
        <StatCard
          label="Visitors This Month"
          value={monthVisitors}
          icon={TrendingUp}
          unavailable={!spectecleGa4PropertyId}
          error={ga4Error}
        />
      </div>

      {!spectecleGa4PropertyId && (
        <div className="glass border border-[var(--portal-border)] p-5">
          <p className="text-sm text-[var(--portal-text-secondary)]">
            Spectecle.com&apos;s website stats aren&apos;t connected yet. Add{" "}
            <code className="text-sm bg-[var(--portal-border)] px-1.5 py-0.5 rounded">
              SPECTECLE_GA4_PROPERTY_ID
            </code>{" "}
            to your environment variables with spectecle.com&apos;s own GA4 property ID to enable this.
          </p>
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-sm font-semibold text-[var(--portal-text-muted)] uppercase tracking-wider">
            Email Activity (This Month)
          </p>
          {gmailAccount && (
            <span className="text-xs text-[var(--portal-text-faint)] bg-[var(--portal-border)] px-2 py-0.5 rounded-full">
              {gmailAccount}
            </span>
          )}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <StatCard
            label="Emails Sent"
            value={emailsSent}
            icon={Send}
            unavailable={!gmailConfigured}
            error={gmailError}
          />
          <StatCard
            label="Emails Received"
            value={emailsReceived}
            icon={MailOpen}
            unavailable={!gmailConfigured}
            error={gmailError}
          />
        </div>
        {!gmailConfigured && (
          <p className="text-sm text-[var(--portal-text-faint)] mt-2">
            Not connected yet — needs Gmail API access. See setup notes in{" "}
            <code className="bg-[var(--portal-border)] px-1.5 py-0.5 rounded">.env.local.example</code>.
          </p>
        )}
      </div>
    </div>
  );
}

function StatCard({
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
      <p className="text-3xl font-light text-[#f87444]" style={{ fontFamily: "var(--font-serif, inherit)" }}>
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
  let filtered = active === "all" ? requests.filter((r) => r.status !== "deleted") : requests.filter((r) => r.status === active);
  if (userFilter) {
    filtered = filtered.filter((r) => clientInfo(r).email === userFilter);
  }
  if (orgFilter) {
    filtered = filtered.filter(
      (r) => organizationKeyFor(clientInfo(r), orgNames, orgsById).key === orgFilter
    );
  }

  const deletedCount = requests.filter((r) => r.status === "deleted").length;

  const tabs: StatusTab[] = [
    { value: "new", label: "New", count: requests.filter((r) => r.status === "new").length },
    {
      value: "in_progress",
      label: "In Progress",
      count: requests.filter((r) => r.status === "in_progress").length,
    },
    { value: "done", label: "Done", count: requests.filter((r) => r.status === "done").length },
    { value: "all", label: "All", count: requests.filter((r) => r.status !== "deleted").length },
  ];

  const requestIds = filtered.map((r) => r.id);
  const filesByRequest = await getFilesForRequests(requestIds);
  const messagesByRequest = await getMessagesForRequests(requestIds);

  const orgFilterLabel = orgFilter
    ? orgsById[orgFilter]?.name ?? prettifyDomain(orgFilter.replace(/^domain:/, ""))
    : null;

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <Link
          href="?section=requests&status=deleted"
          className="flex items-center gap-1.5 text-sm text-[var(--portal-text-faint)] hover:text-[var(--portal-text-secondary)] transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Recycle Bin{deletedCount > 0 ? ` (${deletedCount})` : ""}
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/portal/admin/email"
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold cursor-pointer border border-[var(--portal-border)] text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] hover:border-[var(--portal-border-strong)] transition-colors"
          >
            <span>Send Client Email</span>
          </Link>
          <Link
            href="/portal/admin/request"
            className="btn-primary flex items-center gap-2 px-4 py-2.5 text-sm font-semibold cursor-pointer"
          >
            <span>Create Request for Client</span>
            <ArrowUpRight className="w-4 h-4 relative z-10" />
          </Link>
        </div>
      </div>

      {(userFilter || orgFilter) && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-[var(--portal-text-secondary)]">Filtered by:</span>
          <span className="flex items-center gap-1.5 text-sm text-[#f87444] bg-[#f87444]/10 px-2.5 py-1">
            {userFilter ?? orgFilterLabel}
            <Link href="?section=requests" className="hover:text-[var(--portal-text-primary)] cursor-pointer">
              <X className="w-3 h-3" />
            </Link>
          </span>
        </div>
      )}

      {active === "deleted" ? (
        <div className="flex items-center gap-2 mb-4 text-sm text-[var(--portal-text-muted)]">
          <Trash2 className="w-3.5 h-3.5" />
          <span>Recycle Bin — deleted tickets. Change a ticket&apos;s status to restore it.</span>
          <Link href="?section=requests" className="text-[#f87444] hover:underline ml-1">
            Back to Requests
          </Link>
        </div>
      ) : (
        <StatusTabs tabs={tabs} active={active} />
      )}

      {filtered.length === 0 ? (
        <div className="glass border border-[var(--portal-border)] p-14 text-center">
          <div className="w-14 h-14 mx-auto bg-[var(--portal-border)] flex items-center justify-center mb-5">
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
              ticketNumber={r.ticket_number}
              serviceType={r.service_type}
              message={r.message}
              budget={r.budget}
              createdAt={r.created_at}
              updatedAt={r.updated_at}
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
