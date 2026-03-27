import { Product } from "@/store/product-store";
import { ItemMaster } from "@/types/oms-product";

const ITEM_MASTER =
  "https://nooms.infoveave.app/api/v10/ngauge/forms/63/get-data";

// Mock data for products (already in Product format)
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    sku: "SKU-001",
    name: "Hammer Tool Set",
    description: "Professional grade hammer tool set with carrying case",
    features: ["Durable steel construction", "Ergonomic grip handle"],
    category: "Hand Tools",
    subCategory: ["Hammers", "Tool Sets"],
    price: 99.99,
    image: "/images/products/hammer-set.webp",
    images: ["/images/products/hammer-set.webp"],
    soh: 45,
    moq: 1,
    tag: "Focus Products",
  },
  {
    id: 2,
    sku: "SKU-002",
    name: "Screwdriver Kit",
    description: "Premium screwdriver kit with multiple bits",
    features: ["Multiple bit sizes included", "Magnetic tip"],
    category: "Hand Tools",
    subCategory: ["Screwdrivers", "Tool Sets"],
    price: 49.99,
    image: "/images/products/screwdriver-kit.webp",
    images: ["/images/products/screwdriver-kit.webp"],
    soh: 78,
    moq: 1,
    tag: "New Products",
  },
  {
    id: 3,
    sku: "SKU-003",
    name: "Wrench Set",
    description: "Complete metric and standard wrench set",
    features: ["Metric and standard sizes"],
    category: "Hand Tools",
    subCategory: ["Wrenches", "Tool Sets"],
    price: 129.99,
    image: "/images/products/wrench-set.webp",
    images: ["/images/products/wrench-set.webp"],
    soh: 32,
    moq: 1,
    tag: "Promotions",
  },
  {
    id: 4,
    sku: "SKU-004",
    name: "Power Drill",
    description: "Cordless power drill with batteries",
    features: ["Cordless operation", "Includes 2 batteries and charger"],
    category: "Power Tools",
    subCategory: ["Drills"],
    price: 199.99,
    image: "/images/products/power-drill.webp",
    images: ["/images/products/power-drill.webp"],
    soh: 18,
    moq: 1,
    tag: "New Products",
  },
  {
    id: 5,
    sku: "SKU-005",
    name: "Pliers Set",
    description: "Ergonomic pliers set with multiple types",
    features: ["Anti-slip handles"],
    category: "Hand Tools",
    subCategory: ["Pliers", "Tool Sets"],
    price: 59.99,
    image: "/images/products/pliers-set.webp",
    images: ["/images/products/pliers-set.webp"],
    soh: 56,
    moq: 1,
    tag: "Focus Products",
  },
];

export async function fetchItemMaster(token: string | null) {
  const body = {
    table: "item_master",
    skip: 0,
    take: 500,
    NGaugeId: "63",
  };

  try {
    const response = await fetch(ITEM_MASTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `API returned ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.data) {
      console.warn("No data returned from item master API");
      return [];
    }

    return data.data as ItemMaster[];
  } catch (error) {
    console.error("Error fetching item master:", {
      url: ITEM_MASTER,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

export async function fetchNguageProducts(_token: string | null) {
  try {
    // Return mock data directly (API is expired)
    return MOCK_PRODUCTS;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchNguageProductById(
  id: string,
  _token: string | null
) {
  try {
    // Return mock data (API is expired)
    const product = MOCK_PRODUCTS.find((p) => p.id === Number(id));
    if (!product) {
      throw new Error(`Product not found: ${id}`);
    }
    return product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

// Stub functions for compatibility (no longer needed with Product mock data)
export async function fetchNguageProductsFeatures(_token: string | null) {
  return [];
}

export async function fetchNguageProductsCategory(_token: string | null) {
  return [];
}

export async function fetchNguageProductsCategoryMapping(
  _token: string | null
) {
  return [];
}

export async function fetchNguageProductsImages(_token: string | null) {
  return [];
}

export async function fetchNguageProductsImageMapping(_token: string | null) {
  return [];
}
