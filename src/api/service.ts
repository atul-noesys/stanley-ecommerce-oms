import { Product } from "@/store/product-store";
import { ItemMaster } from "@/types/oms-product";

const ITEM_MASTER =
  "https://nooms.infoveave.app/api/v10/ngauge/forms/63/get-data";

/**
 * Transform ItemMaster data from API to Product format, merged with mock data
 */
function transformItemMasterToProduct(
  item: ItemMaster,
  mockProduct?: Product
): Product {
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
  {
    id: 11,
    sku: "TY-107-E",
    name: "Teal Robot Robot",
    description:
      "Fuzzy Teal Robot Plushie with Moving Parts. Great for outdoor fun.",
    features: ["Fuzzy plush", "Moving parts"],
    category: "Robots",
    subCategory: ["Robots"],
    price: 27.99,
    image: "/images/products/teal-robot-robot.webp",
    images: ["/images/products/teal-robot-robot.webp"],
    soh: 85,
    moq: 1,
    tag: "New Products",
  },
  {
    id: 12,
    sku: "TY-090-F",
    name: "Blue Safari Building Blocks",
    description:
      "Soft Blue Safari Building Blocks Battery Operated. Ideal for naptime snuggles.",
    features: ["Battery operated", "Soft blocks"],
    category: "Art Kits",
    subCategory: ["Kits"],
    price: 22.99,
    image: "/images/products/blue-safari-building-blocks.webp",
    images: ["/images/products/blue-safari-building-blocks.webp"],
    soh: 72,
    moq: 1,
    tag: "Focus Products",
  },
  {
    id: 13,
    sku: "TY-893-P",
    name: "Rainbow Safari Tea Set",
    description:
      "Compact Rainbow Safari Tea Set for Ages 3+. Great for outdoor fun.",
    features: ["Compact design", "Age 3+"],
    category: "Art Kits",
    subCategory: ["Kitchen Kits"],
    price: 11.99,
    image: "/images/products/rainbow-safari-tea-set.webp",
    images: ["/images/products/rainbow-safari-tea-set.webp"],
    soh: 105,
    moq: 1,
    tag: "Promotions",
  },
  {
    id: 14,
    sku: "TY-182-V",
    name: "Orange Superhero Race Car",
    description:
      "Fast Orange Superhero Race Car Non-Toxic. Promotes hand-eye coordination.",
    features: ["Non-toxic", "Fast design"],
    category: "Vehicles",
    subCategory: ["Cars"],
    price: 16.99,
    image: "/images/products/orange-superhero-race-car.webp",
    images: ["/images/products/orange-superhero-race-car.webp"],
    soh: 98,
    moq: 1,
    tag: "New Products",
  },
  {
    id: 15,
    sku: "TY-747-C",
    name: "Red Castle Science Kit",
    description:
      "Durable Red Castle Science Kit Easy to Assemble. Sparks creativity in children.",
    features: ["Durable", "Easy assembly"],
    category: "Art Kits",
    subCategory: ["Kits"],
    price: 29.99,
    image: "/images/products/red-castle-science-kit.webp",
    images: ["/images/products/red-castle-science-kit.webp"],
    soh: 68,
    moq: 1,
    tag: "Focus Products",
  },
  {
    id: 16,
    sku: "TY-459-E",
    name: "Pink City Tea Set",
    description:
      "Mini Pink City Tea Set Battery Operated. Ideal for naptime snuggles.",
    features: ["Battery operated", "Mini set"],
    category: "Art Kits",
    subCategory: ["Kits"],
    price: 11.99,
    image: "/images/products/pink-city-tea-set.webp",
    images: ["/images/products/pink-city-tea-set.webp"],
    soh: 91,
    moq: 1,
    tag: "Promotions",
  },
  {
    id: 17,
    sku: "TY-480-G",
    name: "Multicolor City Truck",
    description:
      "Musical Multicolor City Truck 100-Piece Set. Fun for the whole family.",
    features: ["Musical", "100-piece set"],
    category: "Vehicles",
    subCategory: ["Trucks"],
    price: 17.99,
    image: "/images/products/multicolor-city-truck.webp",
    images: ["/images/products/multicolor-city-truck.webp"],
    soh: 76,
    moq: 1,
    tag: "New Products",
  },
  {
    id: 18,
    sku: "TY-700-Q",
    name: "Rainbow Jungle Robot",
    description:
      "Colorful Rainbow Jungle Robot with Carrying Case. Helps develop fine motor skills.",
    features: ["With carrying case", "Develops motor skills"],
    category: "Robots",
    subCategory: ["Robots"],
    price: 27.99,
    image: "/images/products/rainbow-jungle-robot.webp",
    images: ["/images/products/rainbow-jungle-robot.webp"],
    soh: 64,
    moq: 1,
    tag: "Focus Products",
  },
  {
    id: 19,
    sku: "TY-334-J",
    name: "Navy Jungle Board Game",
    description:
      "Plastic Navy Jungle Board Game with Storage Box. Sparks creativity in children.",
    features: ["Plastic build", "Storage box"],
    category: "Art Kits",
    subCategory: ["Kits"],
    price: 24.99,
    image: "/images/products/navy-jungle-board-game.webp",
    images: ["/images/products/navy-jungle-board-game.webp"],
    soh: 57,
    moq: 1,
    tag: "Promotions",
  },
  {
    id: 20,
    sku: "TY-263-E",
    name: "Orange Robot Train Set",
    description:
      "Lightweight Orange Robot Train Set with Sound Effects. Promotes hand-eye coordination.",
    features: ["Sound effects", "Lightweight"],
    category: "Art Kits",
    subCategory: ["Kits"],
    price: 34.99,
    image: "/images/products/orange-robot-train-set.webp",
    images: ["/images/products/orange-robot-train-set.webp"],
    soh: 51,
    moq: 1,
    tag: "New Products",
  },
  {
    id: 21,
    sku: "TY-935-H",
    name: "Navy Castle Race Car",
    description:
      "Flexible Navy Castle Race Car with Remote Control. Helps learn colors and shapes.",
    features: ["Remote control", "Flexible chassis"],
    category: "Vehicles",
    subCategory: ["Cars"],
    price: 16.99,
    image: "/images/products/navy-castle-race-car.webp",
    images: ["/images/products/navy-castle-race-car.webp"],
    soh: 82,
    moq: 1,
    tag: "Focus Products",
  },
  {
    id: 22,
    sku: "TY-207-Y",
    name: "Orange Safari Kitchen Set",
    description:
      "Compact Orange Safari Kitchen Set with Sound Effects. Promotes hand-eye coordination.",
    features: ["Sound effects", "Compact design"],
    category: "Art Kits",
    subCategory: ["Kits"],
    price: 39.99,
    image: "/images/products/orange-safari-kitchen-set.webp",
    images: ["/images/products/orange-safari-kitchen-set.webp"],
    soh: 48,
    moq: 1,
    tag: "Promotions",
  },
  {
    id: 23,
    sku: "TY-048-P",
    name: "Purple Robot Musical Instrument",
    description:
      "Fuzzy Purple Robot Musical Instrument with Carrying Case. Perfect for imaginative play.",
    features: ["Fuzzy plush", "With carrying case"],
    category: "Musical Toys",
    subCategory: ["Instruments"],
    price: 19.99,
    image: "/images/products/purple-robot-musical-instrument.webp",
    images: ["/images/products/purple-robot-musical-instrument.webp"],
    soh: 75,
    moq: 1,
    tag: "New Products",
  },
  {
    id: 24,
    sku: "TY-215-F",
    name: "Teal Unicorn Train Set",
    description:
      "Fuzzy Teal Unicorn Train Set Battery Operated. Great for outdoor fun.",
    features: ["Battery operated", "Fuzzy plush"],
    category: "Vehicles",
    subCategory: ["Trains"],
    price: 34.99,
    image: "/images/products/teal-unicorn-train-set.webp",
    images: ["/images/products/teal-unicorn-train-set.webp"],
    soh: 62,
    moq: 1,
    tag: "Focus Products",
  },
  {
    id: 25,
    sku: "TY-734-L",
    name: "Blue Fantasy Robot",
    description:
      "Mini Blue Fantasy Robot with Carrying Case. Fun for the whole family.",
    features: ["Mini", "With carrying case"],
    category: "Robots",
    subCategory: ["Robots"],
    price: 27.99,
    image: "/images/products/blue-fantasy-robot.webp",
    images: ["/images/products/blue-fantasy-robot.webp"],
    soh: 88,
    moq: 1,
    tag: "Promotions",
  },
  {
    id: 26,
    sku: "TY-619-T",
    name: "Orange Superhero Teddy Bear",
    description:
      "Durable Orange Superhero Teddy Bear with Light-up Eyes. Ideal for naptime snuggles.",
    features: ["Durable", "Light-up eyes"],
    category: "Soft Toys",
    subCategory: ["Teddy Bears"],
    price: 14.99,
    image: "/images/products/orange-superhero-teddy-bear.webp",
    images: ["/images/products/orange-superhero-teddy-bear.webp"],
    soh: 112,
    moq: 1,
    tag: "New Products",
  },
  {
    id: 27,
    sku: "TY-282-U",
    name: "Teal Space Play House",
    description:
      "Mini Teal Space Play House for Ages 3+. Perfect for imaginative play.",
    features: ["Mini design", "Age 3+"],
    category: "Art Kits",
    subCategory: ["Kits"],
    price: 49.99,
    image: "/images/products/teal-space-play-house.webp",
    images: ["/images/products/teal-space-play-house.webp"],
    soh: 42,
    moq: 1,
    tag: "Focus Products",
  },
  {
    id: 28,
    sku: "TY-935-P",
    name: "Crimson Dragon Doll",
    description:
      "Shiny Crimson Dragon Doll 100-Piece Set. Ideal for naptime snuggles.",
    features: ["Shiny finish", "100-piece set"],
    category: "Soft Toys",
    subCategory: ["Dolls"],
    price: 13.99,
    image: "/images/products/crimson-dragon-doll.webp",
    images: [
      "/images/products/crimson-dragon-doll.webp",
      "/images/products/crimson-dragon-doll-2.webp",
    ],
    soh: 96,
    moq: 1,
    tag: "Promotions",
  },
  {
    id: 29,
    sku: "TY-839-I",
    name: "Crimson Princess Science Kit",
    description:
      "Educational Crimson Princess Science Kit 100-Piece Set. Encourages social interaction.",
    features: ["Educational", "100-piece kit"],
    category: "Art Kits",
    subCategory: ["Kits"],
    price: 29.99,
    image: "/images/products/crimson-princess-science-kit.webp",
    images: ["/images/products/crimson-princess-science-kit.webp"],
    soh: 69,
    moq: 1,
    tag: "New Products",
  },
  {
    id: 30,
    sku: "TY-867-E",
    name: "Rainbow Superhero Truck",
    description:
      "Lightweight Rainbow Superhero Truck Non-Toxic. Great for outdoor fun.",
    features: ["Lightweight", "Non-toxic"],
    category: "Vehicles",
    subCategory: ["Trucks"],
    price: 17.99,
    image: "/images/products/rainbow-superhero-truck.webp",
    images: ["/images/products/rainbow-superhero-truck.webp"],
    soh: 79,
    moq: 1,
    tag: "Focus Products",
  },
];

export async function fetchItemMaster(
  token: string | null
): Promise<ItemMaster[]> {
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
export async function fetchNguageProductsFromMaster(
  token: string | null
): Promise<Product[]> {
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

export async function fetchNguageProducts(
  token: string | null
): Promise<Product[]> {
  try {
    // Try to fetch from ItemMaster API
    return await fetchNguageProductsFromMaster(token);
  } catch (error) {
    console.warn(
      "Failed to fetch from ItemMaster API, falling back to mock data:",
      error
    );
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
