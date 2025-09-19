import "@/styles/global.css";

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import React from "react";

import { StoreProvider } from "@/store/store-context";
import { ApolloWrapper } from "./ApolloWrapper";
import { Providers } from "./providers";
import ProductDataInitializer from "./productDataInitializer";
import I18nProvider from "../components/I18nProvider";

export const metadata: Metadata = {
  title: "Stanley OMS 2",
  icons: [
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon.png" },
    { rel: "icon", url: "/favicon.ico" },
  ],
};

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-neutral-100 dark:bg-gray ${dmSans.className}`}>
        <ApolloWrapper>
          <Providers>
            <StoreProvider>
              <ProductDataInitializer>
                <I18nProvider>{children}</I18nProvider>
              </ProductDataInitializer>
            </StoreProvider>
          </Providers>
        </ApolloWrapper>
      </body>
    </html>
  );
}
