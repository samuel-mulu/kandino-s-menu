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
  isFavorite?: boolean;
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
  isFavorite?: boolean;
  isAvailable: boolean;
}

// Transform backend item to frontend format
export function transformItem(item: BackendItem): any {
  return {
    ...item,
    // Transform image.url to image string for backward compatibility
    image: item.image?.url || "/image.jpg",
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
    const response = await fetch(`${API_BASE_URL}/items/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment.trim(),
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

// Call waiter for a table
export async function callWaiter(
  tableNumber: number,
  metadata?: any
): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/table-notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableNumber,
        metadata,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to call waiter: ${response.statusText}`);
    }

    const result: ApiResponse<any> = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to call waiter");
    }

    return result.data;
  } catch (error) {
    console.error("Error calling waiter:", error);
    throw error;
  }
}

// Fetch restaurant location settings
export async function fetchRestaurantLocation(): Promise<{
  lat: number;
  lng: number;
  radius: number;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/owner/location`);
    if (!response.ok) {
      throw new Error(`Failed to fetch location settings: ${response.statusText}`);
    }
    const result: ApiResponse<{ lat: number; lng: number; radius: number }> =
      await response.json();
    if (!result.success || !result.data) {
      throw new Error(result.message || "Invalid location data received");
    }
    return result.data;
  } catch (error) {
    console.error("Error fetching restaurant location:", error);
    // Fallback if API fails
    return {
      lat: 8.9944312,
      lng: 38.7737417,
      radius: 500,
    };
  }
}
