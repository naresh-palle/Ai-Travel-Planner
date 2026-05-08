import { NextResponse } from "next/server"
import { z } from "zod"

import { requireAppUser } from "@/lib/auth/app-user"
import { db } from "@/lib/db"
import { getStripeClient, getStripePriceId } from "@/lib/stripe"

const schema = z.object({
  interval: z.enum(["monthly", "yearly"]).default("monthly"),
})

export async function POST(req: Request) {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = (await req.json()) as unknown
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const stripe = getStripeClient()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  const priceId = getStripePriceId(parsed.data.interval)

  let customerId = user.stripeCustomerId
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      name: user.name ?? undefined,
      metadata: { userId: user.id },
    })
    customerId = customer.id
    await db.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customerId },
    })
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/settings/billing?status=success`,
    cancel_url: `${appUrl}/settings/billing?status=canceled`,
    metadata: { userId: user.id },
    allow_promotion_codes: true,
  })

  await db.analyticsEvent.create({
    data: {
      userId: user.id,
      eventType: "CHECKOUT_STARTED",
      source: "billing_checkout",
      metadata: { interval: parsed.data.interval },
    },
  })

  return NextResponse.json({ data: { url: session.url } })
}

