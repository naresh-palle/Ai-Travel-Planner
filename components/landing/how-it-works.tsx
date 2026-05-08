"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { PlaneTakeoff, Wand2, Palmtree, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: PlaneTakeoff,
    title: "Create Your Trip",
    description: "Tell us where you want to go, when, and who's traveling. Our AI understands your preferences instantly.",
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    number: "02",
    icon: Wand2,
    title: "Customize Your Itinerary",
    description: "Get AI-generated plans tailored to your style. Drag, drop, and refine every detail to perfection.",
    color: "from-violet-500 to-purple-500",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600",
  },
  {
    number: "03",
    icon: Palmtree,
    title: "Travel Stress-Free",
    description: "Access your complete trip offline, get real-time updates, and enjoy every moment of your adventure.",
    color: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-l from-accent/10 to-transparent rounded-full blur-3xl" />
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
            className="mb-4 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-0"
          >
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Plan your dream trip in 3 simple steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            From inspiration to adventure in minutes, not hours.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 opacity-30" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  {/* Number Badge */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} text-white text-2xl font-bold shadow-lg mb-6`}
                  >
                    {step.number}
                    {/* Pulse ring */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} animate-ping opacity-20`} />
                  </motion.div>

                  {/* Arrow - Desktop only */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-6 text-muted-foreground/30">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${step.iconBg} mb-4`}>
                    <step.icon className={`w-7 h-7 ${step.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
