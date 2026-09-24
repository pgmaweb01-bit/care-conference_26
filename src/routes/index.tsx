import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section";
import { KenBurnsHero } from "@/components/ken-burns-hero";
import {
  AUDIENCE,
  CASE_GAPS,
  CASE_STATS,
  EVENT,
  POLICY_LAYERS,
  RECOGNITIONS,
  SPEAKERS,
  TAKEAWAYS,
} from "@/data/conference";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Care Conference 2026 — Care as Infrastructure | Lagos" },
      {
        name: "description",
        content:
          "Care is not an afterthought. It is infrastructure. Join policymakers, clinicians, caregivers and innovators in Lagos on 19 November 2026 to build a national position on home care for Nigeria.",
      },
      { property: "og:title", content: "The Care Conference 2026 — Care as Infrastructure" },
      {
        property: "og:description",
        content:
          "Building a national position on home care for Nigeria. 19 November 2026, IALA Hub, The Chair Centre, Lagos.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function Countdown() {
  const target = useMemo(() => new Date("2026-11-19T08:00:00+01:00").getTime(), []);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const secs = Math.floor((diff % 60_000) / 1000);

  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Min", value: mins },
    { label: "Sec", value: secs },
  ];

  return (
    <section className="border-y border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <div className="flex gap-4 sm:gap-6">
            {units.map((u) => (
              <div key={u.label} className="text-center">
                <span className="block font-display text-3xl font-extrabold tabular-nums sm:text-4xl">
                  {String(u.value).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">
                  {u.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTINUOUS SCROLL GALLERY ─── */
const GALLERY_IMAGES = [
  "/Gallery/IMG_4302.JPG.jpeg",
  "/Gallery/IMG_4299.JPG.jpeg",
  "/Gallery/IMG_4297.JPG.jpeg",
  "/Gallery/IMG_4296.JPG.jpeg",
  "/Gallery/IMG_4290.JPG.jpeg",
  "/Gallery/IMG_4287.JPG.jpeg",
  "/Gallery/IMG_4262.JPG.jpeg",
  "/Gallery/IMG_4252.JPG.jpeg",
  "/Gallery/IMG_4250.JPG.jpeg",
  "/Gallery/IMG_4249.JPG.jpeg",
  "/Gallery/IMG_3965.JPG.jpeg",
  "/Gallery/IMG_3958.JPG.jpeg",
  "/Gallery/IMG_3957.JPG.jpeg",
  "/Gallery/IMG_2040.JPG.jpeg",
  "/Gallery/IMG_2038.JPG.jpeg",
  "/Gallery/IMG_2036.JPG.jpeg",
  "/Gallery/IMG_2035.JPG.jpeg",
  "/Gallery/IMG_2033.JPG.jpeg",
  "/Gallery/IMG_2028.JPG.jpeg",
  "/Gallery/IMG_2026.JPG.jpeg",
  "/Gallery/IMG_2022.JPG.jpeg",
  "/Gallery/IMG_2020.JPG.jpeg",
  "/Gallery/IMG_2017.PNG",
  "/Gallery/IMG_2013.PNG",
  "/Gallery/IMG_1995.JPG.jpeg",
  "/Gallery/IMG_1994.JPG.jpeg",
  "/Gallery/IMG_1983.JPG.jpeg",
  "/Gallery/IMG_1982.JPG.jpeg",
  "/Gallery/IMG_1925.JPG.jpeg",
  "/Gallery/BLQ09408.webp",
  "/Gallery/BLQ09389.webp",
  "/Gallery/BLQ09388.webp",
  "/Gallery/BLQ09386.webp",
  "/Gallery/BLQ09384.webp",
  "/Gallery/BLQ09377.webp",
  "/Gallery/BLQ09374.webp",
  "/Gallery/BLQ09361.webp",
  "/Gallery/BLQ09354.webp",
  "/Gallery/BLQ09344.webp",
  "/Gallery/BLQ09338.webp",
  "/Gallery/BLQ09331.webp",
  "/Gallery/BLQ09293.webp",
  "/Gallery/BLQ09272.webp",
  "/Gallery/BLQ09246.webp",
  "/Gallery/BLQ09223.webp",
  "/Gallery/BLQ09213.webp",
];

const GALLERY_TWO_IMAGES = [
  "/Gallery 2/IMG_1925.JPG.jpeg",
  "/Gallery 2/IMG_1983.JPG.jpeg",
  "/Gallery 2/IMG_1985.JPG.jpeg",
  "/Gallery 2/IMG_1986.JPG.jpeg",
  "/Gallery 2/IMG_1987.JPG.jpeg",
  "/Gallery 2/IMG_1988.JPG.jpeg",
  "/Gallery 2/IMG_1989.JPG.jpeg",
  "/Gallery 2/IMG_1992.JPG.jpeg",
  "/Gallery 2/IMG_1994.JPG.jpeg",
  "/Gallery 2/IMG_1995.JPG.jpeg",
  "/Gallery 2/IMG_1996.JPG.jpeg",
  "/Gallery 2/IMG_1998.JPG.jpeg",
  "/Gallery 2/IMG_2001.JPG.jpeg",
  "/Gallery 2/IMG_2002.JPG.jpeg",
  "/Gallery 2/IMG_2027.JPG.jpeg",
  "/Gallery 2/IMG_2028.JPG.jpeg",
  "/Gallery 2/IMG_2029.JPG.jpeg",
  "/Gallery 2/IMG_2030.JPG.jpeg",
  "/Gallery 2/IMG_2032.JPG.jpeg",
  "/Gallery 2/IMG_2033.JPG.jpeg",
  "/Gallery 2/IMG_2034.JPG.jpeg",
  "/Gallery 2/IMG_2035.JPG.jpeg",
  "/Gallery 2/IMG_2037.JPG.jpeg",
  "/Gallery 2/IMG_2038.JPG.jpeg",
  "/Gallery 2/IMG_2142.JPG.jpeg",
  "/Gallery 2/IMG_2143.JPG.jpeg",
  "/Gallery 2/IMG_2144.JPG.jpeg",
  "/Gallery 2/IMG_2145.JPG.jpeg",
  "/Gallery 2/IMG_2146.JPG.jpeg",
  "/Gallery 2/IMG_2148.JPG.jpeg",
  "/Gallery 2/IMG_2149.JPG.jpeg",
  "/Gallery 2/IMG_2150.JPG.jpeg",
  "/Gallery 2/IMG_2151.JPG.jpeg",
  "/Gallery 2/IMG_2153.JPG.jpeg",
  "/Gallery 2/IMG_2156.JPG.jpeg",
  "/Gallery 2/IMG_2208.JPG.jpeg",
  "/Gallery 2/IMG_2209.JPG.jpeg",
  "/Gallery 2/IMG_2213.JPG.jpeg",
  "/Gallery 2/IMG_2214.JPG.jpeg",
  "/Gallery 2/IMG_2215.JPG.jpeg",
  "/Gallery 2/IMG_2218.JPG.jpeg",
  "/Gallery 2/IMG_2219.JPG.jpeg",
  "/Gallery 2/IMG_2220.JPG.jpeg",
  "/Gallery 2/IMG_2221.JPG.jpeg",
  "/Gallery 2/IMG_2222.JPG.jpeg",
  "/Gallery 2/IMG_2223.JPG.jpeg",
  "/Gallery 2/IMG_2224.JPG.jpeg",
  "/Gallery 2/IMG_2225.JPG.jpeg",
  "/Gallery 2/IMG_2226.JPG.jpeg",
  "/Gallery 2/IMG_2227.JPG.jpeg",
  "/Gallery 2/IMG_2228.JPG.jpeg",
  "/Gallery 2/IMG_2229.JPG.jpeg",
  "/Gallery 2/IMG_2402.JPG.jpeg",
];

function ScrollingGallery({
  images = GALLERY_IMAGES,
  reverse = false,
}: {
  images?: string[];
  reverse?: boolean;
}) {
  const doubled = [...images, ...images];
  return (
    <section className="border-y border-border bg-ink py-4 overflow-hidden">
      <div className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {doubled.map((src, i) => (
          <div key={i} className="relative w-52 shrink-0 sm:w-64 md:w-72 lg:w-96">
            <div className="aspect-[3/2] overflow-hidden">
              <img
                src={src}
                alt="Care Conference gallery"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative border-b border-border bg-ink text-ink-foreground">
        <KenBurnsHero />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-rise mb-4">
              <span className="inline-block h-px w-12 bg-accent/60" />
            </div>
            <h1 className="animate-rise font-display text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.85] tracking-[-0.03em]">
              <span className="block text-ink-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">Care</span>
              <span className="block text-ink-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">Conference</span>
              <span className="block text-accent drop-shadow-[0_0_20px_rgba(232,121,62,0.35)]">
                2026
              </span>
            </h1>

            <div className="animate-rise mt-6">
              <p className="font-display text-[clamp(0.875rem,2vw,1.25rem)] font-extrabold uppercase tracking-[0.2em] text-accent">
                {EVENT.theme}
              </p>
              <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-accent/40 via-accent to-accent/40" />
            </div>

            <p className="animate-rise mt-6 mx-auto max-w-[50ch] text-lg leading-relaxed text-ink-foreground/70">
              {EVENT.subtitle}
            </p>

            <div className="animate-rise mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.03]"
              >
                Register Now
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="animate-rise mt-6">
              <span className="inline-block h-px w-12 bg-accent/60" />
            </div>
          </div>
        </div>
      </section>

      {/* DISPLACED CONTENT BLOCK */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow text-primary">Organised by {EVENT.organiser}</p>
              <h2 className="mt-4 max-w-[20ch] font-display text-3xl font-extrabold leading-[1.05] lg:text-5xl">
                How do we build a care system that works for everyone?
              </h2>
              <p className="mt-6 max-w-[55ch] text-lg leading-relaxed text-muted-foreground">
                Nigeria's health system cannot achieve lasting impact without recognising the systems,
                people, policies and resources that make care possible beyond the hospital.
              </p>
              <p className="mt-4 max-w-[55ch] text-muted-foreground">
                The Care Conference 2026 brings together policymakers, healthcare leaders, clinicians,
                caregivers, innovators, researchers, investors and community advocates to shape a
                national position on home care and establish care as a critical part of Nigeria's
                health infrastructure.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Register for the Conference <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-6 lg:col-span-5">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/Gallery 2/IMG_2143.JPG.jpeg"
                  alt="Care Conference delegates in session"
                  className="h-56 w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-lg border border-border bg-card p-7">
                <dl className="space-y-6">
                  <div>
                    <dt className="eyebrow text-primary">Date</dt>
                    <dd className="mt-2 font-display text-lg font-bold">{EVENT.date}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-primary">Time</dt>
                    <dd className="mt-2 font-display text-lg font-bold">{EVENT.time}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-primary">Venue</dt>
                    <dd className="mt-2 font-display text-lg font-bold">{EVENT.venue}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <Countdown />

      {/* WHY NOW */}
      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Why Care, Why Now?"
              title="The Future of Healthcare Is Also the Future of Care."
            />
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
              <div>
                <p className="text-lg leading-relaxed">
                  Nigeria's healthcare challenges cannot be solved by hospitals alone.
                </p>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  People need support before they reach hospitals, after they leave hospitals and
                  throughout the long periods when they live with chronic conditions, disability, ageing
                  and recovery. Care connects all of these moments.
                </p>
                <p className="mt-8 border-l-2 border-primary pl-6 font-display text-xl font-bold leading-snug">
                  The question is no longer whether care is essential. The question is whether we are
                  ready to build the infrastructure to support it.
                </p>
              </div>
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/why care, why Now.webp"
                  alt="Care in action"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLLING GALLERY */}
      <ScrollingGallery />

      {/* THE CASE */}
      <section className="section-pad bg-card">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="The Case"
            title="What the numbers say, and what they cannot yet say"
            lede="Recovery does not end at the hospital gate. Home healthcare, the managed transition from hospital to home, and the continuity that reduces avoidable readmissions are carried today by families, largely alone and largely uncounted."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CASE_STATS.map((stat) => (
              <div
                key={stat.number}
                className="border-t-3 border-accent bg-background p-6"
              >
                <p className="font-display text-4xl font-extrabold text-ink">
                  {stat.number}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {stat.text}
                </p>
                <p className="mt-4 text-xs text-muted-foreground/60">
                  {stat.source}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-[720px] border-l-3 border-ink pl-8">
            <h3 className="font-display text-xl font-bold text-ink">
              The concept: care as infrastructure
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Care as infrastructure is a health system position. It holds that home healthcare is a
              load bearing layer of the health system, and that it must be built the way any national
              infrastructure is built: with clinical, coordination, digital, workforce, and financing
              systems that determine whether recognised, funded care is actually safe, continuous,
              and accountable at national scale.
            </p>
            <p className="mt-4 font-display text-base font-semibold text-ink">
              A register of who provides care is not a record of what care is delivered.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="font-display text-base font-bold text-ink">
              Three documented gaps anchor the case
            </h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {CASE_GAPS.map((gap, i) => (
                <div key={gap} className="rounded-lg border border-border bg-background p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                    <span className="font-display text-sm font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{gap}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCROLLING GALLERY 2 */}
      <ScrollingGallery images={GALLERY_TWO_IMAGES} reverse />

      {/* ABOUT */}
      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="About the Conference"
              title="Building the Future of Care in Nigeria"
            />
            <div className="mt-8 overflow-hidden rounded-lg">
              <img
                src="/Gallery/IMG_4249.JPG.jpeg"
                alt="Care Conference discussion"
                className="w-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/Gallery 2/IMG_2220.JPG.jpeg"
                  alt="Care Conference panel session"
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/Gallery 2/IMG_2218.JPG.jpeg"
                  alt="Care Conference networking"
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed">
              The Care Conference is a national platform for dialogue, collaboration and action
              around the future of care in Nigeria. The 2026 edition focuses on one critical idea:{" "}
              <strong className="font-display font-bold">Care as Infrastructure.</strong>
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Care is often treated as an informal responsibility carried by families, communities
              and individual healthcare workers. Yet it is fundamental to how health systems
              function. From supporting older people and people living with disabilities to helping
              patients transition from hospital to home, care affects health outcomes, families,
              productivity and the wider economy.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              This year's conference will bring diverse stakeholders together to examine the systems
              required to make care visible, measurable, fundable and sustainable.
            </p>
            <div className="mt-8 rounded-lg bg-primary p-7 text-primary-foreground">
              <p className="eyebrow text-primary-foreground/70">Our 2026 Objective</p>
              <p className="mt-3 font-display text-xl font-bold leading-tight lg:text-2xl">
                To develop a Nigerian National Position on Care as Infrastructure, which will be
                refined through the conference and advanced through engagement with national
                policymakers and the National Assembly.
              </p>
            </div>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-primary hover:gap-3"
            >
              Read more about the conference <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* BIG IDEA */}
      <section className="relative bg-ink text-ink-foreground">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: "url('/The big Idea.webp')" }}
        />
        <div className="absolute inset-0 bg-ink/85" />
        <div className="relative">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <SectionHeading
              tone="dark"
              title="You Cannot Finance Care You Cannot Count."
              lede="Care happens everywhere. At home. In communities. In hospitals. In workplaces. Within families. Yet much of this work remains invisible in national systems, data and financing structures."
            />
            <p className="mt-10 max-w-[48ch] font-display text-2xl font-bold leading-snug text-accent">
              What would change if Nigeria recognised care as essential infrastructure?
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {RECOGNITIONS.map((item, i) => (
                <div key={item} className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
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
        </div>
      </section>

      {/* POLICY LAYERS */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="The Five Policy Layers"
            title="A National Framework for Care"
            lede="The conference explores five interconnected areas that must work together to build a sustainable care ecosystem."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {POLICY_LAYERS.map((layer) => (
              <article key={layer.no} className="bg-card p-7 transition-colors hover:bg-linen">
                <p className="font-display text-4xl font-extrabold text-primary/25">{layer.no}</p>
                <h3 className="mt-4 font-display text-lg font-bold">{layer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{layer.body}</p>
              </article>
            ))}
            <div className="flex flex-col justify-between bg-accent p-7 text-accent-foreground">
              <p className="eyebrow">The Load-Bearing Layer</p>
              <div>
                <p className="mt-6 font-display text-xl font-bold leading-tight">
                  Every layer depends on the one beneath it.
                </p>
                <Link
                  to="/policy-sessions"
                  className="mt-4 inline-flex items-center gap-2 font-display text-sm font-bold"
                >
                  Explore the policy sessions <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO SHOULD ATTEND */}
      <section className="border-y border-border bg-linen section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
            <SectionHeading
              eyebrow="Who Should Attend"
              title={<>One Room.<br />Many Perspectives. One Conversation.</>}
              lede="The Care Conference brings together the people shaping healthcare, policy, technology and communities."
            />
            <div className="overflow-hidden rounded-lg">
              <img
                src="/Who should attend.webp"
                alt="Care Conference attendees"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCE.map((a) => (
              <article key={a.title} className="rounded-lg border border-border bg-card p-6">
                <span className="block h-1 w-8 rounded-full bg-primary" />
                <h3 className="mt-4 font-display text-base font-bold">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TAKEAWAYS */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="What You Will Take Away"
            title="More Than a Conference"
            lede="Your participation gives you an opportunity to:"
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {TAKEAWAYS.map((t) => (
              <article key={t.title} className="bg-card p-7">
                <h3 className="font-display text-lg font-bold text-primary">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKERS MARQUEE */}
      <section className="border-y border-border bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-primary">Featured Speakers</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight lg:text-4xl">
                Meet the Voices Shaping Care
              </h2>
            </div>
            <Link
              to="/speakers"
              className="group inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary/80"
            >
              See All Speakers
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="mt-10 overflow-hidden">
          <div className="flex animate-marquee">
            {[...SPEAKERS, ...SPEAKERS].map((speaker, i) => (
              <div
                key={i}
                className="group relative w-36 shrink-0 sm:w-44 md:w-52"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-lg">
                  <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20">
                    <span className="font-display text-3xl font-bold text-primary/40 sm:text-4xl">
                      {speaker.initials}
                    </span>
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink via-ink/60 to-transparent p-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                      <div>
                        <p className="font-display text-xs font-bold text-primary">
                          {speaker.role}
                        </p>
                        <p className="mt-1 text-sm font-bold text-ink-foreground">
                          {speaker.name}
                        </p>
                        <p className="mt-1.5 hidden text-[11px] leading-relaxed text-ink-foreground/60 sm:block">
                          {speaker.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-center text-xs font-bold text-foreground sm:hidden">
                  {speaker.name}
                </p>
                <p className="text-center text-[10px] text-muted-foreground sm:hidden">
                  {speaker.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/speakers"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-foreground transition-all hover:border-primary/40 hover:bg-primary/5"
          >
            View Full Speaker Lineup
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* CARESOUK */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url('/Why this conference matters.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/60" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="CareSouk"
              tone="dark"
              title="Discover the Care Ecosystem"
              lede="CareSouk provides a space for organisations, innovators and solution providers to showcase products, services and ideas contributing to the future of care."
            />
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <p className="font-display text-2xl font-extrabold text-accent">
              Discover. Connect. Collaborate.
            </p>
            <Link
              to="/caresouk"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-accent px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-accent-foreground"
            >
              Explore CareSouk <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* VENUE */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="The Venue"
            title="IALA Hub at The Chair Centre, Lagos"
            lede="A serious civic setting for shaping Nigeria's national position on home care in one focused day."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <img
                src="/The Venue.jfif"
                alt="IALA Hub at The Chair Centre, Lagos"
                className="w-full rounded-lg object-cover shadow-md"
              />
            </div>
            <div className="flex flex-col justify-center">
              <dl className="space-y-6">
                <div>
                  <dt className="eyebrow text-primary">Address</dt>
                  <dd className="mt-2 font-display text-lg font-bold">
                    IALA Hub, The Chair Centre
                  </dd>
                  <dd className="text-muted-foreground">Lagos, Nigeria</dd>
                </div>
                <div>
                  <dt className="eyebrow text-primary">Date</dt>
                  <dd className="mt-2 font-display text-lg font-bold">{EVENT.date}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-primary">Time</dt>
                  <dd className="mt-2 font-display text-lg font-bold">{EVENT.time}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-primary">Capacity</dt>
                  <dd className="mt-2 text-muted-foreground">
                    Seats are assigned first come first served against room capacity and confirmed by
                    email before the day.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="mt-10 overflow-hidden rounded-lg border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5314!2d3.3796!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sIALA%20Hub%2C%20The%20Chair%20Centre%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="IALA Hub, The Chair Centre, Lagos"
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-border bg-linen">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="eyebrow text-primary">Call to Action</p>
          <h2 className="mt-4 max-w-[20ch] font-display text-4xl font-extrabold leading-[1] lg:text-6xl">
            Be Part of the National Conversation
          </h2>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
            The future of care in Nigeria will be shaped by the people willing to participate in the
            conversation today. Join policymakers, healthcare professionals, caregivers, innovators,
            researchers, investors and community leaders at the Care Conference 2026.
          </p>
          <p className="mt-8 font-display text-sm font-bold uppercase tracking-[0.16em] text-primary">
            Care as Infrastructure. Building a National Position on Home Care for Nigeria.
          </p>
          <p className="mt-2 font-display text-sm text-muted-foreground">{EVENT.date} | Lagos</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Register Now <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/partners"
              className="inline-flex items-center gap-2 rounded-md border border-input px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.1em] transition-colors hover:bg-secondary"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
