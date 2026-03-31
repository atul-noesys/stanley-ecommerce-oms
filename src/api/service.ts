import { Product } from "@/store/product-store";
import { ItemMaster } from "@/types/oms-product";

const ITEM_MASTER =
  "https://nooms.infoveave.app/api/v10/ngauge/forms/63/get-data";

/**
 * Transform ItemMaster data from API to Product format, merged with mock data
 */
function transformItemMasterToProduct(item: ItemMaster, mockProduct?: Product): Product {
  // Use mock data as base, override with API data
  if (mockProduct) {
    return {
      ...mockProduct,
      id: item.ROWID || mockProduct.id,
      sku: item.item_code,
      name: item.item_name,
      description: item.item_description,
      price: item.unit_price,
      category: item.item_category,
      subCategory: [item.item_category],
      // Keep features, images, soh, tag from mock data
    };
  }

  // Fallback if no mock data found
  return {
    id: item.ROWID,
    sku: item.item_code,
    name: item.item_name,
    description: item.item_description,
    price: item.unit_price,
    category: item.item_category,
    subCategory: [item.item_category],
    features: [],
    image: "/images/products/placeholder.webp",
    images: ["/images/products/placeholder.webp"],
    soh: 0,
    moq: 1,
  };
}

// Mock data for products (derived from provided spreadsheet)
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    sku: "",
    name: "Green Dragon Teddy Bear",
    description:
      "Giant Green Dragon Teddy Bear for Toddlers. Encourages social interaction.",
    features: ["Soft plush", "Machine washable"],
    category: "Soft Toys",
    subCategory: ["Teddy Bears"],
    price: 15,
    image: "/images/products/green-dragon-teddy-bear.webp",
    images: ["/images/products/green-dragon-teddy-bear.webp"],
    soh: 120,
    moq: 1,
    tag: "Focus Products",
  },
  {
    id: 2,
    sku: "",
    name: "Blue Dinosaur Musical Instrument",
    description:
      "Animated Blue Dinosaur Musical Instrument for Ages 3+. Promotes hand-eye coordination.",
    features: ["Battery operated", "Light-up buttons"],
    category: "Musical Toys",
    subCategory: ["Instruments"],
    price: 20,
    image: "/images/products/blue-dinosaur-instrument.webp",
    images: ["/images/products/blue-dinosaur-instrument.webp"],
    soh: 80,
    moq: 1,
    tag: "New Products",
  },
  {
    id: 3,
    sku: "",
    name: "Gold Jungle Teddy Bear",
    description:
      "Fast Gold Jungle Teddy Bear Non-Toxic. Provides hours of entertainment.",
    features: ["Non-toxic materials", "Cuddly"],
    category: "Soft Toys",
    subCategory: ["Teddy Bears"],
    price: 15,
    image: "/images/products/gold-jungle-teddy-bear.jpg",
    images: ["/images/products/gold-jungle-teddy-bear.jpg"],
    soh: 95,
    moq: 1,
    tag: "Promotions",
  },
  {
    id: 4,
    sku: "",
    name: "Gold Dinosaur Musical Instrument",
    description:
      "Mini Gold Dinosaur Musical Instrument Easy to Assemble. Helps learn colors and shapes.",
    features: ["Educational", "Easy assembly"],
    category: "Musical Toys",
    subCategory: ["Instruments"],
    price: 20,
    image: "/images/products/gold-dinosaur-instrument.webp",
    images: ["/images/products/gold-dinosaur-instrument.webp"],
    soh: 60,
    moq: 1,
    tag: "New Products",
  },
  {
    id: 5,
    sku: "",
    name: "Orange Fantasy Action Figure",
    description:
      "Glowing Orange Fantasy Action Figure Easy to Assemble. Sparks creativity in children.",
    features: ["Poseable", "Glow-in-the-dark"],
    category: "Action Figures",
    subCategory: ["Action Figures"],
    price: 13,
    image: "/images/products/orange-fantasy-action-figure.webp",
    images: ["/images/products/orange-fantasy-action-figure.webp"],
    soh: 140,
    moq: 1,
    tag: "Promotions",
  },
  {
    id: 6,
    sku: "",
    name: "Green Dinosaur Race Car",
    description:
      "Flexible Green Dinosaur Race Car for Ages 3+. Perfect for imaginative play.",
    features: ["Flexible chassis", "Easy-grip"],
    category: "Vehicles",
    subCategory: ["Cars"],
    price: 17,
    image: "/images/products/green-dinosaur-race-car.webp",
    images: ["/images/products/green-dinosaur-race-car.webp"],
    soh: 110,
    moq: 1,
    tag: "Focus Products",
  },
  {
    id: 7,
    sku: "",
    name: "Navy Farm Tea Set",
    description:
      "Interactive Navy Farm Tea Set with Moving Parts. Promotes hand-eye coordination.",
    features: ["Interactive pieces", "Durable wood"],
    category: "Action Figures",
    subCategory: ["Playsets"],
    price: 12,
    image: "/images/products/navy-farm-tea-set.webp",
    images: ["/images/products/navy-farm-tea-set.webp"],
    soh: 70,
    moq: 1,
    tag: "Promotions",
  },
  {
    id: 8,
    sku: "",
    name: "Gold Castle Tea Set",
    description:
      "Wooden Gold Castle Tea Set 100-Piece Set. Encourages social interaction.",
    features: ["100-piece set", "Wooden pieces"],
    category: "Action Figures",
    subCategory: ["Playsets"],
    price: 12,
    image: "/images/products/gold-castle-tea-set.webp",
    images: ["/images/products/gold-castle-tea-set.webp"],
    soh: 50,
    moq: 1,
    tag: "Focus Products",
  },
  {
    id: 9,
    sku: "",
    name: "Navy Space Truck",
    description:
      "Wooden Navy Space Truck Easy to Assemble. Promotes hand-eye coordination.",
    features: ["Easy assembly", "Sturdy construction"],
    category: "Vehicles",
    subCategory: ["Trucks"],
    price: 18,
    image: "/images/products/navy-space-truck.webp",
    images: [
      "/images/products/navy-space-truck.webp",
      "/images/products/navy-space-truck-2.webp",
    ],
    soh: 65,
    moq: 1,
    tag: "New Products",
  },
  {
    id: 10,
    sku: "",
    name: "Teal City Art Kit",
    description:
      "Colorful Teal City Art Kit 100-Piece Set. Fun for the whole family.",
    features: ["100-piece kit", "Assorted colors"],
    category: "Art Kits",
    subCategory: ["Kits"],
    price: 19,
    image: "/images/products/teal-city-art-kit.webp",
    images: ["/images/products/teal-city-art-kit.webp"],
    soh: 55,
    moq: 1,
    tag: "Focus Products",
  },
];

