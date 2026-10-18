import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

export async function POST(req: Request) {
  try {
    // 1. Verify the request comes from Sanity
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.SANITY_REVALIDATE_SECRET}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    // 2. We only care about POSTS
    if (body._type !== "post") return NextResponse.json({ ok: true });

    // 3. Initialize Sanity Client with Write Access
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: "2026-01-01",
      token: process.env.SANITY_API_WRITE_TOKEN!, // Needs Write Access
      useCdn: false,
    });

    // 4. Fetch the full post to look at its body
    const post = await client.getDocument(body._id);
    
    // Guard clauses: Ensure post exists, has a body, and has a slug
    if (!post || !post.body || !post.slug?.current) {
      return NextResponse.json({ ok: true, message: "No body or slug found" });
    }

    // 5. Find all image blocks in the portable text body
    const images = post.body.filter((block: any) => block._type === "image");

    // If no images, do nothing
    if (images.length === 0) {
      return NextResponse.json({ ok: true, message: "No images found in body" });
    }

    // 6. Create the Gallery Album structure
    const album = {
      _type: "galleryAlbum",
      title: `Post Images: ${post.title}`,
      slug: { _type: "slug", current: `post-images-${post.slug.current}` },
      description: `Automatically generated from the post: ${post.title}`,
      category: "Other", 
      year: new Date(post.publishedAt || Date.now()).getFullYear(),
      // The schema expects a direct Sanity reference for the cover image
      coverImage: images[0].asset, 
      // The schema expects a flat array of images for the gallery
      images: images.map((img: any) => ({
        _type: "image",
        _key: img._key || Math.random().toString(36).substring(7), // Ensure unique key
        asset: img.asset,
        caption: img.caption || ""
      }))
    };

    // 7. Save the album to Sanity (createIfNotExists prevents duplicate errors if you re-publish)
    await client.createIfNotExists(album);

    return NextResponse.json({ ok: true, message: "Album synced successfully" });

  } catch (error) {
    console.error("Gallery sync error:", error);
    return NextResponse.json(
      { message: "Internal server error" }, 
      { status: 500 }
    );
  }
}