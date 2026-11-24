import { createFileRoute } from "@tanstack/react-router";
import { getPhotoAccess, recordPhotoAccess } from "@/lib/db";
import { isAuthenticatedRequest } from "@/lib/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const Route = createFileRoute("/api/photo-access")({
  server: {
    handlers: {
      // Public: called by the /photos page when an attendee unlocks the gallery.
      POST: async ({ request }) => {
        try {
          const body = (await request.json().catch(() => null)) as {
            email?: unknown;
          } | null;
          const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
          if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
            return json({ error: "A valid email is required" }, 400);
          }

          await recordPhotoAccess(email);
          return json({ success: true }, 201);
        } catch (error) {
          console.error("Record photo access error:", error);
          return json({ error: "Failed to record access" }, 500);
        }
      },
      // Admin only: list of emails that unlocked the gallery.
      GET: async ({ request }) => {
        try {
          if (!isAuthenticatedRequest(request)) {
            return json({ error: "Unauthorized" }, 401);
          }

          const rows = await getPhotoAccess();
          return json(rows, 200);
        } catch (error) {
          console.error("Fetch photo access error:", error);
          return json({ error: "Failed to fetch photo access" }, 500);
        }
      },
    },
  },
});
