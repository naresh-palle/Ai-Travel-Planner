import Stripe from "stripe"

import { db } from "@/lib/db"
import { getStripeClient } from "@/lib/stripe"

function toStatus(status: Stripe.Subscription.Status) {
  switch (status) {
    case "active":
      return "ACTIVE"
    case "trialing":
      return "TRIALING"
    case "past_due":
      return "PAST_DUE"
    case "unpaid":
      return "UNPAID"
    case "canceled":
      return "CANCELED"
    default:
      return "INACTIVE"
  }
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    return new Response("Missing STRIPE_WEBHOOK_SECRET", { status: 500 })
  }

  const stripe = getStripeClient()
  const signature = req.headers.get("stripe-signature")
  if (!signature) return new Response("Missing stripe-signature", { status: 400 })

  const payload = await req.text()
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, signature, secret)
  } catch {
    return new Response("Invalid signature", { status: 400 })
  }

  if (
    event.type === "customer.subscription.created" ||
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const sub = event.data.object as Stripe.Subscription
    const customerId = String(sub.customer)
    const user = await db.user.findFirst({
      where: { stripeCustomerId: customerId },
      select: { id: true },
    })

    if (user) {
      await db.user.update({
        where: { id: user.id },
        data: {
          subscriptionStatus: toStatus(sub.status) as any,
          subscriptionPriceId: sub.items.data[0]?.price.id ?? null,
          subscriptionCurrentPeriodEnd: (sub as any).current_period_end
            ? new Date((sub as any).current_period_end * 1000)
            : null,
        },
      })

      await db.notification.create({
        data: {
          userId: user.id,
          type: "INFO",
          title: "Subscription updated",
          message: `Your subscription is now ${sub.status}.`,
          metadata: { eventType: event.type },
        },
      })

      await db.analyticsEvent.create({
        data: {
          userId: user.id,
          eventType: "SUBSCRIPTION_UPDATED",
          source: "stripe_webhook",
          metadata: { status: sub.status, eventType: event.type },
        },
      })
    }
  }

  return new Response("ok")
}

