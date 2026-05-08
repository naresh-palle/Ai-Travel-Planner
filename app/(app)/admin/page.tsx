import Link from "next/link"
import { notFound } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAdmin } from "@/lib/auth/is-admin"
import { db } from "@/lib/db"

export default async function AdminPage() {
  const admin = await requireAdmin()
  if (!admin) notFound()

  const [users, trips, activeSubs, unreadNotifications] = await Promise.all([
    db.user.count(),
    db.trip.count(),
    db.user.count({ where: { subscriptionStatus: { in: ["ACTIVE", "TRIALING"] } } }),
    db.notification.count({ where: { readAt: null } }),
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin Panel</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader><CardTitle className="text-sm">Users</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{users}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Trips</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{trips}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Active Subscriptions</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{activeSubs}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Unread Notifications</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{unreadNotifications}</CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Link className="text-sm underline" href="/admin/analytics">
          Open analytics dashboard
        </Link>
      </div>
    </div>
  )
}

