import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function Stars() {
  const stars = Array.from({ length: 28 }, (_, i) => ({ l: (i * 37) % 100, t: (i * 53) % 100, d: (i % 7) * 0.4, s: 2 + (i % 3) }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((x, i) => (
        <span key={i} className="absolute rounded-full bg-primary animate-twinkle" style={{ left: `${x.l}%`, top: `${x.t}%`, width: x.s, height: x.s, animationDelay: `${x.d}s` }} />
      ))}
    </div>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden px-6 pb-4 pt-24 text-center">
      <Stars />
      {eyebrow && <p className="animate-rise font-[family-name:var(--font-script)] text-3xl text-accent">{eyebrow}</p>}
      <h1 className="animate-rise mt-2 text-5xl font-semibold md:text-7xl" style={{ animationDelay: "120ms" }}><span className="text-gold">{title}</span></h1>
      {children && <div className="animate-rise mx-auto mt-6 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "240ms" }}>{children}</div>}
    </section>
  );
}
