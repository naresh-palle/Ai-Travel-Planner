import { NextResponse } from "next/server"
import { z } from "zod"

import { requireAppUser } from "@/lib/auth/app-user"
import { db } from "@/lib/db"

const markReadSchema = z.object({
  notificationId: z.string().optional(),
  markAll: z.boolean().optional(),
})

export async function GET() {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const items = await db.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 30,
  })
  const unreadCount = await db.notification.count({
    where: { userId: user.id, readAt: null },
  })

  return NextResponse.json({ data: items, unreadCount })
}

export async function PATCH(req: Request) {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = (await req.json()) as unknown
  const parsed = markReadSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 })

  if (parsed.data.markAll) {
    await db.notification.updateMany({
      where: { userId: user.id, readAt: null },
      data: { readAt: new Date() },
    })
    return NextResponse.json({ ok: true })
  }

  if (!parsed.data.notificationId) {
    return NextResponse.json({ error: "notificationId required" }, { status: 400 })
  }

  await db.notification.updateMany({
    where: { id: parsed.data.notificationId, userId: user.id },
    data: { readAt: new Date() },
  })

  return NextResponse.json({ ok: true })
}

