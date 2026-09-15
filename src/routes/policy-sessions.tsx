import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/section";
import { POLICY_LAYERS, ROOMS } from "@/data/conference";

export const Route = createFileRoute("/policy-sessions")({
  head: () => ({
    meta: [
      { title: "Policy Sessions — Care Conference 2026" },
      {
        name: "description",
        content:
          "Four parallel policy rooms on the care workforce, hospital-to-home continuity, care data and digital health, and financing and regulation, plus the seven policy layers.",
      },
      { property: "og:title", content: "Policy Sessions — Care Conference 2026" },
      {
        property: "og:description",
        content:
          "Workforce, continuity of care, data and digital health, financing and regulation — the four rooms shaping Nigeria's national position on care.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/policy-sessions" },
    ],
    links: [{ rel: "canonical", href: "/policy-sessions" }],
  }),
  component: PolicySessionsPage,
});

function PolicySessionsPage() {
  return (
    <>
      <PageHero
        eyebrow="07 — Parallel Policy Sessions"
        title="Four Rooms. Four Critical Questions About the Future of Care."
        lede="Beginning 2:15 PM. Each room examines one of the systems that must hold for care to work as national infrastructure."
      />

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-2">
          {ROOMS.map((room) => (
            <article key={room.room} className="rounded-lg border border-border bg-card p-8">
              <p className="eyebrow text-accent">{room.room}</p>
              <h2 className="mt-3 font-display text-2xl font-bold">{room.title}</h2>
              <p className="mt-1 font-display text-sm font-semibold text-muted-foreground">
                {room.subtitle}
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{room.body}</p>
              {room.focus ? (
                <p className="mt-4 border-l-2 border-primary pl-4 font-display text-sm font-semibold">
                  Focus: {room.focus}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <SectionHeading
            index="08"
            eyebrow="Closed Institutional Roundtable · 3:45 PM"
            tone="dark"
            title="From Conversation to Commitment"
            lede="An institutional roundtable bringing together government, regulatory, financing and practice leaders. The session will focus on refining the emerging National Position on Care as Infrastructure and identifying practical pathways for implementation."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
            {POLICY_LAYERS.map((layer) => (
              <article key={layer.no} className="bg-ink p-7">
                <p className="font-display text-sm font-bold text-accent">{layer.no}</p>
                <h3 className="mt-2 font-display text-lg font-bold">{layer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-foreground/70">{layer.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="eyebrow text-primary">09 — Closing Plenary · 5:15 PM</p>
          <h2 className="mt-4 max-w-[18ch] font-display text-3xl font-extrabold lg:text-5xl">
            The National Position
          </h2>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted-foreground">
            The conference closes with a readout of key discussions, proposed actions and next
            steps. The goal is not simply to have a conversation about care. It is to define what
            comes next.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground"
          >
            Register Now <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
