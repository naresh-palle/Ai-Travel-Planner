"use client"

import { useEffect } from "react"

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return

    // Avoid stale chunk caching during local development.
    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => {
          void reg.unregister()
        })
      })
      if ("caches" in window) {
        caches.keys().then((keys) => {
          keys.forEach((k) => {
            void caches.delete(k)
          })
        })
      }
      return
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Non-blocking registration failure
    })
  }, [])

  return null
}

