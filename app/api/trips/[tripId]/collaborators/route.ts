import { CollaboratorRole } from "@prisma/client"
import { NextResponse } from "next/server"
import { z } from "zod"

import { requireAppUser } from "@/lib/auth/app-user"
import { canManageCollaborators, getTripRole } from "@/lib/auth/trip-access"
import { db } from "@/lib/db"

const createSchema = z.object({
  email: z.string().email(),
  role: z.nativeEnum(CollaboratorRole).default(CollaboratorRole.VIEWER),
})

const updateSchema = z.object({
  collaboratorId: z.string().min(1),
  role: z.nativeEnum(CollaboratorRole),
})

const deleteSchema = z.object({
  collaboratorId: z.string().min(1),
})

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ tripId: string }> }
) {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { tripId } = await ctx.params
  const role = await getTripRole(tripId, user.id)
  if (!role) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const collaborators = await db.collaborator.findMany({
    where: { tripId },
    include: {
      user: {
        select: { id: true, name: true, email: true, imageUrl: true },
      },
    },
    orderBy: { createdAt: "asc" },
  })
  return NextResponse.json({ data: collaborators })
}

export async function POST(
  req: Request,
  ctx: { params: Promise<{ tripId: string }> }
) {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { tripId } = await ctx.params
  const role = await getTripRole(tripId, user.id)
  if (!canManageCollaborators(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = (await req.json()) as unknown
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 })

  const target = await db.user.findFirst({
    where: { email: parsed.data.email },
    select: { id: true },
  })
  if (!target) return NextResponse.json({ error: "User not found by email" }, { status: 404 })

  const collaborator = await db.collaborator.upsert({
    where: { tripId_userId: { tripId, userId: target.id } },
    create: { tripId, userId: target.id, role: parsed.data.role },
    update: { role: parsed.data.role },
    include: { user: { select: { id: true, email: true, name: true, imageUrl: true } } },
  })

  await db.notification.create({
    data: {
      userId: target.id,
      type: "INFO",
      title: "Added to trip",
      message: "You were added as a collaborator to a trip.",
      metadata: { tripId, role: collaborator.role },
    },
  })

  return NextResponse.json({ data: collaborator }, { status: 201 })
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ tripId: string }> }
) {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { tripId } = await ctx.params
  const role = await getTripRole(tripId, user.id)
  if (!canManageCollaborators(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = (await req.json()) as unknown
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 })

  const collaborator = await db.collaborator.findFirst({
    where: { id: parsed.data.collaboratorId, tripId },
  })
  if (!collaborator) return NextResponse.json({ error: "Collaborator not found" }, { status: 404 })

  const updated = await db.collaborator.update({
    where: { id: collaborator.id },
    data: { role: parsed.data.role },
    include: { user: { select: { id: true, email: true, name: true, imageUrl: true } } },
  })
  return NextResponse.json({ data: updated })
}

export async function DELETE(
  req: Request,
  ctx: { params: Promise<{ tripId: string }> }
) {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { tripId } = await ctx.params
  const role = await getTripRole(tripId, user.id)
  if (!canManageCollaborators(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = (await req.json()) as unknown
  const parsed = deleteSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 })

  const collaborator = await db.collaborator.findFirst({
    where: { id: parsed.data.collaboratorId, tripId },
  })
  if (!collaborator) return NextResponse.json({ error: "Collaborator not found" }, { status: 404 })

  await db.collaborator.delete({ where: { id: collaborator.id } })
  return NextResponse.json({ ok: true })
}

