import { gql } from "@apollo/client";
import { Product } from "@/store/product-store";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      sku
      name
      description
      features
      category
      subCategory
      price
      image
      images
      soh
      moq
      tag
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      sku
      name
      description
      features
      category
      subCategory
      price
      image
      images
      soh
      moq
      tag
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
