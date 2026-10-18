/**
 * Helpers for turning user-supplied video URLs (YouTube, Vimeo, direct files)
 * into embeddable players.
 */

export type VideoProvider = "youtube" | "vimeo" | "file" | "unknown";

export type ParsedVideo = {
  provider: VideoProvider;
  /** Thumbnail image URL, when one can be derived without an API call. */
  thumbnail: string | null;
  /** URL to load in an <iframe>/<video>, with autoplay where supported. */
  embedUrl: string;
};

/** Extract a YouTube video id from any common URL shape. */
export function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?(?:.*&)?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  // Already a bare id
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) return url.trim();
  return null;
}

/** Detect video providers and extract thumbnail + embed URLs. */
export function parseVideo(url: string): ParsedVideo {
  const ytId = getYouTubeId(url);
  if (ytId) {
    return {
      provider: "youtube",
      thumbnail: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
      embedUrl: `https://www.youtube.com/embed/${ytId}?autoplay=1`,
    };
  }

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    const id = vimeoMatch[1];
    return {
      provider: "vimeo",
      // Vimeo thumbnails require an API call; use a generic fallback
      thumbnail: null,
      embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1`,
    };
  }

  if (/\.(mp4|webm|mov)(\?.*)?$/i.test(url)) {
    return { provider: "file", thumbnail: null, embedUrl: url };
  }

  return { provider: "unknown", thumbnail: null, embedUrl: url };
}
