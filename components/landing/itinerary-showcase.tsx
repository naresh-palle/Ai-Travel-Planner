"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Sun, 
  Plane,
  Hotel,
  Utensils,
  Camera,
  Coffee,
  ChevronRight,
  Sparkles,
  Cloud,
  Navigation
} from "lucide-react"

const days = [
  { id: 1, label: "Day 1", date: "Oct 15", location: "Tokyo Arrival" },
  { id: 2, label: "Day 2", date: "Oct 16", location: "City Explore" },
  { id: 3, label: "Day 3", date: "Oct 17", location: "Mt. Fuji Trip" },
]

const itineraryData: Record<number, Array<{
  time: string
  title: string
  location: string
  duration: string
  cost: string
  icon: typeof MapPin
  type: "transport" | "stay" | "food" | "activity"
}>> = {
  1: [
    { time: "09:00", title: "Arrive at Narita Airport", location: "Tokyo", duration: "2h", cost: "$0", icon: Plane, type: "transport" },
    { time: "11:30", title: "Check-in at Park Hyatt", location: "Shinjuku", duration: "1h", cost: "$450", icon: Hotel, type: "stay" },
    { time: "13:00", title: "Lunch at Ichiran Ramen", location: "Shibuya", duration: "1h", cost: "$15", icon: Utensils, type: "food" },
    { time: "15:00", title: "Shibuya Crossing", location: "Shibuya", duration: "2h", cost: "$0", icon: Camera, type: "activity" },
  ],
  2: [
    { time: "08:00", title: "Senso-ji Temple", location: "Asakusa", duration: "2h", cost: "$0", icon: Camera, type: "activity" },
    { time: "10:30", title: "Blue Bottle Coffee", location: "Nakameguro", duration: "1h", cost: "$8", icon: Coffee, type: "food" },
    { time: "12:00", title: "Sushi at Tsukiji", location: "Tsukiji", duration: "1.5h", cost: "$45", icon: Utensils, type: "food" },
    { time: "14:30", title: "TeamLab Borderless", location: "Odaiba", duration: "3h", cost: "$30", icon: Camera, type: "activity" },
  ],
  3: [
    { time: "07:00", title: "Day Trip to Mt. Fuji", location: "Fujikawaguchiko", duration: "Full day", cost: "$120", icon: MapPin, type: "activity" },
    { time: "10:00", title: "Chureito Pagoda", location: "Fujiyoshida", duration: "2h", cost: "$0", icon: Camera, type: "activity" },
    { time: "13:00", title: "Traditional Lunch", location: "Lake Kawaguchi", duration: "1.5h", cost: "$35", icon: Utensils, type: "food" },
    { time: "16:00", title: "Return to Tokyo", location: "Shinjuku", duration: "2h", cost: "$0", icon: Plane, type: "transport" },
  ],
}

const typeColors = {
  transport: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  stay: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  food: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  activity: "bg-violet-500/20 text-violet-400 border-violet-500/30",
}

const iconColors = {
  transport: "text-sky-400",
  stay: "text-amber-400",
  food: "text-rose-400",
  activity: "text-violet-400",
}

