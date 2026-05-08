import type { User } from "@/modules/users/domain/user"
import type { UserRepository } from "@/modules/users/infrastructure/user-repository.prisma"

export async function syncUserFromClerk(
  repo: UserRepository,
  input: { clerkUserId: string; email?: string | null }
): Promise<User> {
  return repo.upsertFromClerk(input)
}

