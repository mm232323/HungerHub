import type { Metadata } from "next";
import SignUpClient from "./client";

export const metadata: Metadata = {
  title: "Create Your HungerHub Account",
  description: "Sign up to HungerHub as a Customer or Merchant to unlock food discovery and live management.",
};

export default function SignUpPage() {
  return <SignUpClient />;
}
