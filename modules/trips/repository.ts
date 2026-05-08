import { db } from "@/lib/db"
import type { TripPayload } from "@/modules/trips/schema"

function toDate(value?: string | null) {
  return value ? new Date(value) : null
}

export async function listTripsByOwner(ownerId: string) {
  return db.trip.findMany({
    where: { ownerId },
    include: {
      primaryDestination: true,
    },
    orderBy: { updatedAt: "desc" },
  })
}

export async function listTripsAccessibleByUser(userId: string) {
  return db.trip.findMany({
    where: {
      OR: [{ ownerId: userId }, { collaborators: { some: { userId } } }],
    },
    include: {
      primaryDestination: true,
    },
    orderBy: { updatedAt: "desc" },
  })
}

export async function getTripForOwner(tripId: string, ownerId: string) {
  return db.trip.findFirst({
    where: { id: tripId, ownerId },
    include: {
      primaryDestination: true,
      destinations: {
        orderBy: { createdAt: "asc" },
      },
      collaborators: true,
    },
  })
}

export async function getTripForUser(tripId: string, userId: string) {
  return db.trip.findFirst({
    where: {
      id: tripId,
      OR: [{ ownerId: userId }, { collaborators: { some: { userId } } }],
    },
    include: {
      primaryDestination: true,
      destinations: { orderBy: { createdAt: "asc" } },
      collaborators: {
        include: {
          user: {
            select: { id: true, name: true, email: true, imageUrl: true },
          },
        },
      },
      owner: { select: { id: true, name: true, email: true } },
    },
  })
}

export async function createTripForOwner(ownerId: string, payload: TripPayload) {
  return db.trip.create({
    data: {
      ownerId,
      title: payload.title,
      description: payload.description ?? null,
      coverImageUrl: payload.coverImageUrl ?? null,
      travelersCount: payload.travelersCount,
      status: payload.status,
      visibility: payload.visibility,
      startDate: toDate(payload.startDate),
      endDate: toDate(payload.endDate),
      timezone: payload.timezone ?? null,
      destinations: payload.destinationName
        ? {
            create: {
              name: payload.destinationName,
              city: payload.destinationCity ?? null,
              country: payload.destinationCountry ?? null,
            },
          }
        : undefined,
    },
    include: { destinations: true },
  })
}

export async function updateTripForOwner(
  tripId: string,
  ownerId: string,
  payload: TripPayload
) {
  const existing = await db.trip.findFirst({
    where: { id: tripId, ownerId },
    include: { primaryDestination: true },
  })
  if (!existing) return null

  let primaryDestinationId = existing.primaryDestinationId ?? null
  if (payload.destinationName) {
    const destination = await db.destination.create({
      data: {
        tripId,
        name: payload.destinationName,
        city: payload.destinationCity ?? null,
        country: payload.destinationCountry ?? null,
      },
    })
    primaryDestinationId = destination.id
  }

  return db.trip.update({
    where: { id: tripId },
    data: {
      title: payload.title,
      description: payload.description ?? null,
      coverImageUrl: payload.coverImageUrl ?? null,
      travelersCount: payload.travelersCount,
      status: payload.status,
      visibility: payload.visibility,
      startDate: toDate(payload.startDate),
      endDate: toDate(payload.endDate),
      timezone: payload.timezone ?? null,
      primaryDestinationId,
    },
    include: {
      primaryDestination: true,
      destinations: true,
    },
  })
}

export async function updateTripById(tripId: string, payload: TripPayload) {
  const existing = await db.trip.findUnique({
    where: { id: tripId },
    include: { primaryDestination: true },
  })
  if (!existing) return null

  let primaryDestinationId = existing.primaryDestinationId ?? null
  if (payload.destinationName) {
    const destination = await db.destination.create({
      data: {
        tripId,
        name: payload.destinationName,
        city: payload.destinationCity ?? null,
        country: payload.destinationCountry ?? null,
      },
    })
    primaryDestinationId = destination.id
  }

  return db.trip.update({
    where: { id: tripId },
    data: {
      title: payload.title,
      description: payload.description ?? null,
      coverImageUrl: payload.coverImageUrl ?? null,
      travelersCount: payload.travelersCount,
      status: payload.status,
      visibility: payload.visibility,
      startDate: toDate(payload.startDate),
      endDate: toDate(payload.endDate),
      timezone: payload.timezone ?? null,
      primaryDestinationId,
    },
    include: {
      primaryDestination: true,
      destinations: true,
    },
  })
}

export async function deleteTripForOwner(tripId: string, ownerId: string) {
  const existing = await db.trip.findFirst({
    where: { id: tripId, ownerId },
    select: { id: true },
  })
  if (!existing) return false

  await db.trip.delete({ where: { id: tripId } })
  return true
}

export async function deleteTripById(tripId: string) {
  await db.trip.delete({ where: { id: tripId } })
}

