import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Globe, Mail, Inbox, Receipt } from "lucide-react";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { getFilesForRequests } from "@/lib/request-files";
import { getMessagesForRequests } from "@/lib/request-messages";
import { getEmailDomain, prettifyDomain, groupByOrganization, type OrgRecord } from "@/lib/organizations";
import { TicketCard } from "@/components/portal/TicketCard";
import { OrganizationNameEditor } from "@/components/portal/OrganizationNameEditor";
import { ClientContactCard } from "@/components/portal/ClientContactCard";
import { UserStatusToggle } from "@/components/portal/UserStatusToggle";
import { UserDeleteButton } from "@/components/portal/UserDeleteButton";
import { StatusTabs, type StatusTab } from "@/components/portal/StatusTabs";

const TAB_STATUSES = new Set(["new", "in_progress", "done", "deleted"]);

export default async function AdminClientDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const admin = await getSession();
  if (!admin) redirect("/portal/sign-in?next=/portal/admin");
  if (!isAdmin(admin.email)) notFound();

  const { id } = await params;
  const { status: statusParam } = await searchParams;

  const { data: client } = await supabase
    .from("portal_users")
    .select("id, email, name, phone, status, organization_id")
    .eq("id", id)
    .maybeSingle();

  if (!client) notFound();

  const { data: orgRows } = await supabase
    .from("organizations")
    .select("id, domain, name, website_url")
    .order("name", { ascending: true });
  const orgs = (orgRows ?? []) as OrgRecord[];
  const org = orgs.find((o) => o.id === client.organization_id) ?? null;

  const domain = getEmailDomain(client.email);
  const displayName = org?.name ?? prettifyDomain(domain);
  const websiteUrl = org?.website_url ?? null;

  const { data: allUsers } = await supabase
    .from("portal_users")
    .select("id, email, status, organization_id");
  const orgNames: Record<string, string> = {};
  const orgsById: Record<string, OrgRecord> = {};
  for (const o of orgs) {
    orgsById[o.id] = o;
    if (o.domain) orgNames[o.domain] = o.name;
  }
  const groups = groupByOrganization(allUsers ?? [], orgNames, {}, orgsById);

  const { data: allRequests } = await supabase
    .from("service_requests")
    .select("id, service_type, budget, message, status, created_at, details")
    .eq("user_id", id)
    .order("created_at", { ascending: false });

  const requests = allRequests ?? [];
  const active = statusParam && TAB_STATUSES.has(statusParam) ? statusParam : "all";
  const filtered = active === "all" ? requests : requests.filter((r) => r.status === active);

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

  return (
    <section className="relative min-h-[80vh] pt-32 pb-20 px-6 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.12) 0%, transparent 70%)" }}
      />
      <div className="relative max-w-3xl mx-auto">
        <Link
          href="/portal/admin?section=users"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--portal-text-muted)] hover:text-[var(--portal-text-primary)] cursor-pointer transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Admin
        </Link>

        <div className="glass rounded-2xl border border-[var(--portal-border)] p-6 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
            <div>
              <OrganizationNameEditor
                id={org?.id ?? null}
                domain={domain}
                name={displayName}
                websiteUrl={websiteUrl}
              />
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <span className="flex items-center gap-1.5 text-xs text-[var(--portal-text-muted)]">
                  <Mail className="w-3 h-3" />
                  {client.email}
                </span>
                {websiteUrl && (
                  <a
                    href={websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#F07A3A] hover:text-[#D25124] transition-colors"
                  >
                    <Globe className="w-3 h-3" />
                    {websiteUrl}
                  </a>
                )}
                <span
                  className={`text-[10px] rounded-full px-2 py-0.5 ${
                    client.status === "active"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-rose-500/10 text-rose-400"
                  }`}
                >
                  {client.status === "active" ? "Active" : "Revoked"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <UserStatusToggle userId={client.id} status={client.status} />
              <UserDeleteButton userId={client.id} email={client.email} ticketCount={requests.length} />
            </div>
          </div>

          <div className="pt-5 border-t border-[var(--portal-border)]">
            <ClientContactCard
              userId={client.id}
              email={client.email}
              initialName={client.name}
              initialPhone={client.phone}
              organizationId={client.organization_id}
              groups={groups}
            />
          </div>
        </div>

        <div className="glass rounded-2xl border border-[var(--portal-border)] p-6 mb-6">
          <p className="flex items-center gap-2 text-xs font-semibold text-[var(--portal-text-secondary)] uppercase tracking-wider mb-3">
            <Receipt className="w-3.5 h-3.5" />
            Billing
          </p>
          <p className="text-sm text-[var(--portal-text-faint)]">
            Not connected yet — Zoho Books integration planned.
          </p>
        </div>

        <StatusTabs tabs={tabs} active={active} />

        {filtered.length === 0 ? (
          <div className="glass rounded-2xl border border-[var(--portal-border)] p-14 text-center mt-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[var(--portal-border)] flex items-center justify-center mb-5">
              <Inbox className="w-6 h-6 text-[var(--portal-text-muted)]" />
            </div>
            <p className="text-[var(--portal-text-secondary)] text-sm">
              {requests.length === 0 ? "No requests yet." : "No requests in this view."}
            </p>
          </div>
        ) : (
          <div className="space-y-3 mt-4">
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
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
