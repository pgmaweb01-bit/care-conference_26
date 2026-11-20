import { createFileRoute } from "@tanstack/react-router";
import { getRegistrationOpen, setRegistrationOpen } from "@/lib/db";
import { isAuthenticatedRequest } from "@/lib/auth";

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const Route = createFileRoute("/api/settings")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const registrationOpen = await getRegistrationOpen();
          return json({ registrationOpen }, 200);
        } catch (error) {
          console.error("Fetch settings error:", error);
          return json({ error: "Failed to fetch settings" }, 500);
        }
      },
      PATCH: async ({ request }) => {
        try {
          if (!isAuthenticatedRequest(request)) {
            return json({ error: "Unauthorized" }, 401);
          }

          const body = (await request.json().catch(() => null)) as {
            registrationOpen?: unknown;
          } | null;
          if (typeof body?.registrationOpen !== "boolean") {
            return json({ error: "registrationOpen (boolean) is required" }, 400);
          }

          await setRegistrationOpen(body.registrationOpen);
          return json({ success: true, registrationOpen: body.registrationOpen }, 200);
        } catch (error) {
          console.error("Update settings error:", error);
          return json({ error: "Failed to update settings" }, 500);
        }
      },
    },
  },
});
