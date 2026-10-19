import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

// Shared function to handle the actual album creation
async function createGalleryAlbum(postId: string) {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: "2026-01-01",
    token: process.env.SANITY_API_WRITE_TOKEN!,
    useCdn: false,
  });

  const post = await client.getDocument(postId);
  
  if (!post || !post.body || !post.slug?.current) {
    return { error: "Missing data", status: 400 };
  }

  const images = post.body.filter((block: any) => block._type === "image");

  if (images.length === 0) {
    return { error: "No images", status: 400 };
  }

  const album = {
    _type: "galleryAlbum",
    _id: `gallery-sync-${post._id}`, 
    title: `Post Images: ${post.title}`,
    slug: { _type: "slug", current: `post-images-${post.slug.current}-${Date.now().toString().slice(-4)}` },
    description: `Automatically generated from the post: ${post.title}`,
    category: "Other", 
    year: new Date(post.publishedAt || Date.now()).getFullYear(),
    coverImage: {
      _type: "image",
      asset: { 
        _type: "reference", 
        _ref: images[0].asset._ref 
      }
    }, 
    images: images.map((img: any) => ({
      _type: "image",
      _key: img._key || Math.random().toString(36).substring(7),
      asset: img.asset,
      caption: img.caption || ""
    }))
  };

  const result = await client.createOrReplace(album);
  return { success: true, albumId: result._id, imageCount: images.length };
}

// 1. POST: Handles Sanity Webhooks
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.SANITY_REVALIDATE_SECRET}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    if (body._type !== "post") return NextResponse.json({ ok: true });

    const result = await createGalleryAlbum(body._id);
    
    if ("error" in result) {
      return NextResponse.json(result, { status: result.status });
    }
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Webhook Gallery sync error:", error.message);
    return NextResponse.json({ message: "Internal error", details: error.message }, { status: 500 });
  }
}

