"use client";

import { SortKey } from "@/types/sort";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowDown } from "react-icons/md";

type SorterProps = {
  onSortChange: (sortKey: SortKey) => void;
  currentSort: SortKey;
};

const languages = [
  { key: "name:asc" as SortKey, label: "Name (A-Z)" },
  { key: "name:desc" as SortKey, label: "Name (Z-A)" },
  { key: "price:asc" as SortKey, label: "Price (Low to High)" },
  { key: "price:desc" as SortKey, label: "Price (High to Low)" },
];

const Sorter = ({ onSortChange, currentSort }: SorterProps) => {
  const { t } = useTranslation();

  const handleSortClick = (key: SortKey, close: () => void) => {
    console.log("Sort selected:", key);
    onSortChange(key);
    close();
  };

  return (
    <div className="font-medium">
      <Popover as="div" className="relative inline-block w-full">
        {({ open, close }) => (
          <>
            <Popover.Button className="flex w-full items-center justify-between gap-2 rounded border border-primary/15 px-5 py-2.5 dark:border-white/15 lg:min-w-60">
              <span className="inline-flex flex-col leading-tight">
                <span>
                  {t(
                    languages.find(
                      (language) => language.key === currentSort,
                    )?.label ?? "",
                  )}
                </span>
              </span>
              <span
                className={`flex size-4 items-center justify-center transition-transform ${open ? "rotate-180" : ""}`}
              >
                <MdKeyboardArrowDown />
              </span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Popover.Panel className="absolute z-10 left-0 mt-0 w-full origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-neutral-900">
                <div className="flex flex-col">
                  {languages.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() =>
                        handleSortClick(item.key, close)
                      }
                      className={`w-full px-3 py-2.5 text-left text-sm focus:outline-none hover:bg-gray-100 dark:hover:bg-neutral-800 ${
                        item.key === currentSort
                          ? "bg-yellow-300 dark:bg-neutral-800 font-semibold"
                          : ""
                      }`}
                    >
                      {t(item.label)}
                    </button>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default Sorter;