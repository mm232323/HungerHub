import type { Metadata } from "next";
import { MerchantSignUpView } from "@/shared/components/pages/auth/merchant-sign-up-view";

export const metadata: Metadata = {
  title: "Merchant Registration - HungerHub",
  description:
    "Register your restaurant business on HungerHub to access live order management, campaigns, and AI growth analytics.",
};

export default function MerchantSignUpPage() {
  return <MerchantSignUpView />;
}
