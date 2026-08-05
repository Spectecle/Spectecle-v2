import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, Inbox } from "lucide-react";
import { getSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { getFilesForRequests } from "@/lib/request-files";
import { getMessagesForRequests } from "@/lib/request-messages";
import { TicketCard } from "@/components/portal/TicketCard";
import { StatusTabs, type StatusTab } from "@/components/portal/StatusTabs";

type ServiceRequest = {
  id: string;
  service_type: string;
  budget: string | null;
  message: string;
  status: string;
  created_at: string;
  details: Record<string, unknown>;
};

const CLIENT_TAB_STATUSES = new Set(["new", "in_progress", "done"]);

export default async function PortalDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const user = await getSession();
  if (!user) redirect("/portal/sign-in?next=/portal/dashboard");

  const { status: statusParam } = await searchParams;

  // Deleted requests are never shown to clients, in any tab.
  const { data: allRequests } = await supabase
    .from("service_requests")
    .select("id, service_type, budget, message, status, created_at, details")
    .eq("user_id", user.id)
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
    <section className="relative min-h-[80vh] pt-32 pb-20 px-6 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.12) 0%, transparent 70%)" }}
      />
      <div className="relative max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1
              className="text-2xl font-bold text-[var(--portal-text-primary)] mb-1"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Welcome back
            </h1>
            <p className="text-[var(--portal-text-muted)] text-sm">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[var(--portal-text-secondary)] uppercase tracking-wider">
            Your Requests
          </h2>
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
                serviceType={r.service_type}
                message={r.message}
                budget={r.budget}
                createdAt={r.created_at}
                status={r.status}
                details={r.details}
                files={filesByRequest[r.id] ?? []}
                messages={messagesByRequest[r.id] ?? []}
                viewerRole="client"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
