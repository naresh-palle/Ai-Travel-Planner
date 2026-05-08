"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Map, 
  Navigation, 
  MapPin,
  Clock,
  Route,
  Fuel,
  Cloud,
  ArrowRight,
  Locate,
  Layers
} from "lucide-react"

const mapFeatures = [
  { icon: Route, label: "Route Optimization", description: "AI-powered shortest routes" },
  { icon: Navigation, label: "Live Navigation", description: "Turn-by-turn directions" },
  { icon: Clock, label: "Traffic Estimation", description: "Real-time travel times" },
  { icon: Cloud, label: "Weather Overlay", description: "Weather at each stop" },
  { icon: Fuel, label: "Fuel Stations", description: "Gas stops along route" },
  { icon: Locate, label: "Nearby Places", description: "Discover attractions nearby" },
]

const routePoints = [
  { name: "Delhi", type: "start", x: 25, y: 35 },
  { name: "Agra", type: "stop", x: 35, y: 45 },
  { name: "Jaipur", type: "stop", x: 20, y: 40 },
  { name: "Udaipur", type: "end", x: 15, y: 55 },
]

export function MapExperience() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#0B1F33]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0F4C81]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#38BDF8]/15 rounded-full blur-[100px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge 
            variant="secondary" 
            className="mb-4 px-4 py-2 text-sm font-medium bg-[#38BDF8]/20 text-[#38BDF8] border-0"
          >
            <Map className="w-4 h-4 mr-2" />
            Interactive Maps
          </Badge>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Visualize your entire journey
          </h2>
          <p className="mt-4 text-lg text-white/70 text-pretty">
            Interactive maps with route optimization, live traffic, and weather overlays.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Map Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Map Container */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0F4C81]/30 border border-[#38BDF8]/20 backdrop-blur-sm">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 opacity-30">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* India outline simplified */}
                  <path
                    d="M20 20 Q30 15 40 25 L50 20 Q60 25 70 30 L75 45 Q80 55 75 65 L70 80 Q60 85 50 80 L40 85 Q30 80 25 70 L20 55 Q15 45 20 35 Z"
                    fill="none"
                    stroke="rgba(56, 189, 248, 0.5)"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>

              {/* Route Line Animation */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <motion.path
                  d="M25 35 Q30 40 35 45 Q28 43 20 40 Q17 48 15 55"
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeDasharray="2 1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#FF7A59" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Route Points */}
              {routePoints.map((point, index) => (
                <motion.div
                  key={point.name}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
                  className="absolute"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  {/* Pulse Effect */}
                  <div className={`absolute inset-0 -m-3 rounded-full ${
                    point.type === 'start' ? 'bg-[#2E8B57]' : 
                    point.type === 'end' ? 'bg-[#FF7A59]' : 'bg-[#38BDF8]'
                  } animate-ping opacity-30`} />
                  
                  {/* Pin */}
                  <div className={`relative w-6 h-6 rounded-full ${
                    point.type === 'start' ? 'bg-[#2E8B57]' : 
                    point.type === 'end' ? 'bg-[#FF7A59]' : 'bg-[#38BDF8]'
                  } flex items-center justify-center shadow-lg border-2 border-white/30`}>
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                  
                  {/* Label */}
                  <div className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-lg px-3 py-1.5 border border-white/20 whitespace-nowrap">
                    <p className="text-xs font-medium text-white">{point.name}</p>
                  </div>
                </motion.div>
              ))}

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <Layers className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <Locate className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Stats Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1 }}
                className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
              >
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">742</p>
                    <p className="text-xs text-white/60">km total</p>
                  </div>
                  <div className="w-px h-10 bg-white/20" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">12h</p>
                    <p className="text-xs text-white/60">drive time</p>
                  </div>
                  <div className="w-px h-10 bg-white/20" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">4</p>
                    <p className="text-xs text-white/60">stops</p>
                  </div>
                  <div className="w-px h-10 bg-white/20" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#2E8B57]">28°C</p>
                    <p className="text-xs text-white/60">avg temp</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {mapFeatures.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#38BDF8]/30 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0F4C81] to-[#38BDF8] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1 group-hover:text-[#38BDF8] transition-colors">
                    {feature.label}
                  </h3>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="mt-8"
            >
              <Button className="w-full bg-gradient-to-r from-[#38BDF8] to-[#0F4C81] hover:opacity-90 text-white shadow-lg shadow-[#38BDF8]/20 group py-6 text-base">
                Explore Map Features
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
