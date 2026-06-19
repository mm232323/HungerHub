'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from '../../ui/badge';
import { FeedAd } from '@/types';
import { Megaphone, ExternalLink, Heart, MessageCircle, Share2, SendHorizontal } from 'lucide-react';
import { Button } from '../../ui/button';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useGetFeedAdComments, useCommentFeedAd, useLikeFeedAd, useGetFeedAdLikes } from '@/apis/feed';
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@clerk/nextjs";

export default function FeedAdCard({ ad, onAuthRequired }: { ad: FeedAd; onAuthRequired?: () => void }) {
  const t = useTranslations("Dashboard.Marketing");
  const toastT = useTranslations("Toasts");
  const queryClient = useQueryClient();
  const { isSignedIn } = useAuth();

  const { data: likesData = { isLiked: false, likes: 0 } } = useGetFeedAdLikes(ad.id);
  const isLiked = likesData.isLiked;
  const likes = likesData.likes;

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const { data: comments = [] } = useGetFeedAdComments(ad.id);
  const commentMutation = useCommentFeedAd({
    mutation: {
      onSuccess: () => {
        toast({ title: toastT("commentPosted") });
        queryClient.invalidateQueries({ queryKey: ["/feed/ads/comments", ad.id] });
      }
    }
  });

  const likeMutation = useLikeFeedAd({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/feed/ads/likes", ad.id] });
      }
    }
  });

  const handleLike = () => {
    if (!isSignedIn) {
      if (onAuthRequired) onAuthRequired();
      return;
    }
    likeMutation.mutate({ id: ad.id });
  };

  const handleCommentClick = () => {
    if (!isSignedIn) {
      if (onAuthRequired) onAuthRequired();
      return;
    }
    setShowCommentBox(!showCommentBox);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      if (onAuthRequired) onAuthRequired();
      return;
    }
    if (!commentText.trim()) return;
    
    commentMutation.mutate({ id: ad.id, data: { content: commentText } });
    setCommentText("");
  };

  return (
    <article className="mb-6 bg-card border rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Top Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/merchant/${ad.merchant?.slug || ad.merchantId}`} className="block">
            <img
              src={ad.merchant?.profileImage || "https://picsum.photos/40/40"}
              alt={ad.merchant?.name || "Merchant"}
              className="w-10 h-10 rounded-full object-cover bg-muted"
            />
          </Link>
          <div>
            <Link href={`/merchant/${ad.merchant?.slug || ad.merchantId}`} className="block">
              <h3 className="font-semibold text-sm hover:underline">{ad.merchant?.name || "Merchant"}</h3>
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
              <Badge variant="secondary" className="px-1.5 py-0 text-[10px] uppercase font-bold flex items-center gap-1 bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-500">
                <Megaphone className="h-3 w-3" />
                Sponsored
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Body / Image */}
      <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden bg-muted">
        {ad.img ? (
          <img
            src={ad.img}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image provided</span>
          </div>
        )}
      </div>

      {/* Content / Footer */}
      <div className="pt-2 pb-4 space-y-3">
        <div className="px-4 space-y-2">
          <h4 className="font-bold text-lg">{ad.title}</h4>
          <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">{ad.description}</p>
          
          {ad.providedProduct && (
            <div className="pt-2">
              <Link href={`/product/${ad.providedProduct}`} className="block">
                <Button variant="default" className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-md transition-all flex items-center justify-center gap-2 h-12">
                  {t("viewOffer") || "View Offer"} <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-4 flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              className={`hover:bg-primary/10 rounded-full gap-2 transition-colors ${isLiked ? "text-primary hover:text-primary" : "text-muted-foreground"}`}
              onClick={handleLike}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-current text-primary" : ""}`} />
              <span className="font-semibold text-sm">{likes.toLocaleString()}</span>
            </Button>
            <Button 
              variant="ghost" 
              className="hover:bg-muted rounded-full gap-2 text-muted-foreground transition-colors"
              onClick={handleCommentClick}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold text-sm hidden sm:inline">{t("commentsText") || "Comments"}</span>
              <span className="font-semibold text-sm sm:hidden">{comments.length}</span>
            </Button>
            <Button 
              variant="ghost" 
              className="hover:bg-muted rounded-full gap-2 text-muted-foreground transition-colors"
              disabled={isSharing}
              onClick={async () => {
                if (navigator.share) {
                  try {
                    setIsSharing(true);
                    await navigator.share({
                      title: ad.title,
                      text: ad.description,
                      url: window.location.href,
                    });
                  } catch (err: any) {
                    if (err.name !== 'AbortError') {
                      console.error("Error sharing:", err);
                    }
                  } finally {
                    setIsSharing(false);
                  }
                } else {
                  toast({ title: toastT("shareNotSupported") });
                }
              }}
            >
              <Share2 className="h-5 w-5" />
              <span className="font-semibold text-sm hidden sm:inline">{t("share") || "Share"}</span>
            </Button>
          </div>
        </div>

        {/* Real Comments Display */}
        {comments.length > 0 && (
          <div className="px-4 pt-2 space-y-3 border-t">
            {comments.map((comment: any) => (
              <div key={comment.id} className="flex gap-2 items-start">
                {comment.user?.imageUrl ? (
                  <img src={comment.user.imageUrl} alt={comment.user.name} className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary">
                      {comment.user?.name ? comment.user.name.substring(0, 2).toUpperCase() : comment.sessionId.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1 bg-muted/30 rounded-2xl px-3 py-2">
                  <p className="text-xs font-semibold mb-0.5 text-foreground">
                    {comment.user?.name || `User ${comment.sessionId.substring(0, 4)}`}
                  </p>
                  <p className="text-sm text-foreground/90">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Comment Input */}
        {showCommentBox && (
          <div className="px-4 pt-2">
            <form onSubmit={handleCommentSubmit} className="relative flex items-center">
              <Input
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="rounded-full pr-10 border-muted-foreground/20 bg-muted/30 focus-visible:ring-1 focus-visible:ring-primary/50"
                autoFocus
                disabled={commentMutation.isPending}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-1 h-8 w-8 rounded-full text-primary hover:bg-primary/10"
                disabled={!commentText.trim() || commentMutation.isPending}
              >
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </div>
    </article>
  );
}
