import { z } from "zod"

const clientSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1).optional(),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1).optional(),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1).optional(),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1).optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
})

const merged = { ...process.env }

const client = clientSchema.safeParse(merged)
if (!client.success) {
  const flattened = client.error.flatten().fieldErrors
  throw new Error(
    `Invalid NEXT_PUBLIC_* environment variables: ${JSON.stringify(flattened)}`
  )
}

export const env = client.data

