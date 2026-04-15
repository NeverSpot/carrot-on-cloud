import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { ReducedMotionToggle } from '@/components/reduced-motion-toggle'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Carrot on Cloud - compute once, serve instant',
  description:
    'Centralized Codeforces rating engine. Tiny infra cost. Big UX wins. Precompute contest rating deltas once and serve them instantly.',
  openGraph: {
    title: 'Carrot on Cloud compute once, serve instant',
    description: 'Centralized CF rating engine. Tiny infra cost. Big UX wins.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#121212',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="font-sans antialiased scanlines grain">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <ReducedMotionToggle />
      </body>
    </html>
  )
}
