import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { PageHero } from "@/components/section";

export const Route = createFileRoute("/pitch-and-demo")({
  head: () => ({
    meta: [
      { title: "Pitch & Demo — Care Conference 2026, Lagos" },
      {
        name: "description",
        content:
          "Apply to pitch in the Pitch and Demo Room at The Care Conference 2026. Eight selected founders building solutions that help Nigerians receive safe care at home will pitch to a panel of investors on 19 November 2026 at IALA Hub, Lagos.",
      },
      { property: "og:title", content: "Pitch & Demo — Care Conference 2026" },
      {
        property: "og:description",
        content:
          "Apply to pitch at The Care Conference 2026. Pitching is free. Applications are open now.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/pitch-and-demo" },
    ],
    links: [{ rel: "canonical", href: "/pitch-and-demo" }],
  }),
  component: PitchAndDemoPage,
});

const AREA_OPTIONS = [
  "Care workers: training, jobs, and protection",
  "Quality and safety of care",
  "Connecting care between hospital, home, and community",
  "Digital tools and care data",
  "Paying for care: financing, insurance, and policy",
] as const;

const STAGE_OPTIONS = [
  "Idea or prototype",
  "Pilot with early users",
  "Live and earning revenue",
  "Scaling across locations",
] as const;

const SHOW_OPTIONS = [
  "Slides only",
  "Live demo on screen",
  "A short video inside my slides (90 seconds at most)",
] as const;

const CONFIRMATION_OPTIONS = [
  "Everything in this application is true.",
  "I understand that applying and pitching are free.",
  "You can share my application and deck with your investor panel.",
  "Photos and video will be taken at the event, and I am happy to appear in them.",
  "I get five minutes to pitch and three minutes of questions, and the moderator keeps time.",
  "Our presenter can be at IALA Hub, The Chair Centre, Lagos on the afternoon of Thursday 19 November 2026.",
] as const;

function PitchAndDemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [appRef, setAppRef] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    roleAtCompany: "",
    phone: "",
    email: "",
    linkedin: "",
    companyName: "",
    startedWhen: "",
    cacRegistration: "",
    cacNumber: "",
    basedIn: "",
    statesWorking: "",
    teamSize: "",
    websiteSocial: "",
    whatCompanyDoes: "",
    problemSolving: "",
    careAtHomeImpact: "",
    areasTouched: [] as string[],
    currentStage: "",
    clientsServed: "",
    proudOf: "",
    raisedMoney: "",
    raisingNow: "",
    whoPitches: "",
    showMethod: "",
    pitchDeckUrl: "",
    dayNeeds: "",
    confirmations: [] as string[],
  });

  const update = (field: string, value: string) =>
    setFormData((p) => ({ ...p, [field]: value }));

  const toggleArray = (field: "areasTouched" | "confirmations", value: string) =>
    setFormData((p) => ({
      ...p,
      [field]: p[field].includes(value)
        ? p[field].filter((v) => v !== value)
        : [...p[field], value],
    }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (formData.areasTouched.length === 0) {
      setError("Please tick at least one area that your work touches.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (formData.confirmations.length < CONFIRMATION_OPTIONS.length) {
      setError("All six confirmation boxes must be ticked before you can submit.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/pitch-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setAppRef(data.application_id);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Pitch application failed:", err);
      setError("Something went wrong sending your application. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section className="section-pad">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="size-8 text-green-600" />
          </div>
          <h2 className="mt-6 font-display text-2xl font-extrabold">
            Application Received
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Thank you. We have your application. If you are selected, we will email you and
            invite you to a short rehearsal briefing before the conference.
          </p>
          <div className="mt-8 rounded-lg border border-border bg-card p-6">
            <p className="eyebrow text-primary">Your Application Reference</p>
            <p className="mt-2 font-mono text-xl font-bold tracking-wider">{appRef}</p>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Questions? Write to thepurpleglobalmission@gmail.com
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to Home <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Pitch & Demo Room · Innovation Showcase"
        title="Pitch at The Care Conference 2026"
        lede="Applications are now open for the Pitch and Demo Room at The Care Conference 2026. Eight selected founders building solutions that help Nigerians receive safe care at home will each pitch for five minutes to a panel of investors, followed by three minutes of their questions, on 19 November at IALA Hub, The Chair Centre, Lagos. The audience includes institutional and investment stakeholders from across the health system."
        backgroundImage="/About Hero.webp"
      />

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8 rounded-xl border border-accent/30 bg-accent/5 p-5">
          <p className="text-sm leading-relaxed">
            <strong className="font-semibold">Applying is free. Pitching is free.</strong> The
            session is convened by The Purple Global Mission (TPGM). The room is screen based, so
            demos run on screen or as a short video, not on tables. This form takes about 15
            minutes. Applications close soon, and we will email you if you are selected.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <SectionCard>
            <SectionHeading>Section 1: About You</SectionHeading>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Your full name" required className="sm:col-span-2">
                <input
                  name="fullName"
                  required
                  className={inputClass}
                  placeholder="Ada Okafor"
                  value={formData.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                />
              </Field>
              <Field label="What do you do at the company?" required className="sm:col-span-2">
                <input
                  name="roleAtCompany"
                  required
                  className={inputClass}
                  placeholder="Co-founder, CEO, Product lead..."
                  value={formData.roleAtCompany}
                  onChange={(e) => update("roleAtCompany", e.target.value)}
                />
              </Field>
              <Field label="Phone number (WhatsApp)" required>
                <input
                  type="tel"
                  name="phone"
                  required
                  className={inputClass}
                  placeholder="+234 ..."
                  value={formData.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </Field>
              <Field label="Email address" required>
                <input
                  type="email"
                  name="email"
                  required
                  className={inputClass}
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </Field>
              <Field label="LinkedIn profile" className="sm:col-span-2">
                <input
                  name="linkedin"
                  className={inputClass}
                  placeholder="https://linkedin.com/in/..."
                  value={formData.linkedin}
                  onChange={(e) => update("linkedin", e.target.value)}
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard>
            <SectionHeading>Section 2: About Your Company</SectionHeading>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="What is your company called?" required>
                <input
                  name="companyName"
                  required
                  className={inputClass}
                  placeholder="Company name"
                  value={formData.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                />
              </Field>
              <Field label="When did you start?" required>
                <input
                  name="startedWhen"
                  required
                  className={inputClass}
                  placeholder="e.g. March 2024"
                  value={formData.startedWhen}
                  onChange={(e) => update("startedWhen", e.target.value)}
                />
              </Field>
              <Field label="Are you registered with the CAC?" required className="sm:col-span-2">
                <RadioGroup
                  name="cacRegistration"
                  required
                  options={[
                    "Yes, registered",
                    "Registration in progress",
                    "Not yet",
                  ]}
                  value={formData.cacRegistration}
                  onChange={(v) => update("cacRegistration", v)}
                />
              </Field>
              <Field label="CAC number, if you have one" className="sm:col-span-2">
                <input
                  name="cacNumber"
                  className={inputClass}
                  placeholder="RC or BN number"
                  value={formData.cacNumber}
                  onChange={(e) => update("cacNumber", e.target.value)}
                />
              </Field>
              <Field label="Where are you based? (city and state)" required>
                <input
                  name="basedIn"
                  required
                  className={inputClass}
                  placeholder="Lagos, Lagos"
                  value={formData.basedIn}
                  onChange={(e) => update("basedIn", e.target.value)}
                />
              </Field>
              <Field label="Which states do you work in today?" required>
                <input
                  name="statesWorking"
                  required
                  className={inputClass}
                  placeholder="Lagos, Ogun, Abuja..."
                  value={formData.statesWorking}
                  onChange={(e) => update("statesWorking", e.target.value)}
                />
              </Field>
              <Field label="How many people are on the team?" required>
                <input
                  name="teamSize"
                  required
                  className={inputClass}
                  placeholder="e.g. 4"
                  value={formData.teamSize}
                  onChange={(e) => update("teamSize", e.target.value)}
                />
              </Field>
              <Field label="Website or social media, if you have them">
                <input
                  name="websiteSocial"
                  className={inputClass}
                  placeholder="https://... or @handle"
                  value={formData.websiteSocial}
                  onChange={(e) => update("websiteSocial", e.target.value)}
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard>
            <SectionHeading>Section 3: What You Are Building</SectionHeading>
            <div className="mt-5 space-y-5">
              <Field label="Tell us what your company does, in one or two sentences." required>
                <textarea
                  name="whatCompanyDoes"
                  rows={3}
                  required
                  className={inputClass}
                  value={formData.whatCompanyDoes}
                  onChange={(e) => update("whatCompanyDoes", e.target.value)}
                />
              </Field>
              <Field
                label="What problem are you solving, and who has this problem? (about 100 words)"
                required
              >
                <textarea
                  name="problemSolving"
                  rows={5}
                  required
                  className={inputClass}
                  value={formData.problemSolving}
                  onChange={(e) => update("problemSolving", e.target.value)}
                />
              </Field>
              <Field
                label="How does your work help people receive care at home, move safely from hospital to home, or stay out of hospital? (about 100 words)"
                required
              >
                <textarea
                  name="careAtHomeImpact"
                  rows={5}
                  required
                  className={inputClass}
                  value={formData.careAtHomeImpact}
                  onChange={(e) => update("careAtHomeImpact", e.target.value)}
                />
              </Field>
              <fieldset>
                <legend className="mb-2 text-sm font-medium text-foreground">
                  Which of these areas does your work touch? Tick all that apply.
                  {<span className="ml-0.5 text-destructive">*</span>}
                </legend>
                <div className="space-y-2">
                  {AREA_OPTIONS.map((opt) => (
                    <label key={opt} className="flex items-start gap-3 text-sm text-foreground">
                      <input
                        type="checkbox"
                        checked={formData.areasTouched.includes(opt)}
                        onChange={() => toggleArray("areasTouched", opt)}
                        className="mt-0.5 accent-primary"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <Field label="Where are you today?" required>
                <RadioGroup
                  name="currentStage"
                  required
                  options={STAGE_OPTIONS}
                  value={formData.currentStage}
                  onChange={(v) => update("currentStage", v)}
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard>
            <SectionHeading>Section 4: Your Progress</SectionHeading>
            <div className="mt-5 space-y-5">
              <Field
                label='How many clients, users, or patients have you served so far? A rough number is fine. "None yet" is fine too.'
                required
              >
                <input
                  name="clientsServed"
                  required
                  className={inputClass}
                  placeholder="e.g. 120 users"
                  value={formData.clientsServed}
                  onChange={(e) => update("clientsServed", e.target.value)}
                />
              </Field>
              <Field label="What are you most proud of so far? Pilots, partnerships, milestones, anything.">
                <textarea
                  name="proudOf"
                  rows={3}
                  className={inputClass}
                  value={formData.proudOf}
                  onChange={(e) => update("proudOf", e.target.value)}
                />
              </Field>
              <Field
                label='Have you raised money? How much, and from whom? "None" is a fine answer.'
                required
              >
                <textarea
                  name="raisedMoney"
                  rows={2}
                  required
                  className={inputClass}
                  value={formData.raisedMoney}
                  onChange={(e) => update("raisedMoney", e.target.value)}
                />
              </Field>
              <Field label="Are you raising now? If yes, how much and what will it do?">
                <textarea
                  name="raisingNow"
                  rows={3}
                  className={inputClass}
                  value={formData.raisingNow}
                  onChange={(e) => update("raisingNow", e.target.value)}
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard>
            <SectionHeading>Section 5: Your Pitch on the Day</SectionHeading>
            <div className="mt-5 space-y-5">
              <Field label="Who will pitch on the day? Name and role." required>
                <input
                  name="whoPitches"
                  required
                  className={inputClass}
                  placeholder="e.g. Ada Okafor, Co-founder"
                  value={formData.whoPitches}
                  onChange={(e) => update("whoPitches", e.target.value)}
                />
              </Field>
              <Field label="How will you show your product?" required>
                <RadioGroup
                  name="showMethod"
                  required
                  options={SHOW_OPTIONS}
                  value={formData.showMethod}
                  onChange={(v) => update("showMethod", v)}
                />
              </Field>
              <Field label="Link to your pitch deck. PDF, 10 slides at most. Make sure anyone with the link can view it." required>
                <input
                  type="url"
                  name="pitchDeckUrl"
                  required
                  className={inputClass}
                  placeholder="https://drive.google.com/..."
                  value={formData.pitchDeckUrl}
                  onChange={(e) => update("pitchDeckUrl", e.target.value)}
                />
              </Field>
              <Field
                label="Anything you need from us on the day? Technical needs, accessibility, anything else."
              >
                <textarea
                  name="dayNeeds"
                  rows={3}
                  className={inputClass}
                  value={formData.dayNeeds}
                  onChange={(e) => update("dayNeeds", e.target.value)}
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard>
            <SectionHeading>Section 6: Before You Submit</SectionHeading>
            <p className="mt-2 text-sm text-muted-foreground">
              Please confirm the following. All six boxes must be ticked to submit.
            </p>
            <div className="mt-5 space-y-3">
              {CONFIRMATION_OPTIONS.map((opt) => (
                <label key={opt} className="flex items-start gap-3 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={formData.confirmations.includes(opt)}
                    onChange={() => toggleArray("confirmations", opt)}
                    className="mt-0.5 accent-primary"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </SectionCard>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative inline-flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary via-primary to-primary/80 px-7 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-60 sm:w-auto"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10">
                {loading ? "Submitting…" : "Submit Your Application"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

/* ─── Shared helpers ─── */

const inputClass =
  "w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_hsl(var(--ring)/0.1)]";

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block space-y-1.5 ${className ?? ""}`}>
      <span className="block text-xs font-medium text-muted-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
      {children}
    </h2>
  );
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
  required,
}: {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-3 text-sm text-foreground">
          <input
            type="radio"
            name={name}
            required={required}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="accent-primary"
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
}