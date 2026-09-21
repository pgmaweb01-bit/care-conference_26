import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/section";

export const Route = createFileRoute("/caresouk")({
  head: () => ({
    meta: [
      { title: "CareSouk — Care Conference 2026, Lagos" },
      {
        name: "description",
        content:
          "Explore the Care Ecosystem at CareSouk — showcasing products, services and innovations contributing to the future of care in Nigeria.",
      },
      { property: "og:title", content: "CareSouk — Care Conference 2026" },
      {
        property: "og:description",
        content:
          "Discover. Connect. Collaborate. The exhibition space at the Care Conference 2026.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/caresouk" },
    ],
    links: [{ rel: "canonical", href: "/caresouk" }],
  }),
  component: CareSoukPage,
});

function CareSoukPage() {
  return (
    <>
      <PageHero
        eyebrow="CareSouk"
        title="Discover the Care Ecosystem"
        lede="CareSouk provides a space for organisations, innovators and solution providers to showcase products, services and ideas contributing to the future of care."
      />

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-accent">Exhibit at CareSouk</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold lg:text-4xl">
                Showcase Your Solutions
              </h2>
              <p className="mt-6 max-w-[48ch] text-ink-foreground/75">
                CareSouk is the exhibition arm of the Care Conference 2026. It brings together
                organisations, innovators and solution providers working across the care ecosystem
                to showcase their products, services and ideas.
              </p>
              <p className="mt-5 max-w-[48ch] text-ink-foreground/75">
                Whether you are a digital health startup, a home care provider, a medical device
                company, or a community health organisation, CareSouk gives you direct access to
                policymakers, healthcare leaders, investors and fellow innovators.
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <div className="rounded-lg bg-white/10 p-8">
                <h3 className="font-display text-xl font-bold text-accent">What You Get</h3>
                <ul className="mt-5 space-y-3">
                  {[
                    "Dedicated exhibition booth",
                    "Access to 500+ conference delegates",
                    "Networking with investors and policymakers",
                    "Featured listing in conference programme",
                    "Social media promotion",
                    "Post-conference delegate list access",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-ink-foreground/85">
                      <span className="mt-1 size-1.5 rounded-full bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/partners"
                    className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-accent-foreground transition-opacity hover:opacity-90"
                  >
                    Book a Booth <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-ink-foreground transition-colors hover:bg-white/10"
                  >
                    Register for Conference
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
