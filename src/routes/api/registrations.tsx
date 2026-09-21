import { createFileRoute } from "@tanstack/react-router";
import { addRegistration } from "@/lib/db";
import { generateRegistrationId } from "@/components/registration-qr";
import { sendRegistrationEmail } from "@/lib/email";

export const Route = createFileRoute("/api/registrations")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const regId = generateRegistrationId();
          const reg = await addRegistration({
            registrationId: regId,
            fullName: body.fullName,
            email: body.email,
            phone: body.phone,
            organisation: body.organisation,
            type: body.type || "attendee",
            gender: body.gender,
            country: body.country,
            state: body.state,
            city: body.city,
            profession: body.profession,
            position: body.position,
            sideRoom1: body.sideRoom1,
            sideRoom2: body.sideRoom2,
            category: body.category,
          });

          // Send confirmation email (non-blocking)
          sendRegistrationEmail({
            email: body.email,
            fullName: body.fullName,
            registrationId: regId,
            type: body.type || "attendee",
          }).catch((err) => console.error("Email send failed:", err));

          return new Response(JSON.stringify(reg), {
            status: 201,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Registration error:", error);
          return new Response(JSON.stringify({ error: "Failed to create registration" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
