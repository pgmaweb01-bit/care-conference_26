import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { PageHero } from "@/components/section";
import { EVENT } from "@/data/conference";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Care Conference 2026, Lagos" },
      {
        name: "description",
        content:
          "Get in touch with the Care Conference 2026 team for enquiries about registration, partnerships, speaking or media.",
      },
      { property: "og:title", content: "Contact — Care Conference 2026" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        lede="Have a question about the Care Conference 2026? We'd love to hear from you."
      />

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl font-extrabold">Contact Information</h2>
              <div className="mt-8 space-y-6">
                <div>
                  <p className="eyebrow text-primary">Email</p>
                  <p className="mt-2 font-display font-semibold">info@careconference.ng</p>
                </div>
                <div>
                  <p className="eyebrow text-primary">Phone</p>
                  <p className="mt-2 font-display font-semibold">+234 800 000 0000</p>
                </div>
                <div>
                  <p className="eyebrow text-primary">Venue</p>
                  <p className="mt-2 font-display font-semibold">{EVENT.venue}</p>
                </div>
                <div>
                  <p className="eyebrow text-primary">Date & Time</p>
                  <p className="mt-2 font-display font-semibold">
                    {EVENT.date}
                    <br />
                    {EVENT.time}
                  </p>
                </div>
                <div>
                  <p className="eyebrow text-primary">Organised By</p>
                  <p className="mt-2 font-display font-semibold">{EVENT.organiser}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {submitted ? (
                <div className="rounded-lg border border-border bg-card p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="size-8 text-green-600" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-extrabold">Message Sent</h3>
                  <p className="mt-3 text-muted-foreground">
                    Thank you for reaching out. We'll get back to you within 48 hours.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-card p-8">
                  <h3 className="font-display text-xl font-extrabold">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block font-display text-sm font-semibold">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                          className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block font-display text-sm font-semibold">
                          Email *
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
                    </div>
                    <div>
                      <label htmlFor="subject" className="block font-display text-sm font-semibold">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                        className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      >
                        <option value="">Select a topic</option>
                        <option value="registration">Registration Enquiry</option>
                        <option value="partnership">Partnership</option>
                        <option value="speaking">Speaking Opportunity</option>
                        <option value="media">Media & Press</option>
                        <option value="exhibition">CareSouk Exhibition</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block font-display text-sm font-semibold">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                        className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-md bg-primary px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
