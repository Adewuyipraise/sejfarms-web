import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

export async function POST(req: Request) {
  try {
    const { documentId } = await req.json();

    if (!documentId) {
      return NextResponse.json({ error: "Missing documentId" }, { status: 400 });
    }

    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: "2026-01-01",
      token: process.env.SANITY_API_WRITE_TOKEN!,
      useCdn: false,
    });

    // This works for ANY document type (post, galleryAlbum, event, etc.)
    const result = await client
      .patch(documentId)
      .setIfMissing({ likes: 0 })
      .inc({ likes: 1 })
      .commit();

    return NextResponse.json({ success: true, likes: result.likes });
  } catch (error: any) {
    console.error("Like error:", error.message);
    return NextResponse.json({ error: "Failed to like" }, { status: 500 });
  }
}