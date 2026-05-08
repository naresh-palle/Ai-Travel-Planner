'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  Play,
  Star,
  MapPin,
  Calendar,
  Users,
  Sparkles,
  Utensils,
} from 'lucide-react'

const stats = [
  { value: '2M+', label: 'Trips Planned' },
  { value: '150+', label: 'Countries' },
  { value: '4.9', label: 'App Rating', icon: Star },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Dark Cinematic Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-[-20%] right-[-10%] w-[900px] h-[900px] bg-gradient-to-br from-[#38BDF8]/20 to-transparent rounded-full blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-gradient-to-tr from-[#FF7A59]/15 to-transparent rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-white/10 text-white border border-white/20 hover:bg-white/15 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2 text-[#FFB36B]" />
                AI-Powered Trip Planning
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="bg-gradient-to-r from-[#38BDF8] via-[#38BDF8] to-[#FF7A59] bg-clip-text text-transparent">
                The Future
              </span>{" "}
              of Travel Planning
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-lg md:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 text-pretty"
            >
              AI-powered itineraries that help you discover destinations, organize bookings, collaborate with friends, and travel stress-free. Your dream trip is
              just a few clicks away.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="text-base px-8 text-white font-semibold shadow-xl group border-0 hover:shadow-lg bg-gradient-to-r from-[#0F4C81] to-[#38BDF8]"
              >
                Start Planning Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 group bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center text-xs font-medium text-white backdrop-blur-sm bg-gradient-to-br from-[#38BDF8]/20 to-transparent"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="ml-4 text-left">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#FFB36B]" />
                    ))}
                  </div>
                  <p className="text-sm text-white/60">
                    <span className="font-semibold text-white">50,000+</span> happy travelers
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="glass-premium rounded-2xl p-4 shadow-2xl card-premium border border-white/10">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Sparkles className="w-4 h-4 text-[#0F4C81]" />
                    AI Assistant
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="space-y-4">
                  {/* Trip Overview */}
                  <div
                    className="rounded-xl p-4 border border-white/10"
                    style={{
                      background: `linear-gradient(to right, rgba(15, 76, 129, 0.1), rgba(255, 255, 255, 0.02))`,
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                          Rajasthan Heritage Tour
                        </h3>
                        <p className="text-sm text-white/60 mt-1">Nov 10 - Nov 17, 2024</p>
                      </div>
                      <Badge className="bg-[#2E8B57]/20 text-[#4ADE80] border-0">Active</Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1.5 text-sm text-white/60">
                        <Calendar className="w-4 h-4" />
                        7 Days
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-white/60">
                        <Users className="w-4 h-4" />
                        4 Travelers
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-white/60">
                        <MapPin className="w-4 h-4" />
                        15 Places
                      </div>
                    </div>
                  </div>

                  {/* Timeline Preview */}
                  <div className="space-y-3">
                    {[
                      { time: '06:00 AM', title: 'Sunrise at Taj Mahal', icon: MapPin },
                      { time: '12:30 PM', title: 'Lunch at Jaipur Palace', icon: Utensils },
                      { time: '04:00 PM', title: 'Hawa Mahal Visit', icon: MapPin },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                          <item.icon className="w-4 h-4 text-[#0F4C81]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{item.title}</p>
                          <p className="text-xs text-white/50">{item.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Glow Effect */}
                <div
                  className="absolute -inset-4 rounded-3xl blur-2xl -z-10 opacity-40"
                  style={{
                    background: `linear-gradient(to right, rgba(56, 189, 248, 0.3), transparent, rgba(255, 122, 89, 0.2))`,
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {stat.value}
                </span>
                {stat.icon && <stat.icon className="w-5 h-5 fill-current text-[#FFB36B]" />}
              </div>
              <p className="text-sm text-white/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
