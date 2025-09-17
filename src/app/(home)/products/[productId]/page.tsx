"use client";

import Loading from "@/app/loading";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedProducts from "@/components/products/RelatedProducts";
import SectionProduct from "@/components/products/SectionProductHeader";
import ButtonLink from "@/shared/Button/ButtonLink";
import { Product } from "@/store/product-store";
import { makeUrlFromCategoryName } from "@/utils/url-generater";
import { useQuery } from "@apollo/client/react";
import gql from "graphql-tag";
import { useParams } from "next/navigation";
import { pathOr } from "ramda";
import { useTranslation } from "react-i18next";

const GET_PRODUCTS = gql`
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

type GetProductsResponse = {
  products: Product[];
};

const ProductPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const { loading, error, data } = useQuery<GetProductsResponse>(GET_PRODUCTS);

  const productId = params?.["productId"];
  const product = data?.products.find(
    (item) => item.id.toString() === productId
  );

  if (loading) return <Loading />;
  if (error) return <p>Error 😢 {error.message}</p>;

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading product...</p>
      </main>
    );
  }

  const breadcrumbItems = [
    { title: <ButtonLink href="/">{t("Home")}</ButtonLink> },
    {
      title: (
        <ButtonLink
          href={`/collections/${makeUrlFromCategoryName(product.category)}`}
        >
          {product.category}
        </ButtonLink>
      ),
    },
    { title: product.name },
  ];

  return (
    <main className="min-h-screen">
      <div className="container mt-10">
        <Breadcrumbs Items={breadcrumbItems} />
        <div className="mb-20">
          <SectionProduct
            name={pathOr("", ["name"], product)}
            shots={product.images}
            prevPrice={pathOr(0, ["previousPrice"], product)}
            currentPrice={pathOr(0, ["currentPrice"], product)}
            product={product}
          />
        </div>
      </div>
      <div className="container mb-20">
        <RelatedProducts />
      </div>
    </main>
  );
};

export default ProductPage;
