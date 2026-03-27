import { fetchNguageProducts, fetchNguageProductById } from "@/api/service";
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
      try {
        const products = await fetchNguageProducts(context.token);

        if (!products || !Array.isArray(products)) {
          throw new Error("Invalid products data received from API");
        }

        return products;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error(
          `Failed to fetch products: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    },

    product: async (_: any, { id }: { id: string }, context: any) => {
      try {
        if (!id) {
          throw new Error("Product ID is required");
        }

        const product = await fetchNguageProductById(id, context.token);
        if (!product) {
          throw new Error(`Product with ID ${id} not found`);
        }
        return product;
      } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw new Error(
          `Failed to fetch product: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    },

    nguageProducts: async (_: any, __: any, context: any) => {
      try {
        const nguageProducts = await fetchNguageProducts(context.token);
        if (!nguageProducts || !Array.isArray(nguageProducts)) {
          throw new Error("Invalid nguage products data received from API");
        }
        return nguageProducts;
      } catch (error) {
        console.error("Error fetching nguage products:", error);
        throw new Error(
          `Failed to fetch nguage products: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    },
  },
};

// ---------------- Apollo Server Setup ----------------
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (formattedError, error) => {
    console.error("GraphQL Error:", {
      message: formattedError.message,
      locations: formattedError.locations,
      path: formattedError.path,
      originalError: error,
    });
    return formattedError;
  },
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "") || null;
    return { token };
  },
});

export async function POST(req: NextRequest) {
  try {
    return await handler(req);
  } catch (error) {
    console.error("POST /api/graphql error:", error);
    return new Response(
      JSON.stringify({
        errors: [
          {
            message:
              error instanceof Error ? error.message : "Internal server error",
          },
        ],
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    return await handler(req);
  } catch (error) {
    console.error("GET /api/graphql error:", error);
    return new Response(
      JSON.stringify({
        errors: [
          {
            message:
              error instanceof Error ? error.message : "Internal server error",
          },
        ],
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
