import type { Metadata } from "next";
import MerchantSignUpClient from "./client";

export const metadata: Metadata = {
  title: "Merchant Registration - HungerHub",
  description: "Register your restaurant business on HungerHub to access live order management, campaigns, and AI growth analytics.",
};

export default function MerchantSignUpPage() {
  return <MerchantSignUpClient />;
}
