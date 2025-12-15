"use client"

import { cn } from "@/lib/utils"

export type CategoryId = string | "special"

interface CategoryTabsProps {
  categories: { id: string; label: string }[]
  activeCategory: CategoryId
  onCategoryChange: (category: CategoryId) => void
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="px-4 pb-4">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              activeCategory === category.id ? "bg-blue-500 text-white" : "bg-muted text-foreground hover:bg-muted/80",
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  )
}
