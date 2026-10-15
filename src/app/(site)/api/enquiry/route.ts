import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { resend, fromAddress, inbox } from "@/lib/mail";

const schema = z.object({
  interest: z.string().min(1),
  name: z.string().min(2),
  organization: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(7),
  location: z.string().optional(),
  message: z.string().min(10),
  consent: z.literal(true),
  honeypot: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const limit = rateLimit({
      key: `enquiry:${ip}`,
      limit: 5,
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

    const result = await resend.emails.send({
      from: fromAddress,
      to: [inbox],
      replyTo: data.email,
      subject: `New enquiry — ${data.interest}`,
      text: [
        `Interest: ${data.interest}`,
        `Name: ${data.name}`,
        `Organization: ${data.organization ?? "—"}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Location: ${data.location ?? "—"}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { error: "Failed to send your enquiry. Please try again or WhatsApp us." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data." }, { status: 400 });
    }
    console.error("Enquiry error:", err);
    return NextResponse.json(
      { error: "Failed to send enquiry." },
      { status: 500 },
    );
  }
}