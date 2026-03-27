import { useQuery } from "@apollo/client/react";
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GetProductsResponse,
  GetProductByIdResponse,
  GetProductByIdVariables,
} from "@/lib/graphql/queries";

export const useProducts = () => {
  const { loading, error, data, refetch } = useQuery<GetProductsResponse>(
    GET_PRODUCTS,
    {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    }
  );

  return {
    products: data?.products || [],
    loading,
    error,
    refetch,
  };
};

export const useProductById = (id: string | null | undefined) => {
  const { loading, error, data, refetch } = useQuery<
    GetProductByIdResponse,
    GetProductByIdVariables
  >(GET_PRODUCT_BY_ID, {
    variables: { id: id || "" },
    skip: !id,
    fetchPolicy: "cache-first",
    errorPolicy: "all",
  });

  return {
    product: data?.product || null,
    loading,
    error,
    refetch,
  };
};
