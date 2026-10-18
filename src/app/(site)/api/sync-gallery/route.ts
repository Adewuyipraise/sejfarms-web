import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

export async function POST(req: Request) {
  try {
    // 1. Verify secret
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.SANITY_REVALIDATE_SECRET}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    // 2. Only care about posts
    if (body._type !== "post") return NextResponse.json({ ok: true });

    // 3. Setup Sanity Client
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: "2026-01-01",
      token: process.env.SANITY_API_WRITE_TOKEN!,
      useCdn: false,
    });

    // 4. Fetch the post
    const post = await client.getDocument(body._id);
    
    if (!post || !post.body || !post.slug?.current) {
      return NextResponse.json({ ok: true, message: "Missing data" });
    }

    // 5. Extract images
    const images = post.body.filter((block: any) => block._type === "image");

    if (images.length === 0) {
      return NextResponse.json({ ok: true, message: "No images" });
    }

    // 6. Create the album
    const album = {
      _type: "galleryAlbum",
      _id: `gallery-sync-${post._id}`, 
      title: `Post Images: ${post.title}`,
      slug: { _type: "slug", current: `post-images-${post.slug.current}-${Date.now().toString().slice(-4)}` }, // Ensures unique slug
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

    // 7. Save to Sanity
    await client.createOrReplace(album);

    return NextResponse.json({ ok: true, message: "Synced successfully" });

  } catch (error: any) {
    console.error("Gallery sync error:", error.message);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}