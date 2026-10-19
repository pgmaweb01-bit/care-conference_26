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

export function getEmailServiceStatus(): { configured: boolean; from: string } {
  return { configured: Boolean(process.env["RESEND_API_KEY"]), from: FROM_ADDRESS };
}

function describeResendError(error: { name?: string; message?: string }): string {
  const name = error.name ? `${error.name}: ` : "";
  return `Resend ${name}${error.message || "unknown error"}`;
}

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

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: data.email,
      subject,
      html,
    });
    if (error) {
      console.error("Resend registration email rejected:", error);
      return { success: false, error: describeResendError(error) };
    }

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

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: data.email,
      subject: "Your Pitch Application is Received - Care Conference 2026",
      html,
    });
    if (error) {
      console.error("Resend pitch email rejected:", error);
      return { success: false, error: describeResendError(error) };
    }

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
  let firstError: string | undefined;

  // Resend allows up to 100 emails per batch request
  for (let i = 0; i < payload.length; i += 100) {
    const chunk = payload.slice(i, i + 100);
    try {
      const { error } = await resend.batch.send(chunk);
      if (error) {
        console.error("Bulk email batch error:", error);
        failed += chunk.length;
        if (!firstError) firstError = describeResendError(error);
      } else {
        sent += chunk.length;
      }
    } catch (error) {
      console.error("Bulk email batch failed:", error);
      failed += chunk.length;
      if (!firstError) {
        firstError = error instanceof Error ? error.message : String(error);
      }
    }
  }

  console.log(`Bulk email finished: ${sent} sent, ${failed} failed`);

  return {
    success: failed === 0 && sent > 0,
    sent,
    failed,
    ...(failed > 0 && firstError ? { error: firstError } : {}),
  };
}
