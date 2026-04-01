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
      case "/collections/action-figures":
        return "Exciting action figures that spark imagination and inspire heroic adventures for endless playtime fun.";
      case "/collections/art-kits":
        return "Creative art kits designed to unleash your imagination with paints, markers, and artistic materials.";
      case "/collections/soft-toys":
        return "Cuddly and huggable soft toys perfect for comfort, playtime, and creating cherished memories.";
      case "/collections/musical-toys":
        return "Engaging musical toys that introduce children to rhythm, sound, and the joy of music exploration.";
      case "/collections/vehicles":
        return "Sturdy toy vehicles for thrilling adventures, from trucks to cars built for active play.";
      case "/collections/robots":
        return "Transforming robots and tech-inspired toys that combine innovation with imaginative play.";
      default:
        return "Discover a wonderful collection of quality toys designed for fun, learning, and creative play.";
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
    <div className="container">
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
