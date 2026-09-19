"use client"

import React, { useState, useEffect, useCallback } from "react"
import { MapPin, ShieldAlert, Loader2, RefreshCw } from "lucide-react"
import { fetchRestaurantLocation } from "@/lib/api"
import { cn } from "@/lib/utils"
import { SplashScreen } from "./splash-screen"

interface LocationGuardProps {
  children: React.ReactNode
}

export function LocationGuard({ children }: LocationGuardProps) {
  const [status, setStatus] = useState<"checking" | "allowed" | "restricted" | "error" | "denied">("checking")
  const [distance, setDistance] = useState<number | null>(null)
  const [errorMsg, setErrorMsg] = useState("")

  // Haversine formula to calculate distance in meters
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lon2 - lon1) * Math.PI) / 180

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }

  const checkLocation = useCallback(async () => {
    setStatus("checking")
    setErrorMsg("")

    if (!navigator.geolocation) {
      setStatus("error")
      setErrorMsg("Geolocation is not supported by your browser")
      return
    }

    try {
      const config = await fetchRestaurantLocation()
      
      if (!config) {
        setStatus("error")
        setErrorMsg("Could not retrieve restaurant location")
        return
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude
          const userLng = position.coords.longitude
          
          const d = calculateDistance(userLat, userLng, config.lat, config.lng)
          setDistance(d)

          if (d <= config.radius) {
            setStatus("allowed")
          } else {
            setStatus("restricted")
          }
        },
        (error) => {
          console.error("Geolocation error:", error)
          if (error.code === error.PERMISSION_DENIED) {
            setStatus("denied")
          } else {
            setStatus("error")
            setErrorMsg(error.message)
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      )
    } catch (err) {
      console.error("Failed to fetch restaurant config:", err)
      setStatus("error")
      setErrorMsg("Failed to connect to server")
    }
  }, [])

  useEffect(() => {
    checkLocation()
  }, [checkLocation])

  const getStatusIcon = () => {
    switch (status) {
      case "checking":
        return null
      case "restricted":
        return <MapPin className="w-12 h-12 text-white" />
      case "denied":
        return <ShieldAlert className="w-12 h-12 text-amber-500" />
      default:
        return <ShieldAlert className="w-12 h-12 text-red-500" />
    }
  }

  const getStatusTitle = () => {
    switch (status) {
      case "checking":
        return ""
      case "restricted":
        return "Access Limited"
      case "denied":
        return "Permission Required"
      default:
        return ""
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case "checking":
        return ""
      case "restricted":
        return "This digital menu is exclusively available for our guests currently dining at Tekeze Lounge. Please join us in person to place your order!"
      case "denied":
        return "To provide you with the correct menu and table service, we need to verify you are currently at the restaurant."
      default:
        return ""
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Hotel Menu (The Children) rendered in the background */}
      <div className={cn(
        "w-full h-full transition-all duration-1000 ease-in-out",
        status !== "allowed" && "blur-xl scale-110 brightness-50 grayscale-[0.3] pointer-events-none"
      )}>
        {children}
      </div>

      {/* Location Checking/Blocking Overlay */}
      {status !== "allowed" && (
        <SplashScreen videoSrc="/splash/splash (1).mp4" className="bg-black/20">
          <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
            {getStatusIcon() && (
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-8 border border-white/20 shadow-xl">
                {getStatusIcon()}
              </div>
            )}

            {getStatusTitle() && (
              <h1 className="text-3xl font-bold mb-4 tracking-tight">
                {getStatusTitle()}
              </h1>
            )}

            {getStatusMessage() && (
              <p className="text-white/80 text-lg leading-relaxed max-w-sm mb-10 px-4">
                {getStatusMessage()}
              </p>
            )}

            {status === "restricted" && distance && (
              <div className="mb-8 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-2xl text-sm border border-white/10">
                Current distance: <span className="font-bold text-blue-300">{Math.round(distance)}m</span>
              </div>
            )}

            {(status === "denied" || (status !== "checking" && status !== "restricted" && status !== "allowed")) && (
              <button
                onClick={checkLocation}
                className="group flex items-center gap-3 px-10 py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 active:scale-95 transition-all shadow-2xl shadow-white/10"
              >
                <RefreshCw className={cn("w-5 h-5 transition-transform group-hover:rotate-180", status === "checking" && "animate-spin")} />
                {status === "denied" ? "Enable Location" : "Try Again"}
              </button>
            )}
          </div>
        </SplashScreen>
      )}
    </div>
  )
}
