"use client";

import { SortKey } from "@/types/sort";
import Sorter from "../Sorter";

interface CollectionSorterProps {
  onSortChange: (sortKey: SortKey) => void;
  currentSort: SortKey;
}

const CollectionSorter = ({ onSortChange, currentSort }: CollectionSorterProps) => {
  return (
    <section className="hidden lg:block">
      <div className="container pb-5 flex items-center justify-end gap-6 mt-5">
        <div className="flex items-center gap-3">
          <span>Sort by:</span>
          <Sorter 
            onSortChange={onSortChange}
            currentSort={currentSort}
          />
        </div>
      </div>
    </section>
  );
};

export default CollectionSorter;