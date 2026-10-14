import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromAddress =
  process.env.RESEND_FROM ?? "Sejfarms Website <onboarding@resend.dev>";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().optional(),
  resourceSlug: z.string(),
  resourceTitle: z.string(),
  fileUrl: z.string(),
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

    const downloadUrl = `https://www.sejfarmsgroup.com${data.fileUrl}`;

    const deliver = await resend.emails.send({
      from: fromAddress,
      to: [data.email],
      subject: `Your Sejfarms resource: ${data.resourceTitle}`,
      text: [
        `Hi ${data.name},`,
        "",
        `Thank you for requesting "${data.resourceTitle}".`,
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
      to: ["sejfarmsconsultltd@gmail.com"],
      replyTo: data.email,
      subject: `Resource download — ${data.resourceTitle}`,
      text: [
        `Resource: ${data.resourceTitle}`,
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