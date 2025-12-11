import type React from "react"

interface MobileContainerProps {
  children: React.ReactNode
}

export function MobileContainer({ children }: MobileContainerProps) {
  return <div className="min-h-screen w-full bg-background flex flex-col relative">{children}</div>
}
