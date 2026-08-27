import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, PRICE_TO_PLAN } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";

// Stripe calls this server-to-server — there's no browser Origin header, so
// this route is authenticated by signature verification instead of the
// usual session + isTrustedOrigin gate used elsewhere in the portal.

async function resolveOrgIdByCustomerId(customerId: string): Promise<string | null> {
  const { data } = await supabase
    .from("organizations")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();
  return data?.id ?? null;
}

function planFromSubscription(sub: Stripe.Subscription) {
  const priceId = sub.items.data[0]?.price.id;
  return priceId ? PRICE_TO_PLAN[priceId] : undefined;
}

async function upsertSubscriptionRow(sub: Stripe.Subscription, organizationId: string) {
  const plan = planFromSubscription(sub);
  if (!plan) {
    console.error("[stripe webhook] subscription has an unrecognized price id:", sub.id);
    return;
  }

  const item = sub.items.data[0];
  const row = {
    organization_id: organizationId,
    stripe_customer_id: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
    stripe_subscription_id: sub.id,
    stripe_price_id: item.price.id,
    tier: plan.tier,
    billing_interval: plan.interval,
    status: sub.status,
    current_period_end: item.current_period_end
      ? new Date(item.current_period_end * 1000).toISOString()
      : null,
    cancel_at_period_end: sub.cancel_at_period_end,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("subscriptions")
    .upsert(row, { onConflict: "stripe_subscription_id" });
  if (error) {
    console.error("[stripe webhook] failed to upsert subscription row:", error);
  }

  // Sync the fast-read tier cache on organizations. An admin's manual
  // DashboardTierEditor override can be overwritten by the next routine
  // webhook (accepted tradeoff, see the Phase 1 plan) — but we only ever
  // sync a *paid* tier while the subscription is actually active/trialing,
  // never on past_due/canceled, so a failed payment doesn't silently
  // upgrade anyone and a cancellation is handled by its own event below.
  if (sub.status === "active" || sub.status === "trialing") {
    const { error: orgError } = await supabase
      .from("organizations")
      .update({
        dashboard_tier: plan.tier,
        dashboard_tier_updated_at: new Date().toISOString(),
        dashboard_tier_updated_by: "stripe:webhook",
      })
      .eq("id", organizationId);
    if (orgError) {
      console.error("[stripe webhook] failed to sync organizations.dashboard_tier:", orgError);
    }
  }
}

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[stripe webhook] STRIPE_WEBHOOK_SECRET is not set — rejecting");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("[stripe webhook] signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const organizationId = session.client_reference_id;
      if (!organizationId) {
        console.error("[stripe webhook] checkout.session.completed missing client_reference_id:", session.id);
        break;
      }
      if (typeof session.customer === "string") {
        const { error } = await supabase
          .from("organizations")
          .update({ stripe_customer_id: session.customer })
          .eq("id", organizationId)
          .is("stripe_customer_id", null);
        if (error) {
          console.error("[stripe webhook] failed to persist stripe_customer_id:", error);
        }
      }
      if (typeof session.subscription === "string") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        await upsertSubscriptionRow(subscription, organizationId);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
      const organizationId = await resolveOrgIdByCustomerId(customerId);
      if (!organizationId) {
        console.error("[stripe webhook] no organization found for customer:", customerId);
        break;
      }
      await upsertSubscriptionRow(subscription, organizationId);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
      const organizationId = await resolveOrgIdByCustomerId(customerId);

      const { error: subError } = await supabase
        .from("subscriptions")
        .update({ status: "canceled", updated_at: new Date().toISOString() })
        .eq("stripe_subscription_id", subscription.id);
      if (subError) {
        console.error("[stripe webhook] failed to mark subscription canceled:", subError);
      }

      if (organizationId) {
        const { error: orgError } = await supabase
          .from("organizations")
          .update({
            dashboard_tier: "free",
            dashboard_tier_updated_at: new Date().toISOString(),
            dashboard_tier_updated_by: "stripe:webhook",
          })
          .eq("id", organizationId);
        if (orgError) {
          console.error("[stripe webhook] failed to revert organization to free:", orgError);
        }
      }
      break;
    }

    case "invoice.payment_failed": {
      // Stripe flips the subscription to `past_due` in tandem, which the
      // customer.subscription.updated handler above already captures.
      // This is logged for visibility, not a distinct state transition.
      const invoice = event.data.object as Stripe.Invoice;
      console.warn("[stripe webhook] payment failed for customer:", invoice.customer);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
