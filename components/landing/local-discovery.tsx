"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  UtensilsCrossed, 
  Camera, 
  ShoppingBag, 
  Music, 
  Map,
  Star,
  ArrowRight,
  Sparkles,
  Heart
} from "lucide-react"
import Image from "next/image"

const discoveries = [
  {
    icon: UtensilsCrossed,
    title: "Local Cuisine",
    description: "Authentic food experiences & street food gems",
    image: "/images/destinations/varanasi.jpg",
    items: ["Street Food Tours", "Cooking Classes", "Food Markets", "Hidden Cafes"],
    gradient: "from-[#FF7A59] to-[#FFB36B]",
  },
  {
    icon: Camera,
    title: "Photography Spots",
    description: "Instagram-worthy locations & hidden gems",
    image: "/images/destinations/jaipur.jpg",
    items: ["Sunrise Points", "Architecture", "Street Scenes", "Nature Views"],
    gradient: "from-[#0F4C81] to-[#38BDF8]",
  },
  {
    icon: ShoppingBag,
    title: "Local Shopping",
    description: "Authentic crafts, markets & souvenirs",
    image: "/images/destinations/kerala.jpg",
    items: ["Artisan Crafts", "Night Markets", "Flea Markets", "Local Boutiques"],
    gradient: "from-[#2E8B57] to-emerald-400",
  },
  {
    icon: Music,
    title: "Nightlife & Culture",
    description: "Entertainment, shows & cultural experiences",
    image: "/images/destinations/goa.jpg",
    items: ["Live Music", "Cultural Shows", "Rooftop Bars", "Festivals"],
    gradient: "from-purple-500 to-violet-400",
  },
]

const hiddenGems = [
  { name: "Secret Viewpoint, Manali", rating: 4.9, saves: "2.3k" },
  { name: "Underground Temple, Varanasi", rating: 4.8, saves: "1.8k" },
  { name: "Hidden Waterfall, Coorg", rating: 4.9, saves: "3.1k" },
  { name: "Ancient Cave, Meghalaya", rating: 4.7, saves: "1.2k" },
]

export function LocalDiscovery() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden section-luxury-beige">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-[#FF7A59]/5 to-[#0F4C81]/5 rounded-full blur-3xl" />
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
            <Map className="w-4 h-4 mr-2" />
            Local Experiences
          </Badge>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Discover like a local
          </h2>
          <p className="mt-4 text-lg text-[#64748B] text-pretty">
            Go beyond tourist spots. Experience authentic local culture, food, and hidden gems.
          </p>
        </motion.div>

        {/* Discovery Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {discoveries.map((discovery, index) => (
            <motion.div
              key={discovery.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#0F4C81]/5">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={discovery.image}
                    alt={discovery.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className={`absolute top-4 left-4 w-10 h-10 rounded-xl bg-gradient-to-br ${discovery.gradient} flex items-center justify-center shadow-lg`}>
                    <discovery.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-[#1E293B] mb-2 group-hover:text-[#0F4C81] transition-colors">
                    {discovery.title}
                  </h3>
                  <p className="text-sm text-[#64748B] mb-4">
                    {discovery.description}
                  </p>
                  
                  {/* Items */}
                  <div className="flex flex-wrap gap-2">
                    {discovery.items.slice(0, 3).map((item) => (
                      <span 
                        key={item}
                        className="text-xs px-2.5 py-1 rounded-full bg-[#F6F9FC] text-[#64748B]"
                      >
                        {item}
                      </span>
                    ))}
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#0F4C81]/10 text-[#0F4C81]">
                      +{discovery.items.length - 3}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hidden Gems Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFB36B] to-[#FF7A59] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#1E293B]">AI-Curated Hidden Gems</h3>
                <p className="text-sm text-[#64748B]">Discover places most tourists never find</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {hiddenGems.map((gem, index) => (
                <motion.div
                  key={gem.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-[#0F4C81]/10 cursor-pointer hover:border-[#0F4C81]/30 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-[#1E293B]">{gem.name}</p>
                    <div className="flex items-center gap-2 text-xs text-[#64748B]">
                      <Star className="w-3 h-3 fill-[#FFB36B] text-[#FFB36B]" />
                      {gem.rating}
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {gem.saves}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#0F4C81]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#64748B]">
              Our AI analyzes millions of traveler reviews to find authentic local experiences
            </p>
            <Button className="bg-gradient-to-r from-[#0F4C81] to-[#38BDF8] hover:opacity-90 text-white shadow-lg group">
              Explore All Gems
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
