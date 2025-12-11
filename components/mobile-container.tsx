import type React from "react"
interface MobileContainerProps {
  children: React.ReactNode
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] min-h-[800px] bg-background rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">
        {children}
      </div>
    </div>
  )
}
