"use client";
import React, { useEffect, useState } from "react";
import { FeedPost } from "@/types";
import ArticleTop from "./ArticleTop";
import ArticleBody from "./ArticleBody";
import ArticleActions from "./ArticleActions";
import ArticleComments from "./ArticleComments";
function Feed({ initialFeed }: { initialFeed: FeedPost[] }) {
  const [feed, setFeed] = useState(initialFeed);
  useEffect(() => {
    setFeed(initialFeed);
  }, [initialFeed]);
  return (
    <div className="divide-y divide-border">
      {feed.map((post) => (
        <article key={post.id} className="py-4 space-y-4">
          <ArticleTop post={post} />
          <ArticleBody post={post} />
          <ArticleActions post={post} setFeed={setFeed} />
          <ArticleComments post={post} />
        </article>
      ))}
    </div>
  );
}

export default Feed;
