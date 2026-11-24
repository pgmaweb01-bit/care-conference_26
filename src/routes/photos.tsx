import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ExternalLink, Images, Lock } from "lucide-react";
import { PageHero } from "@/components/section";
import { EVENT, PHOTOS_LINK } from "@/data/conference";

const ACCESS_KEY = "cc26-photos-access";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Route = createFileRoute("/photos")({
  head: () => ({
    meta: [
      { title: "Conference Photos — Care Conference 2026, Lagos" },
      {
        name: "description",
        content: `Access the photo gallery from ${EVENT.name}, held on 19 November 2026 at IALA Hub, Lagos. Enter your email to view the pictures.`,
      },
      { property: "og:title", content: "Conference Photos — Care Conference 2026" },
      {
        property: "og:description",
        content: "View the pictures from the Care Conference 2026.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/photos" },
    ],
    links: [{ rel: "canonical", href: "/photos" }],
  }),
  component: PhotosPage,
});

function PhotosPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  // SSR + first client render always show the form (matches server HTML);
  // returning visitors flip to unlocked after mount via the effect below.
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(ACCESS_KEY)) setUnlocked(true);
    } catch {
      // storage unavailable — just show the form
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    try {
      localStorage.setItem(ACCESS_KEY, value);
    } catch {
      // storage unavailable — access still works for this visit
    }
    // Record the unlock for the admin dashboard (fire-and-forget: never
    // blocks or fails the visitor's access if logging is unavailable).
    void fetch("/api/photo-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: value }),
    }).catch(() => {
      // ignore — access already granted
    });
    setUnlocked(true);
  }

  function handleReset() {
    try {
      localStorage.removeItem(ACCESS_KEY);
    } catch {
      // ignore
    }
    setEmail("");
    setError("");
    setUnlocked(false);
  }

  return (
    <>
      <PageHero
        eyebrow="Photos"
        title="Conference Photos"
        lede={`Relive ${EVENT.name} — enter your email to unlock the full gallery of pictures from the conference.`}
      />

      <section className="section-pad">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          {unlocked ? (
            <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Images className="size-6" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-extrabold">You're in!</h2>
              <p className="mx-auto mt-2 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
                The full photo gallery from {EVENT.date} is hosted on Google Drive. Open it below to
                browse and download the pictures.
              </p>
              <a
                href={PHOTOS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <ExternalLink className="size-4" />
                Open Photo Gallery
              </a>
              <p className="mt-3 text-xs text-muted-foreground">Opens Google Drive in a new tab.</p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Unlock with a different email
              </button>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Lock className="size-6" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-extrabold">
                Unlock the Photo Gallery
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Enter your email address to get access to the pictures from the conference.
              </p>

              <form onSubmit={handleSubmit} className="mt-6" noValidate>
                <label
                  htmlFor="photos-email"
                  className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Email address
                </label>
                <input
                  id="photos-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  aria-invalid={!!error}
                  aria-describedby={error ? "photos-email-error" : undefined}
                />
                {error && (
                  <p id="photos-email-error" className="mt-2 text-sm font-medium text-red-600">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Lock className="size-4" />
                  Get Access
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
