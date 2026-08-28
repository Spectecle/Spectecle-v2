import { Resend } from "resend";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { tierIncludes } from "@/lib/dashboard-tiers";
import { getMonthlyReportData, previousMonthValue } from "@/lib/monthly-report";
import { buildMonthlyReportEmailHtml } from "@/lib/monthly-report-email";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `Spectecle Reports <${process.env.RESEND_FROM || "onboarding@resend.dev"}>`;

function monthLabel(periodMonth: string): string {
  const [year, month] = periodMonth.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Vercel Cron authenticates itself by sending Authorization: Bearer
// $CRON_SECRET on every scheduled invocation, once that env var is set on
// the project -- this route just checks the incoming header matches, the
// same shape as how STRIPE_WEBHOOK_SECRET authenticates Stripe's calls.
export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Deliberate launch gate -- this stays off (dry-run only) until you're
  // ready to actually start emailing real clients. A real client got a
  // premature test email once already; this makes that impossible to
  // repeat by accident. Flip MONTHLY_REPORTS_ENABLED=true in Vercel's env
  // vars when you're actually ready to launch this.
  const enabled = process.env.MONTHLY_REPORTS_ENABLED === "true";

  const periodMonth = previousMonthValue();
  const results = { periodMonth, dryRun: !enabled, sent: 0, skipped: 0, failed: 0 };

  const { data: orgs, error } = await supabase
    .from("organizations")
    .select("id, name, dashboard_tier, monthly_report_last_sent");
  if (error) {
    console.error("[cron/send-monthly-reports] failed to list organizations:", error);
    return NextResponse.json({ error: "Failed to list organizations" }, { status: 500 });
  }

  const eligible = (orgs ?? []).filter((org) => tierIncludes(org.dashboard_tier, "monthlyReport"));

  for (const org of eligible) {
    if (org.monthly_report_last_sent === periodMonth) {
      results.skipped++;
      continue;
    }

    try {
      const { data: users } = await supabase
        .from("portal_users")
        .select("email")
        .eq("organization_id", org.id)
        .eq("status", "active");
      const emails = (users ?? []).map((u) => u.email).filter(Boolean);

      if (emails.length === 0) {
        results.skipped++;
        continue;
      }

      if (!enabled) {
        console.log(`[cron/send-monthly-reports] DRY RUN — would send to org ${org.id} (${emails.join(", ")})`);
        results.sent++; // counts as "would have sent" in dry-run mode
        continue;
      }

      const data = await getMonthlyReportData(org.id, periodMonth);
      const label = monthLabel(periodMonth);

      const sendResult = await resend.emails.send({
        from: FROM,
        to: emails,
        subject: `Your ${label} Report from Spectecle`,
        html: buildMonthlyReportEmailHtml(data),
      });

      if (sendResult.error) {
        console.error(`[cron/send-monthly-reports] Resend error for org ${org.id}:`, sendResult.error);
        results.failed++;
        continue;
      }

      await supabase.from("organizations").update({ monthly_report_last_sent: periodMonth }).eq("id", org.id);
      results.sent++;
    } catch (err) {
      console.error(`[cron/send-monthly-reports] error for org ${org.id}:`, err);
      results.failed++;
    }
  }

  console.log("[cron/send-monthly-reports] done:", results);
  return NextResponse.json(results);
}
