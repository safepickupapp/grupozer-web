import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/sendgrid";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  subject: z.string().min(1).max(200),
  message: z.string().min(10).max(5000),
  consent: z.literal(true),
  _honey: z.string().max(0).optional(),
});

// Note: In-memory rate limiting does not work on Vercel serverless.
// For MVP, rely on honeypot only. Add @upstash/ratelimit in a later phase if needed.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check — silently succeed for bots
    if (body._honey) {
      return NextResponse.json({ success: true });
    }

    const data = schema.parse(body);
    await sendContactEmail(data);
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: err.issues },
        { status: 422 }
      );
    }
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
