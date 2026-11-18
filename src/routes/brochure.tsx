import { createFileRoute } from "@tanstack/react-router";
import { Download, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/section";
import { EVENT } from "@/data/conference";

const BROCHURE_PDF = "/care-conference-2026-brochure.pdf";
const BROCHURE_FILE_NAME = "The-Care-Conference-2026-Brochure.pdf";
const BROCHURE_SIZE = "2.2 MB";

export const Route = createFileRoute("/brochure")({
  head: () => ({
    meta: [
      { title: "E-Brochure — Care Conference 2026, Lagos" },
      {
        name: "description",
        content:
          "View or download the official e-brochure for the Care Conference 2026 on 19 November 2026 at IALA Hub, Lagos. Sessions, speakers, venue and everything you need to know.",
      },
      { property: "og:title", content: "E-Brochure — Care Conference 2026" },
      {
        property: "og:description",
        content: "View or download the official Care Conference 2026 brochure.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/brochure" },
    ],
    links: [{ rel: "canonical", href: "/brochure" }],
  }),
  component: BrochurePage,
});

function BrochurePage() {
  return (
    <>
      <PageHero
        eyebrow="E-Brochure"
        title="Conference Brochure"
        lede={`Everything you need to know about ${EVENT.name} — sessions, speakers, venue and logistics, all in one document.`}
      />

      <section className="section-pad">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={BROCHURE_PDF}
              download={BROCHURE_FILE_NAME}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Download className="size-4" />
              Download PDF ({BROCHURE_SIZE})
            </a>
            <a
              href={BROCHURE_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-input px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] transition-colors hover:bg-secondary"
            >
              <ExternalLink className="size-4" />
              Open in New Tab
            </a>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <iframe
              src={`${BROCHURE_PDF}#view=FitH`}
              title={`${EVENT.name} brochure`}
              className="h-[75vh] w-full"
            />
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Having trouble viewing?{" "}
            <a
              href={BROCHURE_PDF}
              download={BROCHURE_FILE_NAME}
              className="font-medium text-primary hover:underline"
            >
              Download the PDF
            </a>{" "}
            and open it in your preferred PDF reader.
          </p>
        </div>
      </section>
    </>
  );
}
