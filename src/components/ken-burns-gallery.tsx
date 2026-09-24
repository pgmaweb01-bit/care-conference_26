import { useEffect, useRef, useState } from "react";

const DURATION = 6500;
const CROSSFADE = 1300;

export function KenBurnsGallery({
  images,
  caption,
  interval = DURATION,
}: {
  images: string[];
  caption?: string;
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setActive((v) => (v + 1) % images.length);
    }, interval);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [images.length, interval]);

  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="flex items-center justify-center px-5 pb-6 pt-14 sm:px-8">
        <div className="text-center">
          <p className="eyebrow text-accent">Moments from the Conference</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink-foreground lg:text-4xl">
            Care Conference in Pictures
          </h2>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-0 sm:px-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden sm:rounded-lg lg:aspect-[21/9]">
          {images.map((src, i) => {
            const isActive = i === active;
            const isPrev = i === (active + images.length - 1) % images.length;
            return (
              <div
                key={src}
                aria-hidden={!isActive}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${src}')`,
                  opacity: isActive ? 1 : isPrev ? 0 : 0,
                  transition: `opacity ${CROSSFADE}ms ease-in-out`,
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${src}')`,
                    animation:
                      "kenburns 24s ease-in-out infinite",
                    transform: "scale(1)",
                    willChange: "transform",
                  }}
                />
              </div>
            );
          })}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/40" />

          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-5 pb-6 sm:flex-row sm:justify-between sm:px-8">
            {caption ? (
              <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-ink-foreground/85">
                {caption}
              </p>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to image ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-8 bg-accent"
                      : "w-4 bg-ink-foreground/30 hover:bg-ink-foreground/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}