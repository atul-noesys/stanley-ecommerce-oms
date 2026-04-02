import { makeAutoObservable, runInAction } from "mobx";

export function numberFormatter(value: number) {
  // Convert the number to a string and split into integer and decimal parts
  const numStr = value.toString();
  const parts = numStr.split(".");
  let integerPart = parts[0] ?? "";
  const decimalPart = parts.length > 1 ? "." + parts[1] : "";

  // Handle negative numbers
  let sign = "";
  if (integerPart.startsWith("-")) {
    sign = "-";
    integerPart = integerPart.substring(1);
  }

  // Format the integer part according to Indian numbering system
  let lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);

  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
  }

  let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  // Remove leading comma if any
  result = result.replace(/^,/, "");

  // Combine all parts
  return sign + result + decimalPart;
}

//Find Upcoming Delivery Date
export function getFutureDeliveryDate(days: number): {
  date: string;
  weekDay: string;
} {
  // Get current date
  const currentDate = new Date();

  // Add the specified number of days
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + days);

  // Format the date as DD-MM-YYYY
  const day = String(futureDate.getDate()).padStart(2, "0");
  const month = String(futureDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = futureDate.getFullYear();

  // Get day of week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[futureDate.getDay()];

  return { date: `${day}-${month}-${year}`, weekDay: dayOfWeek ?? "" };
}

export type Product = {
  // Identifiers
  id: number;
  sku: string;
  ROWID: number;
  InfoveaveBatchId: number;

  // Basic Info
  name: string;
  description: string;
  brand: string;
  short_description: string | null;
  long_description: string | null;

  // Product Classification
  category: string;
  subCategory: string[];
  features: string[];
  tag?: "Promotions" | "New Products" | "Focus Products";

  // Pricing
  price: number;
  original_price: number;
  sales_price: number;

  // Inventory
  stock_in_hand: number;
  minimum_order_quantity: number;
  package_quantity: number;

  // Status
  is_excess: string;
  is_obsolete: string;

  // Images & Media
  image: string;
  images: string[];

  // Delivery & Logistics
  estimated_delivery_date: string;

  // Additional Info
  additional_info: string | null;
  usage_policy: string | null;
  usage_description: string | null;

  // Audit Trail
  created_by: string;
  updated_by: string;
  created_date: string;
  updated_date: string;
};

export type UserInfo = {
  code: number;
  name: string;
  contact: number;
  creditLimit: number;
  availableLimit: number;
  overdue: number;
};

type FindUploadedProducts = Product & {
  quantity: number;
};

export type Cart = Pick<
  Product,
  "sku" | "price" | "image" | "stock_in_hand" | "minimum_order_quantity"
> & {
  productName: string;
  quantity: number;
  back_order: number;
};

type UploadData = Pick<Product, "sku"> & {
  quantity: number;
};

export type ProductListType =
  | "accessories"
  | "focusProducts"
  | "handTools"
  | "outdoor"
  | "powerTools"
  | "storage"
  | "workspace"
  | "promotion"
  | "newProducts";
  
type SortKey = "name:asc" | "name:desc" | "price:asc" | "price:desc";

export class ProductStore {
  count = 0;
  accessories: Product[] = [];
  handTools: Product[] = [];
  outdoor: Product[] = [];
  powerTools: Product[] = [];
  storage: Product[] = [];
  workspace: Product[] = [];
  focusProducts: Product[] = [];
  promotion: Product[] = [];
  newProducts: Product[] = [];
  skuSearchList: Product[] = [];
  accessoriesResetList: Product[] = [];
  handToolsResetList: Product[] = [];
  outdoorResetList: Product[] = [];
  powerToolsResetList: Product[] = [];
  storageResetList: Product[] = [];
  workspaceResetList: Product[] = [];
  focusProductsResetList: Product[] = [];
  promotionResetList: Product[] = [];
  newProductsResetList: Product[] = [];

  currentFilter: string | null = null;
  cart: Cart[] = [];
  uploadData: UploadData[] = [];
  userInfo: UserInfo = {
    code: 1305431,
    name: "Ethan Carter",
    contact: 7458962879,
    creditLimit: 12100,
    availableLimit: 0,
    overdue: 0,
  };

  openChangeCustomerModal: boolean = false;

