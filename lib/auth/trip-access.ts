import "server-only"

import { CollaboratorRole } from "@prisma/client"

import { db } from "@/lib/db"

export async function getTripRole(tripId: string, userId: string) {
  const trip = await db.trip.findUnique({
    where: { id: tripId },
    select: { ownerId: true },
  })
  if (!trip) return null
  if (trip.ownerId === userId) return CollaboratorRole.OWNER

  const collaborator = await db.collaborator.findUnique({
    where: { tripId_userId: { tripId, userId } },
    select: { role: true },
  })
  return collaborator?.role ?? null
}

export function canReadTrip(role: CollaboratorRole | null) {
  return role === "OWNER" || role === "EDITOR" || role === "VIEWER"
}

export function canEditTrip(role: CollaboratorRole | null) {
  return role === "OWNER" || role === "EDITOR"
}

export function canManageCollaborators(role: CollaboratorRole | null) {
  return role === "OWNER"
}

