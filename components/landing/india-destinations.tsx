"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, TrendingUp, ArrowRight, Calendar } from "lucide-react"

const indiaDestinations = [
  {
    name: "Goa",
    tagline: "Beach Paradise",
    rating: 4.8,
    reviews: "24.5k",
    price: "From ₹8,999",
    tags: ["Beaches", "Nightlife", "Seafood"],
    image: "/images/destinations/goa.jpg",
    popular: true,
    bestMonths: "Oct - Mar",
  },
  {
    name: "Kerala",
    tagline: "God's Own Country",
    rating: 4.9,
    reviews: "32.1k",
    price: "From ₹12,999",
    tags: ["Backwaters", "Ayurveda", "Nature"],
    image: "/images/destinations/kerala.jpg",
    popular: true,
    bestMonths: "Sep - Mar",
  },
  {
    name: "Manali",
    tagline: "Mountain Retreat",
    rating: 4.7,
    reviews: "18.9k",
    price: "From ₹9,999",
    tags: ["Mountains", "Adventure", "Snow"],
    image: "/images/destinations/manali.jpg",
    popular: false,
    bestMonths: "Mar - Jun",
  },
  {
    name: "Leh Ladakh",
    tagline: "Land of High Passes",
    rating: 4.9,
    reviews: "15.2k",
    price: "From ₹18,999",
    tags: ["Adventure", "Monasteries", "Biking"],
    image: "/images/destinations/ladakh.jpg",
    popular: true,
    bestMonths: "Jun - Sep",
  },
  {
    name: "Jaipur",
    tagline: "Pink City",
    rating: 4.8,
    reviews: "28.3k",
    price: "From ₹7,999",
    tags: ["Heritage", "Culture", "Shopping"],
    image: "/images/destinations/jaipur.jpg",
    popular: false,
    bestMonths: "Oct - Mar",
  },
  {
    name: "Kashmir",
    tagline: "Paradise on Earth",
    rating: 4.9,
    reviews: "21.7k",
    price: "From ₹15,999",
    tags: ["Valleys", "Houseboats", "Gardens"],
    image: "/images/destinations/kashmir.jpg",
    popular: true,
    bestMonths: "Mar - Oct",
  },
  {
    name: "Meghalaya",
    tagline: "Abode of Clouds",
    rating: 4.8,
    reviews: "9.4k",
    price: "From ₹14,999",
    tags: ["Waterfalls", "Caves", "Living Roots"],
    image: "/images/destinations/meghalaya.jpg",
    popular: false,
    bestMonths: "Oct - May",
  },
  {
    name: "Darjeeling",
    tagline: "Queen of Hills",
    rating: 4.7,
    reviews: "12.8k",
    price: "From ₹11,999",
    tags: ["Tea Gardens", "Toy Train", "Mountains"],
    image: "/images/destinations/darjeeling.jpg",
    popular: false,
    bestMonths: "Mar - May",
  },
  {
    name: "Varanasi",
    tagline: "Spiritual Capital",
    rating: 4.8,
    reviews: "19.6k",
    price: "From ₹6,999",
    tags: ["Spirituality", "Ghats", "Culture"],
    image: "/images/destinations/varanasi.jpg",
    popular: false,
    bestMonths: "Oct - Mar",
  },
  {
    name: "Rishikesh",
    tagline: "Yoga Capital",
    rating: 4.8,
    reviews: "16.3k",
    price: "From ₹7,499",
    tags: ["Yoga", "Rafting", "Adventure"],
    image: "/images/destinations/rishikesh.jpg",
    popular: false,
    bestMonths: "Sep - Jun",
  },
  {
    name: "Andaman",
    tagline: "Island Paradise",
    rating: 4.9,
    reviews: "11.2k",
    price: "From ₹22,999",
    tags: ["Islands", "Diving", "Beaches"],
    image: "/images/destinations/andaman.jpg",
    popular: true,
    bestMonths: "Nov - May",
  },
  {
    name: "Coorg",
    tagline: "Scotland of India",
    rating: 4.7,
    reviews: "14.1k",
    price: "From ₹9,499",
    tags: ["Coffee", "Waterfalls", "Nature"],
    image: "/images/destinations/coorg.jpg",
    popular: false,
    bestMonths: "Oct - Mar",
  },
]

export function IndiaDestinations() {
  const [showAll, setShowAll] = useState(false)
  const displayedDestinations = showAll ? indiaDestinations : indiaDestinations.slice(0, 6)

  return (
    <section id="explore-india" className="py-24 md:py-32 relative overflow-hidden">
      {/* Premium Background - Luxury Beige Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FFF8F2] to-[#F6E7D8]" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-t from-[#FF7A59]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-b from-[#0F4C81]/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
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
            className="mb-4 px-4 py-2 text-sm font-medium bg-[#FF7A59]/10 text-[#FF7A59] border-0"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Explore India
          </Badge>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Discover Incredible India
          </h2>
          <p className="mt-4 text-lg text-[#64748B] text-pretty">
            From the Himalayas to the backwaters, explore India&apos;s most breathtaking destinations with AI-curated itineraries.
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedDestinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
                className="group cursor-pointer"
              >
                <div className="relative h-96 rounded-2xl overflow-hidden bg-[#1E293B] border border-white/10 hover:border-[#FF7A59]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#FF7A59]/20 hover:-translate-y-2">
                  {/* Real Image with Zoom Effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  
                  {/* Premium Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0F4C81]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-between text-white">
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      {destination.popular && (
                        <Badge className="bg-[#FF7A59] text-white border-0 shadow-lg shadow-[#FF7A59]/30">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      <div className="flex items-center gap-1 ml-auto bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        <Star className="w-4 h-4 fill-[#FFB36B] text-[#FFB36B]" />
                        <span className="text-sm font-semibold">{destination.rating}</span>
                      </div>
                    </div>

                    {/* Bottom */}
                    <div>
                      <h3 
                        className="text-2xl font-bold mb-1"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {destination.name}
                      </h3>
                      <p className="text-white/80 text-sm mb-2">{destination.tagline}</p>
                      
                      {/* Best Time Badge */}
                      <div className="flex items-center gap-1.5 text-white/70 text-xs mb-4">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Best time: {destination.bestMonths}</span>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {destination.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Price & Reviews */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/20">
                        <div>
                          <p className="text-xl font-bold text-[#FFB36B]">{destination.price}</p>
                          <p className="text-xs text-white/60">per person</p>
                        </div>
                        <p className="text-sm text-white/70">{destination.reviews} reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAll(!showAll)}
            className="group bg-white/80 backdrop-blur-sm border-[#0F4C81]/20 hover:bg-[#0F4C81] hover:text-white hover:border-[#0F4C81] transition-all duration-300"
          >
            {showAll ? "Show Less" : "Explore More Destinations"}
            <ArrowRight className={`ml-2 w-4 h-4 transition-transform ${showAll ? "rotate-90" : "group-hover:translate-x-1"}`} />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
