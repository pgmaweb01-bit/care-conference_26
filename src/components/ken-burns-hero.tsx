import { useEffect, useRef, useCallback } from "react";

const HERO_SLIDES = [
  "/Gallery/BLQ09408.webp",
  "/Gallery/BLQ09388.webp",
  "/Gallery/BLQ09361.webp",
  "/Gallery/BLQ09293.webp",
];

const DURATION = 8000;
const CROSSFADE = 2000;

export function KenBurnsHero() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      refs.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    let active = 0;
    const count = HERO_SLIDES.length;

    function tick() {
      const next = (active + 1) % count;
      const el = refs.current[next];
      if (el) {
        el.style.transition = `opacity ${CROSSFADE}ms ease-in-out`;
        el.style.opacity = "1";
      }
      const prev = refs.current[active];
      if (prev) {
        prev.style.transition = `opacity ${CROSSFADE}ms ease-in-out`;
        prev.style.opacity = "0";
      }
      active = next;
    }

    const id = setInterval(tick, DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {HERO_SLIDES.map((src, i) => (
        <div
          key={src}
          ref={setRef(i)}
          className={`absolute inset-0 bg-cover bg-center ${i === 0 ? "opacity-100" : "opacity-0"}`}
          style={{
            backgroundImage: `url('${src}')`,
            animation: `kenburns ${DURATION * HERO_SLIDES.length}ms ease-in-out infinite`,
            animationDelay: `${i * DURATION}ms`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/85 to-ink" />
    </div>
  );
}
