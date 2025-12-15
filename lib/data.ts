// Category interface matching backend response
export interface Category {
  id: string;
  name: string;
}

// MenuItem interface matching backend schema
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string; // Transformed from image.url in API client
  categoryId?: string;
  category?: Category;
  description?: string;
  ingredients?: string[];
  mealType?: "breakfast" | "lunch" | "dinner" | "treats";
  comments?: string[];
  special?: boolean;
  isAvailable: boolean;
  // Legacy field for backward compatibility (maps from special)
  isPopular?: boolean;
}

// Meal type labels for display
export const mealTypeLabels: Record<string, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  treats: "Treats",
};

// Helper function to get section title for meal type
export function getMealTypeTitle(mealType: string): string {
  return mealTypeLabels[mealType] || mealType;
}
