"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CalendarDays, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTripsSnapshot, saveTripsSnapshot } from "@/lib/offline/cache"

type TripListItem = {
  id: string
  title: string
  description: string | null
  status: string
  travelersCount: number
  startDate: string | null
  primaryDestination?: { name: string } | null
}

export function TripsListClient({ initialTrips }: { initialTrips: TripListItem[] }) {
  const [trips, setTrips] = useState(initialTrips)

  useEffect(() => {
    if (initialTrips.length > 0) saveTripsSnapshot(initialTrips)
    if (initialTrips.length === 0 && !navigator.onLine) {
      const cached = getTripsSnapshot<TripListItem[]>()
      if (cached) setTrips(cached)
    }
  }, [initialTrips])

  if (trips.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          No trips yet. Create your first trip.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {trips.map((trip) => (
        <Card key={trip.id}>
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-lg">{trip.title}</CardTitle>
              <Badge variant="secondary">{trip.status}</Badge>
            </div>
            <div className="text-sm text-muted-foreground">{trip.description ?? "No description"}</div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
              <span className="inline-flex items-center">
                <Users className="mr-1 h-4 w-4" />
                {trip.travelersCount} travelers
              </span>
              <span className="inline-flex items-center">
                <CalendarDays className="mr-1 h-4 w-4" />
                {trip.startDate ? trip.startDate.slice(0, 10) : "TBD"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">
                {trip.primaryDestination?.name ?? "No destination selected"}
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href={`/trips/${trip.id}`}>Open</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

