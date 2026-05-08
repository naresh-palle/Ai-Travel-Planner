"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, TrendingUp, Wallet } from "lucide-react"
import Image from "next/image"

const destinations = [
  {
    name: "Bali, Indonesia",
    tagline: "Island Paradise",
    rating: 4.9,
    reviews: "12.4k",
    price: "From $899",
    tags: ["Beaches", "Culture", "Adventure"],
    image: "/images/destinations/bali.jpg",
    popular: true,
  },
  {
    name: "Paris, France",
    tagline: "City of Lights",
    rating: 4.8,
    reviews: "18.2k",
    price: "From $1,299",
    tags: ["Romance", "Art", "Cuisine"],
    image: "/images/destinations/paris.jpg",
    popular: false,
  },
  {
    name: "Tokyo, Japan",
    tagline: "Future Meets Tradition",
    rating: 4.9,
    reviews: "15.8k",
    price: "From $1,199",
    tags: ["Culture", "Food", "Technology"],
    image: "/images/destinations/tokyo.jpg",
    popular: true,
  },
  {
    name: "Switzerland",
    tagline: "Alpine Wonderland",
    rating: 4.8,
    reviews: "9.3k",
    price: "From $1,599",
    tags: ["Mountains", "Nature", "Luxury"],
    image: "/images/destinations/switzerland.jpg",
    popular: false,
  },
  {
    name: "Dubai, UAE",
    tagline: "City of Gold",
    rating: 4.7,
    reviews: "11.1k",
    price: "From $1,099",
    tags: ["Luxury", "Shopping", "Desert"],
    image: "/images/destinations/dubai.jpg",
    popular: false,
  },
  {
    name: "Maldives",
    tagline: "Tropical Paradise",
    rating: 4.9,
    reviews: "8.7k",
    price: "From $2,299",
    tags: ["Beaches", "Diving", "Romance"],
    image: "/images/destinations/maldives.jpg",
    popular: true,
  },
]

const indianBudgetExamples = [
  { trip: "Goa Weekend", budget: "₹12,000", duration: "3 days" },
  { trip: "Kerala Family Trip", budget: "₹35,000", duration: "5 days" },
  { trip: "Backpacking Himachal", budget: "₹18,000", duration: "7 days" },
]

export function Destinations() {
  return (
    <section id="destinations" className="py-24 md:py-32 relative overflow-hidden section-sand">
      {/* Background - Warm Sand Beige */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-t from-[#0F4C81]/5 to-transparent rounded-full blur-3xl" />
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
            className="mb-4 px-4 py-2 text-sm font-medium bg-[#0F4C81]/10 text-[#0F4C81] border-0"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Popular Destinations
          </Badge>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Discover breathtaking destinations
          </h2>
          <p className="mt-4 text-lg text-[#1E293B]/70 text-pretty">
            Explore the world&apos;s most stunning locations with AI-curated itineraries.
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2">
                {/* Image with zoom effect */}
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    {destination.popular && (
                      <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    <div className="flex items-center gap-1 ml-auto bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-white" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                    <p className="text-white/90 text-sm mb-4">{destination.tagline}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Price & Reviews */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <div>
                        <p className="text-lg font-bold">{destination.price}</p>
                        <p className="text-xs text-white/70">per person</p>
                      </div>
                      <p className="text-sm text-white/80">{destination.reviews} reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Indian Budget Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 glass rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF7A59]/20 to-[#0F4C81]/20 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-[#FF7A59]" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Budget-Friendly India Trips</h3>
              <p className="text-sm text-muted-foreground">Estimated budgets for popular Indian destinations</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {indianBudgetExamples.map((example, index) => (
              <motion.div
                key={example.trip}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-secondary/50 rounded-xl p-4 hover:bg-secondary transition-colors cursor-pointer"
              >
                <p className="font-medium text-foreground">{example.trip}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-[#0F4C81]">{example.budget}</span>
                  <span className="text-xs text-muted-foreground">{example.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
