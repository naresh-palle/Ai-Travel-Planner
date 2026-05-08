"use client"

import { useEffect, useState } from "react"

export function OfflineBanner() {
  const [online, setOnline] = useState(true)

  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    update()
    window.addEventListener("online", update)
    window.addEventListener("offline", update)
    return () => {
      window.removeEventListener("online", update)
      window.removeEventListener("offline", update)
    }
  }, [])

  if (online) return null
  return (
    <div className="fixed inset-x-0 top-0 z-[60] bg-amber-500 px-4 py-2 text-center text-xs font-medium text-black">
      You are offline. Showing cached content where available.
    </div>
  )
}

