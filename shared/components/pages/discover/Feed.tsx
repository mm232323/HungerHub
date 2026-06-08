"use client";
import React, { useEffect, useState } from "react";
import { FeedPost, FeedAd } from "@/types";
import ArticleTop from "./ArticleTop";
import ArticleBody from "./ArticleBody";
import ArticleActions from "./ArticleActions";
import ArticleComments from "./ArticleComments";
import FeedAdCard from "./FeedAdCard";
import ArticleCard from "./ArticleCard";

function Feed({ initialFeed, initialAds = [] }: { initialFeed: FeedPost[], initialAds?: FeedAd[] }) {
  const [feed, setFeed] = useState(initialFeed);
  
  useEffect(() => {
    setFeed(initialFeed);
  }, [initialFeed]);

  // Combine feed and ads (1 ad every 3 posts)
  const combinedItems: { type: 'post' | 'ad'; data: FeedPost | FeedAd }[] = [];
  let adIndex = 0;
  
  feed.forEach((post, index) => {
    combinedItems.push({ type: 'post', data: post });
    // After every 3rd post, insert an ad if available
    if ((index + 1) % 3 === 0 && adIndex < initialAds.length) {
      combinedItems.push({ type: 'ad', data: initialAds[adIndex] });
      adIndex++;
    }
  });

  // If the feed is very short or empty, ensure we at least show some ads
  if (adIndex < initialAds.length) {
    // Append up to 3 remaining ads at the end to ensure they are visible
    const remainingAds = initialAds.slice(adIndex, adIndex + 3);
    remainingAds.forEach(ad => {
      combinedItems.push({ type: 'ad', data: ad });
    });
  }

  return (
    <div className="flex flex-col gap-1">
      {combinedItems.map((item, idx) => {
        if (item.type === 'ad') {
          return <FeedAdCard key={`ad-${item.data.id}-${idx}`} ad={item.data as FeedAd} />;
        }
        
        const post = item.data as FeedPost;
        return <ArticleCard key={`post-${post.id}`} post={post} setFeed={setFeed} />;
      })}
    </div>
  );
}

export default Feed;
