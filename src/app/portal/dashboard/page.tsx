import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, Inbox, Receipt, Radio, TrendingUp, Phone, MessageSquare, Search, ShieldCheck } from "lucide-react";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { getFilesForRequests } from "@/lib/request-files";
import { getMessagesForRequests } from "@/lib/request-messages";
import { getDashboardTierForUser, getDashboardContextForUser } from "@/lib/dashboard-access";
import { getAnalyticsSnapshotsForOrg } from "@/lib/analytics-snapshots";
import { tierIncludes, DASHBOARD_TIER_LABELS, type DashboardTier } from "@/lib/dashboard-tiers";
import { getRequestQuotaStatusForUser } from "@/lib/request-quota";
import { PLAN_PRICES } from "@/lib/stripe";
import { fetchGA4ActiveUsersNow, fetchGA4MonthToDate, fetchGA4DailyVisitors, fetchGA4EventCounts } from "@/lib/ga4";
import { fetchSearchConsoleTopQueries, type SearchConsoleQueryRow } from "@/lib/search-console";
import { checkSslCertificate, type SslStatus } from "@/lib/site-status";
import { getLeadsForOrg } from "@/lib/leads";
import { PageSpeedCard } from "@/components/portal/PageSpeedCard";
import { UptimeCard } from "@/components/portal/UptimeCard";
import { LeadCard } from "@/components/portal/LeadCard";
import { RequestScopeGuide } from "@/components/portal/RequestScopeGuide";
import { PlanComparison, ManageBillingButton } from "@/components/portal/BillingActions";
import { getImpersonatedUser } from "@/lib/impersonation";
import { TicketCard } from "@/components/portal/TicketCard";
import { StatusTabs, type StatusTab } from "@/components/portal/StatusTabs";
import { DashboardFeatureCard } from "@/components/portal/DashboardFeatureCard";
import { AnalyticsSnapshotCard } from "@/components/portal/AnalyticsSnapshotCard";
import { StatCard } from "@/components/portal/StatCard";
import { VisitorsChart } from "@/components/portal/VisitorsChart";
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
const SECTIONS = new Set(["requests", "analytics", "status", "leads", "reports", "invoices"]);

