import type { Metadata } from "next";
import MerchantSetupClient from "./client";

export const metadata: Metadata = {
  title: "Setting Up Merchant Account - HungerHub",
  description: "Setting up secure metadata configuration for your HungerHub restaurant merchant dashboard.",
};

export default function MerchantSetupPage() {
  return <MerchantSetupClient />;
}
