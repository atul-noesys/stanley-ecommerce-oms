"use client";
import Loading from "@/app/loading";
import { Product } from "@/store/product-store";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

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
      stock_in_hand
      minimum_order_quantity
      tag
    }
  }
`;

type GetProductsResponse = {
  products: Product[];
};

export default function NguageProductsPage() {
 const { loading, error, data } =
       useQuery<GetProductsResponse>(GET_PRODUCTS);

  if (loading) return <Loading />;
  if (error) return <p>Error {error.message}</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {(data as GetProductsResponse)?.products.map((p) => (
        <div
          key={`${p.id}-${p.sku}`}
          className="border rounded-lg p-4 shadow"
        >
          <h2 className="font-bold text-lg">{p.name}</h2>
          <p>💲 {p.category}</p>
          <p>MOQ: {p.minimum_order_quantity}</p>
        </div>
      ))}
    </div>
  );
}
