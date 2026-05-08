import "server-only"
import { z } from "zod"

const serverSchema = z.object({
  DATABASE_URL: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  CLERK_WEBHOOK_SECRET: z.string().min(1).optional(),
  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
  STRIPE_PRICE_ID_MONTHLY: z.string().min(1).optional(),
  STRIPE_PRICE_ID_YEARLY: z.string().min(1).optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  MAPBOX_ACCESS_TOKEN: z.string().min(1).optional(),
  OPENAI_API_KEY: z.string().min(1).optional(),
})

export function getEnvServer() {
  const merged = { ...process.env }
  const server = serverSchema.safeParse(merged)

  if (!server.success) {
    const flattened = server.error.flatten().fieldErrors
    throw new Error(`Invalid server environment variables: ${JSON.stringify(flattened)}`)
  }

  return server.data
}