export function ItineraryShowcase() {
  const [activeDay, setActiveDay] = useState(1)

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Clean Dark Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1A] via-[#0D1321] to-[#0A0F1A]" />
        
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#1E3A5F]/20 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#38BDF8]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF7A59]/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge 
            variant="secondary" 
            className="mb-4 px-4 py-2 text-sm font-medium bg-white/5 text-white/80 border border-white/10"
          >
            Live Preview
          </Badge>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Your itinerary, beautifully organized
          </h2>
          <p className="mt-4 text-lg text-white/50">
            A clean timeline view with all activities, costs, and timing synced across devices.
          </p>
        </motion.div>

        {/* Main Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/20">
            {/* Split Layout */}
            <div className="grid lg:grid-cols-[280px_1fr]">
              
              {/* Left Sidebar */}
              <div className="p-6 border-b lg:border-b-0 lg:border-r border-white/[0.06] bg-white/[0.02]">
                {/* Trip Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-1">Tokyo Adventure</h3>
                  <p className="text-sm text-white/40">Oct 15 - Oct 22, 2024</p>
                </div>

                {/* Day Selection */}
                <div className="space-y-2 mb-8">
                  {days.map((day) => (
                    <motion.button
                      key={day.id}
                      onClick={() => setActiveDay(day.id)}
                      whileHover={{ x: 2 }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                        activeDay === day.id
                          ? "bg-white/[0.08] border border-white/[0.12]"
                          : "hover:bg-white/[0.04] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                          activeDay === day.id 
                            ? "bg-[#38BDF8] text-white" 
                            : "bg-white/[0.06] text-white/60"
                        }`}>
                          {day.id}
                        </div>
                        <div className="text-left">
                          <p className={`text-sm font-medium ${activeDay === day.id ? "text-white" : "text-white/70"}`}>
                            {day.label}
                          </p>
                          <p className="text-xs text-white/40">{day.location}</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${activeDay === day.id ? "text-white/60" : "text-white/20"}`} />
                    </motion.button>
                  ))}
                </div>

                {/* Weather Card */}
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-white/40 uppercase tracking-wide">Weather</span>
                    <Cloud className="w-4 h-4 text-white/30" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Sun className="w-8 h-8 text-amber-400" />
                    <div>
                      <p className="text-xl font-semibold text-white">24°C</p>
                      <p className="text-xs text-white/40">Sunny, Tokyo</p>
                    </div>
                  </div>
                </div>

                {/* Budget Card */}
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-white/40 uppercase tracking-wide">Daily Budget</span>
                    <DollarSign className="w-4 h-4 text-white/30" />
                  </div>
                  <div className="flex items-end justify-between mb-3">
                    <p className="text-xl font-semibold text-white">$545</p>
                    <p className="text-sm text-emerald-400">$55 left</p>
                  </div>
                  <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[#38BDF8] to-emerald-400 rounded-full"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "91%" }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Content - Timeline */}
              <div className="p-6 lg:p-8">
                {/* Schedule Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {days.find(d => d.id === activeDay)?.label} Schedule
                    </h3>
                    <p className="text-sm text-white/40">{days.find(d => d.id === activeDay)?.date}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white/60 hover:text-white hover:bg-white/[0.06]"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Map View
                  </Button>
                </div>

                {/* Timeline */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDay}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-1"
                  >
                    {itineraryData[activeDay].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="group relative"
                      >
                        <div className="flex gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-colors">
                          {/* Timeline Line */}
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center border border-white/[0.08] group-hover:border-white/[0.15] transition-colors`}>
                              <item.icon className={`w-5 h-5 ${iconColors[item.type]}`} />
                            </div>
                            {index < itineraryData[activeDay].length - 1 && (
                              <div className="flex-1 w-px bg-white/[0.06] mt-2 min-h-[20px]" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 pt-1">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="font-medium text-white group-hover:text-[#38BDF8] transition-colors">
                                  {item.title}
                                </p>
                                <div className="flex items-center gap-3 mt-1.5">
                                  <span className="text-xs text-white/40 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {item.location}
                                  </span>
                                  <span className="text-xs text-white/40 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {item.duration}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-[#38BDF8]">{item.time}</p>
                                <p className="text-xs text-white/40 mt-0.5">{item.cost}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating AI Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-md mx-auto mt-8"
        >
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#38BDF8]/20 to-[#A855F7]/20 flex items-center justify-center border border-white/[0.1]">
              <Sparkles className="w-5 h-5 text-[#38BDF8]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">AI Suggestion</p>
              <p className="text-xs text-white/50">Consider adding TeamLab Planets for a complete digital art experience</p>
            </div>
            <Button size="sm" variant="ghost" className="text-[#38BDF8] hover:bg-[#38BDF8]/10 text-xs">
              Add
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
