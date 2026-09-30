import { createFileRoute } from "@tanstack/react-router";
import { addPitchApplication, getPitchApplications } from "@/lib/db";
import { generatePitchApplicationId } from "@/components/registration-qr";
import { sendPitchApplicationEmail } from "@/lib/email";

export const Route = createFileRoute("/api/pitch-applications/")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const applications = await getPitchApplications();
          return new Response(JSON.stringify(applications), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Fetch pitch applications error:", error);
          return new Response(JSON.stringify({ error: "Failed to fetch pitch applications" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const applicationId = generatePitchApplicationId();
          const app = await addPitchApplication({
            applicationId,
            fullName: body.fullName,
            roleAtCompany: body.roleAtCompany,
            phone: body.phone,
            email: body.email,
            linkedin: body.linkedin,
            companyName: body.companyName,
            startedWhen: body.startedWhen,
            cacRegistration: body.cacRegistration,
            cacNumber: body.cacNumber,
            basedIn: body.basedIn,
            statesWorking: body.statesWorking,
            teamSize: body.teamSize,
            websiteSocial: body.websiteSocial,
            whatCompanyDoes: body.whatCompanyDoes,
            problemSolving: body.problemSolving,
            careAtHomeImpact: body.careAtHomeImpact,
            areasTouched: Array.isArray(body.areasTouched) ? body.areasTouched : [],
            currentStage: body.currentStage,
            clientsServed: body.clientsServed,
            proudOf: body.proudOf,
            raisedMoney: body.raisedMoney,
            raisingNow: body.raisingNow,
            whoPitches: body.whoPitches,
            showMethod: body.showMethod,
            pitchDeckUrl: body.pitchDeckUrl,
            dayNeeds: body.dayNeeds,
            confirmations: Array.isArray(body.confirmations) ? body.confirmations : [],
          });

          const emailResult = await sendPitchApplicationEmail({
            email: body.email,
            fullName: body.fullName,
            applicationId,
          });

          if (!emailResult.success) {
            console.error("Pitch application email send failed for", applicationId, ":", emailResult.error);
          }

          return new Response(
            JSON.stringify({ ...app, emailSent: emailResult.success, emailError: emailResult.error }),
            {
              status: 201,
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (error) {
          console.error("Pitch application error:", error);
          return new Response(JSON.stringify({ error: "Failed to create pitch application" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});