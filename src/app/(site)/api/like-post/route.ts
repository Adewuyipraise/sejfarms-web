import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

export async function POST(req: Request) {
  try {
    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }

    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: "2026-01-01",
      token: process.env.SANITY_API_WRITE_TOKEN!, // Needs write access to update the number
      useCdn: false,
    });

    // Increment the likes field by 1
    const result = await client
      .patch(postId)
      .setIfMissing({ likes: 0 })
      .inc({ likes: 1 })
      .commit();

    return NextResponse.json({ success: true, likes: result.likes });
  } catch (error: any) {
    console.error("Like error:", error.message);
    return NextResponse.json({ error: "Failed to like" }, { status: 500 });
  }
}