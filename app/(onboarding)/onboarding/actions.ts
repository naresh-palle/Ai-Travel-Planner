"use server"

import { clerkClient, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { z } from "zod"

const schema = z.object({
  displayName: z.string().trim().min(2).max(64),
})

export async function completeOnboarding(formData: FormData) {
  const user = await currentUser()
  if (!user) redirect("/sign-in")

  const parsed = schema.safeParse({
    displayName: formData.get("displayName"),
  })

  if (!parsed.success) {
    return {
      ok: false as const,
      error: "Please enter a valid name.",
    }
  }

  const client = await clerkClient()
  await client.users.updateUser(user.id, {
    firstName: parsed.data.displayName,
    publicMetadata: {
      ...(user.publicMetadata ?? {}),
      onboarded: true,
    },
  })

  redirect("/dashboard")
}

