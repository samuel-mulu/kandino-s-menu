"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface SplashScreenProps {
  children?: React.ReactNode
  className?: string
  videoSrc?: string
  showVideo?: boolean
}

export function SplashScreen({
  children,
  className,
  videoSrc = "/splash/splash (1).mp4",
  showVideo = true
}: SplashScreenProps) {
  return (
    <div className={cn(
      "fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden",
      className
    )}>
      {/* Background Video */}
      {showVideo && videoSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-1000"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center justify-center text-white text-center">
        {children}
      </div>
    </div>
  )
}
