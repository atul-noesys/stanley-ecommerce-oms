// app/api/graphql/route.ts
import { ProductMappingFromApi } from "@/api/product-mapping";
import {
  fetchNguageProducts,
  fetchNguageProductsCategory,
  fetchNguageProductsCategoryMapping,
  fetchNguageProductsFeatures,
  fetchNguageProductsImageMapping,
  fetchNguageProductsImages,
} from "@/api/service";
import { productsJSON } from "@/data/productData";
import { Product } from "@/store/product-store";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";

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

// ---------------- Resolvers ----------------
const resolvers = {
  Query: {
    products: async (_: any, __: any, context: any) => {
      const [
        nguageProducts,
        nguageProductCategory,
        nguageProductCategoryMapping,
        AllFeatures,
        nguageProductImages,
        nguageProductImageMapping,
      ] = await Promise.all([
        fetchNguageProducts(context.token),
        fetchNguageProductsCategory(context.token),
        fetchNguageProductsCategoryMapping(context.token),
        fetchNguageProductsFeatures(context.token),
        fetchNguageProductsImages(context.token),
        fetchNguageProductsImageMapping(context.token),
      ]);

      const products: Product[] = nguageProducts.map((pro) =>
        ProductMappingFromApi(
          pro,
          nguageProductCategory,
          nguageProductCategoryMapping,
          AllFeatures,
          nguageProductImages,
          nguageProductImageMapping
        )
      );

      return products;
    },

    product: async (_: any, { id }: { id: number }, context: any) => {
      console.log("Auth Token:", context.token);
      return productsJSON.find((p) => p.id === id) || null;
    },

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
