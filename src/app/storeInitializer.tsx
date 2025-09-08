// src/app/StoreInitializer.tsx
"use client";

import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useStore } from "@/store/store-context";
import { Product } from "@/store/product-store";
import Loading from "./loading";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      sku
      name
      description
      features
      category
      subCategory
      price
      image
      images
      soh
      moq
      tag
    }
  }
`;

type GetProductsResponse = {
  products: Product[];
};

export default function StoreInitializer({ children }: { children: React.ReactNode }) {
  const { loading, error, data } = useQuery<GetProductsResponse>(GET_PRODUCTS);
  const { productStore } = useStore();

  useEffect(() => {
    if (data) {
      productStore.setProductsFromGraphQL(data.products);
    }
  }, [data, productStore]);

  if (loading) return <Loading />;
  if (error) return <p>Error 😢 {error.message}</p>;

  return <>{children}</>;
}