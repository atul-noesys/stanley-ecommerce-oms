import React, { Suspense } from "react";

import Loading from "@/app/loading";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CheckoutHeader />
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </ProtectedRoute>
    </>
  );
}
