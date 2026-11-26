import { createFileRoute } from "@tanstack/react-router";
import { isAuthenticatedRequest } from "@/lib/auth";
import { renderCertificatePdf } from "@/lib/certificate";
import { getCertificateRecipients, getCertificateStats, markCertificateSent } from "@/lib/db";
import { sendCertificateEmail } from "@/lib/email";

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

type CertificateResult = {
  email: string;
  name: string;
  sent: boolean;
  bytes?: number;
  error?: string;
  id?: string;
};

export const Route = createFileRoute("/api/certificates")({
  server: {
    handlers: {
      // Admin: recipient list + delivery progress.
      GET: async ({ request }) => {
        try {
          if (!isAuthenticatedRequest(request)) {
            return json({ error: "Unauthorized" }, 401);
          }
          const [recipients, stats] = await Promise.all([
            getCertificateRecipients(),
            getCertificateStats(),
          ]);
          return json({ stats, recipients }, 200);
        } catch (error) {
          console.error("Fetch certificate status error:", error);
          return json({ error: "Failed to fetch certificate status" }, 500);
        }
      },

      // Admin: render/send the next batch. Dry-run by default — real delivery
      // requires { confirm: true }. { testOnly: true } restricts to .invalid
      // addresses so tests can never reach a real attendee.
      POST: async ({ request }) => {
        try {
          if (!isAuthenticatedRequest(request)) {
            return json({ error: "Unauthorized" }, 401);
          }

          const body = (await request.json().catch(() => null)) as {
            confirm?: unknown;
            testOnly?: unknown;
            limit?: unknown;
          } | null;
          const confirm = body?.confirm === true;
          const testOnly = body?.testOnly === true;
          const requested = Number(body?.limit ?? 10);
          const limit = Math.min(100, Math.max(1, Number.isFinite(requested) ? requested : 10));

          const recipients = await getCertificateRecipients();
          let targets = recipients.filter((r) => !r.sent_at);
          if (testOnly) targets = targets.filter((r) => r.email.endsWith(".invalid"));
          else if (confirm) targets = targets.filter((r) => !r.email.endsWith(".invalid"));
          targets = targets.slice(0, limit);

          const results: CertificateResult[] = [];
          const concurrency = 5;
          for (let i = 0; i < targets.length; i += concurrency) {
            const chunk = targets.slice(i, i + concurrency);
            const chunkResults = await Promise.all(
              chunk.map(async (recipient): Promise<CertificateResult> => {
                const base = { email: recipient.email, name: recipient.full_name };
                try {
                  const pdf = await renderCertificatePdf(recipient.full_name);
                  if (!confirm) {
                    return { ...base, sent: false, bytes: pdf.length };
                  }
                  const sent = await sendCertificateEmail({
                    email: recipient.email,
                    fullName: recipient.full_name,
                    pdf,
                  });
                  if (!sent.success) {
                    return {
                      ...base,
                      sent: false,
                      bytes: pdf.length,
                      ...(sent.error ? { error: sent.error } : {}),
                    };
                  }
                  await markCertificateSent(recipient.email, recipient.full_name);
                  return {
                    ...base,
                    sent: true,
                    bytes: pdf.length,
                    ...(sent.id ? { id: sent.id } : {}),
                  };
                } catch (error) {
                  return {
                    ...base,
                    sent: false,
                    error: error instanceof Error ? error.message : String(error),
                  };
                }
              }),
            );
            results.push(...chunkResults);
          }

          const stats = await getCertificateStats();
          return json(
            {
              mode: confirm ? (testOnly ? "test-send" : "live-send") : "dry-run",
              attempted: results.length,
              sent: results.filter((r) => r.sent).length,
              failed: results.filter((r) => r.sent === false && !!(r as CertificateResult).error)
                .length,
              results,
              stats,
            },
            200,
          );
        } catch (error) {
          console.error("Certificate send error:", error);
          return json({ error: "Failed to process certificates" }, 500);
        }
      },
    },
  },
});
