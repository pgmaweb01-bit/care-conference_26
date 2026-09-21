import { Resend } from "resend";
import { generateQRCodeDataURL } from "./qr";
import { registrationEmailHTML } from "./email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const qrCodeDataURL = data.type === "attendee"
      ? await generateQRCodeDataURL(data.registrationId)
      : "";

    const html = registrationEmailHTML({
      fullName: data.fullName,
      registrationId: data.registrationId,
      qrCodeDataURL,
      type: data.type,
    });

    const subject = data.type === "speaker"
      ? "Speaker Profile Received - Care Conference 2026"
      : `Registration Confirmed - Care Conference 2026 (${data.registrationId})`;

    await resend.emails.send({
      from: "Care Conference 2026 <registrations@careconference2026.purpleglobal.org>",
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
