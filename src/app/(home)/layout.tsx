import React, { Suspense } from "react";

import Loading from "@/app/loading";
import Header from "@/components/Header/Header";
import Footer from "@/shared/Footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <Footer />
    </>
  );
}
