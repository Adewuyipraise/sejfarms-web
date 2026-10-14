import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export const runtime = "nodejs";

type WebhookPayload = {
  _type?: string;
  _id?: string;
  tags?: string[];
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return new Response(
        "Missing SANITY_REVALIDATE_SECRET environment variable",
        { status: 500 },
      );
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret,
      true,
    );

    if (!isValidSignature) {
      return new Response(
        JSON.stringify({ message: "Invalid signature" }),
        { status: 401 },
      );
    }

    if (!body) {
      return new Response(
        JSON.stringify({ message: "Empty webhook payload" }),
        { status: 400 },
      );
    }

    const tags = new Set<string>();

    if (body._type) {
      tags.add(body._type);
    }

    if (body.tags && Array.isArray(body.tags)) {
      for (const tag of body.tags) {
        if (tag) tags.add(tag);
      }
    }

    for (const tag of tags) {
        revalidateTag(tag, "default");
       }

    return NextResponse.json({
      revalidated: true,
      tags: Array.from(tags),
      now: Date.now(),
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return new Response(
      err instanceof Error ? err.message : "Unknown error",
      { status: 500 },
    );
  }
}