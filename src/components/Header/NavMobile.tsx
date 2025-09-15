import Link from "next/link";
import React from "react";
import { MdClose } from "react-icons/md";

import { catalogNavLinks } from "@/data/content";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Logo from "@/shared/Logo/Logo";

export interface NavMobileProps {
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({ onClickClose }) => {
  return (
    <div className="h-screen w-full overflow-y-auto bg-white px-5 py-2 shadow-lg ring-1 transition dark:bg-gray">
      <div className=" border-b border-neutral-300 py-2 dark:border-neutral-600">
        <Logo />
        {/* eslint-disable */}
        <span className="absolute right-2 top-2 p-1" onClick={onClickClose}>
          {/* eslint-disable */}
          <MdClose />
        </span>
      </div>
      <ul className="flex flex-col space-y-5 py-6 divide-y divide-neutral-300 dark:divide-neutral-600 border-b border-neutral-300 dark:border-neutral-600">
        {catalogNavLinks.map((item) => (
          <Link
            href={item.href}
            onClick={onClickClose}
            key={item.id}
            className="capitalize pt-4"
          >
            {item.name}
          </Link>
        ))}
      </ul>

      <div className="py-10">
        <ButtonPrimary className="w-full">Log in</ButtonPrimary>
        <p className="mt-4 text-center">
          No account yet?{" "}
          <Link href="/account/signup" className="underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NavMobile;
