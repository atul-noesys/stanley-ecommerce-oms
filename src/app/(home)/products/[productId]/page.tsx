"use client";

import Loading from "@/app/loading";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedProducts from "@/components/products/RelatedProducts";
import SectionProduct from "@/components/products/SectionProductHeader";
import ButtonLink from "@/shared/Button/ButtonLink";
import { useProductById } from "@/hooks/useProducts";
import { makeUrlFromCategoryName } from "@/utils/url-generater";
import { useParams } from "next/navigation";
import { pathOr } from "ramda";
import { useTranslation } from "react-i18next";

const ProductPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const productId = params?.["productId"] as string | undefined;

  const { loading, error, product } = useProductById(productId);

  if (loading) return <Loading />;
  if (error) return <p>Error {error.message}</p>;

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
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
            prevPrice={pathOr(0, ["original_price"], product)}
            currentPrice={pathOr(0, ["price"], product)}
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
