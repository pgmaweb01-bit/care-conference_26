import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle, Download, Printer } from "lucide-react";
import { PageHero } from "@/components/section";
import { EVENT } from "@/data/conference";
import { RegistrationQR, generateRegistrationId } from "@/components/registration-qr";

const SIDE_ROOMS = [
  { value: "room-a", label: "Room A: Who Cares for Nigeria? (Workforce)" },
  { value: "room-b", label: "Room B: The Journey Between (Coordination)" },
  { value: "room-c", label: "Room C: You Cannot Finance What You Cannot Count (Digital)" },
  { value: "room-d", label: "Room D: Paying for the Load Bearing Layer (Financing)" },
];

const SECTORS = [
  "Government or regulator",
  "Health facility or clinical practice",
  "Home or community based care provider",
  "Insurance, HMO or financing",
  "Development partner or multilateral",
  "Academia or research",
  "Technology",
  "Media",
  "Civil society or advocacy",
  "Family caregiver or individual",
  "Other",
];

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
          "Secure your place at the Care Conference 2026. Free registration for all delegates.",
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
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const registrationId = useMemo(() => (submitted ? generateRegistrationId() : ""), [submitted]);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    organisation: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <PageHero
          eyebrow="Registration"
          title="Registration Confirmed"
          lede="Thank you for registering for the Care Conference 2026."
        />
        <section className="section-pad">
          <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="size-8 text-green-600" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-extrabold">You're Registered!</h2>
            <p className="mt-4 text-muted-foreground">
              A confirmation email has been sent to <strong>{formData.email}</strong> with your QR
              code and registration details.
            </p>

            <div className="mt-8 rounded-lg border border-border bg-card p-8">
              <p className="eyebrow text-primary">Your Check-In QR Code</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Present this QR code at the venue for instant check-in. You can also enter your
                registration ID manually.
              </p>

              <div className="mt-6 flex justify-center">
                <RegistrationQR registrationId={registrationId} size={220} />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 text-left text-sm">
                <div>
                  <dt className="font-display font-semibold text-muted-foreground">Name</dt>
                  <dd className="mt-1 font-display font-bold">{formData.fullName}</dd>
                </div>
                <div>
                  <dt className="font-display font-semibold text-muted-foreground">Type</dt>
                  <dd className="mt-1 font-display font-bold capitalize">{attendeeType}</dd>
                </div>
                <div>
                  <dt className="font-display font-semibold text-muted-foreground">Date</dt>
                  <dd className="mt-1 font-display font-bold">{EVENT.date}</dd>
                </div>
                <div>
                  <dt className="font-display font-semibold text-muted-foreground">Venue</dt>
                  <dd className="mt-1 font-display font-bold">{EVENT.venue}</dd>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2.5 font-display text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-secondary"
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
                  className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2.5 font-display text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-secondary"
                >
                  <Download className="size-3.5" />
                  Download QR Code
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
              <p className="text-sm font-semibold text-accent">Save your Registration ID</p>
              <p className="mt-1 font-mono text-lg font-bold tracking-wider">{registrationId}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Keep this ID safe. You can also use it to check in manually if the QR code cannot be
                scanned.
              </p>
            </div>

            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Back to Home <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Registration"
        title="Register for The Care Conference 2026"
        lede="Care as Infrastructure: Building a National Position on Homecare for Nigeria"
      />

      <section className="section-pad">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          {/* Attendee / Speaker Toggle */}
          <div className="mb-8 flex gap-2">
            {(["attendee", "speaker"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setAttendeeType(type)}
                className={`rounded-md px-6 py-2.5 font-display text-sm font-semibold capitalize transition-colors ${
                  attendeeType === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Personal Information */}
            <fieldset>
              <legend className="mb-6 font-display text-xl font-extrabold">
                Personal Information
              </legend>
              <div className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="block font-display text-sm font-semibold">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="gender" className="block font-display text-sm font-semibold">
                      Gender <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="gender"
                      required
                      value={formData.gender}
                      onChange={(e) => update("gender", e.target.value)}
                      className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dob" className="block font-display text-sm font-semibold">
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => update("dateOfBirth", e.target.value)}
                      className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block font-display text-sm font-semibold">
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block font-display text-sm font-semibold">
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block font-display text-sm font-semibold">
                    Country of Residence <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="country"
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => update("country", e.target.value)}
                    className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="state" className="block font-display text-sm font-semibold">
                      State / Province
                    </label>
                    <input
                      id="state"
                      type="text"
                      value={formData.state}
                      onChange={(e) => update("state", e.target.value)}
                      className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block font-display text-sm font-semibold">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => update("city", e.target.value)}
                      className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Professional Information */}
            <fieldset>
              <legend className="mb-6 font-display text-xl font-extrabold">
                Professional Information
              </legend>
              <div className="space-y-5">
                <div>
                  <label htmlFor="organisation" className="block font-display text-sm font-semibold">
                    Organization <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="organisation"
                    type="text"
                    required
                    value={formData.organisation}
                    onChange={(e) => update("organisation", e.target.value)}
                    className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="profession" className="block font-display text-sm font-semibold">
                    Profession <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="profession"
                    type="text"
                    required
                    value={formData.profession}
                    onChange={(e) => update("profession", e.target.value)}
                    className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="specialty" className="block font-display text-sm font-semibold">
                    Specialty
                  </label>
                  <input
                    id="specialty"
                    type="text"
                    value={formData.specialty}
                    onChange={(e) => update("specialty", e.target.value)}
                    className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="position" className="block font-display text-sm font-semibold">
                    Position / Role
                  </label>
                  <input
                    id="position"
                    type="text"
                    value={formData.position}
                    onChange={(e) => update("position", e.target.value)}
                    className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </fieldset>

            {/* Conference Information */}
            <fieldset>
              <legend className="mb-6 font-display text-xl font-extrabold">
                Conference Information
              </legend>
              <div className="space-y-5">
                <div>
                  <label htmlFor="room1" className="block font-display text-sm font-semibold">
                    Side room, first choice <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="room1"
                    required
                    value={formData.sideRoom1}
                    onChange={(e) => update("sideRoom1", e.target.value)}
                    className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select a room</option>
                    {SIDE_ROOMS.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="room2" className="block font-display text-sm font-semibold">
                    Side room, second choice <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="room2"
                    required
                    value={formData.sideRoom2}
                    onChange={(e) => update("sideRoom2", e.target.value)}
                    className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select a room</option>
                    {SIDE_ROOMS.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="sector" className="block font-display text-sm font-semibold">
                    Sector <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="sector"
                    required
                    value={formData.sector}
                    onChange={(e) => update("sector", e.target.value)}
                    className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select your sector</option>
                    {SECTORS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="mb-2 font-display text-sm font-semibold">First-time attendee?</p>
                  <div className="flex gap-6">
                    {(["yes", "no"] as const).map((val) => (
                      <label key={val} className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="firstTime"
                          value={val}
                          checked={formData.firstTime === val}
                          onChange={(e) => update("firstTime", e.target.value)}
                          className="accent-primary"
                        />
                        <span className="capitalize">{val}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="specialNeeds" className="block font-display text-sm font-semibold">
                    Special needs or accessibility requirements
                  </label>
                  <textarea
                    id="specialNeeds"
                    rows={3}
                    value={formData.specialNeeds}
                    onChange={(e) => update("specialNeeds", e.target.value)}
                    className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </fieldset>

            {/* Agreement */}
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 accent-primary"
              />
              <span>By registering you agree to receive event communications.</span>
            </label>

            <button
              type="submit"
              disabled={!agreed}
              className="w-full rounded-md bg-primary px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete Registration
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
