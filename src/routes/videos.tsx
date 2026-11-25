import { createFileRoute } from "@tanstack/react-router";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHeader, Reveal } from "@/components/site/Reveal";

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

function Videos() {
  const [active, setActive] = useState<Video | null>(null);

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

  return (
    <>
      <PageHeader eyebrow="Live in concert" title="The Bobby Diamond Show" />
    
      <section className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((v, i) => (
          <Reveal key={v.id} delay={(i % 3) * 100}>
            <button
              onClick={() => setActive(v)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-card/60 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-glow"
              aria-label={`Play ${v.title}`}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt={`${v.title} — live performance thumbnail`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/30 transition-colors group-hover:bg-background/10">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-glow transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-6 w-6 fill-primary-foreground text-primary-foreground" />
                  </span>
                </div>
              </div>
              <p className="p-4 font-[family-name:var(--font-display)] text-lg">{v.title}</p>
            </button>
          </Reveal>
        ))}
      </section>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm animate-rise"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-glow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3">
              <p className="font-[family-name:var(--font-display)] text-lg text-gold">{active.title}</p>
              <button onClick={() => setActive(null)} aria-label="Close video" className="rounded-full p-1 text-muted-foreground transition-colors hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="aspect-video">
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
