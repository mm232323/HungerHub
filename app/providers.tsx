"use client";

import * as React from "react";
import { ClerkProvider } from "@clerk/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setBaseUrl } from "@/utils/api";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/layout/site-header";
import { BottomNav } from "@/layout/bottom-nav";
import { Footer } from "@/layout/footer";

// Initialize the API client base URL
const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8080";
setBaseUrl(apiUrl);

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showLayout = pathname && !pathname.startsWith("/dashboard") && !pathname.startsWith("/auth");

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <QueryClientProvider client={queryClient}>
        {showLayout && <SiteHeader />}
        {children}
        {showLayout && <Footer showMerchantCTA={pathname === "/home" || pathname === "/"} />}
        {showLayout && <BottomNav />}
      </QueryClientProvider>
    </ClerkProvider>
  );
}

