"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  RiSearch2Line,
  RiPagesLine,
  RiBook2Line,
  RiCloseLine,
} from "react-icons/ri";
import Input from "@/shared/Input/Input";
import Logo from "@/shared/Logo/Logo";
import CartSideBar from "../CartSideBar";
import CatalogBar from "./CatalogBar";
import MenuBar from "./MenuBar";
import UserSideBar from "../UserSideBar";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "../language/language-switch";
import { useTranslation } from "react-i18next";
import { Product } from "@/store/product-store";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client/react";
import Loading from "@/app/loading";

// Helper function to highlight matching text
const HighlightText = ({
  text,
  searchTerm,
}: {
  text: string;
  searchTerm: string;
}) => {
  if (!searchTerm) return <>{text}</>;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="bg-yellow-200 dark:bg-yellow-800">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

const bulkUpload = [
  {
    text: "BulkOrder",
    href: "/bulk-order",
    icon: <RiBook2Line className="text-xl mt-0.5" />,
  },
  {
    text: "MyOrder",
    href: "/my-order",
    icon: <RiPagesLine className="text-xl mt-0.5" />,
  },
];

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

const MainNav = () => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { loading, error, data } =
       useQuery<GetProductsResponse>(GET_PRODUCTS);

  if (loading) return <Loading />;
  if (error) return <p>Error 😢 {error.message}</p>;

  const filteredProducts = data?.products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="container">
      <div className="flex items-center justify-between gap-6 py-1">
        <div className=" xl:hidden">
          <MenuBar />
        </div>
        <div className="relative flex items-center gap-5">
          <Logo />
          <CatalogBar productsData={data?.products ?? []} className="hidden xl:inline-block"/>

          <div className="hidden w-full xl:block">
            <div className="hidden w-full items-center gap-5 rounded border-2 border-primary/15 bg-white pr-3 transition-all duration-300 hover:border-black dark:border-white/15 dark:bg-neutral-950 xl:flex">
              <Input
                type="text"
                className="border-transparent placeholder:text-neutral-500 focus:border-transparent"
                placeholder={t("Product name / SKU / Category")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              />
              {searchTerm !== "" ? (
                <RiCloseLine
                  className="text-2xl text-neutral-500"
                  onClick={() => setSearchTerm("")}
                />
              ) : (
                <RiSearch2Line className="text-2xl text-neutral-500" />
              )}
            </div>
            {/* Search results dropdown */}
            {isFocused && searchTerm && (filteredProducts ?? []).length > 0 && (
              <div className="absolute z-10 w-full xl:w-[455px]">
                {/* Outer container with rounded corners and shadow */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden">
                  {/* Inner container for scrollable content */}
                  <div className="max-h-96 overflow-y-auto">
                    {/* Custom scrollbar styling */}
                    <style jsx>{`
                      .custom-scrollbar::-webkit-scrollbar {
                        width: 8px;
                      }
                      .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                        margin: 4px 0;
                      }
                      .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #d1d5db;
                        border-radius: 4px;
                      }
                      .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #4b5563;
                      }
                    `}</style>

                    <ul className="py-1 custom-scrollbar">
                      {(filteredProducts ?? []).map((product, index) => (
                        <Link
                          key={product.sku}
                          href={`/products/${product.id}`}
                          passHref
                        >
                          <li
                            className={`px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center ${
                              index === 0 ? "pt-3" : ""
                            } ${
                              index === (filteredProducts ?? []).length - 1
                                ? "pb-3"
                                : ""
                            }`}
                            onClick={() => {
                              setSearchTerm(product.name);
                              setIsFocused(false);
                            }}
                          >
                            <Image
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 object-contain mr-4"
                              width={40}
                              height={40}
                            />
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                <HighlightText
                                  text={product.name}
                                  searchTerm={searchTerm}
                                />
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                SKU:{" "}
                                <HighlightText
                                  text={product.sku}
                                  searchTerm={searchTerm}
                                />
                              </div>
                            </div>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* No results message */}
            {isFocused && searchTerm && (filteredProducts ?? []).length === 0 && (
              <div className="absolute z-10 mt-0 w-full xl:w-[455px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg">
                <div className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  No products found matching {searchTerm}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <div className="hidden xl:block mt-1.5">
            <ul className="flex">
              {bulkUpload.map((navItem, index) => (
                <li
                  key={index}
                  className="flex justify-center items-start gap-1 p-3 text-base text-neutral-800 font-semibold hover:text-black dark:text-neutral-300  dark:hover:text-neutral-100"
                >
                  {navItem.icon}
                  <Link href={navItem.href}>{t(navItem.text)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <CartSideBar />
            <div className="hidden lg:inline-block">
              <UserSideBar />
            </div>
          </div>
        </div>
      </div>
      <div className="pb-2 xl:hidden">
        <div className="flex w-full items-center gap-5 border border-neutral-300 bg-white pr-3 dark:bg-neutral-950">
          <Input
            type="text"
            className="border-transparent placeholder:text-neutral-500 focus:border-transparent"
            placeholder="Product name / SKU / Category"
          />
          <RiSearch2Line className="text-2xl text-neutral-500" />
        </div>
      </div>
    </div>
  );
};

export default MainNav;
