import { TripStatus, TripVisibility } from "@prisma/client"
import { z } from "zod"

const dateString = z
  .string()
  .min(1)
  .refine((v) => !Number.isNaN(Date.parse(v)), "Invalid date")

export const tripPayloadSchema = z
  .object({
    title: z.string().trim().min(2).max(120),
    description: z.string().trim().max(2000).optional().nullable(),
    coverImageUrl: z.string().url().max(2000).optional().nullable(),
    travelersCount: z.number().int().min(1).max(50),
    status: z.nativeEnum(TripStatus).default(TripStatus.DRAFT),
    visibility: z.nativeEnum(TripVisibility).default(TripVisibility.PRIVATE),
    startDate: dateString.optional().nullable(),
    endDate: dateString.optional().nullable(),
    timezone: z.string().trim().max(120).optional().nullable(),
    destinationName: z.string().trim().min(2).max(160).optional().nullable(),
    destinationCity: z.string().trim().max(120).optional().nullable(),
    destinationCountry: z.string().trim().max(120).optional().nullable(),
  })
  .superRefine((val, ctx) => {
    if (val.startDate && val.endDate) {
      const s = new Date(val.startDate)
      const e = new Date(val.endDate)
      if (e < s) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["endDate"],
          message: "End date must be after start date",
        })
      }
    }
  })

export type TripPayload = z.infer<typeof tripPayloadSchema>

