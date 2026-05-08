"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Pencil, Sparkles, Wand2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import type { ItineraryResponse } from "@/modules/ai-itinerary/schema"

type DayDraft = ItineraryResponse["days"][number]

const DEFAULT_INTERESTS = "culture, food, nature"

function parseSseChunks(buffer: string) {
  const parts = buffer.split("\n\n")
  const complete = parts.slice(0, -1)
  const rest = parts[parts.length - 1] ?? ""
  return { complete, rest }
}

export function ItineraryGenerator() {
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState(5)
  const [budget, setBudget] = useState("Mid-range")
  const [travelInterests, setTravelInterests] = useState(DEFAULT_INTERESTS)
  const [travelStyle, setTravelStyle] = useState("Balanced")

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rawStream, setRawStream] = useState("")
  const [result, setResult] = useState<ItineraryResponse | null>(null)
  const [editableDays, setEditableDays] = useState<DayDraft[]>([])

  const canGenerate = useMemo(
    () => destination.trim().length >= 2 && duration >= 1,
    [destination, duration]
  )

  function updateDay(index: number, next: DayDraft) {
    setEditableDays((prev) => prev.map((d, i) => (i === index ? next : d)))
  }

  async function generate() {
    setIsLoading(true)
    setError(null)
    setRawStream("")
    setResult(null)
    setEditableDays([])

    try {
      const res = await fetch("/api/ai/itinerary", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          destination,
          duration,
          budget,
          travelInterests: travelInterests
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean),
          travelStyle,
        }),
      })
      if (!res.ok || !res.body) {
        const json = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(json?.error ?? "Unable to generate itinerary")
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const { complete, rest } = parseSseChunks(buffer)
        buffer = rest

        for (const block of complete) {
          const line = block
            .split("\n")
            .find((l) => l.startsWith("data: "))
            ?.replace("data: ", "")
          if (!line) continue

          const event = JSON.parse(line) as
            | { type: "token"; token: string }
            | { type: "done"; itinerary: ItineraryResponse }
            | { type: "error"; message: string }
            | { type: "start" }

          if (event.type === "token") {
            setRawStream((prev) => prev + event.token)
          } else if (event.type === "error") {
            throw new Error(event.message)
          } else if (event.type === "done") {
            setResult(event.itinerary)
            setEditableDays(event.itinerary.days)
          }
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate itinerary")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="inline-flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            AI Itinerary Generation
          </CardTitle>
          <CardDescription>
            Generate a day-by-day plan with food, activities, transport, and budget estimates.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Destination</Label>
            <Input value={destination} onChange={(e) => setDestination(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Duration (days)</Label>
            <Input
              type="number"
              min={1}
              max={30}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Budget</Label>
            <Input value={budget} onChange={(e) => setBudget(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Travel style</Label>
            <Input value={travelStyle} onChange={(e) => setTravelStyle(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Travel interests (comma-separated)</Label>
            <Textarea
              value={travelInterests}
              onChange={(e) => setTravelInterests(e.target.value)}
              className="min-h-24"
            />
          </div>
          <div className="md:col-span-2">
            <Button onClick={generate} disabled={!canGenerate || isLoading}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Itinerary
                </>
              )}
            </Button>
          </div>
          {error ? <p className="text-sm text-destructive md:col-span-2">{error}</p> : null}
        </CardContent>
      </Card>

      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-4 md:grid-cols-2"
        >
          {Array.from({ length: Math.min(duration, 6) }).map((_, idx) => (
            <Card key={idx} className="overflow-hidden">
              <div className="h-1 w-full animate-pulse bg-primary/40" />
              <CardHeader>
                <CardTitle className="text-base">Generating Day {idx + 1}...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">AI is composing recommendations</div>
              </CardContent>
            </Card>
          ))}
          {rawStream ? (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-sm">Live stream</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="max-h-60 overflow-auto whitespace-pre-wrap text-xs text-muted-foreground">
                  {rawStream}
                </pre>
              </CardContent>
            </Card>
          ) : null}
        </motion.div>
      ) : null}

      {result ? (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Plan</CardTitle>
              <CardDescription>{result.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge>Estimated Total: {result.estimatedTotalBudget}</Badge>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {result.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {editableDays.map((day, idx) => (
              <Card key={day.day}>
                <CardHeader>
                  <CardTitle className="inline-flex items-center gap-2 text-base">
                    Day {day.day}: {day.theme}
                    <Pencil className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription>Editable itinerary block</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <Label>Theme</Label>
                    <Input
                      value={day.theme}
                      onChange={(e) => updateDay(idx, { ...day, theme: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Activities (one per line)</Label>
                    <Textarea
                      value={day.activities.join("\n")}
                      onChange={(e) =>
                        updateDay(idx, {
                          ...day,
                          activities: e.target.value.split("\n").map((x) => x.trim()).filter(Boolean),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Food recommendations (one per line)</Label>
                    <Textarea
                      value={day.foodRecommendations.join("\n")}
                      onChange={(e) =>
                        updateDay(idx, {
                          ...day,
                          foodRecommendations: e.target.value
                            .split("\n")
                            .map((x) => x.trim())
                            .filter(Boolean),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Transportation suggestions (one per line)</Label>
                    <Textarea
                      value={day.transportation.join("\n")}
                      onChange={(e) =>
                        updateDay(idx, {
                          ...day,
                          transportation: e.target.value
                            .split("\n")
                            .map((x) => x.trim())
                            .filter(Boolean),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Estimated daily budget</Label>
                    <Input
                      value={day.estimatedDailyBudget}
                      onChange={(e) =>
                        updateDay(idx, { ...day, estimatedDailyBudget: e.target.value })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

