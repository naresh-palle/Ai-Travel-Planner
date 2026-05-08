import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { TrustBadges } from "@/components/landing/trust-badges"
import { Features } from "@/components/landing/features"
import { ItineraryShowcase } from "@/components/landing/itinerary-showcase"
import { Destinations } from "@/components/landing/destinations"
import { IndiaDestinations } from "@/components/landing/india-destinations"
import { SeasonalDestinations } from "@/components/landing/seasonal-destinations"
import { FestivalTravel } from "@/components/landing/festival-travel"
import { HowItWorks } from "@/components/landing/how-it-works"
import { TripTypes } from "@/components/landing/trip-types"
import { SmartPlanning } from "@/components/landing/smart-planning"
import { LocalDiscovery } from "@/components/landing/local-discovery"
import { MapExperience } from "@/components/landing/map-experience"
import { AIFeatures } from "@/components/landing/ai-features"
import { Testimonials } from "@/components/landing/testimonials"
import { Pricing } from "@/components/landing/pricing"
import { FAQ } from "@/components/landing/faq"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen main-premium-bg relative overflow-hidden">
      {/* Animated Floating Gradient Blobs */}
      <div className="floating-blob-1" aria-hidden="true" />
      <div className="floating-blob-2" aria-hidden="true" />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <TrustBadges />
        <TripTypes />
        <Features />
        <SmartPlanning />
        <ItineraryShowcase />
        <MapExperience />
        <Destinations />
        <IndiaDestinations />
        <LocalDiscovery />
        <SeasonalDestinations />
        <FestivalTravel />
        <HowItWorks />
        <AIFeatures />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </main>
  )
}
