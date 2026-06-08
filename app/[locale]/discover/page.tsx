import type { Metadata } from "next";
import { getFeed, getFeedStories, getFeedAds, getFollowedMerchants } from "@/lib/server-api";

import { getMessages } from "next-intl/server";
import StoriesBar from "@/shared/components/pages/discover/StoriesBar";
import Feed from "@/shared/components/pages/discover/Feed";
import { FollowedMerchantsSideBar } from "@/shared/components/pages/discover/FollowedMerchantsSideBar";

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
  const [initialStories, initialFeed, initialAds, followedMerchants] = await Promise.all([
    getFeedStories(),
    getFeed(),
    getFeedAds(),
    getFollowedMerchants(),
  ]);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="container max-w-6xl mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-4 lg:gap-8">
          {/* Main Feed Section */}
          <div className="md:col-span-8 lg:col-span-8 w-full min-h-screen">
            <StoriesBar initialStories={initialStories} />
            <Feed initialFeed={initialFeed} initialAds={initialAds} />
          </div>

          {/* Right Sidebar */}
          <div className="hidden md:block md:col-span-4 lg:col-span-4 pt-4 pr-4 pl-2 lg:pl-0">
            <FollowedMerchantsSideBar merchants={followedMerchants} />
          </div>
        </div>
      </div>
    </div>
  );
}
