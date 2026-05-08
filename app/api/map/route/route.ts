import { NextResponse } from "next/server"

import { requireAppUser } from "@/lib/auth/app-user"
import { canReadTrip, getTripRole } from "@/lib/auth/trip-access"
import { db } from "@/lib/db"

export async function GET(req: Request) {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const url = new URL(req.url)
  const tripId = url.searchParams.get("tripId")
  if (!tripId) return NextResponse.json({ error: "tripId is required" }, { status: 400 })
  const role = await getTripRole(tripId, user.id)
  if (!canReadTrip(role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const trip = await db.trip.findFirst({
    where: { id: tripId },
    include: {
      destinations: {
        where: {
          latitude: { not: null },
          longitude: { not: null },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  })
  if (!trip) return NextResponse.json({ error: "Trip not found" }, { status: 404 })

  const coordinates = trip.destinations
    .filter((d) => d.latitude != null && d.longitude != null)
    .map((d) => [d.longitude as number, d.latitude as number])

  return NextResponse.json({
    data: {
      tripId: trip.id,
      destinations: trip.destinations,
      route:
        coordinates.length >= 2
          ? {
              type: "Feature",
              properties: { tripId: trip.id, title: trip.title },
              geometry: {
                type: "LineString",
                coordinates,
              },
            }
          : null,
    },
  })
}

