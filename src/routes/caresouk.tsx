import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Globe,
  Mail,
  MapPin,
  Monitor,
  Phone,
  Tv,
  Upload,
} from "lucide-react";
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
      >
        <div className="mt-7 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.14em]">
          <span className="rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-primary">
            19 November 2026
          </span>
          <span className="rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-primary">
            IALA Hub, The Chair Centre, Lagos
          </span>
          <span className="rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-primary">
            Fully Digital Exhibition
          </span>
        </div>
      </PageHero>

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

      <section className="border-t border-border bg-linen">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow text-primary">The CareSouk Format</p>
          <h2 className="mt-4 max-w-[22ch] font-display text-3xl font-extrabold lg:text-4xl">
            A Fully Digital Exhibition
          </h2>
          <p className="mt-6 max-w-[72ch] text-lg leading-relaxed text-muted-foreground">
            The venue is fully cladded, so CareSouk carries no physical booths and no build
            infrastructure. The exhibition lives on the screens of IALA Hub — the main room's large
            format displays, dedicated freestanding screens and displays through the venue —
            presenting each product in motion, in colour and at full resolution before a curated
            audience of policymakers, regulators, insurers, hospital leaders, development partners
            and investors.
          </p>
          <p className="mt-4 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-primary">
            Zero build. Zero freight. Zero crew.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Monitor,
                title: "Shared Screens",
                body: "The curated CareSouk loop rotates across the room's large format displays throughout the conference day.",
              },
              {
                icon: Tv,
                title: "Dedicated Screen",
                body: "A 55 inch display exclusively yours for the conference day, with your content also featured across the shared screens.",
              },
              {
                icon: Upload,
                title: "One Submission",
                body: "One digital upload, one deadline and one technical check by the TPGM team before the conference.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-6">
                <item.icon className="size-5 text-primary" />
                <h3 className="mt-4 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow text-primary">The Framework</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold lg:text-4xl">
                Five Policy Layers, One National Position
              </h2>
            </div>
            <p className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
              The conference argues that digital and data systems are the foundation on which care
              financing and regulation rest. Exhibiting places your product inside that argument,
              not beside it.
            </p>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                title: "Care Workforce",
                body: "Training, standards, welfare and career pathways for the people who deliver care.",
              },
              {
                title: "Clinical Governance",
                body: "Safety, accountability and quality standards for care delivered in the home.",
              },
              {
                title: "Care Coordination",
                body: "Transitions between hospital, home and community that do not drop the patient.",
              },
              {
                title: "Digital Health & Data",
                body: "The foundational layer: national home care datasets, provider registers and telemedicine legislation.",
              },
              {
                title: "Care Financing",
                body: "How care is paid for, regulated and sustained, resting on what the data layer makes countable.",
              },
            ].map((layer, i) => (
              <li key={layer.title} className="rounded-lg border border-border bg-card p-5">
                <span className="font-display text-xs font-extrabold tracking-[0.2em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-sm font-bold uppercase tracking-wider">
                  {layer.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{layer.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-linen">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow text-primary">Exhibitor Packages</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold lg:text-4xl">
            Two Ways to Take the Screen
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col rounded-lg border-2 border-primary/40 bg-card p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                  Exclusive
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Dedicated Screen
                </span>
              </div>
              <p className="mt-5 font-display text-4xl font-extrabold">₦1,000,000</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A dedicated 55 inch freestanding display assigned exclusively to your brand for the
                conference day.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  <>
                    A speaking opportunity: a panelist seat in any of the five policy layers, or a
                    proposed keynote, arranged by writing to{" "}
                    <a
                      href="mailto:thepurpleglobalmission@gmail.com"
                      className="font-semibold text-primary underline underline-offset-2"
                    >
                      thepurpleglobalmission@gmail.com
                    </a>
                  </>,
                  "Your product content also featured across the shared screens in the room",
                  "Full control of your screen content: video, motion graphics or static visuals",
                  "Brand listing as a CareSouk Exhibitor in the conference programme",
                  "Two delegate passes",
                  "One exhibitor spotlight in the conference's digital communications",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-foreground/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col rounded-lg border border-border bg-card p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/70">
                  Curated Rotation
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Showcase Loop
                </span>
              </div>
              <p className="mt-5 font-display text-4xl font-extrabold">₦400,000</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                One video or motion slot of up to 60 seconds in the curated CareSouk loop.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Rotation across shared screens throughout the conference day, with a guaranteed minimum number of plays",
                  "Name listing as a CareSouk Exhibitor in the digital programme",
                  "One delegate pass",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-foreground/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Dedicated Screens are limited and allocated on a first confirmed basis. All content is
            reviewed by TPGM to protect the standard of the exhibition and its audience.
          </p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-primary">Who Should Exhibit</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold lg:text-4xl">
                Built for Digital Health Innovators
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Telemedicine Platforms",
                    body: "Virtual consultation, remote triage and connected clinical services.",
                  },
                  {
                    title: "Care Coordination Systems",
                    body: "Referral, discharge and transition of care software.",
                  },
                  {
                    title: "Remote Monitoring & Devices",
                    body: "Vital signs monitoring, wearables and connected diagnostics.",
                  },
                  {
                    title: "Health Data & Records",
                    body: "Electronic records, registries, analytics and interoperability tools.",
                  },
                  {
                    title: "Health Fintech & Insurance",
                    body: "Payment, claims, coverage and care financing platforms.",
                  },
                  {
                    title: "Home & Assistive Technology",
                    body: "Products that make the home a safe and capable care setting.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-lg border border-border bg-card p-5">
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="rounded-lg border border-border bg-card p-8">
                <h3 className="font-display text-xl font-bold">Content & Deadlines</h3>
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                      Content Formats
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      Video: MP4, 16:9 landscape, 1080p.
                      <br />
                      Static: PDF or PNG at display resolution.
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                      Submission Deadline
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      Friday 31 October 2026, allowing a full technical check before the conference.
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                      Curatorial Review
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      All content is reviewed by TPGM to protect the standard of the exhibition and
                      its audience.
                    </dd>
                  </div>
                </dl>
                <Link
                  to="/partners"
                  className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Book a Booth <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow text-accent">Secure Your Screen</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold lg:text-4xl">
            Booking Is Simple
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Reserve",
                body: "Contact the conference team to confirm availability of your preferred package. Dedicated Screens are limited and allocated on a first confirmed basis.",
              },
              {
                step: "2",
                title: "Confirm",
                body: "Complete payment and receive your exhibitor confirmation with the content specification pack.",
              },
              {
                step: "3",
                title: "Submit",
                body: "Deliver your content by Friday 31 October 2026. The technical team runs a full check and your product takes the screen on 19 November.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-lg bg-white/10 p-6">
                <span className="grid size-9 place-items-center rounded-full bg-accent font-display text-sm font-extrabold text-accent-foreground">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-foreground/75">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                icon: Mail,
                label: "Email",
                value: "thepurpleglobalmission@gmail.com",
                href: "mailto:thepurpleglobalmission@gmail.com",
              },
              {
                icon: Phone,
                label: "Telephone",
                value: "+234 704 015 9577",
                href: "tel:+2347040159577",
              },
              {
                icon: Globe,
                label: "Website",
                value: "www.purpleglobalmission.org",
                href: "https://www.purpleglobalmission.org",
              },
              { icon: MapPin, label: "Venue", value: "IALA Hub, The Chair Centre, Lagos" },
              { icon: CalendarDays, label: "Dates", value: "19 November 2026" },
            ].map((item) => {
              const inner = (
                <>
                  <item.icon className="size-4 shrink-0 text-accent" />
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-foreground/55">
                      {item.label}
                    </p>
                    <p className="mt-0.5 truncate text-sm font-semibold">{item.value}</p>
                  </div>
                </>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-start gap-3 rounded-lg bg-white/10 p-4 transition-colors hover:bg-white/15"
                >
                  {inner}
                </a>
              ) : (
                <div key={item.label} className="flex items-start gap-3 rounded-lg bg-white/10 p-4">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
