// app/api/graphql/route.ts
import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { productsJSON } from "@/data/productData";
import { Product } from "@/store/product-store";

const NGUAGE_API_URL =
  "https://nooms.infoveave.app/api/v10/ngauge/forms/26/get-data";
const NGUAGE_API_FEATURE_URL =
  "https://nooms.infoveave.app/api/v10/ngauge/forms/19/get-data";
const NGUAGE_API_CATEGORY_URL =
  "https://nooms.infoveave.app/api/v10/ngauge/forms/18/get-data";
const NGUAGE_API_CATEGORY_MAPPING_URL =
  "https://nooms.infoveave.app/api/v10/ngauge/forms/28/get-data";

interface NguageProduct {
  product_id: string;
  sku: string;
  brand: string;
  is_excess: string;
  is_obsolete: string;
  name: string;
  description: string;
  original_price: number;
  sales_price: number;
  estimated_delivery_date: string;
  package_quantity: number;
  image_id: number;
  stock_in_hand: number;
  minimum_order_quantity: number;
  created_by: string;
  updated_by: string;
  created_date: string;
  updated_date: string;
  InfoveaveBatchId: number;
  short_description: null | string;
  long_description: null | string;
  additional_info: null | string;
  usage_policy: null | string;
  usage_description: null | string;
  ROWID: number;
}

interface NguageFeatures {
  feature_id: string;
  product_id: string;
  feature_text: string;
  created_by: string;
  updated_by: string;
  created_date: string;
  updated_date: string;
  InfoveaveBatchId: number;
  ROWID: number;
}
interface NguageCategory {
  category_id: string;
  category_name: string;
  created_by: string;
  updated_by: string;
  created_date: string;
  updated_date: string;
  parent_id: string;
  InfoveaveBatchId: number;
  ROWID: number;
}

interface NguageCategoryMapping {
  product_id: string;
  category_id: string;
  created_by: string;
  updated_by: string;
  created_date: string;
  updated_date: string;
  InfoveaveBatchId: number;
  ROWID: number;
}

const typeDefs = gql`
  type Product {
    id: ID!
    sku: String!
    name: String!
    description: String
    features: [String]
    category: String!
    subCategory: [String!]!
    price: Float!
    image: String
    images: [String!]!
    soh: Int!
    moq: Int!
    tag: String
  }

  type NguageProduct {
    product_id: ID!
    sku: String
    brand: String
    is_excess: String
    is_obsolete: String
    name: String
    description: String
    original_price: Float
    sales_price: Float
    estimated_delivery_date: String
    package_quantity: Int
    image_id: Int
    stock_in_hand: Int
    minimum_order_quantity: Int
    created_by: String
    updated_by: String
    created_date: String
    updated_date: String
    InfoveaveBatchId: Int
    ROWID: Int
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
    nguageProducts: [NguageProduct!]!
  }
`;

async function fetchNguageProducts(token: string | null) {
  const body = {
    table: "oms_product",
    skip: 0,
    take: 200,
    NGaugeId: "26",
  };

  const response = await fetch(NGUAGE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch NGauge products: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data as NguageProduct[];
}

async function fetchNguageProductsFeatures(token: string | null) {
  const body = {
    table: "oms_productfeature",
    skip: 0,
    take: 1000,
    NGaugeId: "19",
  };

  const response = await fetch(NGUAGE_API_FEATURE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch NGauge products: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data as NguageFeatures[];
}

async function fetchNguageProductsCategory(token: string | null) {
  const body = {
    table: "oms_productcategory",
    skip: 0,
    take: 1000,
    NGaugeId: "18",
  };

  const response = await fetch(NGUAGE_API_CATEGORY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch NGauge Category: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data as NguageCategory[];
}

async function fetchNguageProductsCategoryMapping(token: string | null) {
  const body = {
    table: "oms_productcatmapping",
    skip: 0,
    take: 1000,
    NGaugeId: "28",
  };

  const response = await fetch(NGUAGE_API_CATEGORY_MAPPING_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch NGauge Category: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data as NguageCategoryMapping[];
}

// ---------------- Resolvers ----------------
const resolvers = {
  Query: {
    products: async (_: any, __: any, context: any) => {
      const [
        nguageProducts,
        nguageProductCategory,
        nguageProductCategoryMapping,
        AllFeatures,
      ] = await Promise.all([
        fetchNguageProducts(context.token),
        fetchNguageProductsCategory(context.token),
        fetchNguageProductsCategoryMapping(context.token),
        fetchNguageProductsFeatures(context.token),
      ]);

      const products: Product[] = nguageProducts.map((pro) => {
        const mapping = nguageProductCategoryMapping.find(
          (m) => m.product_id.toString() === pro.product_id.toString()
        );

        // The mapped category is the subCategory
        const subCategory = mapping
          ? nguageProductCategory.find(
              (c) => c.category_id.toString() === mapping.category_id.toString()
            )
          : null;

        // The parent of subCategory is the main category
        const mainCategory =
          subCategory && subCategory.parent_id
            ? nguageProductCategory.find(
                (c) =>
                  c.category_id.toString() === subCategory.parent_id.toString()
              )
            : null;

        const matchingProduct = productsJSON.find(
          (e) => e.id.toString() === pro.product_id.toString()
        );

        const productFeatures = AllFeatures.filter(
          (feature) =>
            feature.product_id.toString() === pro.product_id.toString()
        ).map((feature) => feature.feature_text);

        return {
          id: Number(pro.product_id),
          sku: pro.sku,
          name: pro.name,
          description: pro.description,
          features: productFeatures,
          category: mainCategory ? mainCategory.category_name : "Uncategorized",
          subCategory: subCategory ? [subCategory.category_name] : [],
          price: pro.original_price,
          image: matchingProduct ? matchingProduct.image : "",
          images: matchingProduct ? matchingProduct.images : [],
          soh: pro.stock_in_hand,
          moq: pro.minimum_order_quantity,
          tag: matchingProduct ? matchingProduct.tag : "Focused",
        };
      });

      return products;
    },

    product: async (_: any, { id }: { id: number }, context: any) => {
      console.log("Auth Token:", context.token);
      return productsJSON.find((p) => p.id === id) || null;
    },

    // Raw NGauge product queries
    nguageProducts: async (_: any, __: any, context: any) => {
      const nguageProducts = await fetchNguageProducts(context.token);
      return nguageProducts;
    },
  },
};

// ---------------- Apollo Server Setup ----------------
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "") || null;

    return { token };
  },
});

export async function POST(req: NextRequest) {
  return handler(req);
}

export async function GET(req: NextRequest) {
  return handler(req);
}
