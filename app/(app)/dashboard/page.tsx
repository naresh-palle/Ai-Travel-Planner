import { currentUser } from "@clerk/nextjs/server"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default async function Page() {
  const user = await currentUser()

  return <DashboardContent firstName={user?.firstName} />
}

