"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

async function postAndRedirect(url: string, payload?: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: payload ? { "content-type": "application/json" } : undefined,
    body: payload ? JSON.stringify(payload) : undefined,
  })
  const json = (await res.json()) as { data?: { url?: string }; error?: string }
  if (!res.ok || !json.data?.url) throw new Error(json.error ?? "Action failed")
  window.location.href = json.data.url
}

export function BillingActions() {
  const [loading, setLoading] = useState<null | "monthly" | "yearly" | "portal">(null)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button
          disabled={loading !== null}
          onClick={async () => {
            setLoading("monthly")
            setError(null)
            try {
              await postAndRedirect("/api/billing/checkout", { interval: "monthly" })
            } catch (e) {
              setError(e instanceof Error ? e.message : "Checkout failed")
              setLoading(null)
            }
          }}
        >
          {loading === "monthly" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Redirecting...
            </>
          ) : (
            "Subscribe Monthly"
          )}
        </Button>
        <Button
          variant="secondary"
          disabled={loading !== null}
          onClick={async () => {
            setLoading("yearly")
            setError(null)
            try {
              await postAndRedirect("/api/billing/checkout", { interval: "yearly" })
            } catch (e) {
              setError(e instanceof Error ? e.message : "Checkout failed")
              setLoading(null)
            }
          }}
        >
          {loading === "yearly" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Redirecting...
            </>
          ) : (
            "Subscribe Yearly"
          )}
        </Button>
      </div>

      <Button
        variant="outline"
        disabled={loading !== null}
        onClick={async () => {
          setLoading("portal")
          setError(null)
          try {
            await postAndRedirect("/api/billing/portal")
          } catch (e) {
            setError(e instanceof Error ? e.message : "Unable to open billing portal")
            setLoading(null)
          }
        }}
      >
        {loading === "portal" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Opening...
          </>
        ) : (
          "Manage Billing"
        )}
      </Button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  )
}

