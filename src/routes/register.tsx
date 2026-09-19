import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle, Download, Mic, Printer, User } from "lucide-react";
import { PageHero } from "@/components/section";
import { EVENT } from "@/data/conference";
import { RegistrationQR, generateRegistrationId } from "@/components/registration-qr";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — Care Conference 2026, Lagos" },
      {
        name: "description",
        content:
          "Register for the Care Conference 2026 on 19 November 2026 at IALA Hub, Lagos. Building a national position on home care for Nigeria.",
      },
      { property: "og:title", content: "Register — Care Conference 2026" },
      {
        property: "og:description",
        content:
          "Register for Care Conference 2026: Care as Infrastructure.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/register" },
    ],
    links: [{ rel: "canonical", href: "/register" }],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const [attendeeType, setAttendeeType] = useState<"attendee" | "speaker">("attendee");

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-6 pb-12 pt-20 sm:pb-16 sm:pt-24">
          <h1 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
            Register for The Care Conference 2026
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Care as Infrastructure — Designing Nigeria's Next Decade of Homecare.
          </p>
          <div className="mt-8 flex gap-2 rounded-xl border border-border bg-card p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setAttendeeType("attendee")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                attendeeType === "attendee"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="h-4 w-4" />
              Attendee
            </button>
            <button
              type="button"
              onClick={() => setAttendeeType("speaker")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                attendeeType === "speaker"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Mic className="h-4 w-4" />
              Speaker
            </button>
          </div>
        </div>
      </div>

      {attendeeType === "attendee" ? <AttendeeForm /> : <SpeakerForm />}
    </div>
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

/* ─── Success screen ─── */

function RegistrationSuccess({
  name,
  type,
  email,
  registrationId,
}: {
  name: string;
  type: string;
  email: string;
  registrationId: string;
}) {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="size-8 text-green-600" />
        </div>
        <h2 className="mt-6 font-display text-2xl font-extrabold">
          {type === "speaker" ? "Speaker Profile Submitted!" : "You're Registered!"}
        </h2>
        <p className="mt-4 text-muted-foreground">
          {type === "speaker" ? (
            <>
              Thank you, <strong>{name}</strong>. Our Speaker Coordinator will be in touch within 5
              business days.
            </>
          ) : (
            <>
              A confirmation email has been sent to <strong>{email}</strong> with your QR code and
              registration details.
            </>
          )}
        </p>

        {type === "attendee" && (
          <div className="mt-8 rounded-lg border border-border bg-card p-8">
            <p className="eyebrow text-primary">Your Check-In QR Code</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Present this QR code at the venue for instant check-in.
            </p>
            <div className="mt-6 flex justify-center">
              <RegistrationQR registrationId={registrationId} size={220} />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-secondary"
              >
                <Printer className="size-3.5" />
                Print QR Code
              </button>
              <button
                type="button"
                onClick={() => {
                  const svg = document.querySelector(".registration-qr svg") as SVGSVGElement;
                  if (!svg) return;
                  const svgData = new XMLSerializer().serializeToString(svg);
                  const canvas = document.createElement("canvas");
                  const ctx = canvas.getContext("2d");
                  const img = new Image();
                  img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx?.drawImage(img, 0, 0);
                    const a = document.createElement("a");
                    a.download = `care-conference-2026-${registrationId}.png`;
                    a.href = canvas.toDataURL("image/png");
                    a.click();
                  };
                  img.src = "data:image/svg+xml;base64," + btoa(svgData);
                }}
                className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-secondary"
              >
                <Download className="size-3.5" />
                Download QR Code
              </button>
            </div>
            <div className="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
              <p className="text-sm font-semibold text-accent">Save your Registration ID</p>
              <p className="mt-1 font-mono text-lg font-bold tracking-wider">{registrationId}</p>
            </div>
          </div>
        )}

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

/* ─── Attendee Form ─── */

function AttendeeForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const registrationId = useMemo(() => (submitted ? generateRegistrationId() : ""), [submitted]);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    organization: "",
    profession: "",
    specialty: "",
    position: "",
    sideRoom1: "",
    sideRoom2: "",
    sector: "",
    firstTime: "yes",
    specialNeeds: "",
  });

  const update = (field: string, value: string) =>
    setFormData((p) => ({ ...p, [field]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <RegistrationSuccess
        name={formData.fullName}
        type="attendee"
        email={formData.email}
        registrationId={registrationId}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <SectionCard>
          <SectionHeading>Personal Information</SectionHeading>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Full Name" required className="sm:col-span-2">
              <input
                name="fullName"
                required
                className={inputClass}
                placeholder="Adaeze Okafor"
                value={formData.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
            </Field>
            <Field label="Gender" required>
              <select
                name="gender"
                required
                className={inputClass}
                value={formData.gender}
                onChange={(e) => update("gender", e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </Field>
            <Field label="Date of Birth">
              <input
                type="date"
                name="dob"
                className={inputClass}
                value={formData.dob}
                onChange={(e) => update("dob", e.target.value)}
              />
            </Field>
            <Field label="Email Address" required>
              <input
                type="email"
                name="email"
                required
                className={inputClass}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </Field>
            <Field label="Phone Number" required>
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
            <Field label="Country of Residence" required>
              <input
                name="country"
                required
                className={inputClass}
                placeholder="Nigeria"
                value={formData.country}
                onChange={(e) => update("country", e.target.value)}
              />
            </Field>
            <Field label="State / Province">
              <input
                name="state"
                className={inputClass}
                value={formData.state}
                onChange={(e) => update("state", e.target.value)}
              />
            </Field>
            <Field label="City">
              <input
                name="city"
                className={inputClass}
                value={formData.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </Field>
          </div>
        </SectionCard>

        {/* Professional Information */}
        <SectionCard>
          <SectionHeading>Professional Information</SectionHeading>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Organization" required>
              <input
                name="organization"
                required
                className={inputClass}
                value={formData.organization}
                onChange={(e) => update("organization", e.target.value)}
              />
            </Field>
            <Field label="Profession" required>
              <input
                name="profession"
                required
                className={inputClass}
                placeholder="Clinician, Researcher, Policy maker..."
                value={formData.profession}
                onChange={(e) => update("profession", e.target.value)}
              />
            </Field>
            <Field label="Specialty">
              <input
                name="specialty"
                className={inputClass}
                value={formData.specialty}
                onChange={(e) => update("specialty", e.target.value)}
              />
            </Field>
            <Field label="Position / Role">
              <input
                name="position"
                className={inputClass}
                value={formData.position}
                onChange={(e) => update("position", e.target.value)}
              />
            </Field>
          </div>
        </SectionCard>

        {/* Conference Information */}
        <SectionCard>
          <SectionHeading>Conference Information</SectionHeading>
          <div className="mt-5 space-y-5">
            <Field label="Side room, first choice" required>
              <select
                name="sideRoom1"
                required
                className={inputClass}
                value={formData.sideRoom1}
                onChange={(e) => update("sideRoom1", e.target.value)}
              >
                <option value="" disabled>
                  Select a room
                </option>
                <option>Room A: Who Cares for Nigeria? (Workforce)</option>
                <option>Room B: The Journey Between (Coordination)</option>
                <option>Room C: You Cannot Finance What You Cannot Count (Digital)</option>
                <option>Room D: Paying for the Load Bearing Layer (Financing)</option>
              </select>
            </Field>
            <Field label="Side room, second choice" required>
              <select
                name="sideRoom2"
                required
                className={inputClass}
                value={formData.sideRoom2}
                onChange={(e) => update("sideRoom2", e.target.value)}
              >
                <option value="" disabled>
                  Select a room
                </option>
                <option>Room A: The Journey Between (Coordination)</option>
                <option>Room B: Paying for the Load Bearing Layer (Financing)</option>
              </select>
            </Field>
            <Field label="Sector" required>
              <select
                name="sector"
                required
                className={inputClass}
                value={formData.sector}
                onChange={(e) => update("sector", e.target.value)}
              >
                <option value="" disabled>
                  Select your sector
                </option>
                <option>Government or regulator</option>
                <option>Health facility or clinical practice</option>
                <option>Home or community based care provider</option>
                <option>Insurance, HMO or financing</option>
                <option>Development partner or multilateral</option>
                <option>Academia or research</option>
                <option>Technology</option>
                <option>Media</option>
                <option>Civil society or advocacy</option>
                <option>Family caregiver or individual</option>
                <option>Other</option>
              </select>
            </Field>
            <fieldset>
              <legend className="mb-2 text-sm font-medium text-foreground">
                First-time attendee?
              </legend>
              <div className="flex gap-6 text-sm text-foreground">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="firstTime"
                    value="yes"
                    checked={formData.firstTime === "yes"}
                    onChange={(e) => update("firstTime", e.target.value)}
                    className="accent-primary"
                  />{" "}
                  Yes
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="firstTime"
                    value="no"
                    checked={formData.firstTime === "no"}
                    onChange={(e) => update("firstTime", e.target.value)}
                    className="accent-primary"
                  />{" "}
                  No
                </label>
              </div>
            </fieldset>
            <Field label="Special needs or accessibility requirements">
              <textarea
                name="specialNeeds"
                rows={3}
                className={inputClass}
                placeholder="Optional"
                value={formData.specialNeeds}
                onChange={(e) => update("specialNeeds", e.target.value)}
              />
            </Field>
          </div>
        </SectionCard>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            By registering you agree to receive event communications.
          </p>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="accent-primary"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={!agreed || loading}
          className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary via-primary to-primary/80 px-7 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-60"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <span className="relative z-10">{loading ? "Registering…" : "Complete Registration"}</span>
        </button>
      </form>
    </div>
  );
}

/* ─── Speaker Form ─── */

function SpeakerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    gender: "",
    nationality: "",
    email: "",
    phone: "",
    organization: "",
    position: "",
    yearsExperience: "",
    bio: "",
    profileUrl: "",
    expertise: "",
    paName: "",
    paEmail: "",
    paPhone: "",
    departureCountry: "",
    departureCity: "",
    airport: "",
    passportName: "",
    passportNumber: "",
    airline: "",
    flightNumber: "",
    arrivalDate: "",
    arrivalTime: "",
    departureDate: "",
    departureTime: "",
    hotelPreference: "",
    roomType: "",
    dietary: "",
  });

  const update = (field: string, value: string) =>
    setFormData((p) => ({ ...p, [field]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <RegistrationSuccess
        name={formData.fullName}
        type="speaker"
        email={formData.email}
        registrationId=""
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Personal Details */}
        <SectionCard>
          <SectionHeading>Personal Details</SectionHeading>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Full Name" required className="sm:col-span-2">
              <input
                name="fullName"
                required
                className={inputClass}
                value={formData.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
            </Field>
            <Field label="Title" required>
              <input
                name="title"
                required
                className={inputClass}
                placeholder="Dr., Prof., Mr., Mrs., Ms."
                value={formData.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </Field>
            <Field label="Gender" required>
              <select
                name="gender"
                required
                className={inputClass}
                value={formData.gender}
                onChange={(e) => update("gender", e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </Field>
            <Field label="Nationality">
              <input
                name="nationality"
                className={inputClass}
                value={formData.nationality}
                onChange={(e) => update("nationality", e.target.value)}
              />
            </Field>
            <Field label="Email" required>
              <input
                type="email"
                name="email"
                required
                className={inputClass}
                value={formData.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </Field>
            <Field label="Phone Number" required>
              <input
                type="tel"
                name="phone"
                required
                className={inputClass}
                value={formData.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </Field>
          </div>
        </SectionCard>

        {/* 2. Professional Details */}
        <SectionCard>
          <SectionHeading>Professional Details</SectionHeading>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Organization" required>
              <input
                name="organization"
                required
                className={inputClass}
                value={formData.organization}
                onChange={(e) => update("organization", e.target.value)}
              />
            </Field>
            <Field label="Position" required>
              <input
                name="position"
                required
                className={inputClass}
                value={formData.position}
                onChange={(e) => update("position", e.target.value)}
              />
            </Field>
            <Field label="Years of Experience">
              <input
                type="number"
                name="yearsExperience"
                min={0}
                className={inputClass}
                value={formData.yearsExperience}
                onChange={(e) => update("yearsExperience", e.target.value)}
              />
            </Field>
          </div>
        </SectionCard>

        {/* 3. Speaker Profile */}
        <SectionCard>
          <SectionHeading>Speaker Profile</SectionHeading>
          <div className="mt-5 space-y-5">
            <Field label="Biography" required>
              <textarea
                name="bio"
                rows={4}
                required
                className={inputClass}
                value={formData.bio}
                onChange={(e) => update("bio", e.target.value)}
              />
            </Field>
            <Field label="Professional Profile (LinkedIn or website)">
              <input
                name="profileUrl"
                className={inputClass}
                placeholder="https://..."
                value={formData.profileUrl}
                onChange={(e) => update("profileUrl", e.target.value)}
              />
            </Field>
            <Field label="Areas of Expertise">
              <input
                name="expertise"
                className={inputClass}
                placeholder="e.g. Health policy, Community care, Digital health"
                value={formData.expertise}
                onChange={(e) => update("expertise", e.target.value)}
              />
            </Field>
          </div>
        </SectionCard>

        {/* 4. Media Uploads */}
        <SectionCard>
          <SectionHeading>Media Uploads</SectionHeading>
          <div className="mt-5 space-y-5">
            <Field label="Professional Headshot">
              <input
                type="file"
                name="headshot"
                accept="image/*"
                className={inputClass}
              />
            </Field>
            <Field label="Additional Photos">
              <input
                type="file"
                name="photos"
                accept="image/*"
                multiple
                className={inputClass}
              />
            </Field>
            <Field label="CV / Resume">
              <input
                type="file"
                name="cv"
                accept=".pdf,.doc,.docx"
                className={inputClass}
              />
            </Field>
          </div>
        </SectionCard>

        {/* 5. Personal Assistant */}
        <SectionCard>
          <SectionHeading>Personal Assistant (Optional)</SectionHeading>
          <p className="mt-1 text-xs text-muted-foreground">
            Optional — if you'll be travelling with an assistant.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="PA Full Name">
              <input
                name="paName"
                className={inputClass}
                value={formData.paName}
                onChange={(e) => update("paName", e.target.value)}
              />
            </Field>
            <Field label="PA Email">
              <input
                type="email"
                name="paEmail"
                className={inputClass}
                value={formData.paEmail}
                onChange={(e) => update("paEmail", e.target.value)}
              />
            </Field>
            <Field label="PA Phone Number">
              <input
                type="tel"
                name="paPhone"
                className={inputClass}
                value={formData.paPhone}
                onChange={(e) => update("paPhone", e.target.value)}
              />
            </Field>
          </div>
        </SectionCard>

        {/* 6. Travel Information */}
        <SectionCard>
          <SectionHeading>Travel Information</SectionHeading>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Departure Country">
              <input
                name="departureCountry"
                className={inputClass}
                value={formData.departureCountry}
                onChange={(e) => update("departureCountry", e.target.value)}
              />
            </Field>
            <Field label="Departure City">
              <input
                name="departureCity"
                className={inputClass}
                value={formData.departureCity}
                onChange={(e) => update("departureCity", e.target.value)}
              />
            </Field>
            <Field label="Preferred Airport">
              <input
                name="airport"
                className={inputClass}
                value={formData.airport}
                onChange={(e) => update("airport", e.target.value)}
              />
            </Field>
            <Field label="Passport Name">
              <input
                name="passportName"
                className={inputClass}
                value={formData.passportName}
                onChange={(e) => update("passportName", e.target.value)}
              />
            </Field>
            <Field label="Passport Number">
              <input
                name="passportNumber"
                className={inputClass}
                value={formData.passportNumber}
                onChange={(e) => update("passportNumber", e.target.value)}
              />
              <p className="text-[11px] text-muted-foreground/60">
                Restricted — visible only to authorised staff
              </p>
            </Field>
          </div>
        </SectionCard>

        {/* 7. Flight Information */}
        <SectionCard>
          <SectionHeading>Flight Information</SectionHeading>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Airline">
              <input
                name="airline"
                className={inputClass}
                value={formData.airline}
                onChange={(e) => update("airline", e.target.value)}
              />
            </Field>
            <Field label="Flight Number">
              <input
                name="flightNumber"
                className={inputClass}
                value={formData.flightNumber}
                onChange={(e) => update("flightNumber", e.target.value)}
              />
            </Field>
            <Field label="Arrival Date">
              <input
                type="date"
                name="arrivalDate"
                className={inputClass}
                value={formData.arrivalDate}
                onChange={(e) => update("arrivalDate", e.target.value)}
              />
            </Field>
            <Field label="Arrival Time">
              <input
                type="time"
                name="arrivalTime"
                className={inputClass}
                value={formData.arrivalTime}
                onChange={(e) => update("arrivalTime", e.target.value)}
              />
            </Field>
            <Field label="Departure Date">
              <input
                type="date"
                name="departureDate"
                className={inputClass}
                value={formData.departureDate}
                onChange={(e) => update("departureDate", e.target.value)}
              />
            </Field>
            <Field label="Departure Time">
              <input
                type="time"
                name="departureTime"
                className={inputClass}
                value={formData.departureTime}
                onChange={(e) => update("departureTime", e.target.value)}
              />
            </Field>
          </div>
        </SectionCard>

        {/* 8. Accommodation */}
        <SectionCard>
          <SectionHeading>Accommodation</SectionHeading>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Hotel Preference">
              <input
                name="hotelPreference"
                className={inputClass}
                value={formData.hotelPreference}
                onChange={(e) => update("hotelPreference", e.target.value)}
              />
            </Field>
            <Field label="Room Type">
              <select
                name="roomType"
                className={inputClass}
                value={formData.roomType}
                onChange={(e) => update("roomType", e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                <option>Single</option>
                <option>Double</option>
                <option>Suite</option>
              </select>
            </Field>
            <Field label="Dietary Requirements" className="sm:col-span-2">
              <textarea
                name="dietary"
                rows={2}
                className={inputClass}
                value={formData.dietary}
                onChange={(e) => update("dietary", e.target.value)}
              />
            </Field>
          </div>
        </SectionCard>

        {/* Submit */}
        <div className="flex items-center justify-between border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            Our Speaker Coordinator will be in touch within 5 business days.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary via-primary to-primary/80 px-7 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-60"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10">
              {loading ? "Submitting…" : "Submit speaker registration"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
