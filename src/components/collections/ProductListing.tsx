"use client";

import React from "react";

import ProductCard from "../products/ProductCard";
import { useStore } from "@/store/store-context";
import { ProductListType } from "@/store/product-store";
import { observer } from "mobx-react-lite";
import Link from "next/link";

const getProductList = (slug: string) => {
  if (slug === "accessories") {
    return "accessories";
  } else if (slug === "hand-tools") {
    return "handTools";
  } else if (slug === "outdoor") {
    return "outdoor";
  } else if (slug === "power-tools") {
    return "powerTools";
  } else if (slug === "storage") {
    return "storage";
  } else if (slug === "workspace") {
    return "workspace";
  } else if (slug === "focused-products") {
    return "focusProducts";
  } else if (slug === "new-products") {
    return "newProducts";
  } else {
    return "promotion";
  }
};

const ProductListing = observer(({ slug }: { slug: string }) => {
  const { productStore } = useStore();
  return (
    <div className="grid grid-cols-10 gap-3">
      {productStore[getProductList(slug) as ProductListType].map((product) => (
        <Link
          href={`/products/${product.id}`}
          className="col-span-10 md:col-span-5 lg:col-span-2"
        >
          <ProductCard key={product.id} {...product} />
        </Link>
      ))}
    </div>
  );
});

export default ProductListing;
