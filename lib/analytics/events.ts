import type { Prisma } from "@prisma/client"
import { AnalyticsEventType } from "@prisma/client"

import { db } from "@/lib/db"

export async function trackEvent(input: {
  userId?: string | null
  eventType: AnalyticsEventType
  source?: string
  metadata?: Prisma.InputJsonValue
}) {
  await db.analyticsEvent.create({
    data: {
      userId: input.userId ?? null,
      eventType: input.eventType,
      source: input.source,
      metadata: input.metadata,
    },
  })
}

