import type { Metadata, Viewport } from 'next'
import { Inter, Poppins, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ClerkProvider } from "@clerk/nextjs"
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import "mapbox-gl/dist/mapbox-gl.css"
import './globals.css'
import { AppProviders } from "@/components/providers/app-providers"
import { OfflineBanner } from "@/components/offline/offline-banner"
import { PwaRegister } from "@/components/offline/pwa-register"
import { Toaster } from "@/components/ui/sonner"


const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yatrika - The Future of Travel Planning',
  manifest: "/manifest.webmanifest",
  description: 'The Future of Travel Planning. Plan unforgettable trips with AI-powered itineraries. Discover destinations across India and the world, organize bookings, collaborate with friends, and travel stress-free.',
  keywords: ['travel planner', 'AI itinerary', 'trip planning', 'vacation planner', 'India travel', 'travel app', 'Kerala', 'Rajasthan', 'Goa', 'Yatrika'],
  authors: [{ name: 'Yatrika' }],
  creator: 'Yatrika',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Yatrika',
    title: 'Yatrika - The Future of Travel Planning',
    description: 'The Future of Travel Planning. Plan unforgettable trips with AI-powered itineraries.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yatrika - The Future of Travel Planning',
    description: 'The Future of Travel Planning. Plan unforgettable trips with AI-powered itineraries.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1F33' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ClerkProvider>
          <AppProviders>
            <OfflineBanner />
            <PwaRegister />
            {children}
            <Toaster richColors closeButton />
          </AppProviders>
        </ClerkProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}