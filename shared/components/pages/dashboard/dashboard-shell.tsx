"use client";
import SideBar from "./SideBar";
import { redirect, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import { listMerchants } from "@/apis/merchants";
import { MerchantContext } from "@/hooks/use-merchant";
import { useEffect } from "react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const userName = user?.username;

  const { data: merchants, isLoading: isMerchantLoading } = useQuery({
    queryKey: ['merchants', { owner_user_name: userName }],
    queryFn: () => listMerchants({ owner_user_name: userName! }),
    enabled: !!userName
  });

  const merchant = merchants?.[0];

  useEffect(() => {
    if (!userName && isLoaded && isSignedIn) {
      router.push("/auth/merchant-setup");
      return;
    }
    if (!isMerchantLoading && userName && merchants && merchants.length === 0) {
      router.push("/auth/merchant-setup");
    }
  }, [isMerchantLoading, userName, merchants, router, isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isSignedIn) {
    return redirect("/auth/sign-in");
  }

  if (isMerchantLoading && userName) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!merchant) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <MerchantContext.Provider value={merchant}>
      <div className="flex h-screen overflow-hidden w-full flex-col md:flex-row">
        <SideBar />
        <main className="flex-1 overflow-y-auto bg-stone-50 min-w-0">
          {children}
        </main>
      </div>
    </MerchantContext.Provider>
  );
}
