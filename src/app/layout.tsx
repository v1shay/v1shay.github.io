import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google"
import { ShaderBackground, ShaderPaletteProvider } from "@/components/shader-background"
import "./globals.css"

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display-google",
  weight: ["500", "600", "700", "800"],
})

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body-google",
  weight: ["400", "500", "600", "700"],
})

import type { Viewport } from "next"

export const metadata: Metadata = {
  title: "Vishay Agarwal",
  description: "A hyper-reactive portfolio foundation with a global ShaderGradient background.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0b0e18",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`} style={{ overflowX: 'hidden' }}>
      <body className={`${bodyFont.className} min-h-dvh antialiased overflow-x-hidden`}>
        <ShaderPaletteProvider>
          <div className="site-shell">
            <ShaderBackground />
            <div className="site-overlay" aria-hidden="true" />
            <div className="site-noise" aria-hidden="true" />
            <div className="site-content">{children}</div>
          </div>
        </ShaderPaletteProvider>
      </body>
    </html>
  )
}
