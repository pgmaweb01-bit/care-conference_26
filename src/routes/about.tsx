import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/section";
import { POLICY_LAYERS, RECOGNITIONS } from "@/data/conference";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Care Conference 2026 — Care as Infrastructure" },
      {
        name: "description",
        content:
          "A national platform for dialogue, collaboration and action on the future of care in Nigeria, and the objective behind the 2026 national position on care.",
      },
      { property: "og:title", content: "About the Care Conference 2026" },
      {
        property: "og:description",
        content:
          "Why the 2026 edition focuses on care as infrastructure, and the national position it aims to build.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      {/* ABOUT HERO */}
      <section className="relative border-b border-border bg-ink text-ink-foreground">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/Conference Image.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/50" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="eyebrow text-accent">About the Conference</p>
          <h1 className="mt-4 max-w-[20ch] font-display text-4xl font-extrabold leading-[0.98] text-ink-foreground lg:text-6xl">
            Building the Future of Care in Nigeria
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-foreground/75">
            The Care Conference is a national platform for dialogue, collaboration and action around
            the future of care in Nigeria. The 2026 edition focuses on one critical idea: Care as
            Infrastructure.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed">
              Care is often treated as an informal responsibility carried by families, communities
              and individual healthcare workers. Yet it is fundamental to how health systems
              function.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              From supporting older people and people living with disabilities to helping patients
              transition from hospital to home, care affects health outcomes, families, productivity
              and the wider economy. This year's conference will bring diverse stakeholders together
              to examine the systems required to make care visible, measurable, fundable and
              sustainable.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-lg bg-primary p-7 text-primary-foreground">
              <p className="eyebrow text-primary-foreground/70">Our 2026 Objective</p>
              <p className="mt-3 font-display text-xl font-bold leading-tight">
                To develop a Nigerian National Position on Care as Infrastructure, which will be
                refined through the conference and advanced through engagement with national
                policymakers and the National Assembly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="overflow-hidden rounded-lg">
              <img
                src="/Gallery/IMG_4290.JPG.jpeg"
                alt="Care Conference session"
                className="w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src="/Gallery/IMG_4262.JPG.jpeg"
                alt="Care Conference workshop"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <SectionHeading
            tone="dark"
            title="You Cannot Finance Care You Cannot Count."
            lede="Care happens everywhere — at home, in communities, in hospitals, in workplaces and within families. Yet much of this work remains invisible in national systems, data and financing structures."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RECOGNITIONS.map((item, i) => (
              <div key={item} className="rounded-lg bg-white/10 p-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
                  <span className="font-display text-xs font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-foreground/85">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="The Five Policy Layers"
            title="A National Framework for Care"
            lede="Five interconnected areas that must work together to build a sustainable care ecosystem."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {POLICY_LAYERS.map((layer) => (
              <article key={layer.no} className="bg-card p-7">
                <p className="font-display text-4xl font-extrabold text-primary/25">{layer.no}</p>
                <h3 className="mt-4 font-display text-lg font-bold">{layer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{layer.body}</p>
              </article>
            ))}
          </div>
          <Link
            to="/register"
            className="mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground"
          >
            Register Now <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
