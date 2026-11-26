import { createFileRoute } from "@tanstack/react-router";
import { Play, X, ChevronDown, Quote, Sparkles, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHeader, Reveal, Stars } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos — The Bobby Diamond Show" },
      { name: "description", content: "Watch The Bobby Diamond Show live: Hello Dolly, Mack the Knife, Volare, Fly Me to the Moon, Delilah and more." },
      { property: "og:title", content: "Videos — The Bobby Diamond Show" },
      { property: "og:description", content: "Live performance clips from Boston-based entertainer Bobby Diamond." },
    ],
  }),
  component: Videos,
});

const VIDEOS = [
  { title: "Hello Dolly", id: "UuIF6sIEarU" },
  { title: "Mack the Knife", id: "VWtmCwp9oN4" },
  { title: "What Kind of Fool Am I", id: "wIjDgqAKTrg" },
  { title: "Volare", id: "91EDrkcgqdA" },
  { title: "Fly Me to the Moon", id: "ay5s0G38N-o" },
  { title: "Release Me", id: "IOJilsnRj5E" },
  { title: "Delilah", id: "VGivMks8oFk" },
  { title: "As Long As I'm Singin'", id: "SJwqLdIK3r0" },
  { title: "A Little Less Conversation", id: "UUaqvz-GrnQ" },
  { title: "The Curtain Falls", id: "Hi7O_r2zQyU" },
] as const;

type Video = (typeof VIDEOS)[number];
const INITIAL_VISIBLE_COUNT = 6; // 3 cards per row x 2 rows

function Videos() {
  const [active, setActive] = useState<Video | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const visibleVideos = isExpanded ? VIDEOS : VIDEOS.slice(0, INITIAL_VISIBLE_COUNT);
  const remainingCount = VIDEOS.length - INITIAL_VISIBLE_COUNT;

  return (
    <>
      <PageHeader eyebrow="Live in concert" title="The Bobby Diamond Show">
        Experience the electric energy, charisma, and timeless vocal mastery that captivates audiences across North America.
      </PageHeader>

      {/* Video Gallery Section */}
      <section className="mx-auto mt-12 max-w-6xl px-6">
        {/* 3 cards per row on desktop (lg:grid-cols-3), initially 2 rows = 6 cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {visibleVideos.map((v, i) => (
            <Reveal key={v.id} delay={(i % 3) * 100}>
              <button
                onClick={() => setActive(v)}
                className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-b from-card/90 via-card/60 to-card/40 text-left backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-primary hover:shadow-[0_0_35px_oklch(0.82_0.13_85/0.25)] focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label={`Play ${v.title} performance clip`}
              >
                {/* Subtle top golden light flare on hover */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Video Thumbnail with cinematic framing */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/60">
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt={`${v.title} — live performance thumbnail`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />

                  {/* Live Performance Badge */}
                  <div className="absolute left-3 top-3 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-background/85 px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-primary backdrop-blur-md shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                      Live Show
                    </span>
                  </div>

                  {/* Centered Glowing Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Outer pulse ring on hover */}
                      <span className="absolute -inset-2 rounded-full border border-primary/40 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110" />
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-glow transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_oklch(0.82_0.13_85/0.85)]">
                        <Play className="h-6 w-6 translate-x-0.5 fill-primary-foreground text-primary-foreground" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-gold">
                    {v.title}
                  </h3>
                  
                  <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-primary/70" />
                      Concert Performance
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
                      Watch Clip
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* View More / View Less Toggle Button */}
        {VIDEOS.length > INITIAL_VISIBLE_COUNT && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              className="group relative inline-flex items-center gap-2.5 rounded-full border border-primary/40 bg-card/80 px-8 py-3.5 text-sm font-semibold tracking-wide text-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:border-primary hover:bg-gold hover:text-primary-foreground hover:shadow-glow hover:scale-105 active:scale-95"
            >
              <span>
                {isExpanded
                  ? "Show Fewer Videos"
                  : `View More Videos (${remainingCount} More)`}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  isExpanded && "rotate-180"
                )}
              />
            </button>
          </div>
        )}
      </section>

      {/* Quote Section from Syndicated Columnist Ross Martin */}
      <section className="relative mx-auto mt-24 max-w-5xl px-6 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-b from-card/90 via-card/50 to-slate-950/90 p-8 sm:p-12 md:p-16 text-center shadow-[0_0_50px_oklch(0.82_0.13_85/0.1)] backdrop-blur-xl">
            {/* Ambient Star Field & Glow */}
            <Stars />
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[130px]"
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-3xl">
              {/* Decorative Quote Icon & Script Header */}
              <div className="mb-6 flex flex-col items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary shadow-glow">
                  <Quote className="h-5 w-5 fill-primary/30 text-primary" />
                </div>
                <span className="mt-3 font-[family-name:var(--font-script)] text-3xl text-accent">
                  Critical Acclaim
                </span>
              </div>

              {/* Quote Body verbatim from original press clip */}
              <blockquote className="space-y-6">
                <p className="font-[family-name:var(--font-display)] text-xl leading-relaxed text-slate-100 sm:text-2xl md:text-3xl tracking-wide">
                  “He has power and sensitivity with a style{" "}
                  <span className="text-gold italic font-normal">“that is his alone”</span>.
                  For once the critics are all in agreement about this New England based
                  talented and dynamic entertainer.”
                </p>

                <p className="font-[family-name:var(--font-display)] text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl">
                  “Bobby has been captivating{" "}
                  <span className="text-gold font-normal">“Standing Room Only”</span>{" "}
                  audiences in major showrooms throughout the country. With sold out
                  performances throughout the States and Canada, there's no doubt that Bobby
                  Diamond will absolutely leave you{" "}
                  <span className="text-gold font-normal">Standing on your feet!</span>”
                </p>
              </blockquote>

              {/* Columnist Attribution matching image */}
              <div className="mt-8 flex flex-col items-center">
                <div className="flex items-center gap-3">
                  <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
                  <span className="text-primary text-xs">♦</span>
                  <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  Syndicated Columnist
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-medium text-gold sm:text-2xl">
                  — Ross Martin
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Video Modal Player */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md animate-rise"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-3xl border border-primary/30 bg-card shadow-[0_0_50px_oklch(0.82_0.13_85/0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
              <p className="font-[family-name:var(--font-display)] text-lg text-gold sm:text-xl font-medium">{active.title}</p>
              <button
                onClick={() => setActive(null)}
                aria-label="Close video"
                className="rounded-full border border-border/80 p-1.5 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:bg-primary/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0`}
                title={`Bobby Diamond — ${active.title}`}
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
