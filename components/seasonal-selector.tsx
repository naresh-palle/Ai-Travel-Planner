'use client'

import React from 'react'
import { useSeasonalTheme, seasonalThemes, SeasonTheme } from '@/lib/seasonal-theme'
import { motion } from 'framer-motion'
import { Cloud, Sun, Droplets, Flower } from 'lucide-react'

const seasonIcons: Record<SeasonTheme, React.ReactNode> = {
  summer: <Sun className="w-4 h-4" />,
  monsoon: <Droplets className="w-4 h-4" />,
  winter: <Cloud className="w-4 h-4" />,
  spring: <Flower className="w-4 h-4" />,
}

export function SeasonSelector() {
  const { season, setSeason } = useSeasonalTheme()

  return (
    <div className="fixed bottom-8 right-8 z-50 flex gap-2 flex-col md:flex-row">
      {(Object.keys(seasonalThemes) as SeasonTheme[]).map((s) => (
        <motion.button
          key={s}
          onClick={() => setSeason(s)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all flex items-center gap-2 ${
            season === s
              ? 'bg-white text-slate-900 shadow-lg'
              : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur'
          }`}
        >
          {seasonIcons[s]}
          <span className="hidden sm:inline">{seasonalThemes[s].name}</span>
        </motion.button>
      ))}
    </div>
  )
}
