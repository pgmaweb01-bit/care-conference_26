import { createFileRoute } from "@tanstack/react-router";
import { getRegistrations, getRegistrationStats } from "@/lib/db";

export const Route = createFileRoute("/api/registrations/")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const registrations = await getRegistrations();
          return new Response(JSON.stringify(registrations), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Fetch registrations error:", error);
          return new Response(JSON.stringify({ error: "Failed to fetch registrations" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
