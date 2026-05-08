"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Plane, 
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  ArrowRight
} from "lucide-react"

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Destinations", href: "#destinations" },
      { label: "Mobile App", href: "#" },
      { label: "Integrations", href: "#" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press Kit", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Travel Guides", href: "#" },
      { label: "Community", href: "#" },
      { label: "API Documentation", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR", href: "#" },
    ],
  },
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="bg-[#0B1F33] text-white footer-glow relative">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F4C81] to-[#38BDF8] flex items-center justify-center shadow-lg shadow-[#38BDF8]/20">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span 
                className="text-xl font-bold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Yatrika
              </span>
            </Link>
            <p className="text-white/60 text-sm mb-6 max-w-xs">
              The Future of Travel Planning. AI-powered itineraries that help you discover, plan, and experience unforgettable adventures.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-white">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#38BDF8] focus:ring-[#38BDF8]"
                />
                <Button size="icon" className="shrink-0 btn-gradient border-0">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-white/50">
                Get travel tips and exclusive deals. No spam, ever.
              </p>
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 
                className="font-semibold text-white mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm text-white/60 hover:text-[#38BDF8] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} Yatrika. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#38BDF8]/20 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
