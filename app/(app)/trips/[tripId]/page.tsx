import Image from "next/image"
import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation"
import { CalendarDays, MapPin, Users } from "lucide-react"

import { CollaboratorsPanel } from "@/components/trips/collaborators-panel"
import { db } from "@/lib/db"
import { canManageCollaborators, canReadTrip, getTripRole } from "@/lib/auth/trip-access"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeleteTripButton } from "@/components/trips/delete-trip-button"

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ tripId: string }>
}) {
  const { tripId } = await params
  const clerkUser = await currentUser()
  if (!clerkUser) redirect("/sign-in")

  const user = await db.user.findUnique({
    where: { clerkUserId: clerkUser.id },
  })
  if (!user) notFound()
  const role = await getTripRole(tripId, user.id)
  if (!canReadTrip(role)) notFound()

  const trip = await db.trip.findFirst({
    where: { id: tripId },
    include: {
      destinations: { orderBy: { createdAt: "asc" } },
      primaryDestination: true,
      collaborators: {
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      },
    },
  })
  if (!trip) notFound()
  const canManage = canManageCollaborators(role)
  const canEdit = role === "OWNER" || role === "EDITOR"
  const canDelete = role === "OWNER"

  return (
    <div className="space-y-6">
      {trip.coverImageUrl ? (
        <div className="relative h-56 w-full overflow-hidden rounded-xl border">
          <Image src={trip.coverImageUrl} alt={trip.title} fill className="object-cover" />
        </div>
      ) : null}

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{trip.title}</h1>
          <p className="text-sm text-muted-foreground">{trip.description ?? "No description"}</p>
        </div>
        <div className="flex gap-2">
          {canEdit ? (
            <Button asChild variant="outline">
              <Link href={`/trips/${trip.id}/edit`}>Edit</Link>
            </Button>
          ) : null}
          {canDelete ? <DeleteTripButton tripId={trip.id} /> : null}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trip Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm md:grid-cols-3">
          <div className="inline-flex items-center text-muted-foreground">
            <Users className="mr-2 h-4 w-4" />
            {trip.travelersCount} travelers
          </div>
          <div className="inline-flex items-center text-muted-foreground">
            <CalendarDays className="mr-2 h-4 w-4" />
            {trip.startDate ? trip.startDate.toISOString().slice(0, 10) : "TBD"} -{" "}
            {trip.endDate ? trip.endDate.toISOString().slice(0, 10) : "TBD"}
          </div>
          <div className="inline-flex items-center text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            {trip.primaryDestination?.name ?? "No primary destination"}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Destinations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {trip.destinations.length === 0 ? (
            <p className="text-sm text-muted-foreground">No destinations added yet.</p>
          ) : (
            trip.destinations.map((d) => (
              <div key={d.id} className="rounded-md border p-3 text-sm">
                <div className="font-medium">{d.name}</div>
                <div className="text-muted-foreground">
                  {[d.city, d.country].filter(Boolean).join(", ") || "Location not set"}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <CollaboratorsPanel
        tripId={trip.id}
        initialCollaborators={trip.collaborators}
        canManage={canManage}
      />
    </div>
  )
}

