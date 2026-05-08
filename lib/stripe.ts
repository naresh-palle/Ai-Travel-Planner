import "server-only"

import Stripe from "stripe"

let client: Stripe | null = null

export function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error("STRIPE_SECRET_KEY is missing")
  if (!client) {
    client = new Stripe(key, {
      typescript: true,
    })
  }
  return client
}

export function getStripePriceId(interval: "monthly" | "yearly") {
  const price =
    interval === "monthly"
      ? process.env.STRIPE_PRICE_ID_MONTHLY
      : process.env.STRIPE_PRICE_ID_YEARLY
  if (!price) {
    throw new Error(
      interval === "monthly"
        ? "STRIPE_PRICE_ID_MONTHLY is missing"
        : "STRIPE_PRICE_ID_YEARLY is missing"
    )
  }
  return price
}

