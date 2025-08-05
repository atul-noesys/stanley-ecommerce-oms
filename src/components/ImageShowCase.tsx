"use client";

import Image from "next/image";
import { pathOr } from "ramda";
import type { FC } from "react";
import { useState } from "react";

interface ImageShowCaseProps {
  shots: string[];
}

const ImageShowCase: FC<ImageShowCaseProps> = ({ shots }) => {
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