import "server-only"

import { SubscriptionStatus } from "@prisma/client"

const PAID_STATUSES = new Set<SubscriptionStatus>([
  SubscriptionStatus.ACTIVE,
  SubscriptionStatus.TRIALING,
])

export function hasActiveSubscription(status: SubscriptionStatus) {
  return PAID_STATUSES.has(status)
}

