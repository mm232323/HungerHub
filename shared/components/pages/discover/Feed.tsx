"use client";
import React, { useEffect, useState } from "react";
import { FeedPost, FeedAd } from "@/types";
import ArticleTop from "./ArticleTop";
import ArticleBody from "./ArticleBody";
import ArticleActions from "./ArticleActions";
import ArticleComments from "./ArticleComments";
import FeedAdCard from "./FeedAdCard";
import ArticleCard from "./ArticleCard";
import { useGeolocation } from "@/hooks/useGeolocation";
import { motion, AnimatePresence } from "framer-motion";

function Feed({ initialFeed, initialAds = [] }: { initialFeed: FeedPost[], initialAds?: FeedAd[] }) {
  const [feed, setFeed] = useState(initialFeed);
  
  const { location, error } = useGeolocation();
  const [nearbyMerchantIds, setNearbyMerchantIds] = useState<number[]>([]);

  useEffect(() => {
    if (location && !error) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8080"}/merchants/trending?lat=${location.lat}&lng=${location.lng}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setNearbyMerchantIds(data.map(m => m.id));
          }
        })
        .catch(console.error);
    }
  }, [location, error]);

  useEffect(() => {
    setFeed(initialFeed);
  }, [initialFeed]);

  // Combine feed and ads (1 ad every 3 posts)
  const combinedItems: { type: 'post' | 'ad'; data: FeedPost | FeedAd }[] = [];
  let adIndex = 0;

  // Sort ads prioritizing nearby merchants
  const sortedAds = [...initialAds].sort((a, b) => {
    if (nearbyMerchantIds.length === 0) return 0;
    const idxA = nearbyMerchantIds.indexOf(a.merchantId);
    const idxB = nearbyMerchantIds.indexOf(b.merchantId);
    const rankA = idxA === -1 ? 9999 : idxA;
    const rankB = idxB === -1 ? 9999 : idxB;
    return rankA - rankB;
  });
  
  feed.forEach((post, index) => {
    combinedItems.push({ type: 'post', data: post });
    // After every 3rd post, insert an ad if available
    if ((index + 1) % 3 === 0 && adIndex < sortedAds.length) {
      combinedItems.push({ type: 'ad', data: sortedAds[adIndex] });
      adIndex++;
    }
  });

  // If the feed is very short or empty, ensure we at least show some ads
  if (adIndex < sortedAds.length) {
    // Append up to 3 remaining ads at the end to ensure they are visible
    const remainingAds = sortedAds.slice(adIndex, adIndex + 3);
    remainingAds.forEach(ad => {
      combinedItems.push({ type: 'ad', data: ad });
    });
  }

  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-1">
        {combinedItems.map((item, idx) => {
          if (item.type === 'ad') {
            return <FeedAdCard key={`ad-${item.data.id}-${idx}`} ad={item.data as FeedAd} onAuthRequired={() => setShowAuthModal(true)} />;
          }
          
          const post = item.data as FeedPost;
          return <ArticleCard key={`post-${post.id}`} post={post} setFeed={setFeed} onAuthRequired={() => setShowAuthModal(true)} />;
        })}
      </div>

      <AnimatePresence>
        {showAuthModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" 
            onClick={() => setShowAuthModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white p-8 rounded-3xl max-w-sm w-full space-y-6 shadow-2xl" 
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">Sign In Required</h3>
                <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                  Please sign in to interact with posts and leave comments.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a href="/auth/sign-in" className="w-full" onClick={() => setShowAuthModal(false)}>
                  <button className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-md">Sign In</button>
                </a>
                <a href="/auth/sign-up" className="w-full" onClick={() => setShowAuthModal(false)}>
                  <button className="w-full h-12 rounded-xl font-bold text-base border border-gray-300 hover:bg-gray-50 transition-colors">Create Account</button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Feed;
