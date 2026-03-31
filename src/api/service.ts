import { Product } from "@/store/product-store";
import { ItemMaster } from "@/types/oms-product";

const ITEM_MASTER =
  "https://nooms.infoveave.app/api/v10/ngauge/forms/63/get-data";

// Mock data for products (derived from provided spreadsheet)
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    sku: "TY-122-K",
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
    sku: "TY-280-S",
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
    sku: "TY-561-S",
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
    sku: "TY-572-N",
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
    sku: "TY-053-T",
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
    sku: "TY-001-A",
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
    sku: "TY-113-E",
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
    sku: "TY-059-M",
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
    sku: "TY-126-D",
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
    sku: "TY-221-M",
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