  //fetch
  isLoading = true;
  error: string | null = null;

  //All products Category
  allProductCategories: string[] = [];
  allProductTags: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Add this method to initialize with data
  setProductsFromGraphQL(products: Product[]) {
    runInAction(() => {
      this.skuSearchList = products;

      this.accessories = products.filter(
        (product) => product.category === "Accessories",
      );
      this.handTools = products.filter(
        (product) => product.category === "Hand Tools",
      );
      this.outdoor = products.filter(
        (product) => product.category === "Outdoor",
      );
      this.powerTools = products.filter(
        (product) => product.category === "Power Tools",
      );
      this.storage = products.filter(
        (product) => product.category === "Storage",
      );
      this.workspace = products.filter(
        (product) => product.category === "Workspace",
      );
      this.focusProducts = products.filter(
        (product: Product) => product.tag === "Focus Products",
      );
      this.promotion = products.filter(
        (product: Product) => product.tag === "Promotions",
      );
      this.newProducts = products.filter(
        (product: Product) => product.tag === "New Products",
      );

      //Reset List
      this.accessoriesResetList = products.filter(
        (product) => product.category === "Accessories",
      );
      this.handToolsResetList = products.filter(
        (product) => product.category === "Hand Tools",
      );
      this.outdoorResetList = products.filter(
        (product) => product.category === "Outdoor",
      );
      this.powerToolsResetList = products.filter(
        (product) => product.category === "Power Tools",
      );
      this.storageResetList = products.filter(
        (product) => product.category === "Storage",
      );
      this.workspaceResetList = products.filter(
        (product) => product.category === "Workspace",
      );
      this.focusProductsResetList = products.filter(
        (product: Product) => product.tag === "Focus Products",
      );
      this.promotionResetList = products.filter(
        (product: Product) => product.tag === "Promotions",
      );
      this.newProductsResetList = products.filter(
        (product: Product) => product.tag === "New Products",
      );

      //setting all products categories - Menu
      this.allProductCategories = [
        ...new Set(products.map((product) => product.category)),
      ];
      this.allProductTags = [
        ...new Set(
          products.map((product) => product.tag).filter((tag) => tag != null),
        ),
      ];

      this.isLoading = false;
      this.error = null;
    });
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  //Change customer Modal
  closeModal() {
    this.openChangeCustomerModal = false;
  }

  openModal() {
    this.openChangeCustomerModal = true;
  }

  //User Info
  get UserInfo(): UserInfo {
    return this.userInfo;
  }

  set UserInfo(user: UserInfo) {
    this.userInfo = user;
  }

  // New sorting function
  sortProducts(listType: ProductListType, sortKey: SortKey) {
    const [field, direction] = sortKey.split(":") as [
      keyof Product,
      "asc" | "desc",
    ];

    this[listType].sort((a, b) => {
      // Name Sorting
      if (typeof a[field] === "string" && typeof b[field] === "string") {
        const valA = String(a[field]).toLowerCase();
        const valB = String(b[field]).toLowerCase();
        return direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      // Price Sorting
      else if (typeof a[field] === "number" && typeof b[field] === "number") {
        return direction === "asc"
          ? Number(a[field]) - Number(b[field])
          : Number(b[field]) - Number(a[field]);
      }
      // Fallback for other types
      return 0;
    });
  }

  // Add this method to your ProductStore class
  filterProducts(
    productTypes: string[],
    priceRange: [number, number],
    stockFilters: string[],
  ) {
    // Helper function to apply filters to a product list
    const applyFilters = (products: Product[]) => {
      return products.filter((product) => {
        // Filter by product type (subCategory)
        const typeMatch =
          productTypes.length === 0 ||
          product.subCategory?.some((cat) => productTypes.includes(cat));

        // Filter by price range
        const priceMatch =
          product.price >= priceRange[0] && product.price <= priceRange[1];

        // Filter by stock availability
        let stockMatch = true;
        if (stockFilters.length > 0) {
          if (stockFilters.includes("In Stock")) {
            stockMatch = product.stock_in_hand > 0;
          }
          if (stockFilters.includes("Back Order")) {
            stockMatch = product.stock_in_hand === 0;
          }
          if (stockFilters.includes("Out of Stock")) {
            stockMatch = product.stock_in_hand === -1;
          }
        }

        return typeMatch && priceMatch && stockMatch;
      });
    };

    // Apply filters to all relevant product lists
    runInAction(() => {
      this.accessories = applyFilters(this.accessoriesResetList);
      this.handTools = applyFilters(this.handToolsResetList);
      this.outdoor = applyFilters(this.outdoorResetList);
      this.powerTools = applyFilters(this.powerToolsResetList);
      this.storage = applyFilters(this.storageResetList);
      this.workspace = applyFilters(this.workspaceResetList);
      this.focusProducts = applyFilters(this.focusProductsResetList);
      this.newProducts = applyFilters(this.newProductsResetList);
      this.promotion = applyFilters(this.promotionResetList);
    });
  }

  //Cart
  handleIncrementOrDecrement = (sku: string, newQuantity: number) => {
    const product = this.cart.find((p) => p.sku === sku);
    if (product) {
      if (newQuantity > product.stock_in_hand * 2) {
        newQuantity = product.stock_in_hand * 2;
      }

      product.quantity = Math.max(1, newQuantity);
      if (newQuantity > product.stock_in_hand) {
        product.back_order = newQuantity - product.stock_in_hand;
      }
    }
  };

  handleInputQuantityChange = (
    sku: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = parseInt(e.target.value);
    const product = this.cart.find((p) => p.sku === sku);
    if (!isNaN(value) && product && value >= product.minimum_order_quantity) {
      value = Math.round(value / product.minimum_order_quantity) * product.minimum_order_quantity;
      if (value > product.stock_in_hand * 2) {
        value = product.stock_in_hand * 2;
      }

      product.quantity = value;
      if (value > product.stock_in_hand) {
        product.back_order = value - product.stock_in_hand;
      } else {
        product.back_order = 0;
      }
    }
  };

  addProductInTheCart = (product: Cart) => {
    const existingProduct = this.cart.find((p) => p.sku === product.sku);
    if (existingProduct) {
      existingProduct.quantity = existingProduct.quantity + product.quantity;
    } else {
      this.cart.push(product);
    }
  };

  bulkAddProductsToCart = (products: Cart[]) => {
    products.forEach((product) => {
      const existingProduct = this.cart.find((p) => p.sku === product.sku);
      if (existingProduct) {
        //When quantity is maximum of twice the stock on hand (stock_in_hand)
        if (
          existingProduct.quantity + product.quantity >
          existingProduct.stock_in_hand * 2
        ) {
          existingProduct.quantity = existingProduct.stock_in_hand * 2;
          existingProduct.back_order = existingProduct.stock_in_hand;
        }
        const existingProductQuantity =
          existingProduct.quantity + product.quantity;
        existingProduct.quantity = existingProductQuantity;
        if (existingProduct.quantity - existingProduct.stock_in_hand > 0) {
          existingProduct.back_order =
            existingProduct.quantity - existingProduct.stock_in_hand;
        }
      } else {
        this.cart.push(product);
      }
    });
  };

  removeProductFromTheCart = (sku: string) => {
    this.cart = this.cart.filter((product) => product.sku !== sku);
  };

  get CartTotal() {
    return this.cart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0,
    );
  }

  get CartTotalItems() {
    return this.cart.reduce((sum, product) => sum + product.quantity, 0);
  }

  //Upload Data
  set UploadedData(data: UploadData[]) {
    this.uploadData = data;
  }

  get UploadedData() {
    return this.uploadData;
  }

  get getAllSKUs(): string[] {
    return this.skuSearchList.map((product) => product.sku);
  }

  findUploadedProductsFromAllProducts(
    uploadData: UploadData[],
  ): FindUploadedProducts[] {
    const uploadDataMap = new Map<string, number>();
    uploadData.forEach((item) => {
      uploadDataMap.set(item.sku, item.quantity);
    });

    return this.skuSearchList
      .filter((product) => uploadDataMap.has(product.sku))
      .map((product) => ({
        ...product, // spread all product properties
        quantity: uploadDataMap.get(product.sku)!, // add quantity
      }));
  }

  //Notify ME
  notifyMe(productName: string) {
    console.log(
      `Thanks! We’ll notify you as soon as "${productName}" is back in stock.`,
    );
  }
}
