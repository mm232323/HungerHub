import type { Metadata } from "next";
import { getFeed, getFeedStories } from "@/lib/server-api";

import { getMessages } from "next-intl/server";
import StoriesBar from "@/shared/components/pages/discover/StoriesBar";
import Feed from "@/shared/components/pages/discover/Feed";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMessages({ locale });
  const discoverPage = (t as any).DiscoverPage;

  return {
    title: discoverPage?.title || "Discover Local Food Gems - HungerHub",
    description:
      discoverPage?.description ||
      "Browse live stories, news, features and amazing dishes near you on HungerHub.",
  };
}

export default async function DiscoverPage() {
  const [initialStories, initialFeed] = await Promise.all([
    getFeedStories(),
    getFeed(),
  ]);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="container max-w-2xl mx-auto">
        <StoriesBar initialStories={initialStories} />
        <Feed initialFeed={initialFeed} />
      </div>
    </div>
  );
}
