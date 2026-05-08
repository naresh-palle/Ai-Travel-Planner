import "server-only"
import { auth, currentUser } from "@clerk/nextjs/server"

export async function requireUser() {
  await auth.protect()
  const user = await currentUser()
  if (!user) throw new Error("Clerk user missing after protect()")
  return user
}

