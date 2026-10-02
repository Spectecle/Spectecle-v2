import { notFound, redirect } from "next/navigation";
import { getSession, isAdmin } from "@/lib/auth";
import { getPaymentReminders } from "@/lib/payment-reminders";
import { fetchRecurringInvoices } from "@/lib/zoho-books";
import { StatusTabs, type StatusTab } from "@/components/portal/StatusTabs";
import { AdminTabs, type AdminTab } from "@/components/portal/AdminTabs";
import { PaymentReminderCard } from "@/components/portal/PaymentReminderCard";
import { RecurringPaymentRow } from "@/components/portal/RecurringPaymentRow";
import { SyncInvoicesButton } from "@/components/portal/SyncInvoicesButton";

export default async function ClientPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; status?: string }>;
}) {
  const user = await getSession();
  if (!user) redirect("/portal/sign-in?next=/portal/admin/invoice-reminders");
  if (!isAdmin(user.email)) notFound();

  const { view: viewParam, status: statusParam } = await searchParams;
  const view = viewParam === "recurring" ? "recurring" : "reminders";

  const viewTabs: AdminTab[] = [
    { value: "reminders", label: "Reminders" },
    { value: "recurring", label: "Recurring Payments" },
  ];

  return (
    <section className="relative min-h-[80vh] pt-32 pb-20 px-6 overflow-x-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.12) 0%, transparent 70%)" }}
      />
      <div className="relative max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--portal-text-primary)]">Client Payments</h1>
          <p className="text-sm text-[var(--portal-text-muted)] mt-1">
            Overdue invoice reminders and every client&apos;s recurring billing, fetched live from Zoho Books.
          </p>
        </div>

        <AdminTabs tabs={viewTabs} active={view} paramName="view" defaultValue="reminders" />

        {view === "recurring" ? (
          <RecurringPaymentsSection />
        ) : (
          <RemindersSection statusParam={statusParam} />
        )}
      </div>
    </section>
  );
}

async function RemindersSection({ statusParam }: { statusParam?: string }) {
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
    <>
      <div className="flex items-center justify-between gap-3 flex-wrap mb-1">
        <p className="text-sm text-[var(--portal-text-muted)]">
          Automated email reminders for overdue Zoho Books invoices, every 3 days until paid. Pause any invoice
          you&apos;re already handling personally.
        </p>
        <SyncInvoicesButton />
      </div>
      <div className="mt-4">
        <StatusTabs
          tabs={tabs}
          active={active}
          paramName="status"
          defaultValue="active"
          extraParams={{ view: "reminders" }}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="glass border border-[var(--portal-border)] p-14 text-center">
          <p className="text-[var(--portal-text-secondary)] text-sm">
            {reminders.length === 0
              ? "No overdue invoices tracked yet — click \"Sync with Zoho\" or wait for the daily sync."
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
    </>
  );
}

async function RecurringPaymentsSection() {
  let invoices;
  try {
    invoices = await fetchRecurringInvoices();
  } catch (err) {
    console.error("[client-payments] fetch recurring invoices error:", err);
    return (
      <div className="glass border border-[var(--portal-border)] p-14 text-center">
        <p className="text-[var(--portal-text-secondary)] text-sm">
          Couldn&apos;t reach Zoho Books right now — try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-[var(--portal-text-muted)] mb-4">
        Every recurring billing agreement on file in Zoho Books, fetched live.
      </p>
      {invoices.length === 0 ? (
        <div className="glass border border-[var(--portal-border)] p-14 text-center">
          <p className="text-[var(--portal-text-secondary)] text-sm">No recurring invoices set up in Zoho Books yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {invoices.map((inv) => (
            <RecurringPaymentRow key={inv.recurringInvoiceId} invoice={inv} />
          ))}
        </div>
      )}
    </>
  );
}
