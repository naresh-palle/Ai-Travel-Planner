import { z } from "zod"

export const mapSearchQuerySchema = z.object({
  q: z.string().trim().min(2).max(120),
})

export const nearbyQuerySchema = z.object({
  lng: z.coerce.number().min(-180).max(180),
  lat: z.coerce.number().min(-90).max(90),
})

export const savedPlacePayloadSchema = z.object({
  name: z.string().trim().min(2).max(160),
  category: z.string().trim().max(80).optional().nullable(),
  placeId: z.string().trim().max(200).optional().nullable(),
  source: z.string().trim().max(80).optional().nullable(),
  address: z.string().trim().max(500).optional().nullable(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  notes: z.string().trim().max(500).optional().nullable(),
})

