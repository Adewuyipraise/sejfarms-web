"use client";

import { useState } from "react";
import { SocialShare } from "./social-share";

export function PostLikeManager({
  postId,
  title,
  url,
  initialLikes,
  position,
}: {
  postId: string;
  title: string;
  url: string;
  initialLikes: number;
  position: "top" | "bottom";
}) {
  // Because this component is rendered twice, we need a way to sync them.
  // The easiest way without a global state manager is a custom event.
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    setLikes((prev) => prev + 1);

    // Dispatch a custom event so the other component updates too
    window.dispatchEvent(new CustomEvent("post-liked", { detail: { postId } }));

    try {
      await fetch("/api/like-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
    } catch (error) {
      setLiked(false);
      setLikes((prev) => prev - 1);
    }
  };

  // Listen for the custom event to sync state
  useState(() => {
    const syncHandler = (e: any) => {
      if (e.detail.postId === postId) {
        setLikes((prev) => (liked ? prev : prev + 1));
        setLiked(true);
      }
    };
    window.addEventListener("post-liked", syncHandler);
    return () => window.removeEventListener("post-liked", syncHandler);
  });

  return (
    <SocialShare
      title={title}
      url={url}
      likes={likes}
      liked={liked}
      onLike={handleLike}
    />
  );
}