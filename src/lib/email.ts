import { Resend } from "resend";
import {
  broadcastEmailHTML,
  pitchApplicationEmailHTML,
  registrationEmailHTML,
  textToHtml,
} from "./email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = process.env.SITE_URL || "https://careconference2026.purpleglobal.org";

const FROM_ADDRESS =
  "Care Conference 2026 <registrations@careconference2026.purpleglobalmission.org>";

export interface EmailRecipient {
  email: string;
  fullName: string;
  registrationId?: string;
}

function personalize(template: string, recipient: EmailRecipient): string {
  const trimmed = recipient.fullName.trim();
  const firstName = trimmed.split(/\s+/)[0] || trimmed;
  return template
    .replaceAll("{{fullName}}", trimmed)
    .replaceAll("{{firstName}}", firstName)
    .replaceAll("{{registrationId}}", recipient.registrationId || "")
    .replaceAll("{{email}}", recipient.email);
}

export async function sendRegistrationEmail(data: {
  email: string;
  fullName: string;
  registrationId: string;
  type: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return { success: false, error: "RESEND_API_KEY not configured" };
    }

    console.log("Sending registration email to:", data.email, "ID:", data.registrationId);

    const qrCodeURL = data.type === "attendee" ? `${SITE_URL}/api/qr/${data.registrationId}` : "";

    const html = registrationEmailHTML({
      fullName: data.fullName,
      registrationId: data.registrationId,
      qrCodeURL,
      type: data.type,
    });

    const subject =
      data.type === "speaker"
        ? "Speaker Profile Received - Care Conference 2026"
        : `Registration Confirmed - Care Conference 2026 (${data.registrationId})`;

    await resend.emails.send({
      from: FROM_ADDRESS,
      to: data.email,
      subject,
      html,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send registration email:", error);
    return { success: false, error: "Failed to send email" };
  }
}

export async function sendPitchApplicationEmail(data: {
  email: string;
  fullName: string;
  applicationId: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return { success: false, error: "RESEND_API_KEY not configured" };
    }

    console.log("Sending pitch application email to:", data.email, "ID:", data.applicationId);

    const html = pitchApplicationEmailHTML({
      fullName: data.fullName,
      applicationId: data.applicationId,
    });

    await resend.emails.send({
      from: FROM_ADDRESS,
      to: data.email,
      subject: "Your Pitch Application is Received - Care Conference 2026",
      html,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send pitch application email:", error);
    return { success: false, error: "Failed to send email" };
  }
}

export async function sendBulkEmail(data: {
  recipients: EmailRecipient[];
  subject: string;
  message: string;
}): Promise<{ success: boolean; sent: number; failed: number; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return { success: false, sent: 0, failed: 0, error: "RESEND_API_KEY not configured" };
  }

  const payload = data.recipients.map((recipient) => {
    const subject = personalize(data.subject, recipient);
    return {
      from: FROM_ADDRESS,
      to: [recipient.email],
      subject,
      html: broadcastEmailHTML({
        subject,
        fullName: recipient.fullName,
        bodyHtml: textToHtml(personalize(data.message, recipient)),
      }),
    };
  });

  let sent = 0;
  let failed = 0;

  // Resend allows up to 100 emails per batch request
  for (let i = 0; i < payload.length; i += 100) {
    const chunk = payload.slice(i, i + 100);
    try {
      const { error } = await resend.batch.send(chunk);
      if (error) {
        console.error("Bulk email batch error:", error);
        failed += chunk.length;
      } else {
        sent += chunk.length;
      }
    } catch (error) {
      console.error("Bulk email batch failed:", error);
      failed += chunk.length;
    }
  }

  console.log(`Bulk email finished: ${sent} sent, ${failed} failed`);

  return { success: failed === 0 && sent > 0, sent, failed };
}
