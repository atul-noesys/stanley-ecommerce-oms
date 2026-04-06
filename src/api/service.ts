import { Product } from "@/store/product-store";
import { ItemMaster, ProductMaster } from "@/types/oms-product";

const ITEM_MASTER =
  "https://nooms.infoveave.app/api/v10/ngauge/forms/63/get-data";

const PRODUCT_MASTER =
  "https://nooms.infoveave.app/api/v10/ngauge/forms/73/get-data";

/**
 * Helper function to fetch image via GetPdfUrl API and convert blob to data URL
 */
async function fetchImageAsDataUrl(
  imageUrl: string,
  token: string | null,
  baseUrl?: string
): Promise<string | null> {
  try {
    // Construct absolute URL for server-side fetch
    const apiPath = `/api/GetPdfUrl?attachment=${encodeURIComponent(imageUrl)}`;
    const absoluteUrl = baseUrl ? `${baseUrl}${apiPath}` : apiPath;

    // Validate URL is absolute (required for server-side fetch)
    if (
      !absoluteUrl.startsWith("http://") &&
      !absoluteUrl.startsWith("https://")
    ) {
      console.warn(
        `Skipping relative URL: ${absoluteUrl}. baseUrl not provided:`,
        baseUrl
      );
      return null;
    }

    const response = await fetch(absoluteUrl, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status}`);
      return null;
    }

    const blob = await response.blob();

    // Convert blob to base64 data URL (works on both client and server)
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const mimeType = blob.type || "application/octet-stream";
    const dataUrl = `data:${mimeType};base64,${base64}`;

    return dataUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

/**
 * Transform ItemMaster and ProductMaster data to Product format
 */
async function transformItemMasterToProduct(
  item: ItemMaster,
  productMaster?: ProductMaster,
  mockProduct?: Product,
  token?: string | null,
  baseUrl?: string
): Promise<Product> {
  const todayParts = new Date().toISOString().split("T");
  const today: string = todayParts[0] || "";

  // Calculate delivery date from ItemMaster or ProductMaster
  let deliveryDate: string;
  if (productMaster?.estimated_delivery_days) {
    deliveryDate =
      new Date(
        Date.now() + productMaster.estimated_delivery_days * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0] || "";
  } else {
    deliveryDate =
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0] || "";
  }

  // Parse sub_category if it's a stringified JSON array
  let subCategory = [item.item_category || ""];
  if (item.sub_category) {
    try {
      subCategory = JSON.parse(item.sub_category);
    } catch {
      subCategory = [item.sub_category];
    }
  }

  // Determine image and images with priority:
  // 1. ProductMaster hero_image and images if available (stringified JSON arrays)
  // 2. Mock product images if available
  // 3. Placeholder image as fallback
  let image: string;
  let images: string[];

  // Parse hero_image (stringified JSON array)
  let heroImages: string[] = [];
  if (productMaster?.hero_image) {
    try {
      heroImages = JSON.parse(productMaster.hero_image);
      if (!Array.isArray(heroImages)) {
        heroImages = [];
      }
    } catch {
      heroImages = [];
    }
  }

  // Fetch hero images via GetPdfUrl API (handles ivdoc:// URLs)
  if (heroImages.length > 0 && token) {
    const fetchedHeroImages = await Promise.all(
      heroImages.map(async (img) => {
        if (img?.startsWith("ivdoc://")) {
          return await fetchImageAsDataUrl(img, token, baseUrl);
        }
        return img;
      })
    );
    // Filter out null URLs from failed fetches
    heroImages = fetchedHeroImages.filter((img) => img !== null) as string[];
  } else {
    // If no token, filter out ivdoc:// URLs
    heroImages = heroImages.filter((img) => !img?.startsWith("ivdoc://"));
  }

  // Parse images (stringified JSON array)
  let productImages: string[] = [];
  if (productMaster?.images) {
    try {
      productImages = JSON.parse(productMaster.images);
      if (!Array.isArray(productImages)) {
        productImages = [];
      }
    } catch {
      productImages = [];
    }
  }

  // Fetch product images via GetPdfUrl API (handles ivdoc:// URLs)
  if (productImages.length > 0 && token) {
    const fetchedProductImages = await Promise.all(
      productImages.map(async (img) => {
        if (img?.startsWith("ivdoc://")) {
          return await fetchImageAsDataUrl(img, token, baseUrl);
        }
        return img;
      })
    );
    // Filter out null URLs from failed fetches
    productImages = fetchedProductImages.filter(
      (img) => img !== null
    ) as string[];
  } else {
    // If no token, filter out ivdoc:// URLs
    productImages = productImages.filter((img) => !img?.startsWith("ivdoc://"));
  }

  // Determine primary image
  if (heroImages.length > 0 && heroImages[0]) {
    image = heroImages[0];
  } else if (productImages.length > 0 && productImages[0]) {
    image = productImages[0];
  } else if (mockProduct?.image) {
    image = mockProduct.image;
  } else {
    image = "/images/products/placeholder.webp";
  }

  // Determine images array
  if (productImages.length > 0) {
    images = productImages;
  } else if (mockProduct?.images) {
    images = mockProduct.images;
  } else {
    images = ["/images/products/placeholder.webp"];
  }

  const tag = mockProduct?.tag;

  // Parse features from ProductMaster if available
  let features: string[] = [];
  if (productMaster?.features) {
    try {
      features = JSON.parse(productMaster.features);
      if (!Array.isArray(features)) {
        features = [];
      }
    } catch {
      features = [];
    }
  }

  return {
    id: item.ROWID,
    sku: item.item_code,
    ROWID: item.ROWID,
    InfoveaveBatchId: item?.InfoveaveBatchId || 1,
    name: item.item_name,
    description: item.item_description,
    brand: productMaster?.brand || item.item_category,
    short_description: item.short_description,
    long_description: item.long_description,
    category: item.item_category,
    subCategory,
    features,
    tag,
    price: item.unit_price,
    original_price: productMaster?.orginal_price || item.unit_price * 1.2,
    sales_price: productMaster?.sales_price || item.unit_price,
    stock_in_hand: productMaster?.stock_in_hand || 0,
    minimum_order_quantity: productMaster?.minimum_order_quanity || 1,
    package_quantity: productMaster?.package_quantity || 1,
    is_excess: productMaster?.is_excess ? "true" : "false",
    is_obsolete: productMaster?.is_obsolete ? "true" : "false",
    image,
    images,
    estimated_delivery_date: deliveryDate,
    additional_info: productMaster?.additional_info || null,
    usage_policy: productMaster?.usage_policy || null,
    usage_description: productMaster?.usage_description || null,
    created_by: productMaster?.created_by || "system",
    updated_by: productMaster?.updated_by || "system",
    created_date: productMaster?.created_date || today,
    updated_date: productMaster?.updated_date || today,
  };
}

// Helper function to create product with all required fields
function createProduct(
  id: number,
  sku: string,
  name: string,
  description: string,
  features: string[],
  category: string,
  subCategory: string[],
  price: number,
  image: string,
  images: string[],
  stock_in_hand: number,
  minimum_order_quantity: number,
  tag?: "Promotions" | "New Products" | "Focus Products"
): Product {
  const todayParts = new Date().toISOString().split("T");
  const today: string = todayParts[0] || "";

  const deliveryDate: string =
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0] || "";

  return {
    id,
    sku,
    ROWID: id,
    InfoveaveBatchId: 1,
    name,
    description,
    brand: category,
    short_description: null,
    long_description: null,
    category,
    subCategory,
    features,
    tag,
    price,
    original_price: parseFloat((price * 1.2).toFixed(2)),
    sales_price: price,
    stock_in_hand: stock_in_hand,
    minimum_order_quantity: minimum_order_quantity,
    package_quantity: minimum_order_quantity,
    is_excess: "false",
    is_obsolete: "false",
    image,
    images,
    estimated_delivery_date: deliveryDate,
    additional_info: null,
    usage_policy: null,
    usage_description: null,
    created_by: "system",
    updated_by: "system",
    created_date: today,
    updated_date: today,
  };
}

// Mock data for products (derived from provided spreadsheet)
const MOCK_PRODUCTS: Product[] = [
  createProduct(
    1,
    "",
    "Green Dragon Teddy Bear",
    "Giant Green Dragon Teddy Bear for Toddlers. Encourages social interaction.",
    ["Soft plush", "Machine washable"],
    "Soft Toys",
    ["Teddy Bears"],
    15,
    "/images/products/green-dragon-teddy-bear.webp",
    ["/images/products/green-dragon-teddy-bear.webp"],
    120,
    1,
    "Focus Products"
  ),
  createProduct(
    2,
    "",
    "Blue Dinosaur Musical Instrument",
    "Animated Blue Dinosaur Musical Instrument for Ages 3+. Promotes hand-eye coordination.",
    ["Battery operated", "Light-up buttons"],
    "Musical Toys",
    ["Instruments"],
    20,
    "/images/products/blue-dinosaur-instrument.webp",
    ["/images/products/blue-dinosaur-instrument.webp"],
    80,
    1,
    "New Products"
  ),
  createProduct(
    3,
    "",
    "Gold Jungle Teddy Bear",
    "Fast Gold Jungle Teddy Bear Non-Toxic. Provides hours of entertainment.",
    ["Non-toxic materials", "Cuddly"],
    "Soft Toys",
    ["Teddy Bears"],
    15,
    "/images/products/gold-jungle-teddy-bear.jpg",
    ["/images/products/gold-jungle-teddy-bear.jpg"],
    95,
    1,
    "Promotions"
  ),
  createProduct(
    4,
    "",
    "Gold Dinosaur Musical Instrument",
    "Mini Gold Dinosaur Musical Instrument Easy to Assemble. Helps learn colors and shapes.",
    ["Educational", "Easy assembly"],
    "Musical Toys",
    ["Instruments"],
    20,
    "/images/products/gold-dinosaur-instrument.webp",
    ["/images/products/gold-dinosaur-instrument.webp"],
    60,
    1,
    "New Products"
  ),
  createProduct(
    5,
    "",
    "Orange Fantasy Action Figure",
    "Glowing Orange Fantasy Action Figure Easy to Assemble. Sparks creativity in children.",
    ["Poseable", "Glow-in-the-dark"],
    "Action Figures",
    ["Action Figures"],
    13,
    "/images/products/orange-fantasy-action-figure.webp",
    ["/images/products/orange-fantasy-action-figure.webp"],
    140,
    1,
    "Promotions"
  ),
  createProduct(
    6,
    "",
    "Green Dinosaur Race Car",
    "Flexible Green Dinosaur Race Car for Ages 3+. Perfect for imaginative play.",
    ["Flexible chassis", "Easy-grip"],
    "Vehicles",
    ["Cars"],
    17,
    "/images/products/green-dinosaur-race-car.webp",
    ["/images/products/green-dinosaur-race-car.webp"],
    110,
    1,
    "Focus Products"
  ),
  createProduct(
    7,
    "",
    "Navy Farm Tea Set",
    "Interactive Navy Farm Tea Set with Moving Parts. Promotes hand-eye coordination.",
    ["Interactive pieces", "Durable wood"],
    "Action Figures",
    ["Playsets"],
    12,
    "/images/products/navy-farm-tea-set.webp",
    ["/images/products/navy-farm-tea-set.webp"],
    70,
    1,
    "Promotions"
  ),
  createProduct(
    8,
    "",
    "Gold Castle Tea Set",
    "Wooden Gold Castle Tea Set 100-Piece Set. Encourages social interaction.",
    ["100-piece set", "Wooden pieces"],
    "Action Figures",
    ["Playsets"],
    12,
    "/images/products/gold-castle-tea-set.webp",
    ["/images/products/gold-castle-tea-set.webp"],
    50,
    1,
    "Focus Products"
  ),
  createProduct(
    9,
    "",
    "Navy Space Truck",
    "Wooden Navy Space Truck Easy to Assemble. Promotes hand-eye coordination.",
    ["Easy assembly", "Sturdy construction"],
    "Vehicles",
    ["Trucks"],
    18,
    "/images/products/navy-space-truck.webp",
    [
      "/images/products/navy-space-truck.webp",
      "/images/products/navy-space-truck-2.webp",
    ],
    65,
    1,
    "New Products"
  ),
  createProduct(
    10,
    "",
    "Teal City Art Kit",
    "Colorful Teal City Art Kit 100-Piece Set. Fun for the whole family.",
    ["100-piece kit", "Assorted colors"],
    "Art Kits",
    ["Kits"],
    19,
    "/images/products/teal-city-art-kit.webp",
    ["/images/products/teal-city-art-kit.webp"],
    55,
    1,
    "Focus Products"
  ),
  createProduct(
    11,
    "TY-107-E",
    "Teal Robot Robot",
    "Fuzzy Teal Robot Plushie with Moving Parts. Great for outdoor fun.",
    ["Fuzzy plush", "Moving parts"],
    "Robots",
    ["Robots"],
    27.99,
    "/images/products/teal-robot-robot.webp",
    ["/images/products/teal-robot-robot.webp"],
    85,
    1,
    "New Products"
  ),
  createProduct(
    12,
    "TY-090-F",
    "Blue Safari Building Blocks",
    "Soft Blue Safari Building Blocks Battery Operated. Ideal for naptime snuggles.",
    ["Battery operated", "Soft blocks"],
    "Art Kits",
    ["Kits"],
    22.99,
    "/images/products/blue-safari-building-blocks.webp",
    ["/images/products/blue-safari-building-blocks.webp"],
    72,
    1,
    "Focus Products"
  ),
  createProduct(
    13,
    "TY-893-P",
    "Rainbow Safari Tea Set",
    "Compact Rainbow Safari Tea Set for Ages 3+. Great for outdoor fun.",
    ["Compact design", "Age 3+"],
    "Art Kits",
    ["Kitchen Kits"],
    11.99,
    "/images/products/rainbow-safari-tea-set.webp",
    ["/images/products/rainbow-safari-tea-set.webp"],
    105,
    1,
    "Promotions"
  ),
  createProduct(
    14,
    "TY-182-V",
    "Orange Superhero Race Car",
    "Fast Orange Superhero Race Car Non-Toxic. Promotes hand-eye coordination.",
    ["Non-toxic", "Fast design"],
    "Vehicles",
    ["Cars"],
    16.99,
    "/images/products/orange-superhero-race-car.webp",
    ["/images/products/orange-superhero-race-car.webp"],
    98,
    1,
    "New Products"
  ),
  createProduct(
    15,
    "TY-747-C",
    "Red Castle Science Kit",
    "Durable Red Castle Science Kit Easy to Assemble. Sparks creativity in children.",
    ["Durable", "Easy assembly"],
    "Art Kits",
    ["Kits"],
    29.99,
    "/images/products/red-castle-science-kit.webp",
    ["/images/products/red-castle-science-kit.webp"],
    68,
    1,
    "Focus Products"
  ),
  createProduct(
    16,
    "TY-459-E",
    "Pink City Tea Set",
    "Mini Pink City Tea Set Battery Operated. Ideal for naptime snuggles.",
    ["Battery operated", "Mini set"],
    "Art Kits",
    ["Kits"],
    11.99,
    "/images/products/pink-city-tea-set.webp",
    ["/images/products/pink-city-tea-set.webp"],
    91,
    1,
    "Promotions"
  ),
  createProduct(
    17,
    "TY-480-G",
    "Multicolor City Truck",
    "Musical Multicolor City Truck 100-Piece Set. Fun for the whole family.",
    ["Musical", "100-piece set"],
    "Vehicles",
    ["Trucks"],
    17.99,
    "/images/products/multicolor-city-truck.webp",
    ["/images/products/multicolor-city-truck.webp"],
    76,
    1,
    "New Products"
  ),
  createProduct(
    18,
    "TY-700-Q",
    "Rainbow Jungle Robot",
    "Colorful Rainbow Jungle Robot with Carrying Case. Helps develop fine motor skills.",
    ["With carrying case", "Develops motor skills"],
    "Robots",
    ["Robots"],
    27.99,
    "/images/products/rainbow-jungle-robot.webp",
    ["/images/products/rainbow-jungle-robot.webp"],
    64,
    1,
    "Focus Products"
  ),
  createProduct(
    19,
    "TY-334-J",
    "Navy Jungle Board Game",
    "Plastic Navy Jungle Board Game with Storage Box. Sparks creativity in children.",
    ["Plastic build", "Storage box"],
    "Art Kits",
    ["Kits"],
    24.99,
    "/images/products/navy-jungle-board-game.webp",
    ["/images/products/navy-jungle-board-game.webp"],
    57,
    1,
    "Promotions"
  ),
  createProduct(
    20,
    "TY-263-E",
    "Orange Robot Train Set",
    "Lightweight Orange Robot Train Set with Sound Effects. Promotes hand-eye coordination.",
    ["Sound effects", "Lightweight"],
    "Art Kits",
    ["Kits"],
    34.99,
    "/images/products/orange-robot-train-set.webp",
    ["/images/products/orange-robot-train-set.webp"],
    51,
    1,
    "New Products"
  ),
  createProduct(
    21,
    "TY-935-H",
    "Navy Castle Race Car",
    "Flexible Navy Castle Race Car with Remote Control. Helps learn colors and shapes.",
    ["Remote control", "Flexible chassis"],
    "Vehicles",
    ["Cars"],
    16.99,
    "/images/products/navy-castle-race-car.webp",
    ["/images/products/navy-castle-race-car.webp"],
    82,
    1,
    "Focus Products"
  ),
  createProduct(
    22,
    "TY-207-Y",
    "Orange Safari Kitchen Set",
    "Compact Orange Safari Kitchen Set with Sound Effects. Promotes hand-eye coordination.",
    ["Sound effects", "Compact design"],
    "Art Kits",
    ["Kits"],
    39.99,
    "/images/products/orange-safari-kitchen-set.webp",
    ["/images/products/orange-safari-kitchen-set.webp"],
    48,
    1,
    "Promotions"
  ),
  createProduct(
    23,
    "TY-048-P",
    "Purple Robot Musical Instrument",
    "Fuzzy Purple Robot Musical Instrument with Carrying Case. Perfect for imaginative play.",
    ["Fuzzy plush", "With carrying case"],
    "Musical Toys",
    ["Instruments"],
    19.99,
    "/images/products/purple-robot-musical-instrument.webp",
    ["/images/products/purple-robot-musical-instrument.webp"],
    75,
    1,
    "New Products"
  ),
  createProduct(
    24,
    "TY-215-F",
    "Teal Unicorn Train Set",
    "Fuzzy Teal Unicorn Train Set Battery Operated. Great for outdoor fun.",
    ["Battery operated", "Fuzzy plush"],
    "Vehicles",
    ["Trains"],
    34.99,
    "/images/products/teal-unicorn-train-set.webp",
    ["/images/products/teal-unicorn-train-set.webp"],
    62,
    1,
    "Focus Products"
  ),
  createProduct(
    25,
    "TY-734-L",
    "Blue Fantasy Robot",
    "Mini Blue Fantasy Robot with Carrying Case. Fun for the whole family.",
    ["Mini", "With carrying case"],
    "Robots",
    ["Robots"],
    27.99,
    "/images/products/blue-fantasy-robot.webp",
    ["/images/products/blue-fantasy-robot.webp"],
    88,
    1,
    "Promotions"
  ),
  createProduct(
    26,
    "TY-619-T",
    "Orange Superhero Teddy Bear",
    "Durable Orange Superhero Teddy Bear with Light-up Eyes. Ideal for naptime snuggles.",
    ["Durable", "Light-up eyes"],
    "Soft Toys",
    ["Teddy Bears"],
    14.99,
    "/images/products/orange-superhero-teddy-bear.webp",
    ["/images/products/orange-superhero-teddy-bear.webp"],
    112,
    1,
    "New Products"
  ),
  createProduct(
    27,
    "TY-282-U",
    "Teal Space Play House",
    "Mini Teal Space Play House for Ages 3+. Perfect for imaginative play.",
    ["Mini design", "Age 3+"],
    "Art Kits",
    ["Kits"],
    49.99,
    "/images/products/teal-space-play-house.webp",
    ["/images/products/teal-space-play-house.webp"],
    42,
    1,
    "Focus Products"
  ),
  createProduct(
    28,
    "TY-935-P",
    "Crimson Dragon Doll",
    "Shiny Crimson Dragon Doll 100-Piece Set. Ideal for naptime snuggles.",
    ["Shiny finish", "100-piece set"],
    "Soft Toys",
    ["Dolls"],
    13.99,
    "/images/products/crimson-dragon-doll.webp",
    [
      "/images/products/crimson-dragon-doll.webp",
      "/images/products/crimson-dragon-doll-2.webp",
    ],
    96,
    1,
    "Promotions"
  ),
  createProduct(
    29,
    "TY-839-I",
    "Crimson Princess Science Kit",
    "Educational Crimson Princess Science Kit 100-Piece Set. Encourages social interaction.",
    ["Educational", "100-piece kit"],
    "Art Kits",
    ["Kits"],
    29.99,
    "/images/products/crimson-princess-science-kit.webp",
    ["/images/products/crimson-princess-science-kit.webp"],
    69,
    1,
    "New Products"
  ),
  createProduct(
    30,
    "TY-867-E",
    "Rainbow Superhero Truck",
    "Lightweight Rainbow Superhero Truck Non-Toxic. Great for outdoor fun.",
    ["Lightweight", "Non-toxic"],
    "Vehicles",
    ["Trucks"],
    17.99,
    "/images/products/rainbow-superhero-truck.webp",
    ["/images/products/rainbow-superhero-truck.webp"],
    79,
    1,
    "Focus Products"
  ),
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

export async function fetchProductMaster(
  token: string | null
): Promise<ProductMaster[]> {
  const body = {
    table: "product_master",
    skip: 0,
    take: 500,
    NGaugeId: "73",
  };

  try {
    const response = await fetch(PRODUCT_MASTER, {
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
      console.warn("No data returned from product master API");
      return [];
    }

    return data.data as ProductMaster[];
  } catch (error) {
    console.error("Error fetching product master:", {
      url: PRODUCT_MASTER,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

/**
 * Fetch products from ItemMaster and ProductMaster APIs and transform to Product format
 */
export async function fetchNguageProductsFromMaster(
  token: string | null,
  baseUrl?: string
): Promise<Product[]> {
  try {
    // Fetch both ItemMaster and ProductMaster in parallel
    const [items, productMasters] = await Promise.all([
      fetchItemMaster(token),
      fetchProductMaster(token),
    ]);

    // Create a map of ProductMaster by item_code for quick lookup
    const productMasterMap = new Map(
      productMasters.map((pm) => [pm.item_code, pm])
    );

    // Transform ItemMaster items and merge with corresponding ProductMaster data and mock product images
    const products = await Promise.all(
      items.map((item) => {
        const productMaster = productMasterMap.get(item.item_code);
        // Find matching mock product by name for image mapping
        const mockProduct = MOCK_PRODUCTS.find(
          (p) => p.name.toLowerCase() === item.item_name.toLowerCase()
        );
        return transformItemMasterToProduct(
          item,
          productMaster,
          mockProduct,
          token,
          baseUrl
        );
      })
    );
    return products;
  } catch (error) {
    console.error("Error fetching products from master APIs:", error);
    throw error;
  }
}

export async function fetchNguageProducts(
  token: string | null,
  baseUrl?: string
): Promise<Product[]> {
  try {
    // Try to fetch from ItemMaster API
    return await fetchNguageProductsFromMaster(token, baseUrl);
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
  token: string | null,
  baseUrl?: string
): Promise<Product> {
  try {
    // Try to fetch from ItemMaster API
    const products = await fetchNguageProductsFromMaster(token, baseUrl);
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
