import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  tone = "light",
  className,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  lede?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("max-w-[52ch]", className)}>
      <p className="eyebrow flex items-center gap-3 text-accent">
        {index ? (
          <span className={tone === "dark" ? "text-accent" : "text-primary"}>{index}</span>
        ) : null}
        <span className={tone === "dark" ? "text-accent" : "text-primary"}>{eyebrow}</span>
      </p>
      <h2
        className={cn(
          "mt-4 font-display text-3xl font-extrabold leading-[1.05] lg:text-5xl",
          tone === "dark" ? "text-ink-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            tone === "dark" ? "text-ink-foreground/75" : "text-muted-foreground",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-linen">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h1 className="mt-4 max-w-[20ch] font-display text-4xl font-extrabold leading-[0.98] lg:text-6xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted-foreground">{lede}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
