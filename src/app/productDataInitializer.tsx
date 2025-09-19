"use client";

import { Product } from "@/store/product-store";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

const ProductDataInitializer = ({ children }: { children: React.ReactNode }) => {
  const { loading, error, data } = useQuery<GetProductsResponse>(GET_PRODUCTS);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      if (error.message.includes("Unauthorized")) {
        router.push("/login");
      } else {
        router.push("/");
      }
    }
  }, [data, error, router]);

  if (loading) return <Loading />;
  if (error && !error.message.includes("Unauthorized"))
    return <p>Error 😢 {error.message}</p>;

  return <>{children}</>;
};

export default ProductDataInitializer;
