"use client";

import { Product } from "@/store/product-store";
import { useRouter } from "next/navigation";
import ProductCard from "../products/ProductCard";

const ProductListing = ({ productsList }: { productsList : Product[] }) => {
  const router = useRouter();

  const handleProductClick = (id: number) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="grid grid-cols-10 gap-3">
      {productsList.map((product) => (
        <div
          onClick={(e) => {
            // Check if the click originated from an element that should not navigate
            const noNavigate = (e.target as HTMLElement).closest(
              "[data-no-navigate]",
            );
            if (!noNavigate) {
              handleProductClick(product.id);
            }
          }}
          className="col-span-10 md:col-span-5 lg:col-span-2 cursor-pointer"
          key={product.id}
        >
          <ProductCard key={product.id} {...product} />
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
