"use client";

import { pathOr } from "ramda";
import { useMemo, useState, type FC } from "react";

import CollectionHeader from "@/components/collections/CollectionHeader";
import CollectionFilter from "@/components/collections/Filter";
import FilterSortBar from "@/components/collections/FilterSortBar";
import ProductListing from "@/components/collections/ProductListing";
import CollectionSorter from "@/components/collections/Sorter";
import PopularCategoriesSection from "@/components/home/sections/PopluarCategories";
import { categoriesData } from "@/data/content";
import { Product } from "@/store/product-store";
import { useProducts } from "@/hooks/useProducts";
import Loading from "@/app/loading";
import { getCategoryNameFromUrl } from "@/utils/url-generater";
import { SortKey } from "@/types/sort";

type PageProps = {
  params: { slug: string };
};

type FilterState = {
  productTypes: string[];
  priceRange: [number, number];
  stockFilters: string[];
};

const CollectionPage: FC<PageProps> = ({ params }) => {
  const slug = pathOr("", ["slug"], params);
  const { loading, error, products } = useProducts();
  const [filters, setFilters] = useState<FilterState>({
    productTypes: [],
    priceRange: [1, 300],
    stockFilters: []
  });
  const [sortKey, setSortKey] = useState<SortKey>("name:asc");


  // Apply filters to products
  const applyFilters = (products: Product[], filterState: FilterState) => {
    return products.filter((product) => {
      // Filter by product type (subCategory)
      const typeMatch =
        filterState.productTypes.length === 0 ||
        (product.subCategory && product.subCategory.some(cat => 
          filterState.productTypes.includes(cat)
        ));

      // Filter by price range
      const priceMatch =
        product.price >= filterState.priceRange[0] && 
        product.price <= filterState.priceRange[1];

      // Filter by stock availability
      let stockMatch = true;
      if (filterState.stockFilters.length > 0) {
        if (filterState.stockFilters.includes("In Stock")) {
          stockMatch = product.soh > 0;
        }
        if (filterState.stockFilters.includes("Back Order")) {
          stockMatch = product.soh === 0;
        }
        if (filterState.stockFilters.includes("Out of Stock")) {
          stockMatch = product.soh === -1;
        }
      }

      return typeMatch && priceMatch && stockMatch;
    });
  };

  // Sort products
  const sortProducts = (products: Product[], sortKey: SortKey) => {
    const [field, direction] = sortKey.split(":") as [
      keyof Product,
      "asc" | "desc",
    ];

    return [...products].sort((a, b) => {
      // Name Sorting
      if (typeof a[field] === "string" && typeof b[field] === "string") {
        const valA = String(a[field]).toLowerCase();
        const valB = String(b[field]).toLowerCase();
        return direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      // Price Sorting
      else if (typeof a[field] === "number" && typeof b[field] === "number") {
        return direction === "asc"
          ? Number(a[field]) - Number(b[field])
          : Number(b[field]) - Number(a[field]);
      }
      // Fallback for other types
      return 0;
    });
  };

  // Calculate all products based on slug
  const allProducts = useMemo(() => {
    return products.filter(pro => 
      pro.category === getCategoryNameFromUrl(slug) || pro.tag === getCategoryNameFromUrl(slug)
    );
  }, [products, slug]);

  // Calculate filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = applyFilters(allProducts, filters);
    result = sortProducts(result, sortKey);
    return result;
  }, [allProducts, filters, sortKey]);

  if (loading) return <Loading />;
  if (error) return <p>Error {error.message}</p>;

  // Handle filter changes from CollectionFilter
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Handle sort changes from Sorter
  const handleSortChange = (newSortKey: SortKey) => {
    setSortKey(newSortKey);
  };

  const catalogData = categoriesData.find((item) => item.slug === slug);
  
  return (
    <main>
      {catalogData && (
        <CollectionHeader
          title={catalogData.title}
          bannerImg={catalogData.bannerUrl}
        />
      )}

      <CollectionSorter 
        onSortChange={handleSortChange}
        currentSort={sortKey}
      />
      <div className="container pb-8 lg:pb-24">
        <div className="mb-3 lg:hidden">
          <FilterSortBar />
        </div>
        <div className="grid grid-cols-12 gap-3">
          <div className="hidden md:col-span-5 md:block lg:col-span-3">
            <CollectionFilter 
              productsList={allProducts}
              onFilterChange={handleFilterChange}
              currentFilters={filters}
            />
          </div>
          <div className="col-span-12 md:col-span-7 lg:col-span-9">
            <ProductListing productsList={filteredProducts} />
          </div>
        </div>
      </div>
      <PopularCategoriesSection />
    </main>
  );
};

export default CollectionPage;