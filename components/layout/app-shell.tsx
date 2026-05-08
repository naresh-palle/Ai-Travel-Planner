"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Compass,
  LayoutDashboard,
  Luggage,
  Map,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Sparkles,
} from "lucide-react"
import { motion } from "framer-motion"

import { UserMenu } from "@/components/auth/user-menu"
import { NotificationBell } from "@/components/notifications/notification-bell"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/trips", label: "Trips", icon: Luggage },
  { href: "/ai-itinerary", label: "AI Itinerary", icon: Sparkles },
  { href: "/travel-map", label: "Travel Map", icon: Map },
  { href: "/settings/billing", label: "Billing", icon: Settings },
  { href: "/admin", label: "Admin", icon: Settings },
  { href: "/", label: "Explore", icon: Compass },
] as const

function SidebarNav({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname()
  return (
    <nav className="grid gap-1">
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            collapsed && "justify-center px-2",
            pathname === item.href && "bg-accent text-accent-foreground"
          )}
          title={collapsed ? item.label : undefined}
        >
          <item.icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
          {!collapsed ? item.label : null}
        </Link>
      ))}
    </nav>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open navigation</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                  <div className="mb-4 text-sm font-semibold">App</div>
                  <SidebarNav />
                </SheetContent>
              </Sheet>
              <Link href="/dashboard" className="text-sm font-semibold">
                SaaS
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <NotificationBell />
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:inline-flex"
                onClick={() => setSidebarCollapsed((prev) => !prev)}
                aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? (
                  <PanelLeftOpen className="h-4 w-4" />
                ) : (
                  <PanelLeftClose className="h-4 w-4" />
                )}
              </Button>
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex gap-6 py-6">
          <motion.aside
            animate={{ width: sidebarCollapsed ? 72 : 220 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="hidden md:block shrink-0"
          >
            <div className="rounded-lg border bg-card p-3">
              <div className="mb-2 text-xs font-semibold text-muted-foreground">
                {sidebarCollapsed ? "Nav" : "Navigation"}
              </div>
              <SidebarNav collapsed={sidebarCollapsed} />
            </div>
          </motion.aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  )
}

