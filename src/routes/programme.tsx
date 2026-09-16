import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/section";
import { EVENT, PROGRAMME, ROOMS } from "@/data/conference";

export const Route = createFileRoute("/programme")({
  head: () => ({
    meta: [
      { title: "Programme — Care Conference 2026, Lagos" },
      {
        name: "description",
        content:
          "One day in four movements: morning keynotes, midday showcase, afternoon side rooms, and a closed roundtable. Thursday 19 November 2026, IALA Hub, Lagos.",
      },
      { property: "og:title", content: "Programme — Care Conference 2026" },
      {
        property: "og:description",
        content: "A day of dialogue, policy and action. 08:00 to 17:45 at IALA Hub, Lagos.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/programme" },
    ],
    links: [{ rel: "canonical", href: "/programme" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: EVENT.name,
          startDate: "2026-11-19T08:00:00+01:00",
          endDate: "2026-11-19T17:45:00+01:00",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: "IALA Hub, The Chair Centre",
            address: "Lagos, Nigeria",
          },
          organizer: { "@type": "Organization", name: EVENT.organiser },
          description: EVENT.subtitle,
        }),
      },
    ],
  }),
  component: ProgrammePage,
});

function ProgrammePage() {
  return (
    <>
      <PageHero
        eyebrow="06 — Programme"
        title="A Day of Dialogue, Policy and Action"
        lede={`${EVENT.date} · ${EVENT.time} · ${EVENT.venue}`}
      />

      <section className="section-pad">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <ol className="relative border-l border-border">
            {PROGRAMME.map((item) => (
              <li key={item.time + item.title} className="relative pb-12 pl-8 last:pb-0">
                <span
                  className={`absolute -left-[7px] top-1.5 size-3.5 rounded-full ring-4 ring-background ${
                    item.highlight ? "bg-accent" : "bg-primary"
                  }`}
                />
                <p className="font-display text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  {item.time}
                </p>
                {item.kicker ? <p className="eyebrow mt-3 text-primary">{item.kicker}</p> : null}
                <h2 className="mt-1 font-display text-2xl font-bold">{item.title}</h2>
                <p className="mt-3 max-w-[62ch] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
                {item.focus ? (
                  <p className="mt-3 font-display text-sm font-semibold text-primary">
                    Focus: {item.focus}
                  </p>
                ) : null}
                {item.question ? (
                  <p className="mt-3 border-l-2 border-accent pl-4 italic">
                    Key question: {item.question}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-linen section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="eyebrow text-primary">The Side Rooms · 14:15</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold lg:text-4xl">
            Five Rooms, One Seat Each
          </h2>
          <p className="mt-4 max-w-[60ch] text-muted-foreground">
            At 14:15 the convening breaks into five parallel sessions: three policy rooms carrying the framework layers, a pitch and demo room, and a dedicated conference on ageing delivered in partnership with Kaleyewa House.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ROOMS.map((room) => (
              <article key={room.room} className="rounded-lg border border-border bg-card p-7">
                <p className="eyebrow text-accent">{room.room}</p>
                <h3 className="mt-3 font-display text-xl font-bold">{room.title}</h3>
                <p className="mt-1 font-display text-sm font-semibold text-primary">
                  {room.subtitle}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{room.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            All five rooms run once, in parallel. Selections are honoured first come first served against room capacity, which is why early registration matters. Second choices apply only when a first choice room is full.
          </p>
          <Link
            to="/register"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground"
          >
            Register and choose your side room <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
