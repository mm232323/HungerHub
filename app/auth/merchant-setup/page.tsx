import type { Metadata } from "next";
import { MerchantSetupView } from "@/shared/components/pages/auth/merchant-setup-view";

export const metadata: Metadata = {
  title: "Setting Up Merchant Account - HungerHub",
  description:
    "Setting up secure metadata configuration for your HungerHub restaurant merchant dashboard.",
};

export default function MerchantSetupPage() {
  return <MerchantSetupView />;
}
