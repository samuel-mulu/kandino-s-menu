import type { MenuItem } from "@/lib/data"
import { MenuCard } from "./menu-card"

interface SimilarItemsProps {
  items: MenuItem[]
}

export function SimilarItems({ items }: SimilarItemsProps) {
  if (items.length === 0) return null

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-bold text-foreground mb-4">You May Also Like</h2>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
