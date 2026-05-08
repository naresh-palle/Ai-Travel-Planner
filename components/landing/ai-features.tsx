"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, 
  Brain, 
  CloudSun, 
  Calculator, 
  MessageSquare,
  Zap,
  Send
} from "lucide-react"
import { useState } from "react"

const aiFeatures = [
  {
    icon: Brain,
    title: "AI Trip Planner",
    description: "Describe your dream vacation and watch as AI creates a complete, personalized itinerary.",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "Get suggestions for restaurants, attractions, and hidden gems based on your preferences.",
  },
  {
    icon: CloudSun,
    title: "Weather-Aware Planning",
    description: "Automatic schedule adjustments based on weather forecasts and seasonal conditions.",
  },
  {
    icon: Calculator,
    title: "Budget Estimation",
    description: "Real-time cost predictions and budget optimization suggestions for your entire trip.",
  },
]

const chatMessages = [
  { role: "user", content: "Plan a 5-day trip to Tokyo for food lovers" },
  { role: "ai", content: "I&apos;d love to help! Here&apos;s a curated Tokyo food adventure:\n\n🍣 Day 1: Tsukiji & Ginza\n🍜 Day 2: Ramen tour in Shinjuku\n🍱 Day 3: Traditional kaiseki experience\n🍶 Day 4: Sake tasting in Asakusa\n🎌 Day 5: Local izakaya hopping\n\nShall I add specific restaurant recommendations?" },
]

export function AIFeatures() {
  const [inputValue, setInputValue] = useState("")

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-full blur-3xl animated-gradient" />
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
            className="mb-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-0"
          >
            <Zap className="w-4 h-4 mr-2" />
            Powered by AI
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Your personal AI travel assistant
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Experience the future of trip planning with intelligent features that understand you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex gap-4 p-4 rounded-xl hover:bg-card hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Yatrika AI</h4>
                  <p className="text-xs text-white/70 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Online
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-4 min-h-[300px] bg-card/50">
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-secondary text-foreground rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center gap-1 text-muted-foreground"
                >
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-xs ml-2">AI is thinking...</span>
                </motion.div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ask anything about your trip..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
                    <Send className="w-5 h-5 text-primary-foreground" />
                  </button>
                </div>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 rounded-3xl blur-2xl -z-10 opacity-60" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
