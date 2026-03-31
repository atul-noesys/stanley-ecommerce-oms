import React, { Suspense } from "react";

import Loading from "@/app/loading";
import Header from "@/components/Header/Header";
import Footer from "@/shared/Footer/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </ProtectedRoute>
      <Footer />
    </>
  );
}
