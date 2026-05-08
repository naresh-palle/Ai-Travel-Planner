import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { BillingActions } from "@/components/billing/billing-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"

export default async function BillingPage() {
  const clerkUser = await currentUser()
  if (!clerkUser) redirect("/sign-in")

  const user = await db.user.findUnique({
    where: { clerkUserId: clerkUser.id },
    select: {
      subscriptionStatus: true,
      subscriptionPriceId: true,
      subscriptionCurrentPeriodEnd: true,
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium">Status:</span> {user?.subscriptionStatus ?? "INACTIVE"}
          </p>
          <p>
            <span className="font-medium">Price:</span> {user?.subscriptionPriceId ?? "Not subscribed"}
          </p>
          <p>
            <span className="font-medium">Renews:</span>{" "}
            {user?.subscriptionCurrentPeriodEnd
              ? user.subscriptionCurrentPeriodEnd.toISOString().slice(0, 10)
              : "N/A"}
          </p>
        </div>
        <BillingActions />
      </CardContent>
    </Card>
  )
}

