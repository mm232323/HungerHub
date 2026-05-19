import type { Metadata } from "next";
import DiscoverClient from "./client";

export const metadata: Metadata = {
  title: "Discover Local Food Gems - HungerHub",
  description: "Browse live stories, news, features and amazing dishes near you on HungerHub.",
};

export default function DiscoverPage() {
  return <DiscoverClient />;
}