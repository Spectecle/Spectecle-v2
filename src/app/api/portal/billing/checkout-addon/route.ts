import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { isTrustedOrigin } from "@/lib/origin-check";
import { supabase } from "@/lib/supabase";
import { getDashboardContextForUser } from "@/lib/dashboard-access";
import { stripe, isKnownAddonPriceId, getOrCreateStripeCustomer } from "@/lib/stripe";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://spectecle.com";

// Sibling to /api/portal/billing/checkout, kept as a separate route rather
// than a branch in that one: an add-on purchase creates its own
// independent Stripe Subscription (same customer, separate subscription
// object) instead of a line item on the tier subscription, so it needs its
// own "already have this?" guard and its own webhook-side handling. See
// addon_subscriptions in supabase/schema.sql for why.
export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as { priceId?: string } | null;
  if (!isKnownAddonPriceId(body?.priceId)) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }
  const priceId = body.priceId;

  const { organizationId } = await getDashboardContextForUser(user.id);
  if (!organizationId) {
    return NextResponse.json({ error: "No business on your account yet — contact us to get set up." }, { status: 400 });
  }

  // Refuse to start a second checkout for an add-on the org already has
  // active/trialing — Stripe would happily create a duplicate subscription,
  // this is app-level protection against a double-click or a stale tab.
  const { data: existing } = await supabase
    .from("addon_subscriptions")
    .select("status")
    .eq("organization_id", organizationId)
    .eq("stripe_price_id", priceId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (existing && (existing.status === "active" || existing.status === "trialing")) {
    return NextResponse.json({ error: "You already have this add-on." }, { status: 400 });
  }

  const customerId = await getOrCreateStripeCustomer(organizationId, user.email);
  if (!customerId) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
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
    console.error("[portal/billing/checkout-addon] Stripe returned no session url:", session.id);
    return NextResponse.json({ error: "Failed to start checkout" }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
