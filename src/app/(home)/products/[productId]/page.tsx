"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedProducts from "@/components/products/RelatedProducts";
import SectionProduct from "@/components/products/SectionProductHeader";
import ButtonLink from "@/shared/Button/ButtonLink";
import { useStore } from "@/store/store-context";
import { useParams } from "next/navigation";
import { pathOr } from "ramda";
import { useTranslation } from "react-i18next";

function formatStringEnhanced(input: string): string {
  if (!input) return input;

  return input
    // Insert hyphen between camelCase
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    // Replace spaces and underscores with hyphen
    .replace(/[\s_]+/g, "-")
    // Lowercase everything
    .toLowerCase();
}

const ProductPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const { productStore } = useStore();

  const productId = params?.["productId"];
  const product = productStore.skuSearchList.find(
    (item) => item.id.toString() === productId
  );

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading product...</p>
      </main>
    );
  }

  const breadcrumbItems = [
    { title: <ButtonLink href="/">{t("Home")}</ButtonLink> },
    { title: <ButtonLink href={`/collections/${formatStringEnhanced(product.category)}`}>{product.category}</ButtonLink> },
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
