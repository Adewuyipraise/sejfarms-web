import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromAddress =
  process.env.RESEND_FROM ?? "Sejfarms Website <onboarding@resend.dev>";

const schema = z.object({
  jobSlug: z.string().min(1),
  jobTitle: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  location: z.string().min(2),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  message: z.string().min(20),
  consent: z.literal(true),
  honeypot: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const limit = rateLimit({
      key: `application:${ip}`,
      limit: 3,
      windowMs: 10 * 60 * 1000,
    });
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many applications. Please try again later." },
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
      to: ["sejfarmsconsultltd@gmail.com"],
      replyTo: data.email,
      subject: `Application — ${data.jobTitle}`,
      text: [
        `Role: ${data.jobTitle} (${data.jobSlug})`,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Location: ${data.location}`,
        `LinkedIn: ${data.linkedin ?? "—"}`,
        `Portfolio: ${data.portfolio ?? "—"}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { error: "Failed to submit application. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data." }, { status: 400 });
    }
    console.error("Application error:", err);
    return NextResponse.json(
      { error: "Failed to submit application." },
      { status: 500 },
    );
  }
}