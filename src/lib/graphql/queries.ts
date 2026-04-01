import { gql } from "@apollo/client";
import { Product } from "@/store/product-store";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      sku
      ROWID
      InfoveaveBatchId
      name
      description
      brand
      short_description
      long_description
      category
      subCategory
      features
      tag
      price
      original_price
      sales_price
      stock_in_hand
      minimum_order_quantity
      package_quantity
      is_excess
      is_obsolete
      image
      images
      estimated_delivery_date
      additional_info
      usage_policy
      usage_description
      created_by
      updated_by
      created_date
      updated_date
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      sku
      ROWID
      InfoveaveBatchId
      name
      description
      brand
      short_description
      long_description
      category
      subCategory
      features
      tag
      price
      original_price
      sales_price
      stock_in_hand
      minimum_order_quantity
      package_quantity
      is_excess
      is_obsolete
      image
      images
      estimated_delivery_date
      additional_info
      usage_policy
      usage_description
      created_by
      updated_by
      created_date
      updated_date
    }
  }
`;

export type GetProductsResponse = {
  products: Product[];
};

export type GetProductByIdResponse = {
  product: Product | null;
};

export type GetProductByIdVariables = {
  id: string;
};
