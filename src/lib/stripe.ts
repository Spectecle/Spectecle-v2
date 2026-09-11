import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import type { DashboardAddon, PurchasableTier } from "@/lib/dashboard-tiers";

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY. Set it in .env.local (see .env.local.example).");
}

export const stripe = new Stripe(secretKey);

/** True for rk_test_/sk_test_ keys — used only to build correct Stripe
 * Dashboard deep-links (test mode and live mode have different URLs for
 * the same object), never for any billing-logic branching. */
export const STRIPE_IS_TEST_MODE = secretKey.includes("_test_");

export function stripeDashboardCustomerUrl(customerId: string): string {
  return `https://dashboard.stripe.com/${STRIPE_IS_TEST_MODE ? "test/" : ""}customers/${customerId}`;
}

export type BillingInterval = "monthly" | "annual";

const ESSENTIALS_MONTHLY = process.env.STRIPE_PRICE_ESSENTIALS_MONTHLY;
const ESSENTIALS_ANNUAL = process.env.STRIPE_PRICE_ESSENTIALS_ANNUAL;
const GROWTH_MONTHLY = process.env.STRIPE_PRICE_GROWTH_MONTHLY;
const GROWTH_ANNUAL = process.env.STRIPE_PRICE_GROWTH_ANNUAL;
const SCALE_MONTHLY = process.env.STRIPE_PRICE_SCALE_MONTHLY;
const SCALE_ANNUAL = process.env.STRIPE_PRICE_SCALE_ANNUAL;

if (
  !ESSENTIALS_MONTHLY ||
  !ESSENTIALS_ANNUAL ||
  !GROWTH_MONTHLY ||
  !GROWTH_ANNUAL ||
  !SCALE_MONTHLY ||
  !SCALE_ANNUAL
) {
  throw new Error(
    "Missing one or more Stripe tier price env vars (STRIPE_PRICE_ESSENTIALS_MONTHLY, STRIPE_PRICE_ESSENTIALS_ANNUAL, STRIPE_PRICE_GROWTH_MONTHLY, STRIPE_PRICE_GROWTH_ANNUAL, STRIPE_PRICE_SCALE_MONTHLY, STRIPE_PRICE_SCALE_ANNUAL)."
  );
}

/** Maps a Stripe price id back to the plan it represents — the inverse of
 * what the checkout route and webhook handler need to resolve a tier +
 * billing interval from a price id on a subscription/session. */
export const PRICE_TO_PLAN: Record<string, { tier: PurchasableTier; interval: BillingInterval }> = {
  [ESSENTIALS_MONTHLY]: { tier: "essentials", interval: "monthly" },
  [ESSENTIALS_ANNUAL]: { tier: "essentials", interval: "annual" },
  [GROWTH_MONTHLY]: { tier: "growth", interval: "monthly" },
  [GROWTH_ANNUAL]: { tier: "growth", interval: "annual" },
  [SCALE_MONTHLY]: { tier: "scale", interval: "monthly" },
  [SCALE_ANNUAL]: { tier: "scale", interval: "annual" },
};

export function isKnownPriceId(priceId: unknown): priceId is string {
  return typeof priceId === "string" && priceId in PRICE_TO_PLAN;
}

/** Forward direction (tier + interval -> price id) for the upgrade UI.
 * Server-only (like everything else in this file) — the client component
 * that renders plan-choice buttons receives these as props from a server
 * component rather than importing this module itself, so no price id
 * (test or live) ever gets baked into the client bundle. */
export const PLAN_PRICES: Record<PurchasableTier, Record<BillingInterval, string>> = {
  essentials: { monthly: ESSENTIALS_MONTHLY, annual: ESSENTIALS_ANNUAL },
  growth: { monthly: GROWTH_MONTHLY, annual: GROWTH_ANNUAL },
  scale: { monthly: SCALE_MONTHLY, annual: SCALE_ANNUAL },
};

// ── Add-ons ──────────────────────────────────────────────────────────────
// Each add-on is monthly-only and sold as its own independent Stripe
// Subscription (same customer, separate subscription object) rather than a
// second line item on the tier subscription — see addon_subscriptions in
// supabase/schema.sql and the checkout-addon route for why.

const ADDON_SEO_MONTHLY = process.env.STRIPE_PRICE_ADDON_SEO_MONTHLY;
const ADDON_PAID_ADS_MONTHLY = process.env.STRIPE_PRICE_ADDON_PAIDADS_MONTHLY;

if (!ADDON_SEO_MONTHLY || !ADDON_PAID_ADS_MONTHLY) {
  throw new Error(
    "Missing one or more Stripe addon price env vars (STRIPE_PRICE_ADDON_SEO_MONTHLY, STRIPE_PRICE_ADDON_PAIDADS_MONTHLY)."
  );
}

export const PRICE_TO_ADDON: Record<string, { addon: DashboardAddon }> = {
  [ADDON_SEO_MONTHLY]: { addon: "seo" },
  [ADDON_PAID_ADS_MONTHLY]: { addon: "paidAds" },
};

export function isKnownAddonPriceId(priceId: unknown): priceId is string {
  return typeof priceId === "string" && priceId in PRICE_TO_ADDON;
}

export const ADDON_PRICES: Record<DashboardAddon, string> = {
  seo: ADDON_SEO_MONTHLY,
  paidAds: ADDON_PAID_ADS_MONTHLY,
};

/** Find-or-create the one Stripe customer for an org, shared by the tier
 * checkout route and the add-on checkout route (both bill the same
 * organization, so they must reuse the same customer rather than each
 * creating their own). Returns null if the org itself doesn't exist. */
export async function getOrCreateStripeCustomer(organizationId: string, userEmail: string): Promise<string | null> {
  const { data: org } = await supabase
    .from("organizations")
    .select("stripe_customer_id")
    .eq("id", organizationId)
    .maybeSingle();

  if (!org) return null;
  if (org.stripe_customer_id) return org.stripe_customer_id;

  const customer = await stripe.customers.create({
    email: userEmail,
    metadata: { organization_id: organizationId },
  });

  const { error } = await supabase
    .from("organizations")
    .update({ stripe_customer_id: customer.id })
    .eq("id", organizationId);
  if (error) {
    console.error("[stripe] failed to persist stripe_customer_id:", error);
  }

  return customer.id;
}
