import { Link } from "@tanstack/react-router";
import { EVENT } from "@/data/conference";

const QUICK_LINKS = [
  { to: "/about", label: "About" },
  { to: "/programme", label: "Programme" },
  { to: "/speakers", label: "Speakers" },
  { to: "/policy-sessions", label: "Policy Sessions" },
] as const;

const SECOND_LINKS = [
  { to: "/caresouk", label: "CareSouk" },
  { to: "/partners", label: "Partners" },
  { to: "/register", label: "Register" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <img
            src="/cropped-3-768x242.webp"
            alt="The Purple Global Mission"
            className="h-10 w-auto"
          />
          <p className="mt-3 font-display text-2xl font-extrabold">The Care Conference 2026</p>
          <p className="mt-2 font-display text-sm font-semibold text-ink-foreground/70">
            {EVENT.theme}
          </p>
          <p className="mt-4 max-w-[38ch] text-ink-foreground/70">{EVENT.subtitle}</p>
          <p className="mt-6 text-sm text-ink-foreground/60">
            {EVENT.date}
            <br />
            {EVENT.venue}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-4">
          <div>
            <p className="eyebrow text-ink-foreground/50">Quick Links</p>
            <ul className="mt-4 space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="font-display text-sm text-ink-foreground/85 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-ink-foreground/50">Connect</p>
            <ul className="mt-4 space-y-2">
              {SECOND_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="font-display text-sm text-ink-foreground/85 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Link
            to="/register"
            className="inline-block rounded-md bg-accent px-5 py-3 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent-foreground transition-opacity hover:opacity-90"
          >
            Register for Care Conference 2026
          </Link>
          <p className="eyebrow mt-6 text-ink-foreground/50">Organised by</p>
          <p className="mt-2 font-display text-sm font-semibold">{EVENT.organiser}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-5 py-5 text-xs text-ink-foreground/50 sm:px-8">
          <p>© 2026 The Care Conference. Organised by {EVENT.organiser}.</p>
          <p>Care as Infrastructure.</p>
        </div>
      </div>
    </footer>
  );
}
