import Image from "next/image";
import React from "react";

import LoginForm from "@/components/account/LoginForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import login from "@/images/login.jpg";
import ButtonLink from "@/shared/Button/ButtonLink";

const PageLogin = () => {
  const breadcrumbItems = [
    { title: <ButtonLink href="/">Home</ButtonLink> },
    { title: "Account" },
  ];
  return (
    <main>
      <div data-nc-id="PageLogin" className="container">
        <Breadcrumbs Items={breadcrumbItems} />
          <div className="h-[80vh] flex justify-center flex-col md:flex-row">
            <div className="flex items-center bg-white px-5 py-8 dark:bg-neutral-900 lg:px-24 w-full md:w-1/2 lg:w-2/5">
              <LoginForm />
            </div>
          </div>
      </div>
    </main>
  );
};

export default PageLogin;
