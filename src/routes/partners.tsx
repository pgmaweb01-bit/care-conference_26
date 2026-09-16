import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/section";
import { PARTNER_TIERS } from "@/data/conference";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — Care Conference 2026, Lagos" },
      {
        name: "description",
        content:
          "Partner with the Care Conference 2026 to shape the national conversation on care as infrastructure for Nigeria.",
      },
      { property: "og:title", content: "Partners — Care Conference 2026" },
      {
        property: "og:description",
        content:
          "Join us in building a stronger care ecosystem for Nigeria. Partnership opportunities available.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/partners" },
    ],
    links: [{ rel: "canonical", href: "/partners" }],
  }),
  component: PartnersPage,
});

function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="15 — Partnership"
        title="Partner With Us"
        lede="Are you an organisation, institution, brand, funder or innovator working to transform healthcare and care delivery? Join us in building a stronger care ecosystem for Nigeria."
      />

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {PARTNER_TIERS.map((tier) => (
              <article
                key={tier.tier}
                className={`rounded-lg border p-8 ${
                  tier.tier === "Platinum" ? "border-accent bg-accent/5" : "border-border bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-primary">
                    {tier.tier}
                  </p>
                  <p className="font-display text-2xl font-extrabold">{tier.price}</p>
                </div>
                <ul className="mt-6 space-y-3">
                  {tier.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Become a {tier.tier} Partner <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-linen border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-primary">Why Partner?</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold lg:text-4xl">
                Align Your Brand With Nigeria's Care Movement
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                The Care Conference 2026 is the national platform for dialogue, collaboration and
                action on care as infrastructure. Your partnership positions your organisation at
                the centre of this critical conversation.
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <div className="rounded-lg border border-border bg-card p-8">
                <h3 className="font-display text-lg font-bold">Partnership Enquiries</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  For detailed partnership packages, custom arrangements or group bookings, please
                  contact our partnerships team.
                </p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-md border border-input px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.1em] transition-colors hover:bg-secondary"
                >
                  Contact Us <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
