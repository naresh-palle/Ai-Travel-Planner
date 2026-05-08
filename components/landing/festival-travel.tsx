"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  Camera,
  ArrowRight
} from "lucide-react"

const festivals = [
  {
    name: "Holi in Mathura",
    location: "Mathura & Vrindavan, UP",
    month: "March",
    duration: "3-5 days",
    description: "Experience the most vibrant Holi celebrations at the birthplace of Lord Krishna with colors, music, and ancient rituals.",
    highlights: ["Lathmar Holi", "Flower Holi", "Temple Ceremonies", "Street Celebrations"],
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
    image: "/images/festivals/holi-mathura.jpg",
  },
  {
    name: "Diwali in Jaipur",
    location: "Jaipur, Rajasthan",
    month: "October/November",
    duration: "5-7 days",
    description: "Witness the Pink City transform into a city of lights with decorated palaces, fireworks, and traditional festivities.",
    highlights: ["Nahargarh Fort Views", "Diya Decorations", "Fireworks Display", "Traditional Markets"],
    gradient: "from-amber-500 via-orange-500 to-red-500",
    image: "/images/festivals/diwali-jaipur.jpg",
  },
  {
    name: "Durga Puja in Kolkata",
    location: "Kolkata, West Bengal",
    month: "October",
    duration: "5 days",
    description: "Immerse yourself in Bengal&apos;s biggest festival with stunning pandals, cultural performances, and authentic Bengali cuisine.",
    highlights: ["Pandal Hopping", "Dhunuchi Dance", "Sindoor Khela", "Traditional Food"],
    gradient: "from-red-500 via-rose-500 to-pink-500",
    image: "/images/festivals/durga-puja-kolkata.jpg",
  },
  {
    name: "Pushkar Fair",
    location: "Pushkar, Rajasthan",
    month: "November",
    duration: "7-10 days",
    description: "Experience one of the world&apos;s largest camel fairs with trading, cultural events, and religious ceremonies.",
    highlights: ["Camel Trading", "Folk Performances", "Hot Air Balloon", "Desert Camping"],
    gradient: "from-yellow-500 via-amber-500 to-orange-500",
    image: "/images/festivals/pushkar-fair.jpg",
  },
  {
    name: "Goa Carnival",
    location: "Goa",
    month: "February",
    duration: "3-4 days",
    description: "Join the Portuguese-influenced carnival with colorful parades, music, dance, and beach parties.",
    highlights: ["Float Parade", "King Momo", "Beach Parties", "Goan Cuisine"],
    gradient: "from-cyan-500 via-blue-500 to-purple-500",
    image: "/images/festivals/goa-carnival.jpg",
  },
  {
    name: "Hornbill Festival",
    location: "Kohima, Nagaland",
    month: "December",
    duration: "10 days",
    description: "Celebrate the &apos;Festival of Festivals&apos; showcasing the culture, traditions, and heritage of all Naga tribes.",
    highlights: ["Traditional Dance", "Indigenous Games", "Local Cuisine", "Handicrafts"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    image: "/images/festivals/hornbill-festival.jpg",
  },
]

export function FestivalTravel() {
  return (
    <section id="festivals" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-secondary/30 to-background">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl" />
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
            variant="secondary" 
            className="mb-4 px-4 py-2 text-sm font-medium bg-[#FF7A59]/10 text-[#FF7A59] border border-[#FF7A59]/20"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Festival Experiences
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F8FAFC] text-balance leading-tight">
            Travel for India&apos;s vibrant festivals
          </h2>
          <p className="mt-6 text-lg text-[#CBD5E1] text-pretty max-w-2xl mx-auto">
            Experience the rich cultural tapestry of India through its most iconic festivals and celebrations.
          </p>
        </motion.div>

        {/* Festival Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {festivals.map((festival, index) => (
            <motion.div
              key={festival.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-full rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2">
                {/* Gradient Header */}
              <div className={`h-32 bg-gradient-to-r ${festival.gradient} relative overflow-hidden`}>
                {/* Background Image */}
                <img
                  src={festival.image}
                  alt={festival.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Pattern Overlay */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                  
                  {/* Month Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      {festival.month}
                    </Badge>
                  </div>

                  {/* Festival Name */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{festival.name}</h3>
                    <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
                      <MapPin className="w-3 h-3" />
                      {festival.location}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 bg-gradient-to-b from-[#0F172A]/60 to-[#0F172A]/80 backdrop-blur-sm">
                  <p className="text-sm text-[#CBD5E1] mb-4 line-clamp-2">
                    {festival.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <span className="text-[#94A3B8]">Duration:</span>
                    <span className="font-semibold text-[#F8FAFC]">{festival.duration}</span>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-[#F8FAFC]">
                      <Camera className="w-4 h-4 text-[#FF7A59]" />
                      Highlights
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {festival.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="text-xs px-2.5 py-1.5 bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/20 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button className="w-full bg-gradient-to-r from-[#FF7A59] to-[#FFB36B] text-[#0F172A] font-semibold hover:shadow-lg hover:shadow-[#FF7A59]/20 transition-all">
                    Plan Festival Trip
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
