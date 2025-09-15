"use client";

import { ProductListType } from "@/store/product-store";
import { useStore } from "@/store/store-context";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import ProductCard from "../products/ProductCard";

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
  } else if (slug === "focus-products") {
    return "focusProducts";
  } else if (slug === "new-products") {
    return "newProducts";
  } else {
    return "promotion";
  }
};

const ProductListing = observer(({ slug }: { slug: string }) => {
  const router = useRouter();
  const { productStore } = useStore();

  const handleProductClick = (id: number) => {
    router.push(`/products/${id}`);
  };

  const productsList = productStore[getProductList(slug) as ProductListType];
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
});

export default ProductListing;
