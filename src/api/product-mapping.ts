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
  product: NguageProduct,
  nguageProductCategory: NguageCategory[],
  nguageProductCategoryMapping: NguageCategoryMapping[],
  allFeatures: NguageFeatures[],
  nguageProductImages: NguageProductImages[],
  nguageProductImageMapping: NguageProductImageMapping[]
): Product {
  const mapping = nguageProductCategoryMapping.find(
    (m) => m.product_id.toString() === product.product_id.toString()
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

  const productFeatures = allFeatures
    .filter(
      (feature) =>
        feature.product_id.toString() === product.product_id.toString()
    )
    .map((feature) => feature.feature_text);

  //Image
  const imageIds = nguageProductImageMapping
    .filter((map) => map.product_id === product.product_id)
    .map((map) => map.image_id);

  const images = nguageProductImages.filter((img) =>
    imageIds.includes(img.image_id)
  );

  const imageUrls = images.map((img) => img.image_url).filter((i) => i !== "");

  const primaryImage = images.find(
    (img) => img.is_primary === "True"
  )?.image_url;

  return {
    // Identifiers
    id: Number(product.product_id),
    sku: product.sku,
    ROWID: product.ROWID,
    InfoveaveBatchId: product.InfoveaveBatchId,

    // Basic Info
    name: product.name,
    description: product.description,
    brand: product.brand,
    short_description: product.short_description,
    long_description: product.long_description,

    // Product Classification
    category: mainCategory ? mainCategory.category_name : "Uncategorized",
    subCategory: subCategory ? [subCategory.category_name] : [],
    features: productFeatures,
    tag: product.tags,

    // Pricing
    price: product.sales_price,
    original_price: product.original_price,
    sales_price: product.sales_price,

    // Inventory
    stock_in_hand: product.stock_in_hand,
    minimum_order_quantity: product.minimum_order_quantity,
    package_quantity: product.package_quantity,

    // Status
    is_excess: product.is_excess,
    is_obsolete: product.is_obsolete,

    // Images & Media
    image: primaryImage ?? "",
    images: [...new Set(imageUrls)],

    // Delivery & Logistics
    estimated_delivery_date: product.estimated_delivery_date,

    // Additional Info
    additional_info: product.additional_info,
    usage_policy: product.usage_policy,
    usage_description: product.usage_description,

    // Audit Trail
    created_by: product.created_by,
    updated_by: product.updated_by,
    created_date: product.created_date,
    updated_date: product.updated_date,
  };
}
