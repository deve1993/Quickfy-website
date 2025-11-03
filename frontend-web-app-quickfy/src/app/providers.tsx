"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TranslationsProvider } from "@/lib/i18n/TranslationsProvider";
import { BrandProvider } from "@/components/providers/BrandProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <BrandProvider>
        <QueryClientProvider client={queryClient}>
          <TranslationsProvider>
            {children}
            <Toaster />
            <SonnerToaster richColors position="top-right" />
          </TranslationsProvider>
        </QueryClientProvider>
      </BrandProvider>
    </ThemeProvider>
  );
}
