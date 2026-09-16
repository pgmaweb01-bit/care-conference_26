import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { ArrowRight, Calendar, Users, Store, Handshake } from "lucide-react";
import heroImage from "@/assets/hero-care.jpg";
import { SectionHeading } from "@/components/section";
import {
  AUDIENCE,
  EVENT,
  POLICY_LAYERS,
  PROGRAMME,
  RECOGNITIONS,
  SPEAKERS,
  TAKEAWAYS,
  STATS,
  GAPS,
  SPINE_NOTE,
} from "@/data/conference";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Care Conference 2026 — Care as Infrastructure | Lagos" },
      {
        name: "description",
        content:
          "Care as Infrastructure: Building a National Position on Home Healthcare in Nigeria. Thursday 19 November 2026, IALA Hub, The Chair Centre, Lagos. An initiative of The Purple Global Mission.",
      },
      { property: "og:title", content: "The Care Conference 2026 — Care as Infrastructure" },
      {
        property: "og:description",
        content:
          "Building a National Position on Home Healthcare in Nigeria. Thursday 19 November 2026, IALA Hub, The Chair Centre, Lagos.",
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
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground/70">
              Counting Down
            </p>
            <p className="mt-1 font-display text-xl font-extrabold">
              {EVENT.date} · Lagos
            </p>
          </div>
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

/* ─── THEME BANNER ─── */
function ThemeBanner() {
  return (
    <section className="relative overflow-hidden border-y border-purple-950 bg-[#1a0a2e] py-24 sm:py-32">
      {/* Animated floating orbs */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-violet-500/15 blur-[100px] [animation-delay:1s]" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[300px] animate-pulse rounded-full bg-fuchsia-500/10 blur-[80px] [animation-delay:2s]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 text-center sm:px-8">
        <p className="animate-fade-in-up font-display text-sm font-bold uppercase tracking-[0.3em] text-purple-400/70">
          {EVENT.edition} — Theme
        </p>

        <h2 className="mt-8 font-display text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-tight">
          <span className="animate-fade-in-up bg-gradient-to-r from-purple-200 via-white to-violet-200 bg-clip-text text-transparent [animation-delay:0.1s]">
            Care as
          </span>
          <br />
          <span className="animate-fade-in-up bg-gradient-to-r from-violet-300 via-purple-100 to-fuchsia-200 bg-clip-text text-transparent [animation-delay:0.2s]">
            Infrastructure
          </span>
        </h2>

        <p className="animate-fade-in-up mx-auto mt-8 max-w-[50ch] text-lg leading-relaxed text-purple-300/70 [animation-delay:0.3s]">
          {EVENT.subtitle}
        </p>

        {/* Decorative line */}
        <div className="animate-fade-in-up mx-auto mt-10 flex items-center justify-center gap-3 [animation-delay:0.4s]">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-500/50" />
          <div className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-500/50" />
        </div>

        <div className="animate-fade-in-up mt-8 flex flex-wrap justify-center gap-4 [animation-delay:0.5s]">
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
          >
            Learn More
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-purple-200 backdrop-blur-sm transition-all hover:border-purple-400/50 hover:bg-purple-500/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
          >
            Register Now
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── ROTATING TEXT ─── */
function RotatingText() {
  const phrases = [
    "Care Conference 2026",
    "Care Is Not an Afterthought. It Is Infrastructure.",
    "Care as Infrastructure",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-block">
      {phrases.map((phrase, i) => (
        <span
          key={i}
          className={`block font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight transition-all duration-500 ease-in-out ${
            i === index ? "h-auto opacity-100" : "absolute inset-x-0 top-0 h-0 overflow-hidden opacity-0"
          }`}
        >
          {i === 1 ? (
            <>
              Care Is Not an Afterthought.{" "}
              <span className="text-accent">It Is Infrastructure.</span>
            </>
          ) : (
            phrase
          )}
        </span>
      ))}
    </span>
  );
}

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative border-b border-border bg-ink text-ink-foreground">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/Hero Image.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/50" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <div className="animate-rise flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground">
                {EVENT.edition} · An independent, non partisan national convening
              </span>
            </div>

            <h1 className="animate-rise mt-8">
              <RotatingText />
            </h1>

            <p className="mt-6 max-w-[50ch] font-display text-lg font-medium text-ink-foreground/90">
              {EVENT.subtitle}
            </p>

            <p className="mt-6 max-w-[40ch] border-l-2 border-accent pl-5 font-display text-lg font-semibold text-accent">
              {EVENT.thesis}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink-foreground/80">
              <span><strong className="text-ink-foreground">{EVENT.date}</strong></span>
              <span><strong className="text-ink-foreground">{EVENT.venue}</strong></span>
              <span><strong className="text-ink-foreground">One day</strong></span>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Register and choose your side room <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/programme"
                className="inline-flex items-center gap-2 rounded-md border border-ink-foreground/20 px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] transition-colors hover:bg-ink-foreground/10"
              >
                View the agenda
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-end lg:col-span-5">
            <div className="rounded-lg border border-ink-foreground/15 bg-ink/50 p-6 backdrop-blur-sm">
              <p className="eyebrow text-accent">About the Convener</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-foreground/80">
                An initiative of <strong className="text-ink-foreground">{EVENT.organiser}</strong>, {EVENT.organiserDescription}
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ink-foreground/15 pt-5 text-sm">
                <div>
                  <dt className="eyebrow text-ink-foreground/50">Date</dt>
                  <dd className="mt-1 font-display font-semibold">{EVENT.date}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-foreground/50">Time</dt>
                  <dd className="mt-1 font-display font-semibold">{EVENT.time}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="eyebrow text-ink-foreground/50">Venue</dt>
                  <dd className="mt-1 font-display font-semibold">{EVENT.venue}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <Countdown />

      {/* THEME */}
      <ThemeBanner />

      {/* AT A GLANCE */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="text-center">
            <p className="eyebrow text-primary">At a Glance</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold lg:text-4xl">
              Everything You Need to Know
            </h2>
            <p className="mx-auto mt-4 max-w-[50ch] text-muted-foreground">
              A quick overview of the Care Conference 2026. Dive deeper into each section for the
              full picture.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Programme Teaser */}
            <Link
              to="/programme"
              className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <Calendar className="size-5 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">Programme</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {EVENT.date} · {EVENT.time}
              </p>
              <ul className="mt-4 space-y-2">
                {PROGRAMME.filter((p) => p.highlight || p.kicker)
                  .slice(0, 3)
                  .map((item) => (
                    <li key={item.time} className="text-sm">
                      <span className="font-display font-semibold text-primary">{item.time}</span>
                      <span className="ml-2 text-muted-foreground">{item.title}</span>
                    </li>
                  ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-primary group-hover:gap-2.5">
                See full programme <ArrowRight className="size-3.5" />
              </span>
            </Link>

            {/* Speakers Teaser */}
            <Link
              to="/speakers"
              className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <Users className="size-5 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">Speakers</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {SPEAKERS.length} confirmed speakers
              </p>
              <div className="mt-4 space-y-3">
                {SPEAKERS.slice(0, 3).map((speaker) => (
                  <div key={speaker.name} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-xs font-bold text-primary">
                      {speaker.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{speaker.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{speaker.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-primary group-hover:gap-2.5">
                Meet all speakers <ArrowRight className="size-3.5" />
              </span>
            </Link>

            {/* CareSouk Teaser */}
            <Link
              to="/caresouk"
              className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10">
                <Store className="size-5 text-accent" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">CareSouk</h3>
              <p className="mt-1 text-xs text-muted-foreground">The care exhibition</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Explore innovations, products and solutions from organisations building the future
                of care in Nigeria.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-primary group-hover:gap-2.5">
                Explore CareSouk <ArrowRight className="size-3.5" />
              </span>
            </Link>

            {/* Partners Teaser */}
            <Link
              to="/partners"
              className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <Handshake className="size-5 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">Partners</h3>
              <p className="mt-1 text-xs text-muted-foreground">3 partnership categories</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Join leading organisations shaping the national conversation on care as
                infrastructure.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-primary group-hover:gap-2.5">
                View partnership options <ArrowRight className="size-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              index="01"
              eyebrow="About the Conference"
              title="Building the Future of Care in Nigeria"
            />
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

      {/* THE CASE */}
      <section className="section-pad bg-card">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            index="02"
            eyebrow="The Case"
            title="What the numbers say, and what they cannot yet say"
            lede="Recovery does not end at the hospital gate. Home healthcare, the managed transition from hospital to home, and the continuity that reduces avoidable readmissions are carried today by families, largely alone and largely uncounted."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.n} className="border-t-3 border-accent bg-background p-6">
                <p className="font-display text-4xl font-bold text-primary">{stat.n}</p>
                <p className="mt-3 text-sm text-muted-foreground">{stat.t}</p>
                <p className="mt-3 text-xs text-muted-foreground/70">{stat.src}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-[900px] border-l-3 border-primary pl-8">
            <h3 className="font-display text-xl font-semibold text-primary">
              The concept: care as infrastructure
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Care as infrastructure is a health system position. It holds that home healthcare is a load bearing layer of the health system, and that it must be built the way any national infrastructure is built: with clinical, coordination, digital, workforce, and financing systems that determine whether recognised, funded care is actually safe, continuous, and accountable at national scale.
            </p>
            <p className="mt-4 font-display text-lg font-medium text-primary">
              A register of who provides care is not a record of what care is delivered.
            </p>
          </div>

          <div className="mt-12 max-w-[900px]">
            <h3 className="font-display text-lg font-semibold text-primary">
              Three documented gaps anchor the case
            </h3>
            <div className="mt-6 divide-y divide-border border-y border-border">
              {GAPS.map((gap, i) => (
                <div key={i} className="flex gap-4 py-4">
                  <span className="font-display text-sm font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-muted-foreground">{gap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FIVE POLICY LAYERS */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            index="03"
            eyebrow="The Framework"
            title="Five policy layers, one National Position"
            lede="The convening works through five layers of home healthcare policy. Together they produce a Nigerian National Position on Care as Infrastructure, refined in session and formally transmitted to the National Assembly."
          />
          <div className="mt-12 max-w-[900px]">
            {POLICY_LAYERS.map((layer) => (
              <div key={layer.no} className="grid grid-cols-[64px_1fr] gap-6 border-b border-border py-6">
                <p className="font-display text-3xl font-bold text-accent">{layer.no}</p>
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary">{layer.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{layer.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 max-w-[900px] rounded-lg bg-card border-l-3 border-accent p-6">
            <p className="text-sm text-muted-foreground">
              {SPINE_NOTE}
            </p>
          </div>
        </div>
      </section>

      {/* WHO SHOULD ATTEND */}
      <section className="border-y border-border bg-linen section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            index="05"
            eyebrow="Who Should Attend"
            title="One Room. Many Perspectives. One National Conversation."
            lede="The Care Conference brings together the people shaping healthcare, policy, technology and communities."
          />
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
            index="11"
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
              index="12"
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
            index="13"
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

      {/* WHY NOW */}
      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              index="08"
              eyebrow="Why Care, Why Now?"
              title="The Future of Healthcare Is Also the Future of Care."
            />
          </div>
          <div className="lg:col-span-7">
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
            {EVENT.theme}: {EVENT.subtitle}
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
