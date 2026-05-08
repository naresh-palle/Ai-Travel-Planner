"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { 
  Compass, 
  Heart, 
  Users, 
  Backpack, 
  Car, 
  Mountain,
  Sparkles,
  Crown,
  Briefcase,
  MapPin,
  Plane,
  User
} from "lucide-react"
import Image from "next/image"

const tripTypes = [
  {
    icon: Mountain,
    title: "Adventure",
    description: "Thrilling experiences",
    image: "/images/destinations/ladakh.jpg",
    gradient: "from-emerald-500 to-teal-600",
    travelers: "2.4M trips",
  },
  {
    icon: Crown,
    title: "Luxury",
    description: "Premium getaways",
    image: "/images/destinations/maldives.jpg",
    gradient: "from-amber-500 to-orange-600",
    travelers: "890K trips",
  },
  {
    icon: User,
    title: "Solo",
    description: "Self-discovery journeys",
    image: "/images/destinations/varanasi.jpg",
    gradient: "from-violet-500 to-purple-600",
    travelers: "1.8M trips",
  },
  {
    icon: Users,
    title: "Family",
    description: "Memory-making vacations",
    image: "/images/destinations/kerala.jpg",
    gradient: "from-blue-500 to-cyan-600",
    travelers: "3.2M trips",
  },
  {
    icon: Backpack,
    title: "Backpacking",
    description: "Budget adventures",
    image: "/images/destinations/manali.jpg",
    gradient: "from-green-500 to-emerald-600",
    travelers: "1.5M trips",
  },
  {
    icon: Car,
    title: "Road Trips",
    description: "Open road freedom",
    image: "/images/destinations/coorg.jpg",
    gradient: "from-rose-500 to-pink-600",
    travelers: "980K trips",
  },
  {
    icon: Heart,
    title: "Honeymoon",
    description: "Romantic escapes",
    image: "/images/destinations/udaipur.jpg",
    gradient: "from-pink-500 to-rose-600",
    travelers: "1.2M trips",
  },
  {
    icon: Briefcase,
    title: "Business",
    description: "Work + explore",
    image: "/images/destinations/dubai.jpg",
    gradient: "from-slate-500 to-gray-600",
    travelers: "670K trips",
  },
]

const floatingDestinations = [
  { name: "Bali", x: "5%", y: "20%", delay: 0 },
  { name: "Paris", x: "85%", y: "15%", delay: 0.5 },
  { name: "Tokyo", x: "10%", y: "70%", delay: 1 },
  { name: "Dubai", x: "80%", y: "75%", delay: 1.5 },
]

export function TripTypes() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Premium Cinematic Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient - sunset inspired */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F33] via-[#1a3a5c] to-[#0F4C81]" />
        
        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_20%_20%,rgba(255,122,89,0.3),transparent_50%)]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(56,189,248,0.25),transparent_50%)]" />
        </div>

        {/* World map texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Animated floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${10 + (i * 6)}%`,
              top: `${20 + (i * 5) % 60}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Animated travel routes */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 600">
          <motion.path
            d="M100,300 Q300,100 500,300 T900,300"
            stroke="url(#routeGradient1)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10,10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M50,450 Q250,250 450,350 T850,200"
            stroke="url(#routeGradient2)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="8,8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
          />
          <defs>
            <linearGradient id="routeGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#FF7A59" />
            </linearGradient>
            <linearGradient id="routeGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF7A59" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1F33] to-transparent" />
      </div>

      {/* Floating Destination Badges */}
      {floatingDestinations.map((dest) => (
        <motion.div
          key={dest.name}
          className="absolute hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
          style={{ left: dest.x, top: dest.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 0.5, 
            delay: dest.delay,
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <MapPin className="w-4 h-4 text-[#FF7A59]" />
          <span className="text-sm font-medium text-white">{dest.name}</span>
        </motion.div>
      ))}

      {/* Floating Plane Animation */}
      <motion.div
        className="absolute hidden lg:block"
        initial={{ x: "-10%", y: "30%" }}
        animate={{ x: "110%", y: "20%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative">
          <Plane className="w-8 h-8 text-white/40 rotate-45" />
          <div className="absolute -inset-2 bg-white/20 rounded-full blur-md -z-10" />
        </div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge 
            variant="secondary" 
            className="mb-4 px-4 py-2 text-sm font-medium bg-white/10 text-white border border-white/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 mr-2 text-[#FF7A59]" />
            Travel Your Way
          </Badge>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Every journey tells a{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] to-[#FF7A59] bg-clip-text text-transparent">
              unique story
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto text-pretty">
            Whether you seek adventure, relaxation, or cultural immersion, 
            Yatrika crafts the perfect itinerary for your travel style.
          </p>
        </motion.div>

        {/* Trip Type Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {tripTypes.map((trip, index) => (
            <motion.div
              key={trip.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-[24px] overflow-hidden cursor-pointer"
            >
              {/* Card Background Image */}
              <div className="aspect-[4/5] relative w-full">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-br ${trip.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Glowing border on hover */}
                <div className="absolute inset-0 rounded-[24px] border-2 border-white/0 group-hover:border-white/30 transition-all duration-500" />
                <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_30px_rgba(255,255,255,0.1)]" />
              </div>

              {/* Card Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                {/* Icon Badge */}
                <motion.div 
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${trip.gradient} flex items-center justify-center mb-3 shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <trip.icon className="w-6 h-6 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-1">{trip.title}</h3>
                <p className="text-sm text-white/70 mb-2">{trip.description}</p>
                
                {/* Stats */}
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Users className="w-3 h-3" />
                  <span>{trip.travelers}</span>
                </div>
              </div>

              {/* Hover Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[
            { label: "Trip Styles", value: "12+" },
            { label: "Happy Travelers", value: "2M+" },
            { label: "Countries", value: "150+" },
            { label: "AI Itineraries", value: "10M+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-white/50">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
