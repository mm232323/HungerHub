import type { Metadata } from "next";
import SignInClient from "./client";

export const metadata: Metadata = {
  title: "Sign In to HungerHub",
  description: "Sign in to HungerHub as a Customer or Merchant to manage your experience.",
};

export default function SignInPage() {
  return <SignInClient />;
}
