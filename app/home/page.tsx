import type { Metadata } from "next";
import HomeClient from "./client";

export const metadata: Metadata = {
  title: "HungerHub - Food You'll Actually Love",
  description: "Discover local gems, order in minutes, and track your delivery live.",
};

export default function HomePage() {
  return <HomeClient />;
}
