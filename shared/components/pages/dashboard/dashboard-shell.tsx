"use client";
import SideBar from "./SideBar";
import { useGetMerchantProfile } from "@/apis";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const { data, error, isLoading: isMerchantLoading } = useGetMerchantProfile({
    query: {
      enabled: isLoaded && isSignedIn,
    },
  });

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/auth/sign-in");
    } else if (error) {
      router.replace("/auth/merchant-setup");
    }
  }, [isLoaded, isSignedIn, error, router]);

  if (!isLoaded || (isSignedIn && isMerchantLoading)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isSignedIn || error || !data) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden w-full flex-col md:flex-row">
      <SideBar />
      <main className="flex-1 overflow-y-auto bg-stone-50 min-w-0">
        {children}
      </main>
    </div>
  );
}
