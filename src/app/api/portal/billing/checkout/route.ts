import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { isTrustedOrigin } from "@/lib/origin-check";
import { supabase } from "@/lib/supabase";
import { getDashboardContextForUser } from "@/lib/dashboard-access";
import { stripe, isKnownPriceId } from "@/lib/stripe";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://spectecle.com";

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as { priceId?: string } | null;
  if (!isKnownPriceId(body?.priceId)) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }
  const priceId = body.priceId;

  const { organizationId } = await getDashboardContextForUser(user.id);
  if (!organizationId) {
    return NextResponse.json({ error: "No business on your account yet — contact us to get set up." }, { status: 400 });
  }

  const { data: org } = await supabase
    .from("organizations")
    .select("id, stripe_customer_id")
    .eq("id", organizationId)
    .maybeSingle();
  if (!org) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  // Find-or-create the Stripe customer for this org. One customer per
  // organization, reused across upgrades/downgrades/resubscribes.
  let customerId = org.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { organization_id: organizationId },
    });
    customerId = customer.id;
    const { error: updateError } = await supabase
      .from("organizations")
      .update({ stripe_customer_id: customerId })
      .eq("id", organizationId);
    if (updateError) {
      console.error("[portal/billing/checkout] failed to persist stripe_customer_id:", updateError);
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    client_reference_id: organizationId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${SITE_URL}/portal/dashboard?section=invoices&checkout=success`,
    cancel_url: `${SITE_URL}/portal/dashboard?section=invoices&checkout=cancelled`,
  });

  if (!session.url) {
    console.error("[portal/billing/checkout] Stripe returned no session url:", session.id);
    return NextResponse.json({ error: "Failed to start checkout" }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
