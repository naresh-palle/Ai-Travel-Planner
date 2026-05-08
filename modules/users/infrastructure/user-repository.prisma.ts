import { db } from "@/lib/db"
import type { User } from "@/modules/users/domain/user"

export type UserRepository = {
  upsertFromClerk: (input: { clerkUserId: string; email?: string | null }) => Promise<User>
  deleteByClerkId: (clerkUserId: string) => Promise<void>
}

export const userRepository: UserRepository = {
  async upsertFromClerk(input) {
    return db.user.upsert({
      where: { clerkUserId: input.clerkUserId },
      create: { clerkUserId: input.clerkUserId, email: input.email ?? null },
      update: { email: input.email ?? null },
    })
  },
  async deleteByClerkId(clerkUserId) {
    await db.user.deleteMany({ where: { clerkUserId } })
  },
}

