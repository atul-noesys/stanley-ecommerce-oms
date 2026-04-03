"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { ToastProvider } from "@/shared/provider/ToastProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ToastProvider />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};
