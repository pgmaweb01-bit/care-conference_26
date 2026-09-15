import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { EVENT } from "@/data/conference";

const NAV = [
  { to: "/about", label: "About" },
  { to: "/programme", label: "Programme" },
  { to: "/speakers", label: "Speakers" },
  { to: "/caresouk", label: "CareSouk" },
  { to: "/partners", label: "Partners" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/cropped-3-768x242.webp"
            alt="The Purple Global Mission"
            className="h-8 w-auto"
          />
          <span className="leading-none">
            <span className="block font-display text-sm font-bold tracking-tight">
              Care Conference 2026
            </span>
            <span className="eyebrow mt-1 block text-muted-foreground">{EVENT.theme}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="font-display text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/programme"
            className="hidden rounded-md border border-input px-4 py-2 font-display text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-secondary sm:inline-block"
          >
            View Programme
          </Link>
          <Link
            to="/register"
            className="rounded-md bg-primary px-4 py-2 font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Register Now
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-md border border-input lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border bg-background px-5 py-4 lg:hidden">
          <ul className="grid gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2 font-display text-sm font-medium hover:bg-secondary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
