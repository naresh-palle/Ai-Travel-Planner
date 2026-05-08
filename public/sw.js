const CACHE_NAME = "yatrika-v1"
const STATIC_ASSETS = ["/", "/manifest.webmanifest"]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)))
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return
  const url = new URL(request.url)

  // Never cache Next.js runtime/chunks or dev hot-update requests.
  if (
    url.pathname.startsWith("/_next/") ||
    url.pathname.includes(".hot-update.") ||
    request.url.includes("webpack-hmr")
  ) {
    return
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response
        }
        const copy = response.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
        return response
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match("/")))
  )
})
