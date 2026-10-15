import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";


type WebhookPayload = {
  _type?: string;
  _id?: string;
  /** Optional slug, if the Sanity webhook projection includes it. */
  slug?: string;
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
      // Revalidates every list page for this type (which queries tag = _type).
      tags.add(body._type);

      // …and the matching detail page when we know its slug. Detail pages
      // query `_type:slug`, so without this they would stay stale.
      if (body.slug) {
        tags.add(`${body._type}:${body.slug}`);
      }
    }

    // Escape hatch: the webhook can pass arbitrary tags to revalidate.
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