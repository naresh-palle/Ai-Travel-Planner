"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type NotificationItem = {
  id: string
  title: string
  message: string
  createdAt: string
  readAt: string | null
}

export function NotificationBell() {
  const [items, setItems] = useState<NotificationItem[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  async function load() {
    const res = await fetch("/api/notifications")
    const json = (await res.json()) as { data?: NotificationItem[]; unreadCount?: number }
    if (res.ok) {
      setItems(json.data ?? [])
      setUnreadCount(json.unreadCount ?? 0)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  async function markRead(notificationId?: string, markAll?: boolean) {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ notificationId, markAll }),
    })
    await load()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 ? (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          Notifications
          <Button variant="ghost" size="sm" onClick={() => markRead(undefined, true)}>
            Mark all read
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.length === 0 ? (
          <DropdownMenuItem disabled>No notifications</DropdownMenuItem>
        ) : (
          items.map((item) => (
            <DropdownMenuItem
              key={item.id}
              className="block cursor-pointer space-y-1"
              onClick={() => markRead(item.id, false)}
            >
              <div className="text-sm font-medium">{item.title}</div>
              <div className="text-xs text-muted-foreground">{item.message}</div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