export async function fetchItemMaster(token: string | null): Promise<ItemMaster[]> {
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

/**
 * Fetch products from ItemMaster API and transform to Product format
 */
export async function fetchNguageProductsFromMaster(token: string | null): Promise<Product[]> {
  try {
    const items = await fetchItemMaster(token);
    return items.map((item) => {
      // Find matching mock product by name
      const mockProduct = MOCK_PRODUCTS.find(
        (p) => p.name.toLowerCase() === item.item_name.toLowerCase()
      );
      return transformItemMasterToProduct(item, mockProduct);
    });
  } catch (error) {
    console.error("Error fetching products from item master:", error);
    throw error;
  }
}

export async function fetchNguageProducts(token: string | null): Promise<Product[]> {
  try {
    // Try to fetch from ItemMaster API
    return await fetchNguageProductsFromMaster(token);
  } catch (error) {
    console.warn("Failed to fetch from ItemMaster API, falling back to mock data:", error);
    // Fallback to mock data if API fails
    return MOCK_PRODUCTS;
  }
}

export async function fetchNguageProductById(
  id: string,
  token: string | null
): Promise<Product> {
  try {
    // Try to fetch from ItemMaster API
    const products = await fetchNguageProductsFromMaster(token);
    const product = products.find((p) => p.id === Number(id));
    if (product) {
      return product;
    }
  } catch (error) {
    console.warn(`Failed to fetch product ${id} from ItemMaster API:`, error);
  }
  
  // Fallback to mock data
  const product = MOCK_PRODUCTS.find((p) => p.id === Number(id));
  if (!product) {
    throw new Error(`Product not found: ${id}`);
  }
  return product;
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
