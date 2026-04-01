import ImageShowCase from "@/components/ImageShowCase";
import type { FC } from "react";
import Loading from "@/app/loading";
import ProductSlider from "@/components/products/ProductSlider";
import ProductTabs from "@/components/products/ProductTabs";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import QuantityInputNumber from "@/shared/InputNumber/normal-input-counter";
import { Product } from "@/store/product-store";
import { useProducts } from "@/hooks/useProducts";

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
  product,
}) => {
  const { products, loading, error } = useProducts();

  if (loading) return <Loading />;
  if (error && !error.message.includes("Unauthorized"))
    return <p>Error {error.message}</p>;

  return (
    <div
      className="grid grid-cols-12 gap-4 lg:gap-6"
      style={{ overflow: "visible" }}
    >
      <div className="col-span-12 md:col-span-6 lg:col-span-8">
        <ImageShowCase shots={shots} stock_in_hand={product.stock_in_hand} tag={product.tag} />
        <div className="hidden md:block">
          <ProductTabs details={product.long_description ?? ""} product={product} />
          <ProductSlider
            products={products.filter((e: any) => e.category === "Accessories").slice(0, 7)}
            title="Similar Items You Might Like"
            subText="Based on what customers bought"
          />
        </div>
      </div>

      {/* Right side Section */}
      <div className="flex flex-col justify-between col-span-12 min-h-[550px] md:col-span-6 lg:col-span-4 lg:sticky lg:top-12 lg:self-start lg:h-fit">
        <div>
          <div className="flex justify-between mb-0.5">
            <span className="text-xs bg-blue-200 px-2 rounded-md">
              {product.category}
            </span>
            <span className="text-xs font-semibold text-white bg-black px-2">
              moq : {product.minimum_order_quantity}
            </span>
          </div>
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

            {product.features.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Product Features
                </h3>
                <ul className="list-outside list-disc space-y-1 text-neutral-500 dark:text-gray-300 ml-4">
                  {product.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm">Quantity:</h4>
          <div className="flex gap-2">
            <QuantityInputNumber minimum_order_quantity={product.minimum_order_quantity} stock_in_hand={product.stock_in_hand} />
            <ButtonSecondary className="w-full">Add to cart</ButtonSecondary>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:hidden">
        <ProductTabs details={product.long_description ?? ""} product={product} />
        <ProductSlider
          products={products.filter((e: any) => e.category === "Accessories").slice(0, 7)}
          title="Similar Items You Might Like"
          subText="Based on what customers bought"
        />
      </div>
    </div>
  );
};

export default SectionProduct;
