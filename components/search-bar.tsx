"use client"

import { Search } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = "Search for dishes..." }: SearchBarProps) {
  return (
    <div className="px-4 pb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-muted rounded-xl border-none outline-none text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
    </div>
  )
}
