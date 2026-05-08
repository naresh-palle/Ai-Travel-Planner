"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, Zap, Users } from "lucide-react"

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out Yatrika",
    price: "$0",
    period: "forever",
    icon: Sparkles,
    features: [
      "Up to 3 trips",
      "Basic AI itinerary generation",
      "7-day weather forecast",
      "Mobile app access",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
    gradient: "from-slate-500 to-gray-600",
  },
  {
    name: "Pro",
    description: "For passionate travelers",
    price: "$12",
    period: "per month",
    icon: Zap,
    features: [
      "Unlimited trips",
      "Advanced AI recommendations",
      "Collaborative planning",
      "Offline access",
      "Budget tracking & splitting",
      "Priority support",
      "Export to PDF/Calendar",
      "Custom travel templates",
    ],
    cta: "Start Free Trial",
    popular: true,
    gradient: "from-primary to-primary/80",
  },
  {
    name: "Team",
    description: "For travel groups & agencies",
    price: "$29",
    period: "per month",
    icon: Users,
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Team workspace",
      "Advanced analytics",
      "API access",
      "Dedicated account manager",
      "White-label options",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
    gradient: "from-accent to-accent/80",
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-3xl" />
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
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Start free and upgrade as you grow. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div
                className={`h-full glass rounded-2xl p-8 transition-all hover:shadow-xl ${
                  plan.popular
                    ? "border-2 border-primary shadow-lg shadow-primary/10"
                    : "hover:shadow-primary/5"
                }`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>

                {/* Plan Info */}
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>

                {/* Price */}
                <div className="mt-6 mb-8">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25"
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          All plans include a 14-day free trial. No credit card required.
        </motion.p>
      </div>
    </section>
  )
}
