"use client";

import "rc-slider/assets/index.css";

import Slider from "rc-slider";
import { useState } from "react";

import { Product } from "@/store/product-store";
import { useTranslation } from "react-i18next";

const availability = ["In Stock", "Back Order", "Out of Stock"];

const PRICE_RANGE = [1, 300];

interface CollectionFilterProps {
  productsList: Product[];
  onFilterChange: (filters: { 
    productTypes?: string[];
    priceRange?: [number, number];
    stockFilters?: string[];
  }) => void;
  currentFilters: {
    productTypes: string[];
    priceRange: [number, number];
    stockFilters: string[];
  };
}

const CollectionFilter = ({ 
  productsList, 
  onFilterChange, 
  currentFilters 
}: CollectionFilterProps) => {
  const { t } = useTranslation();
  const [activeTabs, setActiveTabs] = useState({
    productType: true,
    price: true,
    availability: true,
  });

  const filterList = () => {
    const allFilters = productsList.flatMap((prod) => prod.subCategory || []);
    return [...new Set(allFilters)];
  };

  const handleToggleFilter = ({
    value,
    valueArray,
    isSingleSelect = false,
  }: {
    value: string;
    valueArray: string[];
    isSingleSelect?: boolean;
  }) => {
    let newArray: string[];
    
    if (isSingleSelect) {
      // For single selection
      if (valueArray.includes(value)) {
        newArray = [];
      } else {
        newArray = [value];
      }
    } else {
      // For multi-select
      if (valueArray.includes(value)) {
        newArray = valueArray.filter(arrayItem => arrayItem !== value);
      } else {
        newArray = [...valueArray, value];
      }
    }
    
    return newArray;
  };

  const handleProductTypeChange = (value: string) => {
    const newProductTypes = handleToggleFilter({
      value,
      valueArray: currentFilters.productTypes,
    });
    onFilterChange({ productTypes: newProductTypes });
  };

  const handleStockChange = (value: string) => {
    const newStockFilters = handleToggleFilter({
      value,
      valueArray: currentFilters.stockFilters,
      isSingleSelect: true,
    });
    onFilterChange({ stockFilters: newStockFilters });
  };

  const handlePriceRangeChange = (newRange: [number, number]) => {
    onFilterChange({ priceRange: newRange });
  };

  const handleResetFilters = () => {
    onFilterChange({
      productTypes: [],
      priceRange: [1, 300],
      stockFilters: []
    });
  };

  const toggleTab = (tabName: keyof typeof activeTabs) => {
    setActiveTabs((prev) => ({
      ...prev,
      [tabName]: !prev[tabName],
    }));
  };

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
            onClick={() => onFilterChange({ productTypes: [] })}
          >
            {t("Reset")}
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${activeTabs.productType ? "max-h-96" : "max-h-0"}`}
        >
          <ul className="space-y-2 px-5 py-1">
            {filterList().map((product) => (
              <li key={product} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`product-${product}`}
                  checked={currentFilters.productTypes.includes(product)}
                  onChange={() => handleProductTypeChange(product)}
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
            onClick={() => onFilterChange({ stockFilters: [] })}
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
                    checked={currentFilters.stockFilters.includes(item)}
                    onChange={() => handleStockChange(item)}
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
            onClick={() => onFilterChange({ priceRange: [1, 300] })}
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
              value={currentFilters.priceRange}
              allowCross={false}
              onChange={(input) => {
                if (Array.isArray(input)) {
                  handlePriceRangeChange(input as [number, number]);
                }
              }}
              className="mb-4"
            />
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              {t("Price")}: ${currentFilters.priceRange[0]} - ${currentFilters.priceRange[1]}
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
};

export default CollectionFilter;