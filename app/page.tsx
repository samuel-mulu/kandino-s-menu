"use client";

import { useState, useEffect, useMemo } from "react";
import { MobileContainer } from "@/components/mobile-container";
import { Header } from "@/components/header";
import { SearchBar } from "@/components/search-bar";
import { CategoryTabs, type CategoryId } from "@/components/category-tabs";
import { MenuGrid } from "@/components/menu-grid";
import { BottomNav } from "@/components/bottom-nav";
import type { MenuItem } from "@/lib/data";
import { fetchCategories, fetchItems, transformItem } from "@/lib/api";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("special");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<{ id: string; label: string }[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await fetchCategories();
        // Transform categories to include "Special" category
        const transformedCategories = [
          { id: "special", label: "Special" },
          ...cats.map((cat) => ({
            id: cat.id,
            label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
          })),
        ];
        setCategories(transformedCategories);
      } catch (err) {
        console.error("Failed to load categories:", err);
        setError("Failed to load categories");
      }
    }
    loadCategories();
  }, []);

  // Fetch items when category changes
  useEffect(() => {
    async function loadItems() {
      setLoading(true);
      setError(null);
      try {
        let fetchedItems;
        
        if (activeCategory === "special") {
          // Fetch all items and filter by special flag
          fetchedItems = await fetchItems();
          fetchedItems = fetchedItems.filter((item) => item.special === true);
        } else {
          // Fetch items for specific category
          fetchedItems = await fetchItems(activeCategory);
        }

        // Transform items for UI
        const transformedItems = fetchedItems
          .filter((item) => item.isAvailable) // Only show available items
          .map((item) => ({
            ...transformItem(item),
            isPopular: item.special, // Map special to isPopular for backward compatibility
          }));

        setItems(transformedItems);
      } catch (err) {
        console.error("Failed to load items:", err);
        setError("Failed to load menu items");
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, [activeCategory]);

  // Filter items by search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  // Check if items have mealType for grouping
  const hasMealType = useMemo(() => {
    return filteredItems.some((item) => item.mealType);
  }, [filteredItems]);

  // Get category title
  const categoryTitle = useMemo(() => {
    if (activeCategory === "special") {
      return "Special Items";
    }
    const category = categories.find((cat) => cat.id === activeCategory);
    return category?.label || "Menu";
  }, [activeCategory, categories]);

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
        {loading ? (
          <div className="px-4 py-8 text-center text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="px-4 py-8 text-center text-red-500">{error}</div>
        ) : (
          <MenuGrid
            items={filteredItems}
            title={categoryTitle}
            groupedByMealType={hasMealType}
          />
        )}
      </div>
      <BottomNav />
    </MobileContainer>
  );
}
