// src/app/StoreInitializer.tsx
"use client";

import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useStore } from "@/store/store-context";
import { Product } from "@/store/product-store";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";

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

const StoreInitializer = observer(
  ({ children }: { children: React.ReactNode }) => {
    const { loading, error, data } =
      useQuery<GetProductsResponse>(GET_PRODUCTS);
    const { productStore } = useStore();
    const router = useRouter();

    useEffect(() => {
      if (data) {
        productStore.setProductsFromGraphQL(data.products);
      }

      if (error) {
        if (error.message.includes("Unauthorized")) {
          productStore.setProductsFromGraphQL([]);
          router.push("/login");
        } else {
          productStore.setError(error.message);
        }
      }
    }, [data, error, productStore, router]);

    if (productStore.isLoading) {
      return <Loading />;
    }

    if (loading) return <Loading />;
    if (error && !error.message.includes("Unauthorized"))
      return <p>Error 😢 {error.message}</p>;

    return <>{children}</>;
  }
);

export default StoreInitializer;
