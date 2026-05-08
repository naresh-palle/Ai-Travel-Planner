"use client"

import { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { TripStatus, TripVisibility } from "@prisma/client"
import { Loader2, Upload } from "lucide-react"
import { z } from "zod"

import { tripPayloadSchema } from "@/modules/trips/schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type TripFormInput = z.input<typeof tripPayloadSchema>

type TripFormProps = {
  mode: "create" | "edit"
  tripId?: string
  defaultValues?: Partial<TripFormInput>
}

export function TripForm({ mode, tripId, defaultValues }: TripFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [coverImageUrl, setCoverImageUrl] = useState(defaultValues?.coverImageUrl ?? "")

  const initial = useMemo(
    () => ({
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      travelersCount: defaultValues?.travelersCount ?? 1,
      status: defaultValues?.status ?? TripStatus.DRAFT,
      visibility: defaultValues?.visibility ?? TripVisibility.PRIVATE,
      startDate: defaultValues?.startDate ?? "",
      endDate: defaultValues?.endDate ?? "",
      timezone: defaultValues?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
      destinationName: defaultValues?.destinationName ?? "",
      destinationCity: defaultValues?.destinationCity ?? "",
      destinationCountry: defaultValues?.destinationCountry ?? "",
    }),
    [defaultValues]
  )

  async function onFileChange(file?: File) {
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/uploads", { method: "POST", body: fd })
      const json = (await res.json()) as { data?: { url: string }; error?: string }
      if (!res.ok || !json.data?.url) {
        throw new Error(json.error ?? "Upload failed")
      }
      setCoverImageUrl(json.data.url)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  async function onSubmit(formData: FormData) {
    setError(null)

    const input: TripFormInput = {
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      coverImageUrl: coverImageUrl || null,
      travelersCount: Number(formData.get("travelersCount") ?? 1),
      status: String(formData.get("status") ?? TripStatus.DRAFT) as TripStatus,
      visibility: String(formData.get("visibility") ?? TripVisibility.PRIVATE) as TripVisibility,
      startDate: String(formData.get("startDate") ?? "") || null,
      endDate: String(formData.get("endDate") ?? "") || null,
      timezone: String(formData.get("timezone") ?? "") || null,
      destinationName: String(formData.get("destinationName") ?? "") || null,
      destinationCity: String(formData.get("destinationCity") ?? "") || null,
      destinationCountry: String(formData.get("destinationCountry") ?? "") || null,
    }

    const parsed = tripPayloadSchema.safeParse(input)
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid form values")
      return
    }

    startTransition(async () => {
      try {
        const url = mode === "create" ? "/api/trips" : `/api/trips/${tripId}`
        const res = await fetch(url, {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(parsed.data),
        })
        const json = (await res.json()) as { data?: { id: string }; error?: string }
        if (!res.ok) throw new Error(json.error ?? "Unable to save trip")

        const destinationId = json.data?.id ?? tripId
        if (!destinationId) throw new Error("Missing trip id")

        router.push(`/trips/${destinationId}`)
        router.refresh()
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unexpected error")
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mode === "create" ? "Create Trip" : "Edit Trip"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={onSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Trip Title</Label>
              <Input id="title" name="title" defaultValue={initial.title} required />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={initial.description ?? ""} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelersCount">Travelers</Label>
              <Input
                id="travelersCount"
                name="travelersCount"
                type="number"
                min={1}
                max={50}
                defaultValue={initial.travelersCount}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" name="timezone" defaultValue={initial.timezone ?? ""} />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select name="status" defaultValue={initial.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TripStatus).map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Visibility</Label>
              <Select name="visibility" defaultValue={initial.visibility}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TripVisibility).map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" name="startDate" type="date" defaultValue={initial.startDate ?? ""} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" name="endDate" type="date" defaultValue={initial.endDate ?? ""} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Cover Image</Label>
              <div className="flex flex-wrap items-center gap-3">
                <Input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => onFileChange(e.target.files?.[0])}
                  className="max-w-sm"
                />
                {uploading ? (
                  <div className="inline-flex items-center text-sm text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </div>
                ) : (
                  <div className="inline-flex items-center text-sm text-muted-foreground">
                    <Upload className="mr-2 h-4 w-4" />
                    JPG/PNG/WEBP up to 5MB
                  </div>
                )}
              </div>
              {coverImageUrl ? (
                <img
                  src={coverImageUrl}
                  alt="Cover preview"
                  className="mt-3 h-40 w-full rounded-md object-cover md:w-96"
                />
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="destinationName">Destination Name</Label>
              <Input
                id="destinationName"
                name="destinationName"
                defaultValue={initial.destinationName ?? ""}
                placeholder="Bali, Paris, Goa..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destinationCity">City</Label>
              <Input
                id="destinationCity"
                name="destinationCity"
                defaultValue={initial.destinationCity ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destinationCountry">Country</Label>
              <Input
                id="destinationCountry"
                name="destinationCountry"
                defaultValue={initial.destinationCountry ?? ""}
              />
            </div>
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <Button type="submit" disabled={isPending || uploading}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : mode === "create" ? (
              "Create Trip"
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

