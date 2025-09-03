import ImageShowCase from "@/components/ImageShowCase";
import type { FC } from "react";
// import ProductCard from "@/components/products/ProductCard";
import ProductSlider from "@/components/products/ProductSlider";
import ProductTabs from "@/components/products/ProductTabs";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import InputNumber from "@/shared/InputNumber/InputNumber";
import { Product } from "@/store/product-store";
import { useStore } from "@/store/store-context";

interface SectionProductHeaderProps {
  shots: string[];
  name: string;
  prevPrice: number;
  currentPrice: number;
  product: Product;
}

const SectionProduct: FC<SectionProductHeaderProps> = ({
  shots,
  name,
  currentPrice,
  product
}) => {
  const { productStore } = useStore();


  return (
    <div className="grid grid-cols-12 gap-4 lg:gap-6" style={{ overflow: 'visible' }}>
      <div className="col-span-12 md:col-span-6 lg:col-span-8">
        <ImageShowCase shots={shots} />
        <div className="hidden md:block">
          <ProductTabs />
          <ProductSlider
            products={productStore.accessories.slice(0, 7)}
            title="Similar Items You Might Like"
            subText="Based on what customers bought"
          />
        </div>
      </div>
      
      {/* Right side Section */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4 sticky top-12 self-start h-fit">
        <span className="mb-2 text-xs">{product.category}</span>
        <h1 className="mb-0 text-3xl font-bold">{name}</h1>

        <div className="mb-5 space-y-1">
          <h1 className="text-2xl font-semibold">
            <span className="text-green-700">${product.price}</span>{" "}
          </h1>
        </div>

        <div className="mb-6">
          <p className="text-neutral-500 dark:text-neutral-300">
            {product.description}
          </p>

          <div className="mt-6">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Product Features
            </h3>
            <ul className="list-outside list-disc space-y-1 text-neutral-500 dark:text-gray-300 ml-4">
                {product.features.map(f => <li key={f}>{f}</li>)}
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm">Quantity:</h4>
          <div className="flex gap-2">
            <InputNumber />
            <ButtonSecondary className="w-full">Add to cart</ButtonSecondary>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:hidden">
        <ProductTabs />
        <ProductSlider
          products={productStore.accessories.slice(0, 7)}
          title="Similar Items You Might Like"
          subText="Based on what customers bought"
        />
      </div>
    </div>
  );
};

export default SectionProduct;
