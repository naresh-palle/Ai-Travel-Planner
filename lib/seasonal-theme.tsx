'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type SeasonTheme = 'summer' | 'monsoon' | 'winter' | 'spring'

export const seasonalThemes = {
  summer: {
    name: 'Summer',
    primary: '#FF7A59',
    secondary: '#FFB703',
    accent: '#0096C7',
    background: 'from-[#FFF8F2] via-[#FFE8D9] to-[#FFF5EB]',
    darkBackground: 'from-[#1a4d5f] via-[#0f3d52] to-[#1a4d5f]',
    glowColor: 'rgba(255, 122, 89, 0.3)',
    gradientOverlay: 'bg-gradient-to-br from-[#FF7A59]/20 via-transparent to-[#FFB703]/10',
    cardGlow: 'from-[#FF7A59]/40 to-[#FFB703]/20',
    borderGlow: 'rgba(255, 122, 89, 0.5)',
    lightColor: '#FFB703',
    description: 'Warm, adventurous, tropical energy',
  },
  monsoon: {
    name: 'Monsoon',
    primary: '#2E8B57',
    secondary: '#3A86FF',
    accent: '#94A3B8',
    background: 'from-[#F0FDF9] via-[#E5F8F2] to-[#F0FDFA]',
    darkBackground: 'from-[#1a3a2e] via-[#0f2f28] to-[#1a3a2e]',
    glowColor: 'rgba(46, 139, 87, 0.3)',
    gradientOverlay: 'bg-gradient-to-br from-[#2E8B57]/20 via-transparent to-[#3A86FF]/10',
    cardGlow: 'from-[#2E8B57]/40 to-[#3A86FF]/20',
    borderGlow: 'rgba(46, 139, 87, 0.5)',
    lightColor: '#3A86FF',
    description: 'Cozy, cinematic, nature-rich',
  },
  winter: {
    name: 'Winter',
    primary: '#CAF0F8',
    secondary: '#F8FAFC',
    accent: '#0B1F33',
    background: 'from-[#F0F9FF] via-[#E0F2FE] to-[#F0FDFF]',
    darkBackground: 'from-[#0B1F33] via-[#1a3a4a] to-[#0B1F33]',
    glowColor: 'rgba(202, 240, 248, 0.3)',
    gradientOverlay: 'bg-gradient-to-br from-[#CAF0F8]/20 via-transparent to-[#0B1F33]/10',
    cardGlow: 'from-[#CAF0F8]/40 to-[#0B1F33]/20',
    borderGlow: 'rgba(202, 240, 248, 0.5)',
    lightColor: '#CAF0F8',
    description: 'Elegant, calm, snowy luxury',
  },
  spring: {
    name: 'Spring',
    primary: '#FFB4D9',
    secondary: '#80ED99',
    accent: '#BDB2FF',
    background: 'from-[#FDF4FF] via-[#F0E8FF] to-[#FDF4FF]',
    darkBackground: 'from-[#2d1b4e] via-[#1f1136] to-[#2d1b4e]',
    glowColor: 'rgba(255, 180, 217, 0.3)',
    gradientOverlay: 'bg-gradient-to-br from-[#FFB4D9]/20 via-transparent to-[#80ED99]/10',
    cardGlow: 'from-[#FFB4D9]/40 to-[#80ED99]/20',
    borderGlow: 'rgba(255, 180, 217, 0.5)',
    lightColor: '#80ED99',
    description: 'Fresh, vibrant, peaceful blooms',
  },
}

interface SeasonalContextType {
  season: SeasonTheme
  setSeason: (season: SeasonTheme) => void
  theme: (typeof seasonalThemes)[SeasonTheme]
}

const SeasonalContext = createContext<SeasonalContextType | undefined>(undefined)

export function SeasonalProvider({ children }: { children: React.ReactNode }) {
  const [season, setSeason] = useState<SeasonTheme>('summer')
  const theme = seasonalThemes[season]

  return (
    <SeasonalContext.Provider value={{ season, setSeason, theme }}>
      {children}
    </SeasonalContext.Provider>
  )
}

export function useSeasonalTheme() {
  const context = useContext(SeasonalContext)
  if (!context) {
    throw new Error('useSeasonalTheme must be used within SeasonalProvider')
  }
  return context
}
