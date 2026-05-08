import { NextResponse } from "next/server"

import { requireAppUser } from "@/lib/auth/app-user"
import { db } from "@/lib/db"

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ placeId: string }> }
) {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { placeId } = await ctx.params
  const place = await db.savedPlace.findFirst({
    where: { id: placeId, userId: user.id },
    select: { id: true },
  })
  if (!place) return NextResponse.json({ error: "Place not found" }, { status: 404 })

  await db.savedPlace.delete({ where: { id: placeId } })
  return NextResponse.json({ ok: true })
}

