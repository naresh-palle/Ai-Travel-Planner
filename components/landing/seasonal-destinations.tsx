"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Sun, 
  CloudRain, 
  Snowflake, 
  Flower2,
  Calendar,
  Wallet,
  MapPin,
  Activity,
  Cloud,
  Droplets,
  Wind
} from "lucide-react"

const seasons = [
  {
    id: "summer",
    name: "Summer",
    months: "Mar - Jun",
    icon: Sun,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-600",
    accentColor: "#F59E0B",
    bgGradient: "from-amber-50 to-orange-50",
    glowColor: "rgba(245, 158, 11, 0.2)",
    destinations: [
      {
        name: "Manali",
        weather: "15-25°C, Pleasant",
        activities: ["Rohtang Pass", "River Rafting", "Paragliding", "Mall Road"],
        budget: "₹12,000 - ₹18,000",
        bestFor: "Adventure & Hill Station",
        image: "/images/seasons/summer-manali.jpg",
      },
      {
        name: "Ladakh",
        weather: "10-20°C, Clear Skies",
        activities: ["Pangong Lake", "Nubra Valley", "Khardung La", "Monasteries"],
        budget: "₹25,000 - ₹35,000",
        bestFor: "Biking & Photography",
        image: "/images/seasons/summer-ladakh.jpg",
      },
      {
        name: "Kashmir",
        weather: "15-30°C, Blooming Gardens",
        activities: ["Shikara Ride", "Gulmarg", "Pahalgam", "Mughal Gardens"],
        budget: "₹18,000 - ₹28,000",
        bestFor: "Scenic Beauty",
        image: "/images/seasons/summer-kashmir.jpg",
      },
      {
        name: "Shimla",
        weather: "15-25°C, Cool Breeze",
        activities: ["Mall Road", "Kufri", "Jakhu Temple", "Toy Train"],
        budget: "₹10,000 - ₹15,000",
        bestFor: "Family Vacation",
        image: "/images/seasons/summer-shimla.jpg",
      },
    ],
  },
  {
    id: "monsoon",
    name: "Monsoon",
    months: "Jul - Sep",
    icon: CloudRain,
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-500/10",
    textColor: "text-teal-600",
    accentColor: "#14B8A6",
    bgGradient: "from-teal-50 to-cyan-50",
    glowColor: "rgba(20, 184, 166, 0.2)",
    destinations: [
      {
        name: "Kerala",
        weather: "25-30°C, Lush Green",
        activities: ["Houseboat Stay", "Ayurveda Spa", "Tea Plantations", "Waterfalls"],
        budget: "₹15,000 - ₹25,000",
        bestFor: "Wellness & Nature",
        image: "/images/seasons/monsoon-kerala.jpg",
      },
      {
        name: "Goa",
        weather: "25-30°C, Tropical Rain",
        activities: ["Dudhsagar Falls", "Spice Plantations", "Beach Walks", "Seafood"],
        budget: "₹10,000 - ₹18,000",
        bestFor: "Off-Season Deals",
        image: "/images/seasons/monsoon-goa.jpg",
      },
      {
        name: "Coorg",
        weather: "18-25°C, Misty Hills",
        activities: ["Abbey Falls", "Coffee Tours", "Raja Seat", "Elephant Camp"],
        budget: "₹12,000 - ₹20,000",
        bestFor: "Coffee & Nature",
        image: "/images/seasons/monsoon-coorg.jpg",
      },
      {
        name: "Cherrapunji",
        weather: "15-22°C, Heavy Rain",
        activities: ["Living Root Bridges", "Waterfalls", "Caves", "Trekking"],
        budget: "₹15,000 - ₹22,000",
        bestFor: "Waterfalls & Unique Experiences",
        image: "/images/seasons/monsoon-cherrapunji.jpg",
      },
    ],
  },
  {
    id: "winter",
    name: "Winter",
    months: "Oct - Feb",
    icon: Snowflake,
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-600",
    accentColor: "#3B82F6",
    bgGradient: "from-blue-50 to-indigo-50",
    glowColor: "rgba(59, 130, 246, 0.2)",
    destinations: [
      {
        name: "Rajasthan",
        weather: "10-25°C, Cool & Dry",
        activities: ["Desert Safari", "Palace Tours", "Camel Ride", "Folk Dance"],
        budget: "₹15,000 - ₹30,000",
        bestFor: "Heritage & Culture",
        image: "/images/seasons/winter-rajasthan.jpg",
      },
      {
        name: "Auli",
        weather: "-5 to 10°C, Snowy",
        activities: ["Skiing", "Cable Car", "Trekking", "Snow Play"],
        budget: "₹18,000 - ₹25,000",
        bestFor: "Skiing & Snow",
        image: "/images/seasons/winter-auli.jpg",
      },
      {
        name: "Rann of Kutch",
        weather: "12-25°C, Clear",
        activities: ["Rann Utsav", "White Desert", "Handicraft Village", "Sunset Views"],
        budget: "₹12,000 - ₹20,000",
        bestFor: "Festival & Desert",
        image: "/images/seasons/winter-rann-of-kutch.jpg",
      },
      {
        name: "Andaman",
        weather: "23-30°C, Sunny",
        activities: ["Scuba Diving", "Island Hopping", "Beach Camping", "Water Sports"],
        budget: "₹25,000 - ₹40,000",
        bestFor: "Beach & Adventure",
        image: "/images/seasons/winter-andaman.jpg",
      },
    ],
  },
  {
    id: "spring",
    name: "Spring",
    months: "Feb - Apr",
    icon: Flower2,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-500/10",
    textColor: "text-pink-600",
    accentColor: "#EC4899",
    bgGradient: "from-pink-50 to-rose-50",
    glowColor: "rgba(236, 72, 153, 0.2)",
    destinations: [
      {
        name: "Sikkim",
        weather: "10-20°C, Blooming",
        activities: ["Rhododendron Trek", "Monastery Visit", "Yumthang Valley", "Hot Springs"],
        budget: "₹18,000 - ₹28,000",
        bestFor: "Flowers & Trekking",
        image: "/images/seasons/spring-sikkim.jpg",
      },
      {
        name: "Darjeeling",
        weather: "10-18°C, Clear Views",
        activities: ["Tiger Hill Sunrise", "Tea Garden Tour", "Toy Train", "Peace Pagoda"],
        budget: "₹14,000 - ₹22,000",
        bestFor: "Tea & Mountains",
        image: "/images/seasons/spring-darjeeling.jpg",
      },
      {
        name: "Meghalaya",
        weather: "15-25°C, Pleasant",
        activities: ["Living Root Bridges", "Dawki River", "Caves", "Waterfalls"],
        budget: "₹16,000 - ₹25,000",
        bestFor: "Nature & Adventure",
        image: "/images/seasons/spring-meghalaya.jpg",
      },
      {
        name: "Ooty",
        weather: "12-20°C, Cool",
        activities: ["Botanical Garden", "Nilgiri Train", "Pykara Falls", "Rose Garden"],
        budget: "₹10,000 - ₹18,000",
        bestFor: "Hill Station Getaway",
        image: "/images/seasons/spring-ooty.jpg",
      },
    ],
  },
]

