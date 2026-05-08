"use client"

import * as React from "react"
import { useFormStatus } from "react-dom"

import { completeOnboarding } from "@/app/(onboarding)/onboarding/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Saving..." : "Continue"}
    </Button>
  )
}

export function OnboardingForm() {
  const [error, setError] = React.useState<string | null>(null)

  async function action(formData: FormData) {
    setError(null)
    const res = await completeOnboarding(formData)
    if (res && "ok" in res && !res.ok) setError(res.error)
  }

  return (
    <form action={action} className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="displayName">Name</Label>
        <Input
          id="displayName"
          name="displayName"
          placeholder="Your name"
          autoComplete="name"
          required
          minLength={2}
        />
      </div>

      {error ? <div className="text-sm text-destructive">{error}</div> : null}

      <SubmitButton />
    </form>
  )
}

