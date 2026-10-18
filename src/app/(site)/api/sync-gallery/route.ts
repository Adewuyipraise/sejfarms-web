import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ error: "Missing ?postId=" }, { status: 400 });
    }

    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: "2026-01-01",
      token: process.env.SANITY_API_WRITE_TOKEN!,
      useCdn: false,
    });

    const post = await client.getDocument(postId);
    if (!post || !post.body) {
      return NextResponse.json({ error: "Post not found or empty body" }, { status: 404 });
    }

    const images = post.body.filter((block: any) => block._type === "image");
    if (images.length === 0) {
      return NextResponse.json({ error: "No images in this post" }, { status: 400 });
    }

    const album = {
      _type: "galleryAlbum",
      _id: `gallery-sync-${post._id}`, 
      title: `Post Images: ${post.title}`,
      slug: { _type: "slug", current: `post-images-${post.slug.current}-${Date.now().toString().slice(-4)}` },
      description: `Automatically generated from the post: ${post.title}`,
      category: "Other", 
      year: new Date(post.publishedAt || Date.now()).getFullYear(),
      coverImage: images[0].asset, 
      images: images.map((img: any) => ({
        _type: "image",
        _key: img._key || Math.random().toString(36).substring(7),
        asset: img.asset,
        caption: img.caption || ""
      }))
    };

    const result = await client.createOrReplace(album);

    return NextResponse.json({ 
      success: true, 
      message: "Album created manually!", 
      albumId: result._id,
      imageCount: images.length
    });

    } catch (error: any) {
    console.error("=== GALLERY SYNC ERROR ===");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("Full Error:", error);
    console.error("=========================");
    
    return NextResponse.json({ 
      error: "Failed to create album", 
      details: error.message,
      // Add a hint for the specific issue
      hint: error.message.includes("fetch") 
        ? "This is a network issue. Check your internet, or verify SANITY_API_WRITE_TOKEN exists."
        : "Check the server logs for more details."
    }, { status: 500 });
  }
}