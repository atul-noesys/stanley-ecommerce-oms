"use client";

import "rc-slider/assets/index.css";

import Slider from "rc-slider";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import { useStore } from "@/store/store-context";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

const availability = ["In Stock", "Back Order", "Out of Stock"];

const PRICE_RANGE = [1, 300];

const SidebarFilters = observer(() => {
  const { t } = useTranslation();
  const [rangePrices, setRangePrices] = useState<[number, number]>([1, 300]);
  const [activeProductTypes, setActiveProductTypes] = useState<string[]>([]);
  const [activeStock, setActiveStock] = useState<string[]>([]);
  const [activeTabs, setActiveTabs] = useState({
    productType: true,
    price: true,
    availability: true,
  });
  const { productStore } = useStore();

  const pathname = usePathname();

  const getProductList = (pathname: string) => {
    if (pathname === "/collections/accessories") {
      return productStore.accessoriesResetList;
    } else if (pathname === "/collections/hand-tools") {
      return productStore.handToolsResetList;
    } else if (pathname === "/collections/outdoor") {
      return productStore.outdoorResetList;
    } else if (pathname === "/collections/power-tools") {
      return productStore.powerToolsResetList;
    } else if (pathname === "/collections/storage") {
      return productStore.storageResetList;
    } else if (pathname === "/collections/workspace") {
      return productStore.workspaceResetList;
    } else if (pathname === "/collections/new-products") {
      return productStore.newProductsResetList;
    } else if (pathname === "/collections/focus-products") {
      return productStore.focusProductsResetList;
    } else if (pathname === "/collections/promotions") {
      return productStore.promotionResetList;
    } else {
      return productStore.workspaceResetList;
    }
  };

  const filterList = (pathname: string) => {
    const products = getProductList(pathname);
    const allFilters = products.flatMap((prod) => prod.subCategory);
    return [...new Set(allFilters)];
  };

  const handleToggleFilter = ({
    value,
    valueArray,
    setValueArray,
    isSingleSelect = false, // New parameter for single selection
  }: {
    value: string;
    valueArray: string[];
    setValueArray: Dispatch<SetStateAction<string[]>>;
    isSingleSelect?: boolean; // Flag to indicate single selection behavior
  }) => {
    if (isSingleSelect) {
      // For single selection: if already selected, deselect; otherwise, select only this one
      if (valueArray.includes(value)) {
        setValueArray([]);
      } else {
        setValueArray([value]);
      }
    } else {
      // Original multi-select behavior
      if (valueArray.includes(value)) {
        const filteredArray = valueArray.filter(
          (arrayItem) => arrayItem !== value,
        );
        setValueArray(filteredArray);
      } else {
        setValueArray([...valueArray, value]);
      }
    }
  };

  const handleResetFilters = () => {
    setActiveProductTypes([]);
    setActiveStock([]);
    setRangePrices([1, 300]);
  };

  const toggleTab = (tabName: keyof typeof activeTabs) => {
    setActiveTabs((prev) => ({
      ...prev,
      [tabName]: !prev[tabName],
    }));
  };

  // Apply filters when any filter changes
  useEffect(() => {
    productStore.filterProducts(activeProductTypes, rangePrices, activeStock);
  }, [activeProductTypes, rangePrices, activeStock, productStore]);

  const renderTabsProductType = () => {
    return (
      <div className="relative flex flex-col py-2">
        <div className="flex justify-between px-5">
          <button
            type="button"
            className="font-medium uppercase flex items-center"
            onClick={() => toggleTab("productType")}
          >
            {t("ProductType")}
            <span
              className={`ml-2 transform transition-transform ${activeTabs.productType ? "rotate-0" : "-rotate-90"}`}
            >
              ▼
            </span>
          </button>
          <div
            className="text-primary hover:underline font-semibold py-3 text-sm cursor-pointer"
            onClick={() => setActiveProductTypes([])}
          >
            {t("Reset")}
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${activeTabs.productType ? "max-h-96" : "max-h-0"}`}
        >
          <ul className="space-y-2 px-5 py-1">
            {filterList(pathname ?? "").map((product) => (
              <li key={product} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`product-${product}`}
                  checked={activeProductTypes.includes(product)}
                  onChange={() =>
                    handleToggleFilter({
                      value: product,
                      valueArray: activeProductTypes,
                      setValueArray: setActiveProductTypes,
                    })
                  }
                  className="size-5 rounded border-2 border-neutral-300 checked:bg-primary checked:border-primary dark:border-neutral-600 dark:bg-neutral-800 focus:ring-2 focus:ring-primary"
                />
                <label
                  htmlFor={`product-${product}`}
                  className="capitalize cursor-pointer"
                >
                  {product}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderTabsAvaiability = () => {
    return (
      <div className="relative flex flex-col py-2">
        <div className="flex justify-between px-5">
          <button
            type="button"
            className="font-medium uppercase flex items-center"
            onClick={() => toggleTab("availability")}
          >
            {t("Availability")}
            <span
              className={`ml-2 transform transition-transform ${activeTabs.availability ? "rotate-0" : "-rotate-90"}`}
            >
              ▼
            </span>
          </button>
          <div
            className="text-primary hover:underline font-semibold py-3 text-sm  cursor-pointer"
            onClick={() => setActiveStock([])}
          >
            {t("Reset")}
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${activeTabs.availability ? "max-h-96" : "max-h-0"}`}
        >
          <ul className="space-y-2 px-5 py-1">
            {availability.map((item) => {
              return (
                <li key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`stock-${item}`}
                    checked={activeStock.includes(item)}
                    onChange={() =>
                      handleToggleFilter({
                        value: item,
                        valueArray: activeStock,
                        setValueArray: setActiveStock,
                        isSingleSelect: true, // Add this flag for single selection
                      })
                    }
                    className="size-5 rounded border-2 border-neutral-300 checked:bg-primary checked:border-primary dark:border-neutral-600 dark:bg-neutral-800 focus:ring-2 focus:ring-primary"
                  />
                  <label
                    htmlFor={`stock-${item}`}
                    className="capitalize cursor-pointer"
                  >
                    {t(item)}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  const renderTabsPriceRage = () => {
    return (
      <div className="relative flex flex-col py-2">
        <div className="flex justify-between px-5">
          <button
            type="button"
            className="font-medium uppercase flex items-center"
            onClick={() => toggleTab("price")}
          >
            {t("Price")}
            <span
              className={`ml-2 transform transition-transform ${activeTabs.price ? "rotate-0" : "-rotate-90"}`}
            >
              ▼
            </span>
          </button>
          <div
            className="text-primary hover:underline font-semibold py-3 text-sm  cursor-pointer"
            onClick={() => setRangePrices([1, 300])}
          >
            {t("Reset")}
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${activeTabs.price ? "max-h-96" : "max-h-0"}`}
        >
          <div className="space-y-2 px-5 py-1">
            <Slider
              range
              min={PRICE_RANGE[0]}
              max={PRICE_RANGE[1]}
              step={1}
              value={[rangePrices[0], rangePrices[1]]}
              allowCross={false}
              onChange={(input) => {
                if (Array.isArray(input)) {
                  setRangePrices(input as [number, number]);
                }
              }}
              className="mb-4"
            />
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              {t("Price")}: ${rangePrices[0]} - ${rangePrices[1]}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-md bg-white dark:bg-neutral-900 shadow-sm">
      <div className="flex justify-between items-center px-4 py-0 border-b border-neutral-200 dark:border-neutral-700">
        <h3 className="font-semibold">{t("Filters")}</h3>
        <div
          className="text-primary hover:underline font-semibold py-3 text-sm cursor-pointer"
          onClick={handleResetFilters}
        >
          {t("ResetAll")}
        </div>
      </div>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-700 mb-4">
        {renderTabsProductType()}
        {renderTabsPriceRage()}
        {renderTabsAvaiability()}
      </div>
    </div>
  );
});

export default SidebarFilters;
