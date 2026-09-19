"use client";

import { BottomNav } from "@/components/bottom-nav";
import { CategoryTabs, type CategoryId } from "@/components/category-tabs";
import { Header } from "@/components/header";
import { MenuGrid } from "@/components/menu-grid";
import { MobileContainer } from "@/components/mobile-container";
import { SearchBar } from "@/components/search-bar";
import { SplashScreen } from "@/components/splash-screen";
import { fetchCategories, fetchItems, transformItem } from "@/lib/api";
import type { MenuItem } from "@/lib/data";
import { useEffect, useMemo, useRef, useState } from "react";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("special");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<{ id: string; label: string }[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isInternalScroll = useRef(false);

  // Fetch categories and items on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const [cats, allFetchedItems] = await Promise.all([
          fetchCategories(),
          fetchItems()
        ]);

        // Transform categories to include "Special" category
        const sortedCats = [...cats].sort((a, b: any) => {
          if (a.isFavorite === b.isFavorite) return 0;
          return a.isFavorite ? -1 : 1;
        });

        const transformedCategories = [
          { id: "special", label: "Special" },
          ...sortedCats.map((cat: any) => ({
            id: cat.id || cat._id,
            label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
          })),
        ];
        setCategories(transformedCategories);

        // Transform and sort items
        const transformedItems = allFetchedItems
          .filter((item) => item.isAvailable)
          .map((item) => ({
            ...transformItem(item),
            isPopular: item.special,
          }));

        transformedItems.sort((a, b: any) => {
          if (a.isFavorite === b.isFavorite) return 0;
          return a.isFavorite ? -1 : 1;
        });

        setItems(transformedItems);
      } catch (err) {
        console.error("Failed to load menu data:", err);
        setError("Failed to load menu data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter items by search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  // Group items by category
  const itemsByCategory = useMemo(() => {
    const grouped: Record<string, MenuItem[]> = {
      special: filteredItems.filter(item => item.isPopular)
    };

    categories.forEach(cat => {
      if (cat.id !== "special") {
        grouped[cat.id] = filteredItems.filter(item =>
          item.categoryId === cat.id || item.category?.id === cat.id
        );
      }
    });

    return grouped;
  }, [filteredItems, categories]);

  // Handle Tab Click (Smooth Scroll)
  const handleCategoryChange = (categoryId: CategoryId) => {
    setActiveCategory(categoryId);
    const element = categoryRefs.current[categoryId];
    if (element && scrollContainerRef.current) {
      isInternalScroll.current = true;
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Reset internal scroll after animation
      setTimeout(() => {
        isInternalScroll.current = false;
      }, 1000);
    }
  };

  // Intersection Observer to update active tab on scroll
  useEffect(() => {
    if (loading || categories.length === 0) return;

    const observerOptions = {
      root: scrollContainerRef.current,
      rootMargin: "-10% 0px -80% 0px", // Detect when item is near the top
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isInternalScroll.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each category section
    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [loading, itemsByCategory]);

  return (
    <MobileContainer>
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto pb-4 scroll-smooth"
      >
        <Header title="Tekeze Lounge" />

        {/* Sticky Search and Categories */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md pt-2 shadow-sm">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        <div className="mt-4">
          {loading ? (
            <SplashScreen />
          ) : error ? (
            <div className="px-4 py-8 text-center text-red-500">{error}</div>
          ) : (
            categories.map((cat) => {
              const catItems = itemsByCategory[cat.id] || [];
              if (catItems.length === 0 && searchQuery) return null; // Hide empty categories when searching

              return (
                <div
                  key={cat.id}
                  id={cat.id}
                  ref={(el) => (categoryRefs.current[cat.id] = el)}
                  className="mb-8 scroll-mt-[165px]" // Adjusted scroll margin to account for sticky search and tabs
                >
                  <MenuGrid
                    items={catItems}
                    title={cat.label}
                    groupedByMealType={!searchQuery && cat.id !== "special"}
                  />
                </div>
              );
            })
          )}
          {!loading && searchQuery && Object.values(itemsByCategory).every(arr => arr.length === 0) && (
            <div className="px-4 py-8 text-center text-muted-foreground">No matches found for "{searchQuery}"</div>
          )}
        </div>
      </div>
      <BottomNav />
    </MobileContainer>
  );
}
