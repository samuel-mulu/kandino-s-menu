import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import type React from "react"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

import { Suspense } from "react"
import { CallWaiter } from "@/components/call-waiter"
import { LocationGuard } from "@/components/location-guard"

export const metadata: Metadata = {
  title: "Tekeze Lounge - Menu",
  description: "Browse the Tekeze Lounge menu",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#3b82f6",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Suspense fallback={null}>
          <LocationGuard>
            {children}
            <CallWaiter />
          </LocationGuard>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
