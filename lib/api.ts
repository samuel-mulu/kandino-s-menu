// API client for restaurant-menu-backend
// Backend base URL must be provided via environment variable:
//   NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api/v1
// (set this in `hotel-menu-app/.env.local`)

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiBaseUrl) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not set. Add it to your .env.local file (e.g. NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1)."
  );
}

const API_BASE_URL = apiBaseUrl;

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface BackendCategory {
  id: string;
  name: string;
}

interface BackendImage {
  url?: string;
  publicId?: string;
}

export interface BackendItem {
  id: string;
  name: string;
  categoryId?: string;
  category?: BackendCategory;
  description?: string;
  price: number;
  image?: BackendImage;
  ingredients?: string[];
  mealType?: "breakfast" | "lunch" | "dinner" | "treats";
  comments?: string[];
  special?: boolean;
  isAvailable: boolean;
}

// Transform backend item to frontend format
export function transformItem(item: BackendItem): any {
  return {
    ...item,
    // Transform image.url to image string for backward compatibility
    image: item.image?.url || "/placeholder.svg",
  };
}

// Fetch categories from API
export async function fetchCategories(): Promise<BackendCategory[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    const result: ApiResponse<BackendCategory[]> = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to fetch categories");
    }
    return result.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// Fetch items from API with optional category filter
export async function fetchItems(categoryId?: string): Promise<BackendItem[]> {
  try {
    const url = categoryId
      ? `${API_BASE_URL}/items?categoryId=${categoryId}`
      : `${API_BASE_URL}/items`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch items: ${response.statusText}`);
    }
    const result: ApiResponse<BackendItem[]> = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to fetch items");
    }
    return result.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

// Fetch single item by ID
export async function fetchItemById(id: string): Promise<BackendItem | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch item: ${response.statusText}`);
    }
    const result: ApiResponse<BackendItem> = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to fetch item");
    }
    return result.data;
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error;
  }
}

// Add comment to item
export async function addCommentToItem(
  id: string,
  comment: string
): Promise<BackendItem> {
  try {
    // First fetch the current item to get existing comments
    const currentItem = await fetchItemById(id);
    if (!currentItem) {
      throw new Error("Item not found");
    }

    // Append new comment to existing comments
    const updatedComments = [...(currentItem.comments || []), comment.trim()];

    // Update item with new comments array
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comments: updatedComments,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add comment: ${response.statusText}`);
    }

    const result: ApiResponse<BackendItem> = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to add comment");
    }

    return result.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}
