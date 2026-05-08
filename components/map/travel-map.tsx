"use client"

import { useMemo, useState } from "react"
import type { Feature, FeatureCollection, Point } from "geojson"
import Map, {
  Layer,
  Marker,
  NavigationControl,
  Popup,
  Source,
  type MapRef,
} from "react-map-gl/mapbox"
import type { MapLayerMouseEvent } from "mapbox-gl"
import { MapPin, Route, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

type PlaceItem = {
  id: string
  name: string
  placeId?: string | null
  address?: string | null
  category?: string | null
  latitude: number
  longitude: number
}

type SearchFeature = {
  id: string
  place_name: string
  text: string
  center: [number, number]
}

type TripItem = {
  id: string
  title: string
}

const clusterLayer: any = {
  id: "clusters",
  type: "circle",
  source: "saved-places",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": "#38bdf8",
    "circle-radius": ["step", ["get", "point_count"], 16, 10, 22, 30, 28],
    "circle-opacity": 0.75,
  },
}

const clusterCountLayer: any = {
  id: "cluster-count",
  type: "symbol",
  source: "saved-places",
  filter: ["has", "point_count"],
  layout: {
    "text-field": ["get", "point_count_abbreviated"],
    "text-size": 12,
  },
  paint: {
    "text-color": "#0b1f33",
  },
}

const unclusteredLayer: any = {
  id: "unclustered-point",
  type: "circle",
  source: "saved-places",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#f97316",
    "circle-radius": 7,
    "circle-stroke-width": 1.5,
    "circle-stroke-color": "#fff",
  },
}

const routeLayer: any = {
  id: "trip-route",
  type: "line",
  paint: {
    "line-color": "#22d3ee",
    "line-width": 4,
    "line-opacity": 0.8,
  },
}

