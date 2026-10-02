import { notFound, redirect } from "next/navigation";
import { getSession, isAdmin } from "@/lib/auth";
import { getPaymentReminders } from "@/lib/payment-reminders";
import { StatusTabs, type StatusTab } from "@/components/portal/StatusTabs";
import { PaymentReminderCard } from "@/components/portal/PaymentReminderCard";

export default async function PaymentRemindersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const user = await getSession();
  if (!user) redirect("/portal/sign-in?next=/portal/admin/invoice-reminders");
  if (!isAdmin(user.email)) notFound();

  const { status: statusParam } = await searchParams;
  const reminders = await getPaymentReminders();

  const active = statusParam === "resolved" || statusParam === "all" ? statusParam : "active";
  const filtered =
    active === "all"
      ? reminders
      : active === "resolved"
      ? reminders.filter((r) => r.resolved_at)
      : reminders.filter((r) => !r.resolved_at);

  const tabs: StatusTab[] = [
    { value: "active", label: "Active", count: reminders.filter((r) => !r.resolved_at).length },
    { value: "resolved", label: "Resolved", count: reminders.filter((r) => r.resolved_at).length },
    { value: "all", label: "All", count: reminders.length },
  ];

  return (
    <section className="relative min-h-[80vh] pt-32 pb-20 px-6 overflow-x-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.12) 0%, transparent 70%)" }}
      />
      <div className="relative max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--portal-text-primary)]">Payment Reminders</h1>
          <p className="text-sm text-[var(--portal-text-muted)] mt-1">
            Automated email reminders for overdue Zoho Books invoices, every 3 days until paid. Pause any invoice
            you&apos;re already handling personally.
          </p>
        </div>

        <StatusTabs tabs={tabs} active={active} paramName="status" defaultValue="active" />

        {filtered.length === 0 ? (
          <div className="glass border border-[var(--portal-border)] p-14 text-center">
            <p className="text-[var(--portal-text-secondary)] text-sm">
              {reminders.length === 0
                ? "No overdue invoices tracked yet — the daily sync will populate this from Zoho Books."
                : "Nothing in this view."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((r) => (
              <PaymentReminderCard key={r.id} reminder={r} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
