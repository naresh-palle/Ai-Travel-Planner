"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, 
  Wallet, 
  Map, 
  WifiOff, 
  Train,
  Plane,
  Car,
  UtensilsCrossed,
  Calendar,
  Clock,
  MapPin,
  Star,
  Zap,
  Shield
} from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI Itinerary Generation",
    description: "Get personalized trip plans in seconds powered by advanced AI that understands your preferences.",
    gradient: "from-[#38BDF8] to-[#0F4C81]",
    span: "md:col-span-2 md:row-span-2",
    preview: "ai",
  },
  {
    icon: Train,
    title: "IRCTC Train Planning",
    description: "Integrated booking suggestions and route optimization.",
    gradient: "from-[#FF7A59] to-[#FFB36B]",
    preview: "train",
  },
  {
    icon: Plane,
    title: "Domestic Flights",
    description: "Compare flights with real-time pricing.",
    gradient: "from-[#38BDF8] to-cyan-400",
    preview: "flight",
  },
  {
    icon: Car,
    title: "Road Trip Planner",
    description: "Highway stops, fuel stations, scenic routes.",
    gradient: "from-[#2E8B57] to-emerald-400",
    preview: "road",
  },
  {
    icon: UtensilsCrossed,
    title: "Local Food Discovery",
    description: "Authentic cuisines and street food gems.",
    gradient: "from-[#FFB36B] to-amber-400",
    preview: "food",
  },
  {
    icon: Wallet,
    title: "Smart Budgeting",
    description: "Track expenses and split costs automatically.",
    gradient: "from-[#2E8B57] to-teal-400",
    preview: "budget",
  },
  {
    icon: Map,
    title: "Regional Recommendations",
    description: "AI-powered hidden gems and local attractions.",
    gradient: "from-[#0F4C81] to-[#38BDF8]",
    preview: "map",
  },
  {
    icon: WifiOff,
    title: "Offline Access",
    description: "Access plans without internet connection.",
    gradient: "from-slate-600 to-slate-400",
    preview: "offline",
  },
]

// Mini UI Previews for feature cards
function FeaturePreview({ type }: { type: string }) {
  if (type === "ai") {
    return (
      <div className="absolute bottom-4 right-4 left-4 h-48">
        {/* AI Chat Interface Mini */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 h-full">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#0F4C81] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-white">Yatrika AI</p>
              <p className="text-[10px] text-white/50">Planning your trip...</p>
            </div>
          </div>
          <div className="space-y-2">
            <motion.div 
              className="h-2 bg-white/20 rounded-full overflow-hidden"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-[#38BDF8] to-[#FF7A59] rounded-full"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <div className="flex gap-2">
              {["Day 1", "Day 2", "Day 3"].map((day, i) => (
                <motion.div
                  key={day}
                  className="flex-1 h-16 rounded-lg bg-white/10 border border-white/10 p-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                >
                  <p className="text-[10px] text-white/70">{day}</p>
                  <div className="mt-1 space-y-1">
                    <div className="h-1.5 w-full bg-white/20 rounded" />
                    <div className="h-1.5 w-3/4 bg-white/10 rounded" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (type === "train") {
    return (
      <div className="absolute bottom-3 right-3 left-3">
        <div className="flex items-center gap-2 text-[10px] text-white/70">
          <span>DEL</span>
          <div className="flex-1 h-px bg-white/30 relative">
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#FF7A59] rounded-full"
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span>JAI</span>
        </div>
      </div>
    )
  }

  if (type === "budget") {
    return (
      <div className="absolute bottom-3 right-3 left-3">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-white/50">Budget</span>
          <span className="text-[#2E8B57] font-medium">Rs 24,500</span>
        </div>
        <div className="mt-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#2E8B57] to-emerald-400 rounded-full"
            initial={{ width: "0%" }}
            whileInView={{ width: "65%" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    )
  }

  return null
}

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden">
      {/* Premium Dark Navy Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F33] via-[#0F2942] to-[#0B1F33]" />
        
        {/* Glowing accents */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#0F4C81]/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FF7A59]/20 rounded-full blur-[100px]" />
        
        {/* Animated travel routes */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 600">
          <motion.path
            d="M0,300 Q250,100 500,300 T1000,300"
            stroke="url(#featureRoute1)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M0,400 Q250,200 500,400 T1000,200"
            stroke="url(#featureRoute2)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
          />
          <defs>
            <linearGradient id="featureRoute1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#FF7A59" />
            </linearGradient>
            <linearGradient id="featureRoute2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF7A59" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
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
            className="mb-4 px-4 py-2 text-sm font-medium bg-white/10 text-white border border-white/20 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 mr-2 text-[#38BDF8]" />
            Powerful Features
          </Badge>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Everything you need for the{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] to-[#FF7A59] bg-clip-text text-transparent">
              perfect trip
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/60 text-pretty">
            Powerful AI-driven features designed to make trip planning effortless and enjoyable.
          </p>
        </motion.div>

        {/* Premium Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`group relative ${feature.span || ""}`}
            >
              <div className={`h-full rounded-[24px] p-6 bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col ${feature.span ? 'min-h-[320px]' : 'min-h-[180px]'}`}>
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[24px]`} />
                
                {/* Icon */}
                <div className={`relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                  {/* Icon glow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-50 -z-10`} />
                </div>

                {/* Content */}
                <div className="relative z-10 flex-shrink-0">
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
                </div>

                {/* Mini Preview for large cards */}
                <FeaturePreview type={feature.preview} />

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-[24px]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {[
            { icon: Shield, label: "Bank-level Security" },
            { icon: Clock, label: "Real-time Updates" },
            { icon: Star, label: "4.9 App Rating" },
            { icon: Calendar, label: "Smart Scheduling" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-white/50">
              <item.icon className="w-4 h-4 text-[#38BDF8]" />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
