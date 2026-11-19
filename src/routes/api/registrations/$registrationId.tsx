import { createFileRoute } from "@tanstack/react-router";
import { deleteRegistration, setRegistrationCheckIn } from "@/lib/db";
import { isAuthenticatedRequest } from "@/lib/auth";

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const Route = createFileRoute("/api/registrations/$registrationId")({
  server: {
    handlers: {
      DELETE: async ({ request, params }) => {
        try {
          if (!isAuthenticatedRequest(request)) {
            return json({ error: "Unauthorized" }, 401);
          }

          const registrationId = params.registrationId?.trim();
          if (!registrationId) {
            return json({ error: "registrationId is required" }, 400);
          }

          const deleted = await deleteRegistration(registrationId);
          if (!deleted) {
            return json({ error: "Registration not found" }, 404);
          }

          return json({ success: true, registrationId }, 200);
        } catch (error) {
          console.error("Delete registration error:", error);
          return json({ error: "Failed to delete registration" }, 500);
        }
      },
      PATCH: async ({ request, params }) => {
        try {
          if (!isAuthenticatedRequest(request)) {
            return json({ error: "Unauthorized" }, 401);
          }

          const registrationId = params.registrationId?.trim();
          if (!registrationId) {
            return json({ error: "registrationId is required" }, 400);
          }

          const body = (await request.json().catch(() => null)) as { checkedIn?: unknown } | null;
          if (typeof body?.checkedIn !== "boolean") {
            return json({ error: "checkedIn (boolean) is required" }, 400);
          }

          const updated = await setRegistrationCheckIn(registrationId, body.checkedIn);
          if (!updated) {
            return json({ error: "Registration not found" }, 404);
          }

          return json({ success: true, registrationId, checkedIn: body.checkedIn }, 200);
        } catch (error) {
          console.error("Update check-in error:", error);
          return json({ error: "Failed to update check-in" }, 500);
        }
      },
    },
  },
});
