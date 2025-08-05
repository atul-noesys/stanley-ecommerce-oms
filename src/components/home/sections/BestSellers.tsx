"use client";

import React from "react";
import ProductCard from "@/components/products/ProductCard";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/store-context";

const BestSellersSection = observer(() => {
  const { productStore } = useStore();

  return (
    <section>
      <div className="container pb-8 xl:pb-24">
        <div>
          <ul className="grid  grid-cols-6 gap-2 lg:grid-rows-2">
            <li className="col-span-6 md:col-span-4 xl:col-span-2">
              <div className="h-full rounded-md bg-white p-6 dark:bg-neutral-800 lg:p-12">
                <span className="mb-2 text-xs">FEATURED ITEMS</span>
                <h2 className="mb-4 text-2xl font-bold leading-tight tracking-tight lg:text-[28px]">
                  Top 10 Recommended Product of This Week
                </h2>
                <p className="mb-8 text-neutral-500 dark:text-neutral-300">
                  Our expertly curated selection features the hottest, most durable tools flying off the shelves—built to handle any job with precision and strength. Whether you're a pro or a DIY enthusiast, Stanley Tools delivers unbeatable performance every time.
                </p>
                <ButtonPrimary showPointer href="/collections">
                  Shop More
                </ButtonPrimary>
              </div>
            </li>
            {productStore.accessories.slice(0, 10).map((product) => (
              <li
                key={product.sku}
                className="col-span-6 md:col-span-2 xl:col-span-1"
              >
                <ProductCard className="w-full" {...product} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});

export default BestSellersSection;
