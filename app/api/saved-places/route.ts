import { NextResponse } from "next/server"

import { requireAppUser } from "@/lib/auth/app-user"
import { db } from "@/lib/db"
import { savedPlacePayloadSchema } from "@/modules/map/schema"

export async function GET() {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const places = await db.savedPlace.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  })
  return NextResponse.json({ data: places })
}

export async function POST(req: Request) {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = (await req.json()) as unknown
  const parsed = savedPlacePayloadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const place = await db.savedPlace.create({
    data: {
      userId: user.id,
      ...parsed.data,
    },
  })
  return NextResponse.json({ data: place }, { status: 201 })
}

