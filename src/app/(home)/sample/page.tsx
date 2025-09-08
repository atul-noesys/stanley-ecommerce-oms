"use client";

import Loading from "@/app/loading";
import { Product } from "@/store/product-store";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

// 1. Define GraphQL query
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

export default function ProductsPage() {
  const { loading, error, data } = useQuery<GetProductsResponse>(GET_PRODUCTS);

  if (loading) return <Loading />;
  if (error) return <p>Error 😢 {error.message}</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data?.products.map((p) => (
        <div key={p.id} className="border rounded-lg p-4 shadow">
          <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
          <h2 className="font-bold text-lg">{p.name}</h2>
          <p>💲 {p.price}</p>
        </div>
      ))}
    </div>
  );
}
