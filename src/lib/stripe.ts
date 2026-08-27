import Stripe from "stripe";
import type { DashboardTier } from "@/lib/dashboard-tiers";

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

const GROWTH_MONTHLY = process.env.STRIPE_PRICE_GROWTH_MONTHLY;
const GROWTH_ANNUAL = process.env.STRIPE_PRICE_GROWTH_ANNUAL;
const PRO_MONTHLY = process.env.STRIPE_PRICE_PRO_MONTHLY;
const PRO_ANNUAL = process.env.STRIPE_PRICE_PRO_ANNUAL;

if (!GROWTH_MONTHLY || !GROWTH_ANNUAL || !PRO_MONTHLY || !PRO_ANNUAL) {
  throw new Error(
    "Missing one or more Stripe price env vars (STRIPE_PRICE_GROWTH_MONTHLY, STRIPE_PRICE_GROWTH_ANNUAL, STRIPE_PRICE_PRO_MONTHLY, STRIPE_PRICE_PRO_ANNUAL)."
  );
}

/** Maps a Stripe price id back to the plan it represents — the inverse of
 * what the checkout route and webhook handler need to resolve a tier +
 * billing interval from a price id on a subscription/session. */
export const PRICE_TO_PLAN: Record<string, { tier: Extract<DashboardTier, "growth" | "pro">; interval: BillingInterval }> = {
  [GROWTH_MONTHLY]: { tier: "growth", interval: "monthly" },
  [GROWTH_ANNUAL]: { tier: "growth", interval: "annual" },
  [PRO_MONTHLY]: { tier: "pro", interval: "monthly" },
  [PRO_ANNUAL]: { tier: "pro", interval: "annual" },
};

export function isKnownPriceId(priceId: unknown): priceId is string {
  return typeof priceId === "string" && priceId in PRICE_TO_PLAN;
}

/** Forward direction (tier + interval -> price id) for the upgrade UI.
 * Server-only (like everything else in this file) — the client component
 * that renders plan-choice buttons receives these as props from a server
 * component rather than importing this module itself, so no price id
 * (test or live) ever gets baked into the client bundle. */
export const PLAN_PRICES: Record<Extract<DashboardTier, "growth" | "pro">, Record<BillingInterval, string>> = {
  growth: { monthly: GROWTH_MONTHLY, annual: GROWTH_ANNUAL },
  pro: { monthly: PRO_MONTHLY, annual: PRO_ANNUAL },
};
