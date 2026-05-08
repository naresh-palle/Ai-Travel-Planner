export class ApiError extends Error {
  status: number
  code?: string

  constructor(message: string, opts: { status: number; code?: string }) {
    super(message)
    this.name = "ApiError"
    this.status = opts.status
    this.code = opts.code
  }
}

type ApiFetchInit = Omit<RequestInit, "body"> & {
  body?: unknown
}

export async function apiFetch<T>(path: string, init?: ApiFetchInit): Promise<T> {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
      : ""

  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
    body: init?.body === undefined ? undefined : JSON.stringify(init.body),
  })

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const json = (await res.json()) as { error?: string; code?: string }
      if (json?.error) message = json.error
      throw new ApiError(message, { status: res.status, code: json?.code })
    } catch {
      throw new ApiError(message, { status: res.status })
    }
  }

  return (await res.json()) as T
}

