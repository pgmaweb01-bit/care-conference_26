import { Link } from "@tanstack/react-router";

export function StaticGallery({
  images,
  eyebrow = "Gallery",
  title = "Highlights",
  lede,
  columns = 4,
}: {
  images: string[];
  eyebrow?: string;
  title?: string;
  lede?: string;
  columns?: 4 | 5 | 6;
}) {
  const spanClass = {
    4: "grid-cols-2 sm:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-4 md:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6",
  }[columns];

  return (
    <section className="bg-card pb-24 pt-24 lg:pb-32 lg:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-primary">{eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight lg:text-4xl">
              {title}
            </h2>
            {lede ? (
              <p className="mt-3 max-w-[52ch] text-muted-foreground">{lede}</p>
            ) : null}
          </div>
        </div>

        <div className={`mt-10 grid ${spanClass} gap-3 sm:gap-4`}>
          {images.map((src, i) => (
            <div
              key={src}
              className={`group relative overflow-hidden rounded-lg ${i % 5 === 3 ? "sm:col-span-2 sm:row-span-2" : ""}`}
            >
              <img
                src={src}
                alt="Care Conference gallery highlight"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20" />
            </div>
          ))}
        </div>

        {lede ? (
          <div className="mt-10 text-center">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-foreground transition-all hover:border-primary/40 hover:bg-primary/5"
            >
              Get in Touch
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}