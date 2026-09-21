import { createFileRoute } from "@tanstack/react-router";
import { getRegistrations } from "@/lib/db";
import { sendRegistrationEmail } from "@/lib/email";

export const Route = createFileRoute("/api/registrations/resend")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { registrationId } = await request.json();

          if (!registrationId) {
            return new Response(JSON.stringify({ error: "registrationId is required" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const registrations = await getRegistrations();
          const reg = registrations.find(
            (r: any) => r.registration_id === registrationId
          );

          if (!reg) {
            return new Response(JSON.stringify({ error: "Registration not found" }), {
              status: 404,
              headers: { "Content-Type": "application/json" },
            });
          }

          const emailResult = await sendRegistrationEmail({
            email: reg.email,
            fullName: reg.full_name,
            registrationId: reg.registration_id,
            type: reg.type,
          });

          return new Response(JSON.stringify(emailResult), {
            status: emailResult.success ? 200 : 500,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Resend email error:", error);
          return new Response(JSON.stringify({ error: "Failed to resend email" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
