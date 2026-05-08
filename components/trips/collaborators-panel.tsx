"use client"

import { useState } from "react"
import { CollaboratorRole } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type Collaborator = {
  id: string
  role: CollaboratorRole
  user: { id: string; email: string | null; name: string | null }
}

export function CollaboratorsPanel({
  tripId,
  initialCollaborators,
  canManage,
}: {
  tripId: string
  initialCollaborators: Collaborator[]
  canManage: boolean
}) {
  const [collaborators, setCollaborators] = useState(initialCollaborators)
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function refresh() {
    const res = await fetch(`/api/trips/${tripId}/collaborators`)
    const json = (await res.json()) as { data: Collaborator[] }
    if (res.ok) setCollaborators(json.data)
  }

  async function add() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/trips/${tripId}/collaborators`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, role: CollaboratorRole.VIEWER }),
      })
      const json = (await res.json()) as { error?: string }
      if (!res.ok) throw new Error(json.error ?? "Add failed")
      setEmail("")
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Add failed")
    } finally {
      setLoading(false)
    }
  }

  async function remove(collaboratorId: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/trips/${tripId}/collaborators`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ collaboratorId }),
      })
      if (!res.ok) throw new Error("Remove failed")
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Remove failed")
    } finally {
      setLoading(false)
    }
  }

  async function changeRole(collaboratorId: string, role: CollaboratorRole) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/trips/${tripId}/collaborators`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ collaboratorId, role }),
      })
      if (!res.ok) throw new Error("Role update failed")
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Role update failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Collaborators</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {canManage ? (
          <div className="flex gap-2">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Add collaborator by email"
            />
            <Button onClick={add} disabled={loading || !email}>
              Add
            </Button>
          </div>
        ) : null}

        <div className="space-y-2">
          {collaborators.length === 0 ? (
            <p className="text-sm text-muted-foreground">No collaborators yet.</p>
          ) : (
            collaborators.map((c) => (
              <div key={c.id} className="flex flex-wrap items-center justify-between gap-2 rounded border p-2">
                <div className="text-sm">
                  <div className="font-medium">{c.user.name ?? c.user.email ?? "User"}</div>
                  <div className="text-muted-foreground">{c.user.email ?? "No email"}</div>
                </div>
                <div className="flex items-center gap-2">
                  {canManage ? (
                    <select
                      className="rounded border bg-background px-2 py-1 text-xs"
                      value={c.role}
                      onChange={(e) => changeRole(c.id, e.target.value as CollaboratorRole)}
                    >
                      {Object.values(CollaboratorRole).map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-xs text-muted-foreground">{c.role}</span>
                  )}
                  {canManage ? (
                    <Button size="sm" variant="ghost" onClick={() => remove(c.id)} disabled={loading}>
                      Remove
                    </Button>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </CardContent>
    </Card>
  )
}

