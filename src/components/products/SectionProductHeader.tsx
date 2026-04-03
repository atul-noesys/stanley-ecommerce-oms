import Loading from "@/app/loading";
import ImageShowCase from "@/components/ImageShowCase";
import ProductSlider from "@/components/products/ProductSlider";
import ProductTabs from "@/components/products/ProductTabs";
import { useProducts } from "@/hooks/useProducts";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import QuantityInputNumber from "@/shared/InputNumber/normal-input-counter";
import { Product } from "@/store/product-store";
import { useStore } from "@/store/store-context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { FC } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

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
  const { nguageStore } = useStore();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState<number>(product.minimum_order_quantity || 1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch current cart items to check for duplicates
  const { data: cartItems } = useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      const paginationData = await nguageStore.GetPaginationData({
        table: "cart_items",
        skip: 0,
        take: null,
        NGaugeId: "74",
      });
      const result = Array.isArray(paginationData) ? paginationData : (paginationData?.data || []);
      return result || [];
    },
    staleTime: 0,
    enabled: true,
  });

  const handleAddToCart = async () => {
    const payload = {
      sku: product.sku,
      product_name: product.name,
      price: product.price,
      image: product.image,
      stock_in_hand: product.stock_in_hand,
      minimum_order_quantity: product.minimum_order_quantity,
      quantity: quantity,
      back_order: 0,
      customer_username: "noomsuser",
      total: quantity * product.price,
    };

    setIsLoading(true);
    try {
      // Check if product already exists in cart
      const existingItem = Array.isArray(cartItems) ? cartItems.find((item: any) => item.sku === product.sku) : null;

      if (existingItem) {
        // If item exists, update the quantity
        const updatedQuantity = existingItem.quantity + quantity;
        await nguageStore.UpdateRowDataDynamic(
          { ...existingItem, quantity: updatedQuantity, total: updatedQuantity * product.price, },
          existingItem.ROWID || existingItem.id,
          74,
          "cart_items"
        );
        toast.success(`Updated ${product.name} quantity to ${updatedQuantity}`);
      } else {
        // If item doesn't exist, add new item
        await nguageStore.AddRowData(payload, 74, "cart_items");
        toast.success(`Added ${product.name} to cart with quantity ${quantity}`);
      }

      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      // Reset quantity to minimum for next add
      setQuantity(product.minimum_order_quantity || 1);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      setIsLoading(false);
    }
  };

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
            products={products.filter((e: any) => e.category === product.category).slice(0, 7)}
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
            <QuantityInputNumber
              minimum_order_quantity={product.minimum_order_quantity}
              stock_in_hand={product.stock_in_hand}
              onChange={setQuantity}
            />
            <ButtonSecondary 
              onClick={handleAddToCart}
              disabled={isLoading}
              className="w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </>
              ) : (
                "Add to cart"
              )}
            </ButtonSecondary>
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
