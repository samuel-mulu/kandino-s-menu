"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface HeaderProps {
  title: string
  showBack?: boolean
}

export function Header({ title, showBack = false }: HeaderProps) {
  const router = useRouter()

  return (
    <header className="flex items-center gap-4 px-4 py-4 bg-background">
      {showBack && (
        <button
          onClick={() => router.back()}
          className="p-1 hover:bg-muted rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
      )}
      <h1 className="text-lg font-semibold text-foreground flex-1 text-center pr-8">{title}</h1>
    </header>
  )
}
