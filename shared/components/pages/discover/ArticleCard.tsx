"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { FeedPost } from "@/types";
import ArticleTop from "./ArticleTop";
import ArticleBody from "./ArticleBody";
import ArticleActions from "./ArticleActions";
import ArticleComments from "./ArticleComments";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useGetFeedPostComments, useCommentFeedPost } from "@/apis/feed";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";

export default function ArticleCard({ post, setFeed, onAuthRequired }: { post: FeedPost; setFeed: React.Dispatch<React.SetStateAction<FeedPost[]>>; onAuthRequired?: () => void }) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const queryClient = useQueryClient();
  const { isSignedIn } = useAuth();

  const toastT = useTranslations("Toasts");
  const { data: comments = [] } = useGetFeedPostComments(post.id);
  const commentMutation = useCommentFeedPost({
    mutation: {
      onSuccess: () => {
        toast({ title: toastT("commentPosted") });
        queryClient.invalidateQueries({ queryKey: ["/feed/posts/comments", post.id] });
      }
    }
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      if (onAuthRequired) onAuthRequired();
      return;
    }
    if (!commentText.trim()) return;
    
    commentMutation.mutate({ id: post.id, data: { content: commentText } });
    setCommentText("");
    
    setFeed((prev) =>
      prev.map((p) =>
        p.id === post.id
          ? { ...p, comments: (p.comments || 0) + 1 }
          : p
      )
    );
  };

  return (
    <article className="mb-6 bg-card border rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <ArticleTop post={post} />
      <ArticleBody post={post} />
      <div className="pt-2 pb-4 space-y-3">
        <ArticleActions 
          post={post} 
          setFeed={setFeed} 
          onCommentClick={() => setShowCommentBox(!showCommentBox)} 
          onAuthRequired={onAuthRequired}
        />
        <ArticleComments post={post} comments={comments} />
        
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
