import { AppShell } from "@/components/layout/app-shell"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()
  if (!user) redirect("/sign-in")

  const onboarded = user.publicMetadata?.["onboarded"] === true
  if (!onboarded) redirect("/onboarding")

  return <AppShell>{children}</AppShell>
}

