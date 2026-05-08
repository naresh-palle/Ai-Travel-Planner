import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Plus } from "lucide-react"

import { TripsListClient } from "@/components/trips/trips-list-client"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"

export default async function TripsPage() {
  const clerkUser = await currentUser()
  if (!clerkUser) redirect("/sign-in")

  const user = await db.user.findUnique({
    where: { clerkUserId: clerkUser.id },
  })

  const trips = user
    ? await db.trip.findMany({
        where: { ownerId: user.id },
        include: { primaryDestination: true },
        orderBy: { updatedAt: "desc" },
      })
    : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Trips</h1>
          <p className="text-sm text-muted-foreground">Plan and manage your itineraries.</p>
        </div>
        <Button asChild>
          <Link href="/trips/new">
            <Plus className="mr-2 h-4 w-4" />
            New Trip
          </Link>
        </Button>
      </div>

      <TripsListClient
        initialTrips={trips.map((trip) => ({
          ...trip,
          startDate: trip.startDate ? trip.startDate.toISOString() : null,
        }))}
      />
    </div>
  )
}

