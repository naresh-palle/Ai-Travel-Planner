"use client"

import { motion } from "framer-motion"
import {
  Bell,
  CalendarDays,
  Clock3,
  DollarSign,
  MapPin,
  PlaneTakeoff,
  Star,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const overview = [
  { label: "Active Trips", value: "4", icon: PlaneTakeoff, delta: "+2 this month" },
  { label: "Upcoming Activities", value: "18", icon: CalendarDays, delta: "Next 7 days" },
  { label: "Collaborators", value: "12", icon: Users, delta: "Across all trips" },
  { label: "Planned Budget", value: "$8,240", icon: DollarSign, delta: "12% under target" },
] as const

const recentActivity = [
  { title: "Updated Goa itinerary", time: "2h ago", meta: "Added 3 beach activities" },
  { title: "Hotel booking confirmed", time: "5h ago", meta: "Jaipur - 2 nights" },
  { title: "Riya joined Kerala trip", time: "Yesterday", meta: "Collaborator: Editor" },
] as const

const notifications = [
  { title: "Flight price dropped", description: "Mumbai to Kochi is down by 9%", tag: "Deal" },
  { title: "Weather alert", description: "Rain forecast for Udaipur on Day 3", tag: "Alert" },
  { title: "Passport reminder", description: "Expiry check needed for 1 traveler", tag: "Reminder" },
] as const

const savedDestinations = [
  { name: "Alleppey Backwaters", country: "India", score: "4.8", type: "Nature" },
  { name: "Blue City Jodhpur", country: "India", score: "4.7", type: "Culture" },
  { name: "Hampi Ruins", country: "India", score: "4.9", type: "History" },
  { name: "Valley of Flowers", country: "India", score: "4.8", type: "Adventure" },
] as const

export function DashboardContent({ firstName }: { firstName?: string | null }) {
  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back{firstName ? `, ${firstName}` : ""}
          </h1>
          <p className="text-sm text-muted-foreground">
            Here is what is happening across your travel plans today.
          </p>
        </div>
        <Button className="w-full sm:w-auto">Create New Trip</Button>
      </motion.section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overview.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.05 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground">{item.delta}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest trip updates and team actions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((entry) => (
                <div
                  key={entry.title}
                  className="flex items-start justify-between rounded-lg border p-3"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{entry.title}</p>
                    <p className="text-xs text-muted-foreground">{entry.meta}</p>
                  </div>
                  <div className="inline-flex items-center text-xs text-muted-foreground">
                    <Clock3 className="mr-1 h-3.5 w-3.5" />
                    {entry.time}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </CardTitle>
              <CardDescription>Actionable travel alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((n) => (
                <div key={n.title} className="rounded-lg border p-3">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{n.title}</p>
                    <Badge variant="secondary">{n.tag}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{n.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Saved Destinations</CardTitle>
            <CardDescription>Places you bookmarked for future trips.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {savedDestinations.map((dest) => (
              <div key={dest.name} className="rounded-lg border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="outline">{dest.type}</Badge>
                  <div className="inline-flex items-center text-xs">
                    <Star className="mr-1 h-3.5 w-3.5 fill-current text-yellow-500" />
                    {dest.score}
                  </div>
                </div>
                <p className="text-sm font-medium">{dest.name}</p>
                <p className="mt-1 inline-flex items-center text-xs text-muted-foreground">
                  <MapPin className="mr-1 h-3.5 w-3.5" />
                  {dest.country}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.section>
    </div>
  )
}

