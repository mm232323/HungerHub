import type { Metadata } from "next";
import { SignUpView } from "@/shared/components/pages/auth/sign-up/sign-up-view";

export const metadata: Metadata = {
  title: "Create Your HungerHub Account",
  description:
    "Sign up to HungerHub as a Customer or Merchant to unlock food discovery and live management.",
};

export default function SignUpPage() {
  return <SignUpView />;
}
