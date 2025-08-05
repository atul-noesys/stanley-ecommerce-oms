// import Link from 'next/link';
import React from "react";

import type { ButtonProps } from "@/shared/Button/Button";
import Button from "@/shared/Button/Button";

export interface BrandButtonProps extends ButtonProps {
  href?: any;
}

const BrandButton: React.FC<BrandButtonProps> = ({
  className,
  ...args
}) => {
  return (
    <Button
      className={`rounded bg-brand text-black hover:bg-brand/80 disabled:bg-opacity-70 dark:bg-white dark:text-black dark:hover:bg-white/80 ${className}`}
      {...args}
    />
  );
};

export default BrandButton;
