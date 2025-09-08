// app/api/graphql/route.ts
import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { productsJSON } from "@/data/productData";

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

const resolvers = {
  Query: {
    products: (_: any, __: any, context: any) => {
      console.log("Auth Token:", context.token);
      return productsJSON;
    },
    product: async (_: any, { id }: { id: number }, context: any) => {
      console.log("Auth Token:", context.token);
      return productsJSON.find((p) => p.id === id) || null;
    },
  },
};

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
