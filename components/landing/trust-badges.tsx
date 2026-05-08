"use client"

import { motion } from "framer-motion"

const logos = [
  { name: "TechCrunch", width: "w-28" },
  { name: "Forbes Travel", width: "w-24" },
  { name: "Wired", width: "w-20" },
  { name: "The Verge", width: "w-24" },
  { name: "Product Hunt", width: "w-28" },
  { name: "Travel+Leisure", width: "w-32" },
]

export function TrustBadges() {
  return (
    <section className="py-16 border-y border-border/50 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
            Featured in leading publications
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`${logo.width} h-8 flex items-center justify-center text-muted-foreground/60 hover:text-muted-foreground transition-colors`}
              >
                <span className="text-lg font-bold tracking-tight">{logo.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
