"use client";
import Loading from "@/app/loading";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_NGUAGE_PRODUCTS = gql`
  query GetNguageProducts {
    nguageProducts {
      product_id
      sku
      brand
      name
      description
      sales_price
      stock_in_hand
      minimum_order_quantity
    }
  }
`;

type NguageProduct = {
  product_id: string;
  sku: string;
  brand: string;
  name: string;
  description: string;
  sales_price: number;
  stock_in_hand: number;
  minimum_order_quantity: number;
};

type GetNguageProductsResponse = {
  nguageProducts: NguageProduct[];
};

export default function NguageProductsPage() {
  const { loading, error, data } =
    useQuery<GetNguageProductsResponse>(GET_NGUAGE_PRODUCTS);

  if (loading) return <Loading />;
  if (error) return <p>Error 😢 {error.message}</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {(data as GetNguageProductsResponse)?.nguageProducts.map((p) => (
        <div
          key={`${p.product_id}-${p.sku}`}
          className="border rounded-lg p-4 shadow"
        >
          <h2 className="font-bold text-lg">{p.name}</h2>
          <p className="text-sm text-gray-600">{p.brand}</p>
          <p>💲 {p.sales_price}</p>
          <p>📦 Stock: {p.stock_in_hand}</p>
          <p>MOQ: {p.minimum_order_quantity}</p>
        </div>
      ))}
    </div>
  );
}
