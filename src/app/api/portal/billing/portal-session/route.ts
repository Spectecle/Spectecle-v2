import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { isTrustedOrigin } from "@/lib/origin-check";
import { supabase } from "@/lib/supabase";
import { getDashboardContextForUser } from "@/lib/dashboard-access";
import { stripe } from "@/lib/stripe";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://spectecle.com";

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { organizationId } = await getDashboardContextForUser(user.id);
  if (!organizationId) {
    return NextResponse.json({ error: "No business on your account yet" }, { status: 400 });
  }

  const { data: org } = await supabase
    .from("organizations")
    .select("stripe_customer_id")
    .eq("id", organizationId)
    .maybeSingle();

  if (!org?.stripe_customer_id) {
    return NextResponse.json(
      { error: "No billing account yet — upgrade to a paid plan first." },
      { status: 400 }
    );
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: org.stripe_customer_id,
    return_url: `${SITE_URL}/portal/dashboard?section=invoices`,
  });

  return NextResponse.json({ url: session.url });
}
