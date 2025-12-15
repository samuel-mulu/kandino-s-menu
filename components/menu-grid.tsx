import type { MenuItem } from "@/lib/data"
import { MenuCard } from "./menu-card"
import { getMealTypeTitle } from "@/lib/data"

interface MenuGridProps {
  items: MenuItem[]
  title?: string
  groupedByMealType?: boolean
}

export function MenuGrid({ items, title, groupedByMealType = false }: MenuGridProps) {
  if (items.length === 0) {
    return <div className="px-4 py-8 text-center text-muted-foreground">No items found</div>
  }

  // If grouped by meal type, organize items by mealType
  if (groupedByMealType) {
    const grouped = items.reduce((acc, item) => {
      const mealType = item.mealType || "other"
      if (!acc[mealType]) {
        acc[mealType] = []
      }
      acc[mealType].push(item)
      return acc
    }, {} as Record<string, MenuItem[]>)

    const mealTypes = ["breakfast", "lunch", "dinner", "treats"] as const

    return (
      <div className="px-4">
        {title && <h2 className="text-lg font-bold text-foreground mb-4">{title}</h2>}
        {mealTypes.map((mealType) => {
          const mealItems = grouped[mealType] || []
          if (mealItems.length === 0) return null

          return (
            <div key={mealType} className="mb-6">
              <h3 className="text-base font-semibold text-foreground mb-3">
                {getMealTypeTitle(mealType)}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {mealItems.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )
        })}
        {/* Show items without mealType if any */}
        {grouped["other"] && grouped["other"].length > 0 && (
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              {grouped["other"].map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Normal display without grouping
  return (
    <div className="px-4">
      {title && <h2 className="text-lg font-bold text-foreground mb-4">{title}</h2>}
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
