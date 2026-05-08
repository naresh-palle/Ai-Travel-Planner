"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plane, MapPin, Star } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Sunset Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A59] via-[#FF9A70] to-[#FFB36B]" />
        
        {/* Animated shapes */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/15"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-white/15"
        />
        <motion.div
          animate={{ 
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-white/10"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/4 w-40 h-40 rounded-full bg-[#0F4C81]/20"
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Floating icons */}
          <div className="flex justify-center gap-8 mb-8">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center"
            >
              <Plane className="w-6 h-6 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center"
            >
              <MapPin className="w-6 h-6 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center"
            >
              <Star className="w-6 h-6 text-white" />
            </motion.div>
          </div>

          {/* Headline */}
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-balance mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Start planning your next adventure today
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 text-pretty">
            Join over 2 million travelers who trust Yatrika to create unforgettable experiences. 
            Your dream trip is just a few clicks away.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-base px-8 bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 shadow-xl shadow-[#0F4C81]/30 group"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base px-8 border-white/40 text-white hover:bg-white/15 hover:text-white bg-white/10 backdrop-blur-sm"
            >
              Schedule a Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Cancel anytime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
