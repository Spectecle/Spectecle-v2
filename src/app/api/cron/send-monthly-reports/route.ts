import { Resend } from "resend";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { tierIncludes } from "@/lib/dashboard-tiers";
import { buildMonthlyReportPdf, previousMonthValue } from "@/lib/monthly-report";

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

  const periodMonth = previousMonthValue();
  const results = { periodMonth, sent: 0, skipped: 0, failed: 0 };

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

      const { buffer, orgName } = await buildMonthlyReportPdf(org.id, periodMonth);
      const label = monthLabel(periodMonth);

      const sendResult = await resend.emails.send({
        from: FROM,
        to: emails,
        subject: `Your ${label} Report from Spectecle`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#fff;">
            <div style="border-left:4px solid #9a5423;padding-left:16px;margin-bottom:28px;">
              <h2 style="margin:0 0 4px;color:#211a13;font-size:20px;">Your ${label} report is attached</h2>
              <p style="margin:0;color:#8b7e6a;font-size:14px;">${orgName}</p>
            </div>
            <p style="color:#5b4e3f;font-size:15px;line-height:1.6;">
              A summary of your site's traffic, search performance, and requests for ${label} is attached as a PDF.
            </p>
            <p style="margin-top:28px;color:#bbb;font-size:12px;">
              Questions about anything in it? Just reply to this email.
            </p>
          </div>
        `,
        attachments: [{ filename: `spectecle-report-${periodMonth}.pdf`, content: buffer }],
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
