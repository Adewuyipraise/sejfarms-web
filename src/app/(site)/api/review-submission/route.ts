import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { resend, fromAddress, inbox } from "@/lib/mail";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().min(2),
  institution: z.string().min(2),
  quote: z.string().min(20),
  consent: z.literal(true),
  honeypot: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const limit = rateLimit({
      key: `review:${ip}`,
      limit: 3,
      windowMs: 10 * 60 * 1000,
    });
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
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
      replyTo: data.email,
      subject: `New Review Submission — ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Role: ${data.role}`,
        `Institution: ${data.institution}`,
        "",
        "Review:",
        data.quote,
        "",
        "---",
        "To publish this review, create a new Testimonial document in the Studio:",
        "https://www.sejfarmsgroup.com/studio",
      ].join("\n"),
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { error: "Failed to submit. Please try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data." }, { status: 400 });
    }
    console.error("Review submission error:", err);
    return NextResponse.json({ error: "Failed to submit." }, { status: 500 });
  }
}