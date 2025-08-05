import { ReactNode } from "react";

// /products/layout.js (or page.js)
export async function generateStaticParams() {
  return [
    { productId: '1' },
    { productId: '2' },
    { productId: '3' },
  ];
}

export default function Layout({ children } : { children: ReactNode }) {
  return <>{children}</>;
}