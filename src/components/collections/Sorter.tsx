"use client";

import { usePathname } from "next/navigation";
import Sorter from "../Sorter";

const CollectionSorter = () => {
  const pathname = usePathname();

  const getProductList = (pathname: string) => {
    if (pathname === "/collections/accessories") {
      return "accessories";
    } else if (pathname === "/collections/hand-tools") {
      return "handTools";
    } else if (pathname === "/collections/outdoor") {
      return "outdoor";
    } else if (pathname === "/collections/power-tools") {
      return "powerTools";
    } else if (pathname === "/collections/storage") {
      return "storage";
    } else if (pathname === "/collections/workspace") {
      return "workspace";
    } else {
      return "accessories";
    }
  };

  return (
    <section className="hidden lg:block">
      <div className="container pb-10">
        <div className="flex items-center justify-end gap-6">
          <div className="flex items-center gap-3">
            <span>Sort by:</span>
            <Sorter productListType={getProductList(pathname ?? "")} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionSorter;
