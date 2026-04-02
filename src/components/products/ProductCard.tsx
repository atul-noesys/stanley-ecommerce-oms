import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import QuantityInputNumber from "@/shared/InputNumber/normal-input-counter";
import { numberFormatter, Product } from "@/store/product-store";
import Image from "next/image";
import { useState, type FC } from "react";
import ImageShowCase from "../ImageShowCase";
import { Modal } from "../modal";
import SmallQuantityInputNumber from "@/shared/InputNumber/small-input-counter";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/store-context";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

interface ProductCardProps extends Product {
  className?: string;
}

const ProductCard: FC<ProductCardProps> = ({
  className,
  image,
  name,
  price,
  stock_in_hand,
  category,
  images,
  features,
  description,
  tag,
  minimum_order_quantity,
  sku
}) => {
  const { t } = useTranslation();
  const { nguageStore } = useStore();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(minimum_order_quantity || 1);
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = async () => {
    const payload = {
      sku: sku,
      product_name: name,
      price: price,
      image: image,
      stock_in_hand: stock_in_hand,
      minimum_order_quantity: minimum_order_quantity,
      quantity: quantity,
      back_order: 0,
      customer_username: "noomsuser",
      total: quantity * price,
    };

    setIsLoading(true);
    try {
      // Check if product already exists in cart
      const existingItem = Array.isArray(cartItems) ? cartItems.find((item: any) => item.sku === sku) : null;

      if (existingItem) {
        // If item exists, update the quantity
        const updatedQuantity = existingItem.quantity + quantity;
        await nguageStore.UpdateRowDataDynamic(
          { ...existingItem, quantity: updatedQuantity, total: updatedQuantity * price, },
          existingItem.ROWID || existingItem.id,
          74,
          "cart_items"
        );
      } else {
        // If item doesn't exist, add new item
        await nguageStore.AddRowData(payload, 74, "cart_items");
      }

      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      if (isModalOpen) closeModal();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={`w-full group inline-block h-full overflow-hidden rounded-md bg-white dark:bg-neutral-900 ${className}`}
      >
        <div className="relative overflow-hidden">
          <div className="relative aspect-square bg-white">
            <Image
              src={image}
              alt="product graphic"
              fill
              className="object-contain"
              sizes="100%"
            />
            {/* Stock status badges */}
            {stock_in_hand === -1 ? (
              <span className="absolute right-3 top-4 bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-md uppercase">
                {t("Out of Stock")}
              </span>
            ) : stock_in_hand === 0 ? (
              <span className="absolute right-3 top-4 bg-yellow-500 px-2 py-1 text-xs font-bold text-white shadow-md uppercase">
                {t("Back Order")}
              </span>
            ) : (
              <span className="absolute right-3 top-4 bg-green-500 px-2 py-1 text-xs font-bold text-white shadow-md uppercase">
                {t("In Stock")} : {numberFormatter(stock_in_hand)}
              </span>
            )}
            <span className="absolute right-3 bottom-0 bg-black px-1 py-0 text-xs font-bold text-yellow-500 shadow-md uppercase">
              SKU : {sku}
            </span>
          </div>
          <div className="hidden lg:block absolute bottom-2 w-full px-4 text-center transition-all duration-300 group-hover:bottom-2 lg:-bottom-full">
            <button
              className="w-full text-sm rounded p-2 bg-black text-white hover:bg-black/80 disabled:bg-gray-200 disabled:text-black"
              data-no-navigate
              onClick={() => setIsModalOpen(true)}
            >
              {t("QuickView")}
            </button>
          </div>
        </div>
        <div className="px-3 py-4">
          <div className="flex justify-between mb-0.5">
            <span className="text-xs bg-blue-200 px-2 rounded-md">
              {category}
            </span>
            <span className="text-xs font-semibold text-white bg-black px-2">
              moq : {minimum_order_quantity}
            </span>
          </div>
          <h3 className="line-clamp-2 text-ellipsis font-bold min-h-12">
            {name}
          </h3>
          <div className="flex justify-between">
            <p className="font-bold text-blue-700">${price}</p>
            <SmallQuantityInputNumber 
              minimum_order_quantity={minimum_order_quantity} 
              stock_in_hand={stock_in_hand}
              onChange={setQuantity}
            />
          </div>
        </div>
        <div className="w-full px-3 pb-4 text-center">
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="w-full text-base rounded p-2 font-semibold bg-brand text-white hover:bg-brand/80 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            data-no-navigate
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t("AddingToCart")}
              </>
            ) : (
              t("AddToCart")
            )}
          </button>
        </div>
      </div>
      {/* Modal for Product Quick View */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="max-w-6xl h-[570px] p-4"
      >
        <div
          className="grid grid-cols-12 gap-4 lg:gap-6"
          style={{ overflow: "visible" }}
        >
          <div className="col-span-12 md:col-span-6 lg:col-span-7">
            <ImageShowCase shots={images.slice(0, 3)} stock_in_hand={stock_in_hand} tag={tag} />
          </div>

          {/* Right side Section */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5 flex flex-col justify-between">
            <div>
            <div className="flex justify-between mb-0.5">
              <span className="text-xs bg-blue-200 px-2 rounded-md">
                {category}
              </span>
              <span className="text-xs font-semibold text-white bg-black px-2">
                moq : {minimum_order_quantity}
              </span>
            </div>
            <h1 className="mb-0 text-3xl font-bold">{name}</h1>

            <div className="mb-5 space-y-1">
              <h1 className="text-2xl font-semibold">
                <span className="text-green-700">${price}</span>{" "}
              </h1>
            </div>

            <div className="mb-6">
              <p className="text-neutral-500 dark:text-neutral-300">
                {description}
              </p>

              {features.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    Product Features
                  </h3>
                  <ul className="list-outside list-disc space-y-1 text-neutral-500 dark:text-gray-300 ml-4">
                    {features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="">
            <h4 className="text-sm">Quantity:</h4>
            <div className="flex gap-2">
              <QuantityInputNumber minimum_order_quantity={minimum_order_quantity} stock_in_hand={stock_in_hand} />
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
      </div>
    </Modal >
    </>
  );
};

export default ProductCard;