const SECTION_LABELS: Record<string, string> = {
  requests: "Requests",
  analytics: "Analytics",
  status: "Site Status",
  leads: "Leads",
  reports: "Reports",
  invoices: "Billing",
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
      <section className="relative min-h-[calc(100vh-4rem)] pt-10 pb-20 px-6 lg:px-10 overflow-x-hidden">
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
          {section === "status" && <StatusSection userId={effectiveUser.id} />}
          {section === "leads" && <LeadsSection userId={effectiveUser.id} />}
          {section === "reports" && <ReportsSection userId={effectiveUser.id} />}
          {section === "invoices" && <BillingSection userId={effectiveUser.id} />}
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
  const quota = await getRequestQuotaStatusForUser(userId);

  return (
    <>
      <div className="flex items-center justify-between mb-4 gap-4">
        {quota && (
          <p className="text-sm text-[var(--portal-text-muted)]">
            {quota.limit === 0
              ? "Service requests aren't included on the Free plan."
              : quota.exceeded
                ? `You've used all ${quota.limit} requests included in your plan this month.`
                : `${quota.remaining} of ${quota.limit} requests remaining this month`}
          </p>
        )}
        <Link
          href={quota?.exceeded ? "/portal/dashboard?section=invoices" : "/portal/request"}
          className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer shrink-0"
        >
          <span>{quota?.exceeded ? "Upgrade to Submit Requests" : "Request a Service"}</span>
          <ArrowUpRight className="w-4 h-4 relative z-10" />
        </Link>
      </div>

      <div className="mb-4">
        <RequestScopeGuide />
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
  const { organizationId, tier, ga4PropertyId, searchConsoleSiteUrl } = await getDashboardContextForUser(userId);
  const hasAnalytics = tierIncludes(tier, "analytics");
  const showRankings = tierIncludes(tier, "rankTracking");

  const lockedPlaceholders = (
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
        feature="rankTracking"
        tier={tier}
      />
    </div>
  );

  if (!hasAnalytics) return lockedPlaceholders;

  const snapshots = organizationId ? await getAnalyticsSnapshotsForOrg(organizationId) : [];

  let topQueries: SearchConsoleQueryRow[] = [];
  let searchConsoleError = false;
  if (searchConsoleSiteUrl) {
    try {
      topQueries = await fetchSearchConsoleTopQueries(searchConsoleSiteUrl, 28, 8);
    } catch (error) {
      console.error("[portal/dashboard] Search Console fetch error:", error);
      searchConsoleError = true;
    }
  }

  let activeNow: number | null = null;
  let monthVisitors: number | null = null;
  let dailyVisitors: { date: string; visitors: number }[] = [];
  let phoneClicks: number | null = null;
  let contactSubmits: number | null = null;
  let ga4Error = false;

  if (ga4PropertyId) {
    try {
      const [active, monthToDate, daily, eventCounts] = await Promise.all([
        fetchGA4ActiveUsersNow(ga4PropertyId),
        fetchGA4MonthToDate(ga4PropertyId),
        fetchGA4DailyVisitors(ga4PropertyId),
        fetchGA4EventCounts(ga4PropertyId, ["phone_click", "contact_submit"], 30),
      ]);
      activeNow = active;
      monthVisitors = monthToDate.visitors;
      dailyVisitors = daily;
      phoneClicks = eventCounts.phone_click;
      contactSubmits = eventCounts.contact_submit;
    } catch (error) {
      console.error("[portal/dashboard] GA4 fetch error:", error);
      ga4Error = true;
    }
  }

  return (
    <div className="space-y-6">
      {ga4PropertyId ? (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <StatCard label="Active on Site Now" value={activeNow} icon={Radio} error={ga4Error} />
            <StatCard label="Visitors This Month" value={monthVisitors} icon={TrendingUp} error={ga4Error} />
          </div>
          <div className="glass border border-[var(--portal-border)] p-5">
            <p className="text-sm font-semibold text-[var(--portal-text-primary)] mb-0.5">Visitors This Month</p>
            <p className="text-xs text-[var(--portal-text-faint)] mb-2">Daily visitors to your site</p>
            {ga4Error ? (
              <p className="text-sm text-[var(--portal-text-faint)] py-10 text-center">Failed to load.</p>
            ) : (
              <VisitorsChart data={dailyVisitors} />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--portal-text-muted)] uppercase tracking-wider mb-3">
              Leads Signal (Last 30 Days)
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <StatCard label="Phone Number Clicks" value={phoneClicks} icon={Phone} error={ga4Error} />
              <StatCard label="Contact Form Submits" value={contactSubmits} icon={MessageSquare} error={ga4Error} />
            </div>
          </div>
        </>
      ) : (
        <div className="glass rounded-2xl border border-[var(--portal-border)] p-6">
          <p className="text-sm text-[var(--portal-text-secondary)]">
            Analytics isn&apos;t connected yet — reach out and we&apos;ll get this set up.
          </p>
        </div>
      )}

      {searchConsoleSiteUrl && (
        <div className="glass border border-[var(--portal-border)] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-4 h-4 text-[var(--portal-text-faint)]" />
            <p className="text-sm font-semibold text-[var(--portal-text-primary)]">Top Search Queries</p>
          </div>
          {searchConsoleError ? (
            <p className="text-sm text-[var(--portal-text-faint)] py-6 text-center">Failed to load.</p>
          ) : topQueries.length === 0 ? (
            <p className="text-sm text-[var(--portal-text-faint)] py-6 text-center">No query data yet.</p>
          ) : (
            <div className="space-y-2">
              {topQueries.map((q) => (
                <div
                  key={q.query}
                  className="flex items-center justify-between gap-4 text-sm py-1.5 border-b border-[var(--portal-border)] last:border-b-0"
                >
                  <span className="text-[var(--portal-text-secondary)] truncate">{q.query}</span>
                  <span className="text-[var(--portal-text-primary)] font-semibold shrink-0">
                    {q.clicks.toLocaleString()} clicks · #{q.position.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showRankings && snapshots.every((s) => s.rankings.length === 0) && (
        <DashboardFeatureCard
          title="SEO Ranking Status"
          description="Where your site ranks for the searches that matter to your business."
          feature="rankTracking"
          tier={tier}
        />
      )}

      {snapshots.length > 0 && (
        <div className="space-y-3">
          {snapshots.map((snapshot) => (
            <AnalyticsSnapshotCard key={snapshot.id} snapshot={snapshot} showRankings={showRankings} />
          ))}
        </div>
      )}
    </div>
  );
}

async function StatusSection({ userId }: { userId: string }) {
  const { tier, websiteUrl } = await getDashboardContextForUser(userId);
  const hasStatusBundle = tierIncludes(tier, "statusBundle");

  if (!websiteUrl) {
    return (
      <div className="glass rounded-2xl border border-[var(--portal-border)] p-6">
        <p className="text-sm text-[var(--portal-text-secondary)]">
          No website on file for your account yet — reach out and we&apos;ll get this connected.
        </p>
      </div>
    );
  }

  let ssl: SslStatus | null = null;
  let sslError = false;
  if (hasStatusBundle) {
    try {
      ssl = await checkSslCertificate(websiteUrl);
    } catch (error) {
      console.error("[portal/dashboard] SSL check error:", error);
      sslError = true;
    }
  }

  return (
    <div className="space-y-6">
      <UptimeCard websiteUrl={websiteUrl} />

      {hasStatusBundle ? (
        <div className="grid sm:grid-cols-2 gap-4">
          <PageSpeedCard />
          <div className="glass border border-[var(--portal-border)] p-5 h-full">
            <div className="flex items-center justify-between mb-3">
              <ShieldCheck className="w-4 h-4 text-[var(--portal-text-faint)]" />
            </div>
            <p
              className={`text-3xl font-light ${
                sslError ? "text-[#cb7c46]" : ssl?.valid ? "text-emerald-400" : "text-rose-400"
              }`}
              style={{ fontFamily: "var(--font-serif, inherit)" }}
            >
              {sslError ? "!" : (ssl?.daysRemaining ?? "—")}
            </p>
            <p className="text-sm text-[var(--portal-text-muted)] mt-1">
              {sslError
                ? "SSL Certificate (fetch failed)"
                : ssl?.valid
                  ? "Days until SSL renewal"
                  : "SSL Certificate Invalid"}
            </p>
          </div>
        </div>
      ) : (
        <DashboardFeatureCard
          title="PageSpeed & SSL Monitoring"
          description="Site speed score and certificate health, checked automatically."
          feature="statusBundle"
          tier={tier}
        />
      )}
    </div>
  );
}

async function LeadsSection({ userId }: { userId: string }) {
  const { organizationId, tier } = await getDashboardContextForUser(userId);
  const hasLeadsInbox = tierIncludes(tier, "leadsInbox");

  if (!hasLeadsInbox) {
    return (
      <DashboardFeatureCard
        title="Leads Inbox"
        description="Inquiries from your website's contact form, all in one place."
        feature="leadsInbox"
        tier={tier}
      />
    );
  }

  const leads = organizationId ? await getLeadsForOrg(organizationId) : [];

  if (leads.length === 0) {
    return (
      <div className="glass rounded-2xl border border-[var(--portal-border)] p-14 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-[var(--portal-border)] flex items-center justify-center mb-5">
          <Inbox className="w-6 h-6 text-[var(--portal-text-muted)]" />
        </div>
        <p className="text-[var(--portal-text-secondary)] text-sm">No leads yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} />
      ))}
    </div>
  );
}

async function ReportsSection({ userId }: { userId: string }) {
  const tier = await getDashboardTierForUser(userId);
  const hasMonthlyReport = tierIncludes(tier, "monthlyReport");
  const monthLabel = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="space-y-4">
      {hasMonthlyReport ? (
        <div className="glass border border-[var(--portal-border)] p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm font-semibold text-[var(--portal-text-primary)] mb-1">Monthly Report</p>
            <p className="text-sm text-[var(--portal-text-faint)]">{monthLabel} — traffic, search, and requests</p>
          </div>
          <a
            href="/api/portal/dashboard/report"
            className="btn-primary px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
          >
            Download PDF
          </a>
        </div>
      ) : (
        <DashboardFeatureCard
          title="Monthly Report"
          description="A downloadable summary of your site's traffic, search performance, and requests."
          feature="monthlyReport"
          tier={tier}
        />
      )}
      <DashboardFeatureCard
        title="Weekly Ad Reports"
        description="Meta and Google ad performance, summarized every week."
        feature="adReports"
        tier={tier}
      />
    </div>
  );
}

async function BillingSection({ userId }: { userId: string }) {
  const { organizationId } = await getDashboardContextForUser(userId);

  if (!organizationId) {
    return (
      <div className="glass rounded-2xl border border-[var(--portal-border)] p-14 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-[var(--portal-border)] flex items-center justify-center mb-5">
          <Receipt className="w-6 h-6 text-[var(--portal-text-muted)]" />
        </div>
        <p className="text-[var(--portal-text-secondary)] text-sm">
          No business is set up on your account yet — contact us to get started.
        </p>
      </div>
    );
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("tier, billing_interval, status, current_period_end, cancel_at_period_end")
    .eq("organization_id", organizationId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const isActive = subscription && (subscription.status === "active" || subscription.status === "trialing" || subscription.status === "past_due");
  const currentTier: DashboardTier = isActive ? (subscription.tier as DashboardTier) : "free";

  const renewalLabel = isActive && subscription.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="space-y-8">
      {isActive ? (
        <>
          {subscription.status === "past_due" && (
            <div className="rounded-2xl border border-rose-400/40 bg-rose-400/10 p-5">
              <p className="text-sm text-rose-300 font-medium mb-1">Your last payment failed</p>
              <p className="text-sm text-[var(--portal-text-secondary)]">
                Update your card to keep your {DASHBOARD_TIER_LABELS[subscription.tier as DashboardTier]} plan active.
              </p>
            </div>
          )}
          <div className="glass rounded-2xl border border-[var(--portal-border)] p-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm text-[var(--portal-text-muted)] mb-1">Current plan</p>
              <p className="text-lg font-semibold text-[var(--portal-text-primary)]">
                {DASHBOARD_TIER_LABELS[subscription.tier as DashboardTier]}
                {" · "}
                {subscription.billing_interval === "annual" ? "Annual" : "Monthly"}
              </p>
              {renewalLabel && (
                <p className="text-sm text-[var(--portal-text-muted)] mt-1">
                  {subscription.cancel_at_period_end ? "Ends" : "Renews"} {renewalLabel}
                </p>
              )}
            </div>
            <ManageBillingButton />
          </div>
        </>
      ) : (
        <div className="glass rounded-2xl border border-[var(--portal-border)] p-6">
          <p className="text-sm text-[var(--portal-text-muted)] mb-1">Current plan</p>
          <p className="text-lg font-semibold text-[var(--portal-text-primary)]">Free</p>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-[var(--portal-text-primary)] mb-4">Compare plans</h2>
        <PlanComparison prices={PLAN_PRICES} currentTier={currentTier} />
      </div>
    </div>
  );
}
