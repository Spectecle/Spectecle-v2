import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, Inbox, Receipt } from "lucide-react";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { getFilesForRequests } from "@/lib/request-files";
import { getMessagesForRequests } from "@/lib/request-messages";
import { getDashboardTierForUser, getDashboardContextForUser } from "@/lib/dashboard-access";
import { getAnalyticsSnapshotsForOrg } from "@/lib/analytics-snapshots";
import { tierIncludes } from "@/lib/dashboard-tiers";
import { getImpersonatedUser } from "@/lib/impersonation";
import { TicketCard } from "@/components/portal/TicketCard";
import { StatusTabs, type StatusTab } from "@/components/portal/StatusTabs";
import { DashboardFeatureCard } from "@/components/portal/DashboardFeatureCard";
import { AnalyticsSnapshotCard } from "@/components/portal/AnalyticsSnapshotCard";
import { PortalDashboardShell } from "@/components/portal/PortalDashboardShell";
import { ImpersonationBanner } from "@/components/portal/ImpersonationBanner";

type ServiceRequest = {
  id: string;
  ticket_number: number;
  service_type: string;
  budget: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
  details: Record<string, unknown>;
};

const CLIENT_TAB_STATUSES = new Set(["new", "in_progress", "done"]);
const SECTIONS = new Set(["requests", "analytics", "reports", "invoices"]);

const SECTION_LABELS: Record<string, string> = {
  requests: "Requests",
  analytics: "Analytics",
  reports: "Reports",
  invoices: "Invoices",
};

export default async function PortalDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; section?: string }>;
}) {
  const user = await getSession();
  if (!user) redirect("/portal/sign-in?next=/portal/dashboard");

  const impersonated = isAdmin(user.email) ? await getImpersonatedUser() : null;
  const effectiveUser = impersonated ?? user;

  const { status: statusParam, section: sectionParam } = await searchParams;
  const section = sectionParam && SECTIONS.has(sectionParam) ? sectionParam : "requests";

  return (
    <PortalDashboardShell active={section} email={effectiveUser.email} impersonating={!!impersonated}>
      <section className="relative min-h-[calc(100vh-4rem)] pt-10 pb-20 px-6 lg:px-10 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.12) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-3xl mx-auto lg:mx-0 lg:max-w-2xl">
          {impersonated && <ImpersonationBanner email={impersonated.email} />}

          <div className="mb-8">
            <h1
              className="text-2xl font-bold text-[var(--portal-text-primary)] mb-1"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {SECTION_LABELS[section]}
            </h1>
            <p className="text-[var(--portal-text-muted)] text-sm">{effectiveUser.email}</p>
          </div>

          {section === "requests" && <RequestsSection userId={effectiveUser.id} statusParam={statusParam} />}
          {section === "analytics" && <AnalyticsSection userId={effectiveUser.id} />}
          {section === "reports" && <ReportsSection userId={effectiveUser.id} />}
          {section === "invoices" && <InvoicesSection />}
        </div>
      </section>
    </PortalDashboardShell>
  );
}

async function RequestsSection({
  userId,
  statusParam,
}: {
  userId: string;
  statusParam?: string;
}) {
  // Deleted requests are never shown to clients, in any tab.
  const { data: allRequests } = await supabase
    .from("service_requests")
    .select("id, ticket_number, service_type, budget, message, status, created_at, updated_at, details")
    .eq("user_id", userId)
    .neq("status", "deleted")
    .order("created_at", { ascending: false })
    .returns<ServiceRequest[]>();

  const requests = allRequests ?? [];
  const active = statusParam && CLIENT_TAB_STATUSES.has(statusParam) ? statusParam : "all";
  const filtered = active === "all" ? requests : requests.filter((r) => r.status === active);

  const tabs: StatusTab[] = [
    { value: "new", label: "New", count: requests.filter((r) => r.status === "new").length },
    {
      value: "in_progress",
      label: "In Progress",
      count: requests.filter((r) => r.status === "in_progress").length,
    },
    { value: "done", label: "Done", count: requests.filter((r) => r.status === "done").length },
    { value: "all", label: "All", count: requests.length },
  ];

  const requestIds = filtered.map((r) => r.id);
  const filesByRequest = await getFilesForRequests(requestIds);
  const messagesByRequest = await getMessagesForRequests(requestIds);

  return (
    <>
      <div className="flex items-center justify-end mb-4">
        <Link
          href="/portal/request"
          className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
        >
          <span>Request a Service</span>
          <ArrowUpRight className="w-4 h-4 relative z-10" />
        </Link>
      </div>

      <StatusTabs tabs={tabs} active={active} />

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl border border-[var(--portal-border)] p-14 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-[var(--portal-border)] flex items-center justify-center mb-5">
            <Inbox className="w-6 h-6 text-[var(--portal-text-muted)]" />
          </div>
          <p className="text-[var(--portal-text-secondary)] text-sm">
            {requests.length === 0
              ? "You haven't submitted any requests yet."
              : "No requests in this view."}
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
              viewerRole="client"
            />
          ))}
        </div>
      )}
    </>
  );
}

async function AnalyticsSection({ userId }: { userId: string }) {
  const { organizationId, tier } = await getDashboardContextForUser(userId);
  const hasAnalytics = tierIncludes(tier, "analytics");
  const showRankings = tierIncludes(tier, "rankings");

  const snapshots = hasAnalytics && organizationId ? await getAnalyticsSnapshotsForOrg(organizationId) : [];

  if (snapshots.length > 0) {
    return (
      <div className="space-y-3">
        {snapshots.map((snapshot) => (
          <AnalyticsSnapshotCard key={snapshot.id} snapshot={snapshot} showRankings={showRankings} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DashboardFeatureCard
        title="Website Analytics"
        description="Traffic, visitors, and how people are finding and using your site."
        feature="analytics"
        tier={tier}
      />
      <DashboardFeatureCard
        title="SEO Ranking Status"
        description="Where your site ranks for the searches that matter to your business."
        feature="rankings"
        tier={tier}
      />
    </div>
  );
}

async function ReportsSection({ userId }: { userId: string }) {
  const tier = await getDashboardTierForUser(userId);
  return (
    <div className="space-y-4">
      <DashboardFeatureCard
        title="Weekly Ad Reports"
        description="Meta and Google ad performance, summarized every week."
        feature="adReports"
        tier={tier}
      />
    </div>
  );
}

function InvoicesSection() {
  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl border border-[var(--portal-border)] p-14 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-[var(--portal-border)] flex items-center justify-center mb-5">
          <Receipt className="w-6 h-6 text-[var(--portal-text-muted)]" />
        </div>
        <p className="text-[var(--portal-text-secondary)] text-sm">
          Online invoices and payments are coming soon.
        </p>
      </div>
    </div>
  );
}
