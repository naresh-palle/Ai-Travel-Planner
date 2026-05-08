import "server-only"

import { currentUser } from "@clerk/nextjs/server"

import { db } from "@/lib/db"

export async function requireAdmin() {
  const clerkUser = await currentUser()
  if (!clerkUser) return null
  const user = await db.user.findUnique({
    where: { clerkUserId: clerkUser.id },
    select: { id: true, isAdmin: true },
  })
  if (!user?.isAdmin) return null
  return user
}

