import { currentUser } from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation"

import { canEditTrip, getTripRole } from "@/lib/auth/trip-access"
import { db } from "@/lib/db"
import { TripForm } from "@/components/trips/trip-form"

export default async function EditTripPage({
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
  if (!canEditTrip(role)) notFound()

  const trip = await db.trip.findFirst({
    where: { id: tripId },
    include: { primaryDestination: true },
  })
  if (!trip) notFound()

  return (
    <TripForm
      mode="edit"
      tripId={trip.id}
      defaultValues={{
        title: trip.title,
        description: trip.description ?? "",
        coverImageUrl: trip.coverImageUrl ?? "",
        travelersCount: trip.travelersCount,
        status: trip.status,
        visibility: trip.visibility,
        startDate: trip.startDate ? trip.startDate.toISOString().slice(0, 10) : "",
        endDate: trip.endDate ? trip.endDate.toISOString().slice(0, 10) : "",
        timezone: trip.timezone ?? "",
        destinationName: trip.primaryDestination?.name ?? "",
        destinationCity: trip.primaryDestination?.city ?? "",
        destinationCountry: trip.primaryDestination?.country ?? "",
      }}
    />
  )
}

