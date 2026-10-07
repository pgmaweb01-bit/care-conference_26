import { createFileRoute } from "@tanstack/react-router";
import { isAuthenticatedRequest } from "@/lib/auth";
import { sendBulkEmail, type EmailRecipient } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RECIPIENTS = 1000;

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const Route = createFileRoute("/api/admin/send-email/")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          if (!isAuthenticatedRequest(request)) {
            return json({ error: "Unauthorized" }, 401);
          }

          const body = await request.json();
          const subject = typeof body.subject === "string" ? body.subject.trim() : "";
          const message = typeof body.message === "string" ? body.message.trim() : "";
          const rawRecipients = Array.isArray(body.recipients) ? body.recipients : [];

          if (!subject) {
            return json({ error: "Subject is required" }, 400);
          }
          if (subject.length > 200) {
            return json({ error: "Subject must be 200 characters or fewer" }, 400);
          }
          if (!message) {
            return json({ error: "Message is required" }, 400);
          }
          if (message.length > 10000) {
            return json({ error: "Message must be 10,000 characters or fewer" }, 400);
          }
          if (rawRecipients.length === 0) {
            return json({ error: "At least one recipient is required" }, 400);
          }
          if (rawRecipients.length > MAX_RECIPIENTS) {
            return json({ error: `Too many recipients (max ${MAX_RECIPIENTS})` }, 400);
          }

          const seen = new Set<string>();
          const recipients: EmailRecipient[] = [];
          for (const item of rawRecipients) {
            if (!item || typeof item !== "object") continue;
            const email = typeof item.email === "string" ? item.email.trim().toLowerCase() : "";
            const fullName = typeof item.fullName === "string" ? item.fullName.trim() : "";
            const registrationId =
              typeof item.registrationId === "string" ? item.registrationId.trim() : "";
            if (!EMAIL_RE.test(email) || !fullName || seen.has(email)) continue;
            seen.add(email);
            recipients.push(
              registrationId ? { email, fullName, registrationId } : { email, fullName },
            );
          }

          if (recipients.length === 0) {
            return json({ error: "No valid recipients provided" }, 400);
          }

          const result = await sendBulkEmail({ recipients, subject, message });
          return json(result, result.success ? 200 : 502);
        } catch (error) {
          console.error("Send email error:", error);
          return json({ error: "Failed to send email" }, 500);
        }
      },
    },
  },
});
