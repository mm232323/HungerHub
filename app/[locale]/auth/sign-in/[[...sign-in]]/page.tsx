import type { Metadata } from "next";
import { SignInView } from "@/shared/components/pages/auth/sign-in/sign-in-view";

export const metadata: Metadata = {
  title: "Sign In to HungerHub",
  description:
    "Sign in to HungerHub as a Customer or Merchant to manage your experience.",
};

export default function SignInPage() {
  return <SignInView />;
}
