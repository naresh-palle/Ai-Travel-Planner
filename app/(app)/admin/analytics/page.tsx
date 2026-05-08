import { notFound } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAdmin } from "@/lib/auth/is-admin"
import { db } from "@/lib/db"

export default async function AdminAnalyticsPage() {
  const admin = await requireAdmin()
  if (!admin) notFound()

  const [grouped, recent] = await Promise.all([
    db.analyticsEvent.groupBy({
      by: ["eventType"],
      _count: { _all: true },
      orderBy: { _count: { eventType: "desc" } },
    }),
    db.analyticsEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      select: { id: true, eventType: true, source: true, createdAt: true },
    }),
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {grouped.map((item) => (
          <Card key={item.eventType}>
            <CardHeader>
              <CardTitle className="text-sm">{item.eventType}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{item._count._all}</CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {recent.map((event) => (
            <div key={event.id} className="rounded border p-2">
              <div className="font-medium">{event.eventType}</div>
              <div className="text-muted-foreground">
                {event.source ?? "unknown"} • {event.createdAt.toISOString()}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

