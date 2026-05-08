import { NextResponse } from "next/server"

import { requireAppUser } from "@/lib/auth/app-user"
import { canEditTrip, canReadTrip, getTripRole } from "@/lib/auth/trip-access"
import { db } from "@/lib/db"
import {
  deleteTripById,
  getTripForUser,
  updateTripById,
} from "@/modules/trips/repository"
import { tripPayloadSchema } from "@/modules/trips/schema"

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ tripId: string }> }
) {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { tripId } = await ctx.params
  const role = await getTripRole(tripId, user.id)
  if (!canReadTrip(role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const trip = await getTripForUser(tripId, user.id)
  if (!trip) return NextResponse.json({ error: "Trip not found" }, { status: 404 })

  return NextResponse.json({ data: trip })
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ tripId: string }> }
) {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { tripId } = await ctx.params
  const role = await getTripRole(tripId, user.id)
  if (!canEditTrip(role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const body = (await req.json()) as unknown
  const parsed = tripPayloadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const trip = await updateTripById(tripId, parsed.data)
  if (!trip) return NextResponse.json({ error: "Trip not found" }, { status: 404 })

  await db.analyticsEvent.create({
    data: {
      userId: user.id,
      eventType: "TRIP_UPDATED",
      source: "api_trips_patch",
      metadata: { tripId: trip.id },
    },
  })
  await db.notification.create({
    data: {
      userId: user.id,
      type: "INFO",
      title: "Trip updated",
      message: `Trip "${trip.title}" was updated.`,
      metadata: { tripId: trip.id },
    },
  })

  return NextResponse.json({ data: trip })
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ tripId: string }> }
) {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { tripId } = await ctx.params
  const role = await getTripRole(tripId, user.id)
  if (role !== "OWNER") return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  const trip = await db.trip.findUnique({ where: { id: tripId }, select: { title: true } })
  await deleteTripById(tripId)
  await db.notification.create({
    data: {
      userId: user.id,
      type: "WARNING",
      title: "Trip deleted",
      message: `Trip "${trip?.title ?? tripId}" was deleted.`,
      metadata: { tripId },
    },
  })

  return NextResponse.json({ ok: true })
}

