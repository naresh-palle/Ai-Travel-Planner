import { headers } from "next/headers"
import { Webhook } from "svix"
import { NextResponse } from "next/server"

import { getEnvServer } from "@/lib/env.server"
import { syncUserFromClerk } from "@/modules/users/application/sync-user-from-clerk"
import { userRepository } from "@/modules/users/infrastructure/user-repository.prisma"

type ClerkWebhookEvent = {
  type: string
  data: Record<string, unknown>
}

export async function POST(req: Request) {
  const envServer = getEnvServer()

  if (!envServer.CLERK_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "CLERK_WEBHOOK_SECRET not configured" },
      { status: 400 }
    )
  }

  const payload = await req.text()
  const h = await headers()
  const svix_id = h.get("svix-id")
  const svix_timestamp = h.get("svix-timestamp")
  const svix_signature = h.get("svix-signature")

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 })
  }

  let evt: ClerkWebhookEvent
  try {
    const wh = new Webhook(envServer.CLERK_WEBHOOK_SECRET)
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as ClerkWebhookEvent
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (evt.type === "user.created" || evt.type === "user.updated") {
    const clerkUserId = String(evt.data["id"] ?? "")
    const emailAddresses = evt.data["email_addresses"] as
      | Array<{ email_address?: string }>
      | undefined
    const email = emailAddresses?.[0]?.email_address

    if (!clerkUserId) {
      return NextResponse.json({ error: "Missing user id" }, { status: 400 })
    }

    await syncUserFromClerk(userRepository, { clerkUserId, email })
  }

  if (evt.type === "user.deleted") {
    const clerkUserId = String(evt.data["id"] ?? "")
    if (clerkUserId) {
      await userRepository.deleteByClerkId(clerkUserId)
    }
  }

  return NextResponse.json({ received: true })
}

