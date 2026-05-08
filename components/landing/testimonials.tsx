"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Digital Nomad",
    location: "Traveled to 15 countries",
    content: "Yatrika completely transformed how I plan my trips. The AI suggestions were spot-on, and I discovered hidden gems in Tokyo I never would have found otherwise. Absolutely game-changing!",
    rating: 5,
    avatar: "SC",
    destination: "Tokyo, Japan",
  },
  {
    name: "Marcus Williams",
    role: "Family Traveler",
    location: "Planning family adventures",
    content: "Planning a trip with kids used to be stressful. Yatrika&apos;s collaborative features let my whole family contribute ideas, and the budget tracking kept us on track. Best travel app we&apos;ve ever used!",
    rating: 5,
    avatar: "MW",
    destination: "Paris, France",
  },
  {
    name: "Elena Rodriguez",
    role: "Adventure Seeker",
    location: "Solo traveler extraordinaire",
    content: "The offline access feature is a lifesaver! I was hiking in Switzerland with no signal, and had my entire itinerary right there. The weather-aware planning helped me avoid a storm day. Brilliant!",
    rating: 5,
    avatar: "ER",
    destination: "Switzerland",
  },
  {
    name: "James & Lisa Park",
    role: "Honeymoon Couple",
    location: "Romance seekers",
    content: "We planned our entire honeymoon using Yatrika. The romantic restaurant suggestions in Bali were perfect, and the AI created the most thoughtful day-by-day experiences. Unforgettable memories!",
    rating: 5,
    avatar: "JP",
    destination: "Bali, Indonesia",
  },
  {
    name: "David Thompson",
    role: "Business Traveler",
    location: "Frequent flyer",
    content: "As someone who travels weekly for work, Yatrika helps me maximize my limited free time in each city. The quick AI itineraries for layovers have been amazing. 10/10 recommend!",
    rating: 5,
    avatar: "DT",
    destination: "Dubai, UAE",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  }

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden section-blue-tint">
      {/* Background - Light Blue Tint */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[#38BDF8]/10 to-transparent rounded-full blur-3xl" />
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
            <Star className="w-4 h-4 mr-2 fill-[#0F4C81]" />
            Testimonials
          </Badge>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Loved by travelers worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Join thousands of happy adventurers who plan their trips with Yatrika.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Quote className="w-6 h-6 text-primary" />
            </div>

            {/* Card */}
            <div className="glass rounded-2xl p-8 md:p-12 min-h-[350px] relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
                    &quot;{testimonials[current].content}&quot;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-lg">
                      {testimonials[current].avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonials[current].name}</p>
                      <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
                      <p className="text-xs text-primary mt-0.5">{testimonials[current].destination}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="absolute bottom-8 right-8 flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 text-primary-foreground" />
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1)
                    setCurrent(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current
                      ? "w-8 bg-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