export function SeasonalDestinations() {
  const [activeSeason, setActiveSeason] = useState("winter")
  const currentSeason = seasons.find((s) => s.id === activeSeason)!

  return (
    <section id="seasonal" className="py-24 md:py-32 relative overflow-hidden">
      {/* Dynamic Seasonal Background */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 transition-colors duration-700"
          style={{
            background: `linear-gradient(to bottom, ${currentSeason.bgGradient})`,
          }}
        />
        {/* Animated glow for current season */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl -z-10"
          style={{
            background: currentSeason.glowColor
          }}
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl -z-10"
          style={{
            background: currentSeason.glowColor
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge 
            className="mb-4 px-4 py-2 text-sm font-medium bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Seasonal Travel
          </Badge>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F8FAFC] text-balance leading-tight"
          >
            Best Indian destinations by season
          </h2>
          <p className="mt-6 text-lg text-[#CBD5E1] text-pretty max-w-2xl mx-auto">
            Plan your trip based on the perfect weather. Discover where to go and when.
          </p>
        </motion.div>

        {/* Season Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {seasons.map((season) => (
            <Button
              key={season.id}
              onClick={() => setActiveSeason(season.id)}
              className={`gap-2 px-6 py-2 font-semibold transition-all ${
                activeSeason === season.id 
                  ? `bg-gradient-to-r ${season.color} border-0 text-[#0F172A] shadow-lg hover:shadow-xl` 
                  : "bg-[#1E293B]/40 border border-[#38BDF8]/20 text-[#CBD5E1] hover:bg-[#1E293B]/60"
              }`}
            >
              <season.icon className="w-4 h-4" />
              {season.name}
              <span className="text-xs opacity-70">({season.months})</span>
            </Button>
          ))}
        </motion.div>

        {/* Destinations Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeason}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {currentSeason.destinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div className="rounded-[28px] overflow-hidden h-full bg-gradient-to-br from-[#1E293B]/80 to-[#0F172A]/80 border border-[#38BDF8]/10 hover:border-[#38BDF8]/30 hover:shadow-2xl hover:shadow-[#38BDF8]/10 transition-all hover:-translate-y-2 backdrop-blur-sm">
                {/* Image Header */}
                {destination.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#F8FAFC]">{destination.name}</h3>
                      <p className="text-sm text-[#94A3B8] mt-2">{destination.bestFor}</p>
                    </div>
                    {destination.weather && (
                      <div className={`${currentSeason.bgColor} ${currentSeason.textColor} px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ml-3`}>
                        {destination.weather.split(",")[0]}
                      </div>
                    )}
                  </div>

                  {/* Weather */}
                  {destination.weather && (
                    <div className="flex items-center gap-2 mb-6 text-sm text-[#CBD5E1]">
                      <currentSeason.icon className={`w-5 h-5 ${currentSeason.textColor}`} />
                      {destination.weather}
                    </div>
                  )}

                  {/* Activities */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-[#F8FAFC]">
                      <Activity className="w-4 h-4 text-[#FF7A59]" />
                      Activities
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {destination.activities.map((activity) => (
                        <span
                          key={activity}
                          className="text-xs px-2.5 py-1.5 bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/20 rounded-full font-medium"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="flex items-center justify-between pt-6 border-t border-[#38BDF8]/10">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-[#FF7A59]" />
                      <span className="text-sm text-[#94A3B8]">Budget:</span>
                    </div>
                    <span className="font-bold text-[#FFB36B]">{destination.budget}</span>
                  </div>
                </div>
              </div>
            </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
