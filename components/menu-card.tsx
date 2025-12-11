import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"
import type { MenuItem } from "@/lib/data"

interface MenuCardProps {
  item: MenuItem
}

export function MenuCard({ item }: MenuCardProps) {
  return (
    <Link href={`/menu/${item.id}`} className="block group">
      <div className="bg-background rounded-2xl overflow-hidden transition-transform group-hover:scale-[1.02]">
        <div className="aspect-square relative overflow-hidden rounded-2xl">
          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
        </div>
        <div className="pt-3">
          <h3 className="font-medium text-foreground text-sm truncate">{item.name}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-blue-500 font-semibold text-sm">${item.price.toFixed(2)}</span>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{item.prepTime} min</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
