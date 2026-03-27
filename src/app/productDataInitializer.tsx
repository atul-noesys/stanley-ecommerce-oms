"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./loading";
import { useProducts } from "@/hooks/useProducts";

const ProductDataInitializer = ({ children }: { children: React.ReactNode }) => {
  const { loading, error } = useProducts();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      if (error.message.includes("Unauthorized")) {
        router.push("/login");
      } else {
        router.push("/");
      }
    }
  }, [error, router]);

  if (loading) return <Loading />;
  if (error && !error.message.includes("Unauthorized"))
    return <p>Error {error.message}</p>;

  return <>{children}</>;
};

export default ProductDataInitializer;
