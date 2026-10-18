import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { resend, fromAddress, inbox } from "@/lib/mail";
import { getResource } from "@/content/resources";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().optional(),
  resourceSlug: z.string().min(1),
  consent: z.literal(true),
  honeypot: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const limit = rateLimit({
      key: `resource:${ip}`,
      limit: 10,
      windowMs: 10 * 60 * 1000,
    });
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const json = await req.json();
    const data = schema.parse(json);

    if (data.honeypot && data.honeypot.length > 0) {
      return NextResponse.json({ ok: true });
    }

    // Resolve the file server-side from an allow-list — never trust a
    // client-supplied URL or title.
    const resource = getResource(data.resourceSlug);
    if (!resource) {
      return NextResponse.json({ error: "Unknown resource." }, { status: 400 });
    }

    const downloadUrl = new URL(resource.file, "https://www.sejfarmsgroup.com")
      .href;

    const deliver = await resend.emails.send({
      from: fromAddress,
      to: [data.email],
      subject: `Your Sejfarms resource: ${resource.title}`,
      text: [
        `Hi ${data.name},`,
        "",
        `Thank you for requesting "${resource.title}".`,
        "",
        `Download it here: ${downloadUrl}`,
        "",
        "— Sejfarms Group",
      ].join("\n"),
    });

    if (deliver.error) {
      console.error("Resend deliver error:", deliver.error);
      return NextResponse.json(
        { error: "Failed to send the resource. Please try again." },
        { status: 500 },
      );
    }

    // Notify Sejfarms (fire-and-forget)
    await resend.emails.send({
      from: fromAddress,
      to: [inbox],
      replyTo: data.email,
      subject: `Resource download — ${resource.title}`,
      text: [
        `Resource: ${resource.title}`,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Role: ${data.role ?? "—"}`,
        "",
        "(This contact has opted in to receive updates.)",
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data." }, { status: 400 });
    }
    console.error("Resource request error:", err);
    return NextResponse.json(
      { error: "Failed to process request." },
      { status: 500 },
    );
  }
}