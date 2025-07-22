import React from "react";

import type { ButtonProps } from "@/shared/Button/Button";
import Button from "@/shared/Button/Button";

export interface ButtonSecondaryProps extends ButtonProps {
  href?: any;
}

const ButtonSecondary2: React.FC<ButtonSecondaryProps> = ({
  className = "",
  ...args
}) => {
  const CLASSES = `text-black border-2 border-black dark:border-neutral-500 dark:text-white hover:bg-black hover:text-white transition-all duration-200 text-sm ${className}`;

  return <Button className={CLASSES} {...args} />;
};

export default ButtonSecondary2;
