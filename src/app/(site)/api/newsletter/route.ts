import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { resend, fromAddress, inbox } from "@/lib/mail";

const schema = z.object({
  email: z.string().email(),
  honeypot: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const limit = rateLimit({
      key: `newsletter:${ip}`,
      limit: 5,
      windowMs: 10 * 60 * 1000,
    });
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many requests." },
        { status: 429 },
      );
    }

    const json = await req.json();
    const data = schema.parse(json);

    if (data.honeypot && data.honeypot.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const result = await resend.emails.send({
      from: fromAddress,
      to: [inbox],
      subject: `Newsletter signup — ${data.email}`,
      text: `New newsletter signup: ${data.email}`,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { error: "Failed to subscribe." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data." }, { status: 400 });
    }
    console.error("Newsletter error:", err);
    return NextResponse.json(
      { error: "Failed to subscribe." },
      { status: 500 },
    );
  }
}