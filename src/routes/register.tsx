import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle, Download, Printer } from "lucide-react";
import { PageHero } from "@/components/section";
import { EVENT, REGISTRATION_TYPES } from "@/data/conference";
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
          "Secure your place at the Care Conference 2026. Multiple registration tiers available.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/register" },
    ],
    links: [{ rel: "canonical", href: "/register" }],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const registrationId = useMemo(() => (submitted ? generateRegistrationId() : ""), [submitted]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organisation: "",
    role: "",
    dietary: "",
  });

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

            {/* QR Code + Registration Card */}
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
                  <dd className="mt-1 font-display font-bold">
                    {formData.firstName} {formData.lastName}
                  </dd>
                </div>
                <div>
                  <dt className="font-display font-semibold text-muted-foreground">Type</dt>
                  <dd className="mt-1 font-display font-bold">{selectedType}</dd>
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
        title="Register for the Care Conference 2026"
        lede={`${EVENT.date} · ${EVENT.time} · ${EVENT.venue}`}
      />

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Registration Types */}
            <div className="lg:col-span-5">
              <p className="eyebrow text-primary">Choose Your Registration</p>
              <h2 className="mt-3 font-display text-2xl font-extrabold">Registration Tiers</h2>
              <div className="mt-6 space-y-4">
                {REGISTRATION_TYPES.map((reg) => (
                  <button
                    key={reg.type}
                    type="button"
                    onClick={() => setSelectedType(reg.type)}
                    className={`w-full rounded-lg border p-5 text-left transition-all ${
                      selectedType === reg.type
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-display font-bold">{reg.type}</p>
                      <p className="font-display text-lg font-extrabold text-primary">
                        {reg.price}
                      </p>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {reg.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <CheckCircle className="size-3 text-primary/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-7">
              <div className="rounded-lg border border-border bg-card p-8">
                <p className="eyebrow text-primary">Your Details</p>
                <h2 className="mt-3 font-display text-2xl font-extrabold">
                  Complete Your Registration
                </h2>
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block font-display text-sm font-semibold"
                      >
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
                        className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block font-display text-sm font-semibold"
                      >
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
                        className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-display text-sm font-semibold">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block font-display text-sm font-semibold">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                      className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="organisation"
                      className="block font-display text-sm font-semibold"
                    >
                      Organisation *
                    </label>
                    <input
                      id="organisation"
                      type="text"
                      required
                      value={formData.organisation}
                      onChange={(e) => setFormData((p) => ({ ...p, organisation: e.target.value }))}
                      className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block font-display text-sm font-semibold">
                      Your Role
                    </label>
                    <input
                      id="role"
                      type="text"
                      placeholder="e.g. Healthcare Administrator, Caregiver, Researcher"
                      value={formData.role}
                      onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
                      className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="dietary" className="block font-display text-sm font-semibold">
                      Dietary Requirements
                    </label>
                    <input
                      id="dietary"
                      type="text"
                      placeholder="e.g. Vegetarian, Vegan, Halal"
                      value={formData.dietary}
                      onChange={(e) => setFormData((p) => ({ ...p, dietary: e.target.value }))}
                      className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {!selectedType && (
                    <p className="text-sm text-muted-foreground">
                      Please select a registration tier above to continue.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={!selectedType}
                    className="w-full rounded-md bg-primary px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Complete Registration
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
