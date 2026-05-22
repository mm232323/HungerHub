import type { Metadata } from "next";
import { DiscoverPageView } from "@/shared/components/pages/discover/discover-page-view";
import { getFeed, getFeedStories } from "@/lib/server-api";

export const metadata: Metadata = {
  title: "Discover Local Food Gems - HungerHub",
  description:
    "Browse live stories, news, features and amazing dishes near you on HungerHub.",
};

export default async function DiscoverPage() {
  const [initialStories, initialFeed] = await Promise.all([
    getFeedStories(),
    getFeed(),
  ]);

  return (
    <DiscoverPageView
      initialStories={initialStories}
      initialFeed={initialFeed}
    />
  );
}
