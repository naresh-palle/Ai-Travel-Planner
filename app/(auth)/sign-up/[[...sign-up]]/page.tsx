import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/onboarding"
      />
    </div>
  )
}

