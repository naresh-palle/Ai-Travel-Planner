import { NextResponse } from "next/server"

import { mapSearchQuerySchema } from "@/modules/map/schema"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const parsed = mapSearchQuerySchema.safeParse({
    q: url.searchParams.get("q") ?? "",
  })
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 })
  }

  const token = process.env.MAPBOX_ACCESS_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  if (!token) {
    return NextResponse.json({ error: "Mapbox token is missing" }, { status: 500 })
  }

  const endpoint = new URL(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(parsed.data.q)}.json`
  )
  endpoint.searchParams.set("access_token", token)
  endpoint.searchParams.set("autocomplete", "true")
  endpoint.searchParams.set("limit", "10")

  const res = await fetch(endpoint.toString(), { cache: "no-store" })
  if (!res.ok) {
    return NextResponse.json({ error: "Map search failed" }, { status: 502 })
  }

  const json = (await res.json()) as unknown
  return NextResponse.json(json)
}

