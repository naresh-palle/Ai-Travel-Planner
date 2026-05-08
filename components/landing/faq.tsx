"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How does AI itinerary planning work?",
    answer: "Our AI analyzes your preferences, travel dates, budget, and interests to create personalized itineraries. It considers factors like weather forecasts, local events, optimal route planning, and hidden gems that match your style. Simply describe your ideal trip, and watch as the AI crafts a detailed day-by-day plan in seconds.",
  },
  {
    question: "Can I collaborate with friends and family?",
    answer: "Absolutely! Yatrika makes group trip planning effortless. Invite unlimited collaborators to your trip, and everyone can add suggestions, vote on activities, and make real-time edits. Our smart conflict resolution ensures everyone's preferences are considered, and the built-in chat keeps all communication in one place.",
  },
  {
    question: "Does offline mode work internationally?",
    answer: "Yes! Once you download your trip, all itinerary details, maps, booking confirmations, and important documents are available offline—anywhere in the world. This includes turn-by-turn directions, saved places, and translation cards. Perfect for remote adventures or areas with limited connectivity.",
  },
  {
    question: "Can I export my trips to other apps?",
    answer: "Yatrika offers flexible export options. Export your itinerary to PDF for printing, sync with Google Calendar or Apple Calendar, share interactive links with non-users, or export to popular travel apps. Pro users can also access our API for custom integrations.",
  },
  {
    question: "Are flight and hotel bookings included?",
    answer: "Yatrika integrates with major booking platforms to show you real-time prices and availability. While we don't process bookings directly, we provide seamless links to book through your preferred platform. All your booking confirmations can be stored and organized within your trip for easy access.",
  },
  {
    question: "Is my travel data secure?",
    answer: "Security is our top priority. We use bank-level encryption (256-bit SSL) for all data transmission and storage. Your personal information is never sold to third parties, and you have full control over your data with easy export and deletion options. We're also GDPR and CCPA compliant.",
  },
  {
    question: "What happens if I need to change my plans last minute?",
    answer: "Life happens! Yatrika's AI can instantly regenerate alternative plans based on changes. Whether it's a weather disruption, flight delay, or spontaneous detour, our smart replanning feature suggests the best alternatives while keeping your remaining itinerary intact and optimized.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
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
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Everything you need to know about Yatrika.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass rounded-xl px-6 border-0 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5 transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
