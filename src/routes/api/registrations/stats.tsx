import { createFileRoute } from "@tanstack/react-router";
import { getRegistrationStats } from "@/lib/db";

export const Route = createFileRoute("/api/registrations/stats")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const stats = await getRegistrationStats();
          return new Response(JSON.stringify(stats), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Fetch stats error:", error);
          return new Response(JSON.stringify({ error: "Failed to fetch stats" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
