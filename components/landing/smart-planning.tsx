"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Plane, 
  Train, 
  Bus, 
  Car,
  MapPin,
  Clock,
  Wallet,
  Cloud,
  Bell,
  Shield,
  Download,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Route,
  CalendarDays
} from "lucide-react"

const transportModes = [
  { icon: Plane, label: "Flights", active: true },
  { icon: Train, label: "Trains", active: false },
  { icon: Bus, label: "Buses", active: false },
  { icon: Car, label: "Drive", active: false },
]

const features = [
  { icon: Clock, title: "Smart Timing", desc: "Auto-calculated durations" },
  { icon: Wallet, title: "Live Budget", desc: "Real-time cost tracking" },
  { icon: Cloud, title: "Weather Sync", desc: "7-day forecasts" },
  { icon: Bell, title: "Reminders", desc: "Timely notifications" },
  { icon: Shield, title: "Safety Alerts", desc: "Travel advisories" },
  { icon: Download, title: "Offline Mode", desc: "Access anywhere" },
]

const timeline = [
  { time: "06:00", title: "Sunrise at Taj Mahal", type: "activity", done: true },
  { time: "08:30", title: "Breakfast at Hotel", type: "food", done: true },
  { time: "10:00", title: "Agra Fort Visit", type: "activity", done: false },
  { time: "13:00", title: "Traditional Lunch", type: "food", done: false },
  { time: "15:00", title: "Train to Jaipur", type: "transport", done: false },
]

export function SmartPlanning() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Clean Dark Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117] via-[#0F1419] to-[#0D1117]" />
        
        {/* Subtle ambient glow */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#38BDF8]/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#A855F7]/6 rounded-full blur-[150px]" />
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
            Smart Planning
          </Badge>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            AI that thinks ahead for you
          </h2>
          <p className="mt-4 text-lg text-white/50">
            Intelligent route optimization, real-time budgeting, and personalized recommendations.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          
          {/* Left - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.08] overflow-hidden">
              {/* Dashboard Header */}
              <div className="p-5 border-b border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#38BDF8]/20 to-[#A855F7]/20 flex items-center justify-center border border-white/[0.1]">
                      <Route className="w-5 h-5 text-[#38BDF8]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Day 2 - Agra</h3>
                      <p className="text-xs text-white/40">Golden Triangle Tour</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-400">Optimized</span>
                  </div>
                </div>
              </div>

              {/* Transport Modes */}
              <div className="p-5 border-b border-white/[0.06]">
                <p className="text-xs text-white/40 mb-3 uppercase tracking-wide">Transport</p>
                <div className="flex gap-2">
                  {transportModes.map((mode) => (
                    <button
                      key={mode.label}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                        mode.active 
                          ? "bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30" 
                          : "bg-white/[0.04] text-white/50 border border-transparent hover:bg-white/[0.06]"
                      }`}
                    >
                      <mode.icon className="w-4 h-4" />
                      <span>{mode.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs text-white/40 uppercase tracking-wide">Schedule</p>
                  <div className="flex items-center gap-1 text-xs text-white/40">
                    <CalendarDays className="w-3 h-3" />
                    <span>5 activities</span>
                  </div>
                </div>
                <div className="space-y-1">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.03] transition-colors"
                    >
                      <span className="text-xs font-mono text-white/40 w-12">{item.time}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        item.done ? "bg-emerald-400" : 
                        item.type === "transport" ? "bg-[#38BDF8]" : 
                        item.type === "food" ? "bg-rose-400" : "bg-violet-400"
                      }`} />
                      <span className={`text-sm flex-1 ${item.done ? "text-white/40 line-through" : "text-white/80"}`}>
                        {item.title}
                      </span>
                      {item.done && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats Footer */}
              <div className="p-5 border-t border-white/[0.06] bg-white/[0.02]">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-semibold text-white">Rs 8.5k</p>
                    <p className="text-xs text-white/40">Est. Cost</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">12h</p>
                    <p className="text-xs text-white/40">Duration</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-emerald-400">85%</p>
                    <p className="text-xs text-white/40">Optimized</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Suggestion - Clean floating card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-4"
            >
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#38BDF8]/10 to-[#A855F7]/10 border border-white/[0.08]">
                <div className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">Add sunset photo stop at Mehtab Bagh</p>
                  <p className="text-xs text-white/40">Recommended by AI</p>
                </div>
                <Button size="sm" variant="ghost" className="text-[#38BDF8] hover:bg-[#38BDF8]/10 text-xs">
                  Add
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* AI Optimization Card */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#38BDF8]/20 to-[#A855F7]/20 flex items-center justify-center border border-white/[0.1]">
                  <Zap className="w-6 h-6 text-[#38BDF8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Real-time Optimization</h3>
                  <p className="text-sm text-white/50">AI continuously improves your route</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Route efficiency</span>
                  <span className="text-emerald-400">85%</span>
                </div>
                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#38BDF8] to-emerald-400 rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  />
                </div>
                <p className="text-xs text-white/40">2 optimization suggestions available</p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.06 }}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all group"
                >
                  <feature.icon className="w-5 h-5 text-white/40 mb-3 group-hover:text-[#38BDF8] transition-colors" />
                  <h4 className="text-sm font-medium text-white mb-0.5">{feature.title}</h4>
                  <p className="text-xs text-white/40">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Document Storage */}
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#FF7A59]/10 flex items-center justify-center border border-[#FF7A59]/20">
                  <MapPin className="w-5 h-5 text-[#FF7A59]" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Document Vault</h3>
                  <p className="text-sm text-white/50 mb-3">All travel documents secure and offline-ready.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Tickets", "Passport", "Visa", "Insurance"].map((doc) => (
                      <span key={doc} className="text-xs px-2.5 py-1 rounded-md bg-white/[0.06] text-white/60">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button className="w-full bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/[0.1] py-6 text-base rounded-xl group">
              Try Smart Planning
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
