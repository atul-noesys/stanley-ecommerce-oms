import React from "react";
interface ProductDescriptiontabProps {
  details?: string;
}

const ProductDescriptiontab = ({ details }: ProductDescriptiontabProps) => {
  return (
    <div className="">
      <details className="group">
        <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-5">
          <div className="space-x-6 group-open:text-primary dark:group-open:text-white">
            <span>Description</span>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="block size-5 group-open:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="hidden size-5 group-open:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </div>
        </summary>
        <div className=" pb-4 text-sm ">
          <p className="text-neutral-500 dark:text-neutral-300">
            {details}
          </p>
        </div>
      </details>
    </div>
  );
};

export default ProductDescriptiontab;
