import OpenAI from "openai"
import { NextResponse } from "next/server"

import { requireAppUser } from "@/lib/auth/app-user"
import { hasActiveSubscription } from "@/lib/billing"
import { db } from "@/lib/db"
import { buildItineraryPrompt } from "@/modules/ai-itinerary/prompt"
import {
  itineraryRequestSchema,
  itineraryResponseSchema,
  type ItineraryResponse,
} from "@/modules/ai-itinerary/schema"

export const runtime = "nodejs"

function sseData(payload: unknown) {
  return `data: ${JSON.stringify(payload)}\n\n`
}

export async function POST(req: Request) {
  const user = await requireAppUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!hasActiveSubscription(user.subscriptionStatus)) {
    return NextResponse.json(
      { error: "An active subscription is required for AI itinerary generation." },
      { status: 402 }
    )
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is missing in server environment." },
      { status: 500 }
    )
  }

  const body = (await req.json()) as unknown
  const parsed = itineraryRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const prompt = buildItineraryPrompt(parsed.data)

  const encoder = new TextEncoder()
  let fullText = ""

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(encoder.encode(sseData({ type: "start" })))
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          temperature: 0.7,
          stream: true,
          messages: [
            {
              role: "system",
              content:
                "You generate strict JSON for travel itinerary planning. Never include markdown.",
            },
            { role: "user", content: prompt },
          ],
        })

        for await (const chunk of completion) {
          const token = chunk.choices[0]?.delta?.content ?? ""
          if (!token) continue
          fullText += token
          controller.enqueue(encoder.encode(sseData({ type: "token", token })))
        }

        let itinerary: ItineraryResponse | null = null
        try {
          const json = JSON.parse(fullText) as unknown
          itinerary = itineraryResponseSchema.parse(json)
        } catch {
          controller.enqueue(
            encoder.encode(
              sseData({
                type: "error",
                message: "Failed to parse AI output. Please retry.",
              })
            )
          )
          controller.close()
          return
        }

        await db.analyticsEvent.create({
          data: {
            userId: user.id,
            eventType: "ITINERARY_GENERATED",
            source: "ai_itinerary",
            metadata: { destination: parsed.data.destination, duration: parsed.data.duration },
          },
        })

        controller.enqueue(encoder.encode(sseData({ type: "done", itinerary })))
        controller.close()
      } catch (error) {
        controller.enqueue(
          encoder.encode(
            sseData({
              type: "error",
              message: error instanceof Error ? error.message : "AI request failed",
            })
          )
        )
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  })
}

