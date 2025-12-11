"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UtensilsCrossed, Info, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: UtensilsCrossed, label: "Menu" },
  { href: "/info", icon: Info, label: "Info" },
  { href: "/contact", icon: MessageCircle, label: "Contact" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-background border-t border-border px-6 py-3 mt-auto">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/" && pathname.startsWith("/menu"))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-blue-500" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
