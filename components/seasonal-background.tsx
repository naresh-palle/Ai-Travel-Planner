'use client'

import React from 'react'
import { useSeasonalTheme } from '@/lib/seasonal-theme'
import { motion } from 'framer-motion'

export function SeasonalBackground() {
  const { theme, season } = useSeasonalTheme()

  // Background particles that vary by season
  const particleCount = season === 'monsoon' ? 30 : season === 'spring' ? 40 : 20

  return (
    <motion.div
      key={season}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 -z-50 pointer-events-none overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`absolute inset-0 bg-gradient-to-br ${theme.background}`}
      />

      {/* Seasonal overlay effects */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: season === 'monsoon' ? 4 : 6,
          repeat: Infinity,
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 20% 20%, ${theme.glowColor}, transparent 50%)`,
        }}
      />

      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: season === 'monsoon' ? 5 : 7,
          repeat: Infinity,
          delay: 1,
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 80% 80%, ${theme.glowColor}, transparent 50%)`,
        }}
      />

      {/* Seasonal particles */}
      {season === 'monsoon' && (
        <div className="absolute inset-0">
          {Array.from({ length: particleCount }).map((_, i) => (
            <motion.div
              key={`rain-${i}`}
              initial={{
                opacity: 0,
                y: -100,
                x: Math.random() * window.innerWidth,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                y: window.innerHeight + 100,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute w-0.5 h-8 bg-gradient-to-b from-[#3A86FF]/40 to-transparent"
            />
          ))}
        </div>
      )}

      {season === 'winter' && (
        <div className="absolute inset-0">
          {Array.from({ length: particleCount }).map((_, i) => (
            <motion.div
              key={`snow-${i}`}
              initial={{
                opacity: 0,
                y: -100,
                x: Math.random() * window.innerWidth,
              }}
              animate={{
                opacity: [0, 0.4, 0],
                y: window.innerHeight + 100,
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-white"
            />
          ))}
        </div>
      )}

      {season === 'spring' && (
        <div className="absolute inset-0">
          {Array.from({ length: particleCount }).map((_, i) => (
            <motion.div
              key={`petal-${i}`}
              initial={{
                opacity: 0,
                y: -50,
                x: Math.random() * window.innerWidth,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                y: window.innerHeight + 50,
                rotate: 360,
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: ['#FFB4D9', '#80ED99', '#BDB2FF'][Math.floor(Math.random() * 3)],
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
