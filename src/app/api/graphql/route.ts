import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { productsJSON } from "@/data/productData";

// 1. Define schema based on Product type
const typeDefs = gql`
  type Product {
    id: ID!
    sku: String!
    name: String!
    description: String
    features: [String!]!
    category: String!
    subCategory: [String!]!
    price: Float!
    image: String
    images: [String!]!
    soh: Int!
    moq: Int!
    tag: String
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }
`;

// 2. Define resolvers
const resolvers = {
  Query: {
    products: () => {
      return productsJSON;
    },
    product: async (_: any, { id }: { id: number }) => {
      return productsJSON.find((p) => p.id === id) || null;
    },
  },
};

// 3. Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 4. Create Next.js handler
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ token: req.headers.get("authorization") }),
});

export async function POST(req: NextRequest) {
  return handler(req);
}

export async function GET(req: NextRequest) {
  return handler(req);
}
