"use client"

import { Button } from "@/components/ui/button"

export default function TripsError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="space-y-3 rounded-lg border p-6">
      <h2 className="text-lg font-semibold">Unable to load trips</h2>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}

