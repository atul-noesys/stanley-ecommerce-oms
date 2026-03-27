import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link className="flex cursor-pointer items-center gap-1" href="/">
      <Image
        width={300}
        height={50}
        className="dark:hidden xl:-my-2 xl:-ml-6"
        src="/assets/images/logo.png"
        alt="Logo"
      />
    </Link>
  );
};

export default Logo;
