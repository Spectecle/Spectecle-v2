import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDashboardContextForUser } from "@/lib/dashboard-access";
import { tierIncludes } from "@/lib/dashboard-tiers";
import { buildMonthlyReportPdf, currentMonthValue } from "@/lib/monthly-report";

const MONTH_RE = /^\d{4}-\d{2}$/;

export async function GET(req: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { organizationId, tier } = await getDashboardContextForUser(user.id);
  if (!tierIncludes(tier, "monthlyReport")) {
    return NextResponse.json({ error: "Not included in your current plan" }, { status: 403 });
  }
  if (!organizationId) {
    return NextResponse.json({ error: "No business on your account yet" }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const periodMonth = month && MONTH_RE.test(month) ? month : currentMonthValue();

  const { buffer } = await buildMonthlyReportPdf(organizationId, periodMonth);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="spectecle-report-${periodMonth}.pdf"`,
    },
  });
}
