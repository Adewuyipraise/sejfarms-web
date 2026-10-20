"use client";

import { useState } from "react";
import { Share2, Link2, MessageCircle, Heart } from "lucide-react";

export function SocialShare({ 
  title, 
  url, 
  likes = 0,
  liked = false,
  onLike,
}: { 
  title: string; 
  url: string; 
  likes?: number;
  liked?: boolean;
  onLike?: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-border py-4 my-8">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-charcoal">Share:</span>
        
        <div className="flex gap-2">
          <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white" aria-label="Share on WhatsApp">
            <MessageCircle className="h-4 w-4" />
          </a>

          <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2]/10 text-[#1877F2] transition-colors hover:bg-[#1877F2] hover:text-white" aria-label="Share on Facebook">
            <Share2 className="h-4 w-4" />
          </a>

          <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0A66C2]/10 text-[#0A66C2] transition-colors hover:bg-[#0A66C2] hover:text-white" aria-label="Share on LinkedIn">
            <Share2 className="h-4 w-4" />
          </a>

          <button onClick={copyToClipboard} className="relative flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/5 text-charcoal transition-colors hover:bg-charcoal hover:text-white" aria-label="Copy link">
            <Link2 className="h-4 w-4" />
            {copied && (
              <span className="absolute -top-8 whitespace-nowrap rounded bg-charcoal px-2 py-1 text-xs text-white">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>

      {onLike && (
        <button
          onClick={onLike}
          disabled={liked}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            liked ? "bg-red-50 text-red-600 cursor-default" : "bg-gray-50 text-muted hover:bg-gray-100"
          }`}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-red-600" : ""}`} />
          {likes > 0 ? `${likes} Likes` : "Like"}
        </button>
      )}
    </div>
  );
}