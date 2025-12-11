import type { MenuItem } from "@/lib/data"
import { MenuCard } from "./menu-card"

interface MenuGridProps {
  items: MenuItem[]
  title: string
}

export function MenuGrid({ items, title }: MenuGridProps) {
  if (items.length === 0) {
    return <div className="px-4 py-8 text-center text-muted-foreground">No items found</div>
  }

  return (
    <div className="px-4">
      <h2 className="text-lg font-bold text-foreground mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
