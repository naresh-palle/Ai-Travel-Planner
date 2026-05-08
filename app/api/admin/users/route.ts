import { NextResponse } from "next/server"

import { requireAdmin } from "@/lib/auth/is-admin"
import { db } from "@/lib/db"

export async function GET() {
  const admin = await requireAdmin()
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    select: {
      id: true,
      email: true,
      name: true,
      isAdmin: true,
      subscriptionStatus: true,
      createdAt: true,
    },
  })
  return NextResponse.json({ data: users })
}

