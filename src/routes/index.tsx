import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mic2,
  Music,
  PartyPopper,
  ArrowRight,
  Search,
  Target,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import bobbyHero from "@/assets/bobby-hero.png";
import { Reveal, Stars } from "@/components/site/Reveal";
import { SONGS } from "@/lib/songs";

const TICKER_ITEMS = [
  "Weddings",
  "Corporate Galas",
  "Conventions",
  "Cocktail Hours",
  "Milestone Birthdays",
  "Master of Ceremonies",
  "Live Percussion",
  "Private Celebrations",
  "1,200+ Song Repertoire",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bobby Diamond — Vocalist, Percussionist & Entertainer" },
      { name: "description", content: "Book Bobby Diamond for weddings, cocktail hours, birthdays and corporate events. Over 1,200 songs in his repertoire." },
      { property: "og:title", content: "Bobby Diamond — Vocalist & Entertainer" },
      { property: "og:description", content: "Standing-room-only performances across the States and Canada. Now booking your event." },
    ],
  }),
  component: Index,
});

function Index() {
  const [songQuery, setSongQuery] = useState("");
  const navigate = useNavigate();

  const handleSongSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = songQuery.trim();
    navigate({
      to: "/songs",
      search: {
        q: query,
        field: "all",
        page: 1,
      },
    });
  };

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-12">
        <Stars />
        {/* Ambient glows */}
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-primary/15 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-primary/10 blur-[140px] pointer-events-none" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12">
          {/* Left Column: Headline, Copy, Action Buttons, Trust Highlights */}
          <div className="lg:col-span-7">
            {/* Tagline / Brand Badge */}
            

            {/* Main Headline with italic styling */}
            <h1 className="animate-rise mt-5 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl leading-[1.06]" style={{ animationDelay: "180ms" }}>
              Transforming <br />
              Celebrations <br />
              into <span className="font-[family-name:var(--font-display)] italic font-normal text-gold">Unforgettable Magic</span>
            </h1>

            {/* Description paragraph */}
            <p className="animate-rise mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300/90" style={{ animationDelay: "280ms" }}>
              At Bobby Diamond Entertainment, we connect audiences with standing-room-only live vocals, dynamic percussion, and masterful event hosting throughout New England and beyond. With an extensive repertoire spanning over 1,200 classics and modern hits, we ensure every wedding, corporate party, and gala is an extraordinary success.
            </p>

            {/* Action Buttons & Song Finder Search */}
            <div className="animate-rise mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4" style={{ animationDelay: "380ms" }}>
              <Link
                to="/contact"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
              >
                Schedule a consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <form
                onSubmit={handleSongSearch}
                className="group relative w-full sm:w-72 md:w-80"
              >
                {/* Faint golden glow behind borders */}
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 blur-[6px] opacity-70 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={songQuery}
                    onChange={(e) => setSongQuery(e.target.value)}
                    placeholder="Search 1200+ songs from my repertoire..."
                    aria-label="Search song repertoire"
                    className="w-full rounded-full border border-primary/40 bg-slate-950/80 pl-5 pr-12 py-3.5 text-sm text-slate-200 placeholder:text-slate-400/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/60 focus:border-gold focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-gold/60 shadow-[0_0_12px_oklch(0.82_0.13_85/0.12)]"
                  />
                  <button
                    type="submit"
                    aria-label="Search songs"
                    className="absolute right-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-gold/60 active:scale-95"
                  >
                    <Search className="h-4 w-4 stroke-[2.5]" />
                  </button>
                </div>
              </form>
            </div>

            {/* Trust / Capability Badges */}
            <div className="animate-rise mt-10 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300" style={{ animationDelay: "480ms" }}>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                  <Target className="h-3.5 w-3.5" />
                </div>
                <span>Expert Event Guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <span>1,200+ Song Repertoire</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <span>Trusted Nationwide Performer</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero PNG Image with softened edges and fade effect */}
          <div className="animate-rise lg:col-span-5 relative flex items-center justify-center" style={{ animationDelay: "220ms" }}>
            {/* Ambient warm glow behind the figure */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />

            {/* Faded image container: dissolves bottom cutoff line & softens outer cutout edges */}
            <div className="relative z-10 w-full max-w-lg lg:max-w-none hero-bottom-fade">
              <img
                src={bobbyHero}
                alt="Bobby Diamond singing with a microphone"
                className="w-full h-auto object-contain select-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>

        {/* Bottom Marquee Ticker Bar matching reference screenshot */}
        <div className="mt-16 w-full border-y border-slate-800/80 bg-slate-950/70 py-4 overflow-hidden backdrop-blur-sm">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                <span>{item}</span>
                <span className="text-primary">♦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <Reveal>
          <p className="text-2xl leading-relaxed md:text-3xl font-[family-name:var(--font-display)] italic">
            “From the moment Bobby walked on stage he was an instant hit. His charm and wit won the audience over immediately… Everyone could sense the magic that was about to happen.”
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.25em] text-primary">Ross Martin · Syndicated Columnist</p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        {[
          { icon: Music, n: `${SONGS.length.toLocaleString()}+`, t: "Songs in the repertoire", to: "/songs" as const },
          { icon: PartyPopper, n: "Every", t: "Wedding, birthday & office party", to: "/packages" as const },
          { icon: Mic2, n: "Live", t: "Vocals & Percussion", to: "/videos" as const },
        ].map((c, i) => (
          <Reveal key={c.t} delay={i * 120}>
            <Link to={c.to} className="group block rounded-2xl border border-border bg-card/60 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary hover:shadow-glow">
              <c.icon className="h-8 w-8 text-primary transition-transform duration-500 group-hover:rotate-12" />
              <p className="mt-6 text-5xl font-[family-name:var(--font-display)] text-gold">{c.n}</p>
              <p className="mt-2 text-muted-foreground">{c.t}</p>
            </Link>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-6 mt-24 mb-12 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl">Standing room only.</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            For once the critics are all in agreement about this New England based talented and dynamic entertainer. Bobby has been captivating audiences in major showrooms throughout the country — with sold-out performances across the States and Canada, he'll leave you on your feet.
          </p>
          <Link to="/contact" className="mt-10 inline-block rounded-full bg-gold px-8 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105">Book Bobby for your event</Link>
        </Reveal>
      </section>
    </>
  );
}
