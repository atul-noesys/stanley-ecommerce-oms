import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import QuantityInputNumber from "@/shared/InputNumber/normal-input-counter";
import { numberFormatter, Product } from "@/store/product-store";
import Image from "next/image";
import { useState, type FC } from "react";
import ImageShowCase from "../ImageShowCase";
import { Modal } from "../modal";
import SmallQuantityInputNumber from "@/shared/InputNumber/small-input-counter";
import { useTranslation } from "react-i18next";

interface ProductCardProps extends Product {
  className?: string;
}

const ProductCard: FC<ProductCardProps> = ({
  className,
  image,
  name,
  price,
  soh,
  category,
  images,
  features,
  description,
  tag,
  moq,
  sku
}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsModalOpen(false);
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
            {soh === -1 ? (
              <span className="absolute right-3 top-4 bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-md uppercase">
                {t("Out of Stock")}
              </span>
            ) : soh === 0 ? (
              <span className="absolute right-3 top-4 bg-yellow-500 px-2 py-1 text-xs font-bold text-white shadow-md uppercase">
                {t("Back Order")}
              </span>
            ) : (
              <span className="absolute right-3 top-4 bg-green-500 px-2 py-1 text-xs font-bold text-white shadow-md uppercase">
                {t("In Stock")} : {numberFormatter(soh)}
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
              moq : {moq}
            </span>
          </div>
          <h3 className="line-clamp-2 text-ellipsis font-bold min-h-12">
            {name}
          </h3>
          <div className="flex justify-between">
            <p className="font-bold text-blue-700">${price}</p>
            <SmallQuantityInputNumber moq={moq} soh={soh} />
          </div>
        </div>
        <div className="w-full px-3 pb-4 text-center">
          <button
            className="w-full text-base rounded p-2 font-semibold bg-brand text-black hover:bg-brand/80 disabled:bg-gray-200"
            data-no-navigate
          >
            {t("AddToCart")}
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
            <ImageShowCase shots={images.slice(0, 3)} soh={soh} tag={tag} />
          </div>

          {/* Right side Section */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <div className="flex justify-between mb-0.5">
              <span className="text-xs bg-blue-200 px-2 rounded-md">
                {category}
              </span>
              <span className="text-xs font-semibold text-white bg-black px-2">
                moq : {moq}
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

            <div className="mb-6">
              <h4 className="text-sm">Quantity:</h4>
              <div className="flex gap-2">
                <QuantityInputNumber moq={moq} soh={soh} />
                <ButtonSecondary className="w-full">
                  Add to cart
                </ButtonSecondary>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;
