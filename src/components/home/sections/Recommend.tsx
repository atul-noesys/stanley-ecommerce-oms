"use client";

import Loading from "@/app/loading";
import ProductCardSmall from "@/components/products/ProductCardSmall";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { Product } from "@/store/product-store";
import { useQuery } from "@apollo/client/react";
import gql from "graphql-tag";
import { useState } from "react";

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

const RecommendedSection = () => {
  const { loading, error, data } = useQuery<GetProductsResponse>(GET_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("Accessories");

  if (loading) return <Loading />;
  if (error) return <p>Error 😢 {error.message}</p>;

  const categories = [...new Set(data?.products.map((product) => product.category))]
    .sort((a, b) => a.localeCompare(b));

  const filteredProducts = data?.products.filter(
    (product) => product.category === selectedCategory
  ) || [];

  return (
    <section>
      <div className="container pb-8 xl:pb-24">
        <h2 className="mb-4 text-lg font-semibold lg:mb-8">
          Recommended For You
        </h2>
        <div className="mb-4">
          <ul className="flex flex-wrap gap-2 lg:gap-3">
            {categories.map((category) => (
              <li key={category}>
                <ButtonSecondary 
                  sizeClass="py-2 px-3"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 
                    "bg-brand text-black" : ""}
                >
                  {category}
                </ButtonSecondary>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="grid grid-cols-12 gap-2">
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                className="col-span-12 md:col-span-6 xl:col-span-3"
              >
                <ProductCardSmall {...product} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RecommendedSection;