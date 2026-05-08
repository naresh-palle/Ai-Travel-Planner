"use client"

import * as React from "react"
import { LogOut, User } from "lucide-react"
import { SignOutButton, useUser } from "@clerk/nextjs"

import { ModeToggle } from "@/components/theme/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function initials(name?: string | null) {
  if (!name) return "U"
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0]?.toUpperCase()).join("")
}

export function UserMenu() {
  const { user } = useUser()
  const name = user?.fullName ?? user?.firstName ?? user?.username
  const email = user?.primaryEmailAddress?.emailAddress
  const imageUrl = user?.imageUrl

  return (
    <div className="flex items-center gap-1">
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={imageUrl} alt={name ?? "User"} />
              <AvatarFallback>{initials(name)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={imageUrl} alt={name ?? "User"} />
                <AvatarFallback>{initials(name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{name ?? "Account"}</div>
                {email ? (
                  <div className="truncate text-xs text-muted-foreground">{email}</div>
                ) : null}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href="/dashboard" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <SignOutButton>
            <DropdownMenuItem className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </SignOutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

