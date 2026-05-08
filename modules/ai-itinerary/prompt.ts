import type { ItineraryRequest } from "@/modules/ai-itinerary/schema"

export function buildItineraryPrompt(input: ItineraryRequest) {
  return `
You are a senior travel planner. Create a realistic itinerary.

User inputs:
- Destination: ${input.destination}
- Duration (days): ${input.duration}
- Budget: ${input.budget}
- Travel interests: ${input.travelInterests.join(", ")}
- Travel style: ${input.travelStyle}

Rules:
1) Return ONLY valid JSON, no markdown, no prose before/after JSON.
2) JSON must follow this shape exactly:
{
  "summary": string,
  "estimatedTotalBudget": string,
  "notes": string[],
  "days": [
    {
      "day": number,
      "theme": string,
      "activities": string[],
      "foodRecommendations": string[],
      "transportation": string[],
      "estimatedDailyBudget": string
    }
  ]
}
3) Generate exactly ${input.duration} days.
4) Keep suggestions practical and geographically coherent.
5) Budget guidance should match the provided budget and style.
6) Include a mix of activities, food, and local transportation each day.
7) Use concise, actionable language.
`.trim()
}

