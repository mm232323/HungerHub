"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLikeFeedPost, useSaveFeedPost } from "@/utils/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import type { FeedPost, MerchantStory } from "@/types";

export type DiscoverPageViewProps = {
  initialStories: MerchantStory[];
  initialFeed: FeedPost[];
};

export function DiscoverPageView({
  initialStories,
  initialFeed,
}: DiscoverPageViewProps) {
  const { toast } = useToast();
  const [feed, setFeed] = useState(initialFeed);

  useEffect(() => {
    setFeed(initialFeed);
  }, [initialFeed]);

  const likeMutation = useLikeFeedPost({
    mutation: {
      onSuccess: (data, { id }) => {
        toast({ title: "Post liked" });
        setFeed((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, isLiked: data.isLiked, likes: data.likes }
              : p,
          ),
        );
      },
    },
  });

  const saveMutation = useSaveFeedPost({
    mutation: {
      onSuccess: (data, { id }) => {
        toast({ title: "Post saved" });
        setFeed((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, isSaved: data.isSaved } : p,
          ),
        );
      },
    },
  });

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="container max-w-2xl mx-auto">
        <div className="px-4 py-4 flex gap-4 overflow-x-auto hide-scrollbar border-b">
          {initialStories.map((story) => (
            <Link
              key={story.id}
              href={`/merchant/${story.merchantId}`}
              className="flex flex-col items-center gap-2 shrink-0 cursor-pointer"
            >
              <div
                className={`p-1 rounded-full ${story.hasUnviewed ? "bg-gradient-to-tr from-primary to-orange-400" : "bg-muted"}`}
              >
                <Avatar className="h-14 w-14 border-2 border-background">
                  <AvatarImage
                    src={story.merchant.profileImage}
                    alt={story.merchant.name}
                  />
                  <AvatarFallback>
                    {story.merchant.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <span className="text-xs text-muted-foreground truncate w-16 text-center">
                {story.merchant.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="divide-y divide-border">
          {feed.map((post) => (
            <article key={post.id} className="py-4 space-y-4">
              <div className="px-4 flex items-center justify-between">
                <Link
                  href={`/merchant/${post.merchantId}`}
                  className="flex items-center gap-3"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={post.merchant.profileImage}
                      alt={post.merchant.name}
                    />
                    <AvatarFallback>
                      {post.merchant.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm">{post.merchant.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </Link>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>

              <div className="aspect-[4/5] bg-muted relative">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                />
                {post.productId && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <Link href={`/product/${post.productId}`}>
                      <div className="bg-background/90 backdrop-blur border rounded-xl p-3 flex items-center justify-between shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-muted overflow-hidden">
                            <img
                              src={
                                (post.product as { image?: string })?.image ||
                                ""
                              }
                              alt={(post.product as { name?: string })?.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              {(post.product as { name?: string })?.name ||
                                "Featured Item"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              $
                              {(post.product as { price?: number })?.price?.toFixed(
                                2,
                              ) || "0.00"}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" className="rounded-full h-8">
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <div className="px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`hover:text-primary ${post.isLiked ? "text-primary" : ""}`}
                    onClick={() => likeMutation.mutate({ id: post.id })}
                  >
                    <Heart
                      className={`h-6 w-6 ${post.isLiked ? "fill-current" : ""}`}
                    />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-6 w-6" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => saveMutation.mutate({ id: post.id })}
                >
                  <Bookmark
                    className={`h-6 w-6 ${post.isSaved ? "fill-current" : ""}`}
                  />
                </Button>
              </div>

              <div className="px-4 space-y-2">
                <p className="font-semibold text-sm">
                  {post.likes.toLocaleString()} likes
                </p>
                <p className="text-sm">
                  <span className="font-semibold mr-2">{post.merchant.name}</span>
                  {post.caption}
                </p>
                {post.comments && post.comments > 0 && (
                  <p className="text-muted-foreground text-sm cursor-pointer">
                    View all {post.comments} comments
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
