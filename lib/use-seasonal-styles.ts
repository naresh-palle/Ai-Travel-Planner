'use client'

import { useSeasonalTheme } from '@/lib/seasonal-theme'

export function useSeasonalStyles() {
  const { theme } = useSeasonalTheme()

  return {
    // Button styles
    buttonPrimary: `bg-gradient-to-r from-[${theme.primary}] to-[${theme.secondary}] text-white hover:shadow-lg`,
    buttonSecondary: `bg-white/10 text-white border border-white/20 hover:border-white/40 backdrop-blur`,
    
    // Card styles
    cardBackground: `bg-white/[0.03] backdrop-blur border border-white/[0.06]`,
    cardHover: `hover:bg-white/[0.08] hover:border-white/[0.12]`,
    cardGlow: `shadow-[0_0_30px_${theme.borderGlow}]`,
    
    // Badge styles
    badgePrimary: `bg-${theme.primary}/10 text-${theme.primary} border border-${theme.primary}/20`,
    
    // Text styles
    textPrimary: 'text-white',
    textSecondary: 'text-white/60',
    textMuted: 'text-white/40',
    
    // Gradient styles
    gradientText: `bg-gradient-to-r from-[${theme.primary}] to-[${theme.secondary}] bg-clip-text text-transparent`,
    
    // Accent color
    accentColor: theme.primary,
    lightColor: theme.lightColor,
  }
}
