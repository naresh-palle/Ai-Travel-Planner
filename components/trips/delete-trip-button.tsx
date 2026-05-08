"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function DeleteTripButton({ tripId }: { tripId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onDelete() {
    const ok = window.confirm("Delete this trip? This action cannot be undone.")
    if (!ok) return

    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/trips/${tripId}`, { method: "DELETE" })
      if (!res.ok) {
        const json = (await res.json()) as { error?: string }
        throw new Error(json.error ?? "Failed to delete trip")
      }
      router.push("/trips")
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete trip")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button variant="destructive" onClick={onDelete} disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
        Delete Trip
      </Button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  )
}

