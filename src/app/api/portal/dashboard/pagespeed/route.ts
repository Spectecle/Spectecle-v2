import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { isTrustedOrigin } from "@/lib/origin-check";
import { getDashboardContextForUser } from "@/lib/dashboard-access";
import { tierIncludes } from "@/lib/dashboard-tiers";
import { fetchPageSpeedScore } from "@/lib/site-status";

// A real Lighthouse run takes 5-15+ seconds — this is intentionally a
// dedicated, client-triggered route rather than part of the server-rendered
// dashboard page, which needs to stay fast. The caller's own org website_url
// is resolved server-side from their session, never accepted from the
// client, so this can't be used as an open URL-scanning proxy.
export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { tier, websiteUrl } = await getDashboardContextForUser(user.id);
  if (!tierIncludes(tier, "statusBundle")) {
    return NextResponse.json({ error: "Not included in your current plan" }, { status: 403 });
  }
  if (!websiteUrl) {
    return NextResponse.json({ error: "No website on file for your account yet" }, { status: 400 });
  }

  try {
    const score = await fetchPageSpeedScore(websiteUrl);
    return NextResponse.json({ score });
  } catch (error) {
    console.error("[portal/dashboard/pagespeed] fetch error:", error);
    return NextResponse.json({ error: "Failed to check site speed" }, { status: 500 });
  }
}
