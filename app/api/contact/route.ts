import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  // Guard: inform the developer if the key is missing
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        error:
          "RESEND_API_KEY is not configured. Add it to .env.local — see https://resend.com/api-keys",
      },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  let body: {
    name?: string;
    email?: string;
    subject?: string;
    projectType?: string;
    message?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, subject, projectType, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 422 }
    );
  }

  const { error } = await resend.emails.send({
    // Resend's free tier requires sending from onboarding@resend.dev
    // until you verify a custom domain. Change this once you verify.
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: ["seemabali@proton.me"],
    replyTo: email,
    subject: `[Portfolio] ${subject ?? projectType ?? "New Message"} — from ${name}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #0a0a0a; color: #e5e5e5; border-radius: 12px; border: 1px solid #222;">
        <h2 style="color: #ccff00; margin-top: 0;">New Portfolio Contact</h2>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #888; font-size: 13px; width: 130px;">Name</td>
            <td style="padding: 8px 0; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #ccff00;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888; font-size: 13px;">Subject</td>
            <td style="padding: 8px 0;">${subject ?? "—"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888; font-size: 13px;">Project Type</td>
            <td style="padding: 8px 0;">${projectType ?? "—"}</td>
          </tr>
        </table>

        <hr style="border: none; border-top: 1px solid #222; margin: 16px 0;" />

        <h4 style="color: #888; margin-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em;">Message</h4>
        <p style="line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>

        <hr style="border: none; border-top: 1px solid #222; margin: 24px 0 12px;" />
        <p style="color: #555; font-size: 11px; margin: 0;">Sent via Seemab Ali's portfolio contact form — seemab-dev.vercel.app</p>
      </div>
    `,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
