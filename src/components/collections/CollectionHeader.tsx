"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { FC } from "react";
import React from "react";
import { usePathname } from "next/navigation";

import ButtonLink from "@/shared/Button/ButtonLink";
import Breadcrumbs from "../Breadcrumbs";
import { useTranslation } from "react-i18next";

const CollectionHeader: FC<{
  title: string;
  bannerImg: string | StaticImageData;
}> = ({ title, bannerImg }) => {
  const { t } = useTranslation();
  const pathname = usePathname();

  // Category-specific descriptions
  const getCategoryDescription = (path: string) => {
    switch (path) {
      case "/collections/workspace":
        return "Premium workbenches and organization solutions for your garage or workshop.";
      case "/collections/storage":
        return "Durable storage systems to keep your tools organized and accessible.";
      case "/collections/power-tools":
        return "Professional-grade power tools for demanding jobsite applications.";
      case "/collections/outdoor":
        return "Robust outdoor equipment for landscaping, gardening, and yard maintenance.";
      case "/collections/hand-tools":
        return "Precision-crafted hand tools for professional tradespeople and DIY enthusiasts.";
      case "/collections/accessories":
        return "Essential accessories and replacements to enhance your tool collection.";
      default:
        return "Professional tools and equipment built for reliability and performance.";
    }
  };

  const description = getCategoryDescription(pathname ?? "");

  const breadcrumbItems = [
    {
      title: (
        <ButtonLink href="/" className="dark:text-neutral-700">
          Home
        </ButtonLink>
      ),
    },
    { title },
  ];

  return (
    <div className="container pb-5">
      <div className="relative overflow-hidden rounded-md p-6 lg:px-20 lg:py-10">
        <div className="">
          <Breadcrumbs Items={breadcrumbItems} />
          <h1 className="mb-4 text-4xl font-semibold capitalize dark:text-neutral-900">
            {t(title)}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-700 lg:w-1/3 min-h-12">
            {t(description)}
          </p>
        </div>
        <div className="absolute left-0 top-0 -z-10 size-full">
          <Image
            src={bannerImg}
            alt="banner image"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionHeader;
