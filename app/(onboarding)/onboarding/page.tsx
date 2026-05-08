import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OnboardingForm } from "@/components/onboarding/onboarding-form"

export default async function Page() {
  const user = await currentUser()
  if (!user) redirect("/sign-in")

  const onboarded = user.publicMetadata?.["onboarded"] === true
  if (onboarded) redirect("/dashboard")

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Finish setup to continue to your dashboard.
          </div>
          <OnboardingForm />
        </CardContent>
      </Card>
    </div>
  )
}

