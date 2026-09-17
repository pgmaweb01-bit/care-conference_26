import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/section";
import { SPEAKERS } from "@/data/conference";

export const Route = createFileRoute("/speakers")({
  head: () => ({
    meta: [
      { title: "Speakers — Care Conference 2026, Lagos" },
      {
        name: "description",
        content:
          "Meet the experts, leaders and practitioners contributing to the Care Conference 2026 on care as infrastructure for Nigeria.",
      },
      { property: "og:title", content: "Speakers — Care Conference 2026" },
      {
        property: "og:description",
        content:
          "Keynote speakers, panel chairs, panelists and moderators shaping the national conversation on care.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/speakers" },
    ],
    links: [{ rel: "canonical", href: "/speakers" }],
  }),
  component: SpeakersPage,
});

function SpeakersPage() {
  return (
    <>
      <PageHero
        eyebrow="Speakers"
        title="Voices Shaping the Conversation"
        lede="Meet the experts, leaders and practitioners contributing to the Care Conference 2026."
        backgroundImage="/SpeakerHero.webp"
      />

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SPEAKERS.map((speaker) => (
              <article
                key={speaker.name}
                className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:shadow-sm"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 font-display text-2xl font-extrabold text-primary">
                  {speaker.initials}
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  {speaker.role}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold">{speaker.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{speaker.bio}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center rounded-lg bg-linen p-8 sm:p-12">
              <p className="eyebrow text-primary">Interested in Speaking?</p>
              <h2 className="mt-4 font-display text-2xl font-extrabold lg:text-3xl">
                Join the National Conversation
              </h2>
              <p className="mt-4 max-w-[50ch] text-muted-foreground">
                We are inviting policymakers, healthcare leaders, caregivers, researchers and
                innovators to contribute to the Care Conference 2026.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Get in Touch <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src="/Speaker page.webp"
                alt="Care Conference speakers"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
