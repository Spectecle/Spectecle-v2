// One-off script: creates the Stripe test-mode Products/Prices for the
// Essentials/Growth/Scale tiers + SEO Optimization/Paid Ads Management
// add-ons, then prints a ready-to-paste .env.local block with the
// resulting price ids.
//
// Run once: node --env-file=.env.local scripts/create-stripe-test-prices.mjs
//
// Safe to re-run — Stripe prices are immutable, so re-running this creates
// a *second* set of Products/Prices rather than updating the first. If you
// re-run it, archive the old ones in the Stripe Dashboard (or just use the
// newest output) rather than leaving duplicates live.
//
// Refuses to run against a live secret key — creating real, chargeable
// Stripe objects is a deliberate, separate step, not something this script
// does by accident.
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  console.error("Missing STRIPE_SECRET_KEY. Run with: node --env-file=.env.local scripts/create-stripe-test-prices.mjs");
  process.exit(1);
}
if (!secretKey.includes("_test_")) {
  console.error("STRIPE_SECRET_KEY is not a test-mode key (expected rk_test_.../sk_test_...). Refusing to create live Stripe objects from this script.");
  process.exit(1);
}

const stripe = new Stripe(secretKey);

const TIERS = [
  { key: "ESSENTIALS", name: "Essentials", monthly: 9900, annual: 99000 },
  { key: "GROWTH", name: "Growth", monthly: 14900, annual: 149000 },
  { key: "SCALE", name: "Scale", monthly: 25000, annual: 250000 },
];

const ADDONS = [
  { key: "ADDON_SEO", name: "SEO Optimization", monthly: 14900 },
  { key: "ADDON_PAIDADS", name: "Paid Ads Management", monthly: 25000 },
];

async function createTierPrices({ key, name, monthly, annual }) {
  const product = await stripe.products.create({ name: `Spectecle ${name}` });
  const monthlyPrice = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: monthly,
    recurring: { interval: "month" },
    nickname: `${name} — Monthly`,
  });
  const annualPrice = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: annual,
    recurring: { interval: "year" },
    nickname: `${name} — Annual`,
  });
  console.log(`Created ${name}: product ${product.id}`);
  return [
    `STRIPE_PRICE_${key}_MONTHLY=${monthlyPrice.id}`,
    `STRIPE_PRICE_${key}_ANNUAL=${annualPrice.id}`,
  ];
}

async function createAddonPrice({ key, name, monthly }) {
  const product = await stripe.products.create({ name: `Spectecle Add-on: ${name}` });
  const monthlyPrice = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: monthly,
    recurring: { interval: "month" },
    nickname: `${name} — Monthly`,
  });
  console.log(`Created ${name}: product ${product.id}`);
  return [`STRIPE_PRICE_${key}_MONTHLY=${monthlyPrice.id}`];
}

async function main() {
  const lines = [];
  for (const tier of TIERS) {
    lines.push(...(await createTierPrices(tier)));
  }
  for (const addon of ADDONS) {
    lines.push(...(await createAddonPrice(addon)));
  }

  console.log("\nPaste this into .env.local:\n");
  console.log(lines.join("\n"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
