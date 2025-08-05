"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedProducts from "@/components/products/RelatedProducts";
import SectionProduct from "@/components/products/SectionProductHeader";
import ButtonLink from "@/shared/Button/ButtonLink";
import { useStore } from "@/store/store-context";
import { useParams } from "next/navigation";
import { pathOr } from "ramda";

const page = () => {
  // const selectedProduct = getProductData(
  //   pathOr("", ["params", "productId"], props),
  // );
  const params = useParams();
  const { productStore } = useStore();
  
  // Get the ID or slug from URL parameters
  const productId = params?.["productId"];
  
  // Find the product in the accessories list
  const product = productStore.skuSearchList.find(
    item => item.id.toString() == productId
  )!;

  const breadcrumbItems = [
    { title: <ButtonLink href="/">Home</ButtonLink> },
    {
      title: (
        <ButtonLink
          href={`/collections`}
        >
          collections
        </ButtonLink>
      ),
    },
    { title: product.name },
  ];

  return (
    <main>
      <div className="container mt-10">
        <div>
          <Breadcrumbs Items={breadcrumbItems} />
        </div>

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

export default page;
