"use client";

import { numberFormatter } from "@/store/product-store";
import Image from "next/image";
import { pathOr } from "ramda";
import type { FC } from "react";
import { useState } from "react";

interface ImageShowCaseProps {
  shots: string[];
  soh: number;
  tag?: string;
}

const ImageShowCase: FC<ImageShowCaseProps> = ({ shots, soh, tag }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="flex flex-col gap-3 border-neutral-300 p-2 xl:gap-4">
      {/* Big image at the top */}
      <div className="w-full">
        <div className="relative overflow-hidden rounded-2xl lg:h-[400px] lg:w-full bg-white">
          <Image
            src={pathOr("", [activeImageIndex], shots)}
            alt="shoe image"
            width={600}
            height={400}
            className="size-full object-contain object-center"
          />
          {/* Stock status badges */}
          {soh === -1 ? (
            <span className="absolute right-4 top-4 bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-md">
              OUT OF STOCK
            </span>
          ) : soh === 0 ? (
            <span className="absolute right-4 top-4 bg-yellow-500 px-2 py-1 text-xs font-bold text-white shadow-md">
              BACK ORDER
            </span>
          ) : (
            <span className="absolute right-4 top-4 bg-green-500 px-2 py-1 text-xs font-bold text-white shadow-md">
              IN STOCK : {numberFormatter(soh)}
            </span>
          )}
          {/* New/Promotion badge */}
          {tag && (
            <span
              className={`absolute uppercase right-4 bottom-4 px-2 py-1 text-xs font-bold shadow-md ${
                tag === "New"
                  ? "bg-blue-500"
                  : tag === "Promotion"
                    ? "bg-red-700"
                    : "bg-black"
              }
                      ${tag === "Focused" ? "text-brand" : "text-white"} `}
            >
              {tag}
            </span>
          )}
        </div>
      </div>

      {/* Thumbnails at the bottom */}
      <div className="w-full">
        <div className="flex gap-3">
          {shots.map((shot, index) => (
            <div
              key={shot}
              className={`${
                activeImageIndex === index ? "border-2 border-primary" : ""
              } relative h-[100px] w-[140px] overflow-hidden rounded-lg bg-white`}
            >
              <button
                className="h-[100px] w-[140px]"
                type="button"
                onClick={() => setActiveImageIndex(index)}
              >
                <Image
                  src={shot}
                  alt="Product image"
                  width={120}
                  height={100}
                  className="size-full object-contain object-center"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageShowCase;
