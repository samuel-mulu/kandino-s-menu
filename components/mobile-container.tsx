import type React from "react"

interface MobileContainerProps {
  children: React.ReactNode
}

export function MobileContainer({ children }: MobileContainerProps) {
  return <div className="h-screen w-full bg-background flex flex-col relative overflow-hidden pb-16">{children}</div>
}
