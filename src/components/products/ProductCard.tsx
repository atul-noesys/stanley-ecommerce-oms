import BrandButton from "@/shared/Button/BrandButton";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { numberFormatter, Product } from "@/store/product-store";
import Image from "next/image";
import type { FC } from "react";

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
}) => {
  return (
    <div
      className={`group inline-block h-full overflow-hidden rounded-md bg-white dark:bg-neutral-900 ${className}`}
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
            <span className="absolute right-4 top-4 bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-md">
              OUT OF STOCK
            </span>
          ) : soh === 0 ? (
            <span className="absolute right-4 top-4 bg-yellow-500 px-2 py-1 text-xs font-bold text-white shadow-md">
              BACK ORDER
            </span>
          ) : (
            <span className="absolute right-4 top-4 bg-green-500 px-2 py-1 text-xs font-bold text-white shadow-md">
              IN STOCK : {numberFormatter(soh)}
            </span>
          )}
        </div>
        <div className="hidden lg:block absolute bottom-2 w-full px-4 text-center transition-all duration-300 group-hover:bottom-2 lg:-bottom-full">
          <ButtonPrimary className="w-full text-sm" data-no-navigate>
            Quick View
          </ButtonPrimary>
        </div>
      </div>
      <div className="px-5 py-4">
        <span className="text-xs bg-blue-200 px-2 rounded-md">{category}</span>
        <h3 className="line-clamp-2 text-ellipsis font-bold min-h-12">
          {name}
        </h3>
        <p className="font-bold text-blue-700">${price}</p>
      </div>
      <div className="w-full px-4 pb-4 text-center">
        <BrandButton className="w-full" data-no-navigate>
          Add to Cart
        </BrandButton>
      </div>
    </div>
  );
};

export default ProductCard;
