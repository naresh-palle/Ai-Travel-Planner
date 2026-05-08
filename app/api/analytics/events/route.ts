import { AnalyticsEventType } from "@prisma/client"
import type { Prisma } from "@prisma/client"
import { NextResponse } from "next/server"
import { z } from "zod"

import { requireAppUser } from "@/lib/auth/app-user"
import { requireAdmin } from "@/lib/auth/is-admin"
import { db } from "@/lib/db"
import { trackEvent } from "@/lib/analytics/events"

const payloadSchema = z.object({
  eventType: z.nativeEnum(AnalyticsEventType),
  source: z.string().max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
})

export async function GET() {
  const admin = await requireAdmin()
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const [eventsByType, recentEvents] = await Promise.all([
    db.analyticsEvent.groupBy({
      by: ["eventType"],
      _count: { _all: true },
      orderBy: { _count: { eventType: "desc" } },
    }),
    db.analyticsEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: { id: true, eventType: true, source: true, createdAt: true, userId: true },
    }),
  ])

  return NextResponse.json({ data: { eventsByType, recentEvents } })
}

export async function POST(req: Request) {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = (await req.json()) as unknown
  const parsed = payloadSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 })

  await trackEvent({
    userId: user.id,
    eventType: parsed.data.eventType,
    source: parsed.data.source,
    metadata: parsed.data.metadata as Prisma.InputJsonValue | undefined,
  })

  return NextResponse.json({ ok: true }, { status: 201 })
}

