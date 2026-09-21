import { createFileRoute } from "@tanstack/react-router";
import { generateQRCodeBuffer } from "@/lib/qr";

export const Route = createFileRoute("/api/qr/$registrationId")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const buffer = await generateQRCodeBuffer(params.registrationId);
          return new Response(buffer, {
            status: 200,
            headers: {
              "Content-Type": "image/png",
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        } catch (error) {
          console.error("QR generation error:", error);
          return new Response("QR code generation failed", { status: 500 });
        }
      },
    },
  },
});
