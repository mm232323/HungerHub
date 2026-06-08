"use client";

import * as React from "react";
import { ClerkProvider, useAuth, useUser } from "@clerk/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setBaseUrl, setAuthTokenGetter, setUsernameGetter } from "@/utils/api";
import { usePathname, useRouter } from "next/navigation";
import { SiteHeader } from "@/layout/site-header";
import { BottomNav } from "@/layout/bottom-nav";
import { Footer } from "@/layout/footer";
import { CartProvider } from "@/shared/contexts/CartContext";

// Initialize the API client base URL
const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8080";
setBaseUrl(apiUrl);

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

function AuthConfig() {
  const { getToken } = useAuth();
  const { user } = useUser();
  
  React.useEffect(() => {
    setAuthTokenGetter(async () => {
      try {
        return await getToken();
      } catch {
        return null;
      }
    });

    setUsernameGetter(() => {
      return user?.username || null;
    });
  }, [getToken, user]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Handle locale prefixes in pathname (e.g., /en/dashboard)
  const isDashboard = pathname ? /^\/([^\/]+\/)?dashboard/.test(pathname) : false;
  const isAuth = pathname ? /^\/([^\/]+\/)?auth/.test(pathname) : false;
  const isDiscover = pathname ? /^\/([^\/]+\/)?discover/.test(pathname) : false;

  const showLayout = pathname && !isDashboard && !isAuth;
  const showFooter = showLayout && !isDiscover;

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
    <ClerkProvider 
      publishableKey={clerkPublishableKey}
      routerPush={(to) => router.push(to)}
      routerReplace={(to) => router.replace(to)}
    >
      <AuthConfig />
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          {showLayout && <SiteHeader />}
          {children}
          {showFooter && <Footer showMerchantCTA={pathname === "/home" || pathname === "/" || pathname === "/en" || pathname === "/ar"} />}
          {showLayout && <BottomNav />}
        </CartProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

