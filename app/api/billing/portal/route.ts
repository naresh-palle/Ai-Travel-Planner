import { NextResponse } from "next/server"

import { requireAppUser } from "@/lib/auth/app-user"
import { getStripeClient } from "@/lib/stripe"

export async function POST() {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!user.stripeCustomerId) {
    return NextResponse.json({ error: "No Stripe customer found" }, { status: 400 })
  }

  const stripe = getStripeClient()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${appUrl}/settings/billing`,
  })

  return NextResponse.json({ data: { url: session.url } })
}

