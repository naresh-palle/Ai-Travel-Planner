import "server-only"

import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export async function requireAppUser() {
  const clerkUser = await currentUser()
  if (!clerkUser) return null

  const email = clerkUser.emailAddresses?.[0]?.emailAddress ?? null
  const name = clerkUser.fullName ?? clerkUser.firstName ?? null
  const imageUrl = clerkUser.imageUrl ?? null

  const existing = await db.user.findUnique({
    where: { clerkUserId: clerkUser.id },
    select: { id: true },
  })

  const user = await db.user.upsert({
    where: { clerkUserId: clerkUser.id },
    create: {
      clerkUserId: clerkUser.id,
      email,
      name,
      imageUrl,
    },
    update: {
      email,
      name,
      imageUrl,
    },
  })

  if (!existing) {
    await db.analyticsEvent.create({
      data: {
        userId: user.id,
        eventType: "SIGNUP",
        source: "clerk_sync",
      },
    })
  }

  return user
}