export function TravelMap() {
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState<SearchFeature[]>([])
  const [savedPlaces, setSavedPlaces] = useState<PlaceItem[]>([])
  const [nearby, setNearby] = useState<SearchFeature[]>([])
  const [selected, setSelected] = useState<{
    name: string
    lng: number
    lat: number
    address?: string
    id?: string
    canSave?: boolean
  } | null>(null)
  const [trips, setTrips] = useState<TripItem[]>([])
  const [selectedTripId, setSelectedTripId] = useState("")
  const [routeFeature, setRouteFeature] = useState<Feature | null>(null)
  const [loading, setLoading] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const [mapRef, setMapRef] = useState<MapRef | null>(null)

  const collection: FeatureCollection<Point> = useMemo(
    () => ({
      type: "FeatureCollection",
      features: savedPlaces.map((p) => ({
        type: "Feature",
        id: p.id,
        properties: { name: p.name, address: p.address ?? "", id: p.id },
        geometry: {
          type: "Point",
          coordinates: [p.longitude, p.latitude],
        },
      })),
    }),
    [savedPlaces]
  )

  async function loadInitialData() {
    setLoading(true)
    setMapError(null)
    try {
      const [savedRes, tripsRes] = await Promise.all([
        fetch("/api/saved-places"),
        fetch("/api/trips"),
      ])
      const savedJson = (await savedRes.json()) as { data?: PlaceItem[]; error?: string }
      const tripsJson = (await tripsRes.json()) as { data?: TripItem[]; error?: string }
      if (!savedRes.ok) throw new Error(savedJson.error ?? "Failed to load saved places")
      if (!tripsRes.ok) throw new Error(tripsJson.error ?? "Failed to load trips")
      setSavedPlaces(savedJson.data ?? [])
      setTrips(tripsJson.data ?? [])
    } catch (e) {
      setMapError(e instanceof Error ? e.message : "Unable to load map data")
    } finally {
      setLoading(false)
    }
  }

  async function runSearch() {
    if (!search.trim()) return
    setLoading(true)
    setMapError(null)
    try {
      const res = await fetch(`/api/map/search?q=${encodeURIComponent(search.trim())}`)
      const json = (await res.json()) as { features?: SearchFeature[]; error?: string }
      if (!res.ok) throw new Error(json.error ?? "Search failed")
      setSearchResults(json.features ?? [])
    } catch (e) {
      setMapError(e instanceof Error ? e.message : "Search failed")
    } finally {
      setLoading(false)
    }
  }

  async function loadNearby(lng: number, lat: number) {
    setLoading(true)
    setMapError(null)
    try {
      const res = await fetch(`/api/map/nearby?lng=${lng}&lat=${lat}`)
      const json = (await res.json()) as { features?: SearchFeature[]; error?: string }
      if (!res.ok) throw new Error(json.error ?? "Nearby lookup failed")
      setNearby(json.features ?? [])
    } catch (e) {
      setMapError(e instanceof Error ? e.message : "Nearby lookup failed")
    } finally {
      setLoading(false)
    }
  }

  async function saveSelected() {
    if (!selected) return
    setLoading(true)
    try {
      const res = await fetch("/api/saved-places", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: selected.name,
          address: selected.address ?? null,
          category: "general",
          placeId: selected.id ?? null,
          source: "mapbox",
          latitude: selected.lat,
          longitude: selected.lng,
        }),
      })
      const json = (await res.json()) as { data?: PlaceItem; error?: string }
      if (!res.ok || !json.data) throw new Error(json.error ?? "Save failed")
      setSavedPlaces((prev) => [json.data as PlaceItem, ...prev])
      setSelected((prev) => (prev ? { ...prev, canSave: false } : prev))
    } catch (e) {
      setMapError(e instanceof Error ? e.message : "Unable to save place")
    } finally {
      setLoading(false)
    }
  }

  async function deletePlace(placeId: string) {
    setLoading(true)
    try {
      const res = await fetch(`/api/saved-places/${placeId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete place")
      setSavedPlaces((prev) => prev.filter((p) => p.id !== placeId))
    } catch (e) {
      setMapError(e instanceof Error ? e.message : "Delete failed")
    } finally {
      setLoading(false)
    }
  }

  async function loadTripRoute() {
    if (!selectedTripId) return
    setLoading(true)
    setMapError(null)
    try {
      const res = await fetch(`/api/map/route?tripId=${selectedTripId}`)
      const json = (await res.json()) as {
        data?: { route: Feature | null; destinations: Array<{ latitude: number | null; longitude: number | null }> }
        error?: string
      }
      if (!res.ok) throw new Error(json.error ?? "Failed to load route")
      setRouteFeature(json.data?.route ?? null)
      const first = json.data?.destinations.find((d) => d.latitude != null && d.longitude != null)
      if (first && mapRef) {
        mapRef.flyTo({
          center: [first.longitude as number, first.latitude as number],
          zoom: 8,
          duration: 1000,
        })
      }
    } catch (e) {
      setMapError(e instanceof Error ? e.message : "Route failed")
    } finally {
      setLoading(false)
    }
  }

  function onMapLoad() {
    void loadInitialData()
  }

  function onMapClick(event: MapLayerMouseEvent) {
    const feature = event.features?.[0]
    if (!feature) return

    const lng = event.lngLat.lng
    const lat = event.lngLat.lat
    setSelected({
      name: String(feature.properties?.name ?? "Selected place"),
      address: String(feature.properties?.address ?? ""),
      lng,
      lat,
      id: String(feature.properties?.id ?? ""),
      canSave: false,
    })
  }

  if (!token) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mapbox token missing</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Set `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` (and optional `MAPBOX_ACCESS_TOKEN`) in your env.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <Card className="order-2 lg:order-1">
        <CardHeader>
          <CardTitle>Travel Map Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Destination Search</label>
            <div className="flex gap-2">
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search place..." />
              <Button onClick={runSearch} size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="max-h-40 space-y-2 overflow-auto">
              {searchResults.map((r) => (
                <button
                  key={r.id}
                  className="w-full rounded-md border p-2 text-left text-sm hover:bg-accent"
                  onClick={() => {
                    const [lng, lat] = r.center
                    setSelected({
                      name: r.text,
                      address: r.place_name,
                      lng,
                      lat,
                      id: r.id,
                      canSave: true,
                    })
                    mapRef?.flyTo({ center: [lng, lat], zoom: 11, duration: 900 })
                  }}
                >
                  {r.place_name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Trip Route Visualization</label>
            <div className="flex gap-2">
              <select
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                value={selectedTripId}
                onChange={(e) => setSelectedTripId(e.target.value)}
              >
                <option value="">Select trip</option>
                {trips.map((trip) => (
                  <option key={trip.id} value={trip.id}>
                    {trip.title}
                  </option>
                ))}
              </select>
              <Button onClick={loadTripRoute} variant="outline">
                <Route className="mr-1 h-4 w-4" />
                Show
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Saved Places</label>
            <div className="max-h-44 space-y-2 overflow-auto">
              {savedPlaces.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-md border p-2 text-sm">
                  <button
                    className="text-left"
                    onClick={() => {
                      mapRef?.flyTo({ center: [p.longitude, p.latitude], zoom: 12, duration: 800 })
                      setSelected({
                        name: p.name,
                        address: p.address ?? "",
                        lng: p.longitude,
                        lat: p.latitude,
                        id: p.id,
                        canSave: false,
                      })
                    }}
                  >
                    {p.name}
                  </button>
                  <Button size="icon" variant="ghost" onClick={() => deletePlace(p.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {selected ? (
            <div className="rounded-md border p-3 text-sm">
              <div className="font-medium">{selected.name}</div>
              {selected.address ? <div className="text-muted-foreground">{selected.address}</div> : null}
              <div className="mt-2 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => loadNearby(selected.lng, selected.lat)}>
                  Nearby attractions
                </Button>
                {selected.canSave ? (
                  <Button size="sm" onClick={saveSelected}>
                    Save place
                  </Button>
                ) : null}
              </div>
            </div>
          ) : null}

          {nearby.length > 0 ? (
            <div className="space-y-2">
              <label className="text-sm font-medium">Nearby Attractions</label>
              <div className="max-h-36 space-y-2 overflow-auto">
                {nearby.map((n) => (
                  <button
                    key={n.id}
                    className="w-full rounded-md border p-2 text-left text-sm hover:bg-accent"
                    onClick={() => {
                      const [lng, lat] = n.center
                      mapRef?.flyTo({ center: [lng, lat], zoom: 13, duration: 800 })
                      setSelected({
                        name: n.text,
                        address: n.place_name,
                        lng,
                        lat,
                        id: n.id,
                        canSave: true,
                      })
                    }}
                  >
                    {n.place_name}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {loading ? (
            <div className="inline-flex items-center text-xs text-muted-foreground">
              <Spinner className="mr-2" />
              Loading map data...
            </div>
          ) : null}
          {mapError ? <div className="text-sm text-destructive">{mapError}</div> : null}
        </CardContent>
      </Card>

      <Card className="order-1 min-h-[60vh] lg:order-2">
        <CardContent className="h-[60vh] p-0 sm:h-[75vh]">
          <Map
            ref={(instance) => setMapRef(instance)}
            onLoad={onMapLoad}
            mapboxAccessToken={token}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            initialViewState={{
              longitude: 78.9629,
              latitude: 20.5937,
              zoom: 3.8,
            }}
            interactiveLayerIds={["unclustered-point"]}
            onClick={onMapClick}
          >
            <NavigationControl position="top-right" />

            <Source id="saved-places" type="geojson" data={collection} cluster clusterMaxZoom={14} clusterRadius={50}>
              <Layer {...clusterLayer} />
              <Layer {...clusterCountLayer} />
              <Layer {...unclusteredLayer} />
            </Source>

            {routeFeature ? (
              <Source id="trip-route-src" type="geojson" data={routeFeature}>
                <Layer {...routeLayer} />
              </Source>
            ) : null}

            {selected ? (
              <>
                <Marker longitude={selected.lng} latitude={selected.lat} anchor="bottom">
                  <MapPin className="h-6 w-6 text-primary" />
                </Marker>
                <Popup
                  longitude={selected.lng}
                  latitude={selected.lat}
                  anchor="top"
                  onClose={() => setSelected(null)}
                >
                  <div className="text-sm">
                    <div className="font-medium">{selected.name}</div>
                    {selected.address ? (
                      <div className="max-w-52 text-xs text-muted-foreground">{selected.address}</div>
                    ) : null}
                  </div>
                </Popup>
              </>
            ) : null}
          </Map>
        </CardContent>
      </Card>
    </div>
  )
}

