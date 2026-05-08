export const OFFLINE_TRIPS_KEY = "offline:trips"

export function saveTripsSnapshot(payload: unknown) {
  if (typeof window === "undefined") return
  localStorage.setItem(OFFLINE_TRIPS_KEY, JSON.stringify(payload))
}

export function getTripsSnapshot<T>() {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(OFFLINE_TRIPS_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

