import { z } from "zod"

export const itineraryRequestSchema = z.object({
  destination: z.string().trim().min(2).max(120),
  duration: z.number().int().min(1).max(30),
  budget: z.string().trim().min(1).max(80),
  travelInterests: z.array(z.string().trim().min(2).max(60)).min(1).max(10),
  travelStyle: z.string().trim().min(2).max(60),
})

export type ItineraryRequest = z.infer<typeof itineraryRequestSchema>

export const itineraryDaySchema = z.object({
  day: z.number().int().min(1),
  theme: z.string().min(1),
  activities: z.array(z.string().min(1)).min(2).max(8),
  foodRecommendations: z.array(z.string().min(1)).min(2).max(6),
  transportation: z.array(z.string().min(1)).min(1).max(6),
  estimatedDailyBudget: z.string().min(1),
})

export const itineraryResponseSchema = z.object({
  summary: z.string().min(1),
  estimatedTotalBudget: z.string().min(1),
  notes: z.array(z.string().min(1)).min(1).max(8),
  days: z.array(itineraryDaySchema).min(1).max(30),
})

export type ItineraryResponse = z.infer<typeof itineraryResponseSchema>

