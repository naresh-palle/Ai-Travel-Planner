import { NextResponse } from "next/server"

import { nearbyQuerySchema } from "@/modules/map/schema"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const parsed = nearbyQuerySchema.safeParse({
    lng: url.searchParams.get("lng"),
    lat: url.searchParams.get("lat"),
  })
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 })
  }

  const token = process.env.MAPBOX_ACCESS_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  if (!token) {
    return NextResponse.json({ error: "Mapbox token is missing" }, { status: 500 })
  }

  const { lng, lat } = parsed.data
  const endpoint = new URL("https://api.mapbox.com/geocoding/v5/mapbox.places/attraction.json")
  endpoint.searchParams.set("access_token", token)
  endpoint.searchParams.set("types", "poi")
  endpoint.searchParams.set("proximity", `${lng},${lat}`)
  endpoint.searchParams.set("limit", "12")

  const res = await fetch(endpoint.toString(), { cache: "no-store" })
  if (!res.ok) {
    return NextResponse.json({ error: "Nearby attraction lookup failed" }, { status: 502 })
  }

  const json = (await res.json()) as unknown
  return NextResponse.json(json)
}

