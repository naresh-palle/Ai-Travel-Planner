import { randomUUID } from "node:crypto"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

const MAX_SIZE = 5 * 1024 * 1024
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"])

export async function POST(req: Request) {
  const session = await auth()
  if (!session.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const form = await req.formData()
  const file = form.get("file")
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 })
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Only JPG, PNG, WEBP are allowed" }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File must be <= 5MB" }, { status: 400 })
  }

  const bytes = Buffer.from(await file.arrayBuffer())
  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg"
  const name = `${Date.now()}-${randomUUID()}.${ext}`

  const uploadDir = path.join(process.cwd(), "public", "uploads", "trips")
  await mkdir(uploadDir, { recursive: true })
  await writeFile(path.join(uploadDir, name), bytes)

  return NextResponse.json({ data: { url: `/uploads/trips/${name}` } }, { status: 201 })
}

