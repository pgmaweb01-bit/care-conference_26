import { createFileRoute } from "@tanstack/react-router";
import { getSpeakerRegistrations } from "@/lib/db";

export const Route = createFileRoute("/api/speakers/")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const speakers = await getSpeakerRegistrations();
          return new Response(JSON.stringify(speakers), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Fetch speaker profiles error:", error);
          return new Response(JSON.stringify({ error: "Failed to fetch speaker profiles" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
