import Image from "next/image"
import Link from "next/link"
import type { MenuItem } from "@/lib/data"

interface MenuCardProps {
  item: MenuItem
}

export function MenuCard({ item }: MenuCardProps) {
  return (
    <Link href={`/menu/${item.id}`} className="block group">
      <div className="bg-background rounded-2xl overflow-hidden transition-transform group-hover:scale-[1.02]">
        <div className="aspect-square relative overflow-hidden rounded-2xl">
          <Image 
            src={item.image || "/image.jpg"} 
            alt={item.name} 
            fill 
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.srcset = "";
              target.src = "/image.jpg";
            }}
          />
        </div>
        <div className="pt-3">
          <h3 className="font-medium text-focused text-sm truncate">{item.name}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-blue-500 font-semibold text-sm">{Math.round(item.price)} ብር</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
