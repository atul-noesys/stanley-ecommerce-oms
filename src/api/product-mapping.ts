import { Product } from "@/store/product-store";
import {
  NguageCategory,
  NguageCategoryMapping,
  NguageFeatures,
  NguageProduct,
  NguageProductImageMapping,
  NguageProductImages,
} from "@/types/ngauge-product";

export function ProductMappingFromApi(
  pro: NguageProduct,
  nguageProductCategory: NguageCategory[],
  nguageProductCategoryMapping: NguageCategoryMapping[],
  AllFeatures: NguageFeatures[],
  nguageProductImages: NguageProductImages[],
  nguageProductImageMapping: NguageProductImageMapping[]
): Product {
  const mapping = nguageProductCategoryMapping.find(
    (m) => m.product_id.toString() === pro.product_id.toString()
  );

  const subCategory = mapping
    ? nguageProductCategory.find(
        (c) => c.category_id.toString() === mapping.category_id.toString()
      )
    : null;

  const mainCategory =
    subCategory && subCategory.parent_id
      ? nguageProductCategory.find(
          (c) => c.category_id.toString() === subCategory.parent_id.toString()
        )
      : null;

  const productFeatures = AllFeatures.filter(
    (feature) => feature.product_id.toString() === pro.product_id.toString()
  ).map((feature) => feature.feature_text);

  //Image
  const imageIds = nguageProductImageMapping
    .filter((map) => map.product_id === pro.product_id)
    .map((map) => map.image_id);

  const images = nguageProductImages.filter((img) =>
    imageIds.includes(img.image_id)
  );

  const imageUrls = images.map((img) => img.image_url).filter((i) => i !== "");

  const primaryImage = images.find(
    (img) => img.is_primary === "True"
  )?.image_url;

  return {
    id: Number(pro.product_id),
    sku: pro.sku,
    name: pro.name,
    description: pro.description,
    features: productFeatures,
    category: mainCategory ? mainCategory.category_name : "Uncategorized",
    subCategory: subCategory ? [subCategory.category_name] : [],
    price: pro.original_price,
    image: primaryImage ?? "",
    images: [...new Set(imageUrls)],
    soh: pro.stock_in_hand,
    moq: pro.minimum_order_quantity,
    tag: pro.tags,
  };
}
