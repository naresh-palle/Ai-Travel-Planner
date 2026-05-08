import { NextResponse } from "next/server"

import { requireAppUser } from "@/lib/auth/app-user"
import { db } from "@/lib/db"
import { createTripForOwner, listTripsAccessibleByUser } from "@/modules/trips/repository"
import { tripPayloadSchema } from "@/modules/trips/schema"

export async function GET() {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const trips = await listTripsAccessibleByUser(user.id)
  return NextResponse.json({ data: trips })
}

export async function POST(req: Request) {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = (await req.json()) as unknown
  const parsed = tripPayloadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const trip = await createTripForOwner(user.id, parsed.data)

  await db.analyticsEvent.create({
    data: {
      userId: user.id,
      eventType: "TRIP_CREATED",
      source: "api_trips_post",
      metadata: { tripId: trip.id, title: trip.title },
    },
  })

  await db.notification.create({
    data: {
      userId: user.id,
      type: "SUCCESS",
      title: "Trip created",
      message: `Trip "${trip.title}" was created successfully.`,
      metadata: { tripId: trip.id },
    },
  })

  return NextResponse.json({ data: trip }, { status: 201 })
}

