"use client";

import Loading from "@/app/loading";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/store/product-store";
import { useQuery } from "@apollo/client/react";
import gql from "graphql-tag";

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

const relatedProductsSection = () => {
  const { loading, error, data } = useQuery<GetProductsResponse>(GET_PRODUCTS);

  if (loading) return <Loading />;
  if (error && !error.message.includes("Unauthorized"))
    return <p>Error 😢 {error.message}</p>;

  return (
    <section>
      <div>
        <div className=" mb-6">
          <h2 className="text-2xl font-semibold">
            Check out These Related Products
          </h2>
        </div>
        <div>
          <ul className="grid grid-cols-12 gap-3">
            {data?.products.filter(e => e.category === "Accessories").slice(0, 6).map((product) => (
              <li
                key={product.name}
                className="col-span-12 md:col-span-4 lg:col-span-2"
              >
                <ProductCard className="w-full" {...product} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default relatedProductsSection;
