"use client";

import { useState, useMemo } from "react";
import { MobileContainer } from "@/components/mobile-container";
import { Header } from "@/components/header";
import { SearchBar } from "@/components/search-bar";
import { CategoryTabs } from "@/components/category-tabs";
import { MenuGrid } from "@/components/menu-grid";
import { BottomNav } from "@/components/bottom-nav";
import {
  categories,
  menuItems,
  getSectionTitle,
  type Category,
} from "@/lib/data";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("breakfast");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return menuItems
      .filter((item) => item.category === activeCategory)
      .filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [activeCategory, searchQuery]);

  return (
    <MobileContainer>
      <Header title="Hotel Cuisine" />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <div className="flex-1 overflow-y-auto pb-4">
        <MenuGrid
          items={filteredItems}
          title={getSectionTitle(activeCategory)}
        />
      </div>
      <BottomNav />
    </MobileContainer>
  );
}
