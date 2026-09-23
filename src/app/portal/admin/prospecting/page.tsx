import { notFound, redirect } from "next/navigation";
import { getSession, isAdmin } from "@/lib/auth";
import { getProspects, type ProspectStatus } from "@/lib/prospects";
import { StatusTabs, type StatusTab } from "@/components/portal/StatusTabs";
import { ProspectSearchForm } from "@/components/portal/ProspectSearchForm";
import { ProspectSearchList } from "@/components/portal/ProspectSearchList";

const VALID_STATUSES = new Set<ProspectStatus>(["new", "contacted", "not_interested", "converted"]);

export default async function ProspectingPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const user = await getSession();
  if (!user) redirect("/portal/sign-in?next=/portal/admin/prospecting");
  if (!isAdmin(user.email)) notFound();

  const { status: statusParam } = await searchParams;
  const prospects = await getProspects();

  const active =
    statusParam && VALID_STATUSES.has(statusParam as ProspectStatus) ? statusParam : "all";
  const filtered = active === "all" ? prospects : prospects.filter((p) => p.status === active);

  const tabs: StatusTab[] = [
    { value: "new", label: "New", count: prospects.filter((p) => p.status === "new").length },
    {
      value: "contacted",
      label: "Contacted",
      count: prospects.filter((p) => p.status === "contacted").length,
    },
    {
      value: "not_interested",
      label: "Not Interested",
      count: prospects.filter((p) => p.status === "not_interested").length,
    },
    {
      value: "converted",
      label: "Converted",
      count: prospects.filter((p) => p.status === "converted").length,
    },
    { value: "all", label: "All", count: prospects.length },
  ];

  return (
    <section className="relative min-h-[80vh] pt-32 pb-20 px-6 overflow-x-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.12) 0%, transparent 70%)" }}
      />
      <div className="relative max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--portal-text-primary)]">Prospecting</h1>
          <p className="text-sm text-[var(--portal-text-muted)] mt-1">
            Find local businesses with no website on file with Google, and build a cold-call list.
          </p>
        </div>

        <ProspectSearchForm />

        <StatusTabs tabs={tabs} active={active} />

        <ProspectSearchList prospects={filtered} />
      </div>
    </section>
  );
}
