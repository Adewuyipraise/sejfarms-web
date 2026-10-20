"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SocialShare } from "./social-share";

export function LikeAndShare({
  documentId,
  title,
  url,
  initialLikes = 0,
}: {
  documentId: string;
  title: string;
  url: string;
  initialLikes?: number;
}) {
  const router = useRouter();
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked) return;
    
    setLiked(true);
    setLikes((prev) => prev + 1);

    try {
      await fetch("/api/like", { // <-- Updated to the generic route
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId }),
      });
      router.refresh(); 
    } catch (error) {
      setLiked(false);
      setLikes((prev) => prev - 1);
    }
  };

  return (
    <div className="my-10">
      <SocialShare
        title={title}
        url={url}
        likes={likes}
        liked={liked}
        onLike={handleLike}
      />
    </div>
  );
}