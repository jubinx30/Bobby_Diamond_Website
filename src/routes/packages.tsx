import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wine,
  PartyPopper,
  Sparkles,
  Check,
  Volume2,
  Mic2,
  Disc3,
  Music,
  ArrowRight,
  Clock,
  HeartHandshake,
  Building2,
  Cake,
  CalendarHeart,
  ChevronRight,
  PhoneCall,
} from "lucide-react";
import events from "@/assets/events.jpg";
import { PageHeader, Reveal } from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PHONE, EMAIL } from "@/components/site/Layout";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Events & Packages — Bobby Diamond" },
      {
        name: "description",
        content:
          "Cocktail hours, The Party Package, and custom wedding & corporate entertainment across New England. Live vocals, percussion and over 1,200 classic songs.",
      },
      { property: "og:title", content: "Events & Packages — Bobby Diamond" },
      {
        property: "og:description",
        content:
          "Classy cocktail hours, live percussion shows, and the high-energy Party Package. Now booking your event.",
      },
    ],
  }),
  component: Packages,
});

const EVENT_PILLS = [
  "Weddings",
  "Rehearsal Dinners",
  "Anniversaries",
  "Milestone Birthdays",
  "Office & Christmas Parties",
  "Corporate Galas",
  "Class Reunions",
  "Country Clubs & Restaurants",
  "Outdoor & Waterfront Venues",
];

const PACKAGES = [
  {
    id: "cocktail-hours",
    title: "Cocktail Hours",
    tagline: "Classy & Cool",
    badge: "Intimate & Sophisticated",
    icon: Wine,
    duration: "Approx. 1.5 – 2 Hours",
    description:
      "Bobby sets the atmosphere as a solo artist with Soft Jazz, Easy Swing, and Cool Latin Rhythms for a truly unique ambiance. Never obtrusive and always apropos — the stylish alternative to the standard piano bar.",
    highlights: [
      "Soft Jazz, Great American Songbook & Bossa Nova",
      "Live vocals with subtle acoustic percussion accents",
      "Calibrated volume allowing effortless guest conversation",
      "Compact pro audio setup ideal for any venue footprint",
      "Customized background playlist during short intermissions",
    ],
    bestFor: "Cocktail receptions, art galas, rehearsal dinners, executive dinners",
    packageParam: "Cocktail Hours",
    isFeatured: false,
  },
  {
    id: "the-party-package",
    title: "The Party Package",
    tagline: "Most Popular · Live Show & Dance",
    badge: "Client Favorite",
    icon: PartyPopper,
    duration: "Approx. 3 – 4 Hours",
    description:
      "50's & 60's Rock & Roll, British Invasion, Motown, 70's Classic Rock, the Disco Era, the 80's, 90's & Country — all styles sung live, with dynamic percussion in Bobby's own original arrangements.",
    highlights: [
      "Tasteful mood music as your guests arrive & settle in",
      "Electrifying live vocal & percussion feature show",
      "Great high-energy dance music to keep the party going",
      "Geared toward guests 30 and older (beloved across all generations)",
      "Wireless mic access for your speeches, toasts & welcomes",
      "Seamless Master of Ceremonies introductions upon request",
    ],
    bestFor: "Weddings, milestone birthdays (40th-70th), anniversaries, corporate parties",
    packageParam: "The Party Package",
    isFeatured: true,
  },
  {
    id: "full-event-experience",
    title: "Custom / Full Gala",
    tagline: "The Complete Experience",
    badge: "Bespoke Production",
    icon: Sparkles,
    duration: "Full Evening (4 – 6+ Hours)",
    description:
      "From ceremony & cocktail hour through dinner serenade, the signature live show, and an open dance floor. Bobby coordinates every musical transition for a completely stress-free celebration.",
    highlights: [
      "Multi-stage entertainment (Cocktails + Dinner + Feature Show + Dance)",
      "Personalized setlist curation from 1,200+ song repertoire",
      "Full Master of Ceremonies hosting & timeline coordination",
      "Continuous music guarantee — zero downtime or awkward pauses",
      "Sound reinforcement customized for multi-room or indoor/outdoor flows",
    ],
    bestFor: "Full wedding days, annual charity galas, multi-segment corporate events",
    packageParam: "Custom / Full Event",
    isFeatured: false,
  },
];

const INCLUDED_BENEFITS = [
  {
    icon: Volume2,
    title: "Pro Audio & Self-Contained PA",
    desc: "State-of-the-art sound reinforcement tailored to room acoustics, from intimate garden tents to large ballrooms.",
  },
  {
    icon: Mic2,
    title: "Wireless Mics & Emcee Support",
    desc: "Handheld wireless microphones available for speeches, toasts, awards, and welcoming your guests.",
  },
  {
    icon: Disc3,
    title: "Continuous Music Guarantee",
    desc: "Curated music continues seamlessly during any short breaks, ensuring your room never goes silent.",
  },
  {
    icon: Music,
    title: "1,200+ Song Repertoire",
    desc: "Choose special requests and dedicate meaningful classics across seven decades of beloved music.",
  },
];

const EVENT_OCCASIONS = [
  {
    icon: CalendarHeart,
    title: "Weddings & Rehearsal Dinners",
    desc: "From romantic cocktail standards to an unforgettable reception dance party, Bobby brings timeless elegance and high-energy celebration that brings every generation together.",
  },
  {
    icon: Cake,
    title: "Milestone Birthdays & Anniversaries",
    desc: "Whether celebrating a 50th, 60th, 70th, or golden anniversary, relive the golden soundtrack of your life with Motown, Doo-Wop, Classic Rock, and heartfelt ballads.",
  },
  {
    icon: Building2,
    title: "Corporate Galas & Holiday Parties",
    desc: "Set the right tone for clients, executives, and team members. Bobby provides polished networking ambiance followed by an engaging show that gets colleagues celebrating.",
  },
  {
    icon: HeartHandshake,
    title: "Country Clubs, Restaurants & Private Venues",
    desc: "Compact, adaptable, and respectful of venue acoustics. Perfect for seasonal patio nights, member mixers, reunions, and waterfront celebrations indoors or outdoors.",
  },
];

const TIMELINE_STEPS = [
  {
    step: "01",
    title: "Guest Arrival & Welcome",
    time: "First 30–45 mins",
    desc: "Warm acoustic instrumental and gentle mood music sets an upscale, inviting tone as friends and family arrive.",
  },
  {
    step: "02",
    title: "Cocktail Hour & Dinner Sets",
    time: "Hour 1 to 2",
    desc: "Bobby performs Soft Jazz, Frank Sinatra, Nat King Cole, and Latin Bossa Nova at a conversational volume.",
  },
  {
    step: "03",
    title: "The Live Showcase",
    time: "Main Event",
    desc: "Energy rises as Bobby commands the stage with signature live vocals, percussion, and crowd-engaging classics.",
  },
  {
    step: "04",
    title: "The Dance Celebration",
    time: "Party Finale",
    desc: "Motown, 70's Disco, British Invasion, and 80's rock classics keep guests on their feet and the dance floor packed.",
  },
];

const FAQS = [
  {
    q: "Does Bobby bring his own sound and lighting equipment?",
    a: "Yes. Bobby provides a fully self-contained, high-fidelity sound system capable of handling intimate dining rooms up to large hotel ballrooms. All that is required from the venue is a standard 120V electrical outlet and a clean performance area.",
  },
  {
    q: "Can we request specific songs from Bobby's repertoire?",
    a: "Absolutely! Bobby Diamond has one of the largest active live repertoires in New England with over 1,200 songs. You can browse the online Song Finder by title, artist, or genre to compile your personal must-play list and dedications.",
  },
  {
    q: "How does Bobby handle sound volume during dinner and conversation?",
    a: "Bobby takes great pride in volume discipline. During cocktail and dining hours, music is strictly kept at an apropos conversational level so guests can converse comfortably without shouting. Volume and energy are only elevated when it's time for dancing.",
  },
  {
    q: "Can Bobby perform outdoors or in tented venues?",
    a: "Yes! Bobby frequently performs on private lawns, coastal patios, and tented outdoor receptions throughout New England. All outdoor setups require adequate overhead weather cover and safe electrical access.",
  },
  {
    q: "Does Bobby travel outside of Massachusetts and New England?",
    a: "Yes. While primarily based in New England, Bobby has performed sold-out concerts and private engagements across the United States and Canada. Travel arrangements can be tailored to your destination.",
  },
  {
    q: "Can Bobby act as Master of Ceremonies (Emcee) for our event?",
    a: "Yes. Bobby is an experienced entertainer and can announce bridal parties, introduce speakers, host awards, and provide wireless handheld microphones for your guest toasts.",
  },
];

function Packages() {
  return (
    <>
      <PageHeader
        eyebrow="Talent, Quality & Diversity"
        title="Events & Packages"
      >
        From intimate cocktail hours with soft jazz & Latin swing to standing-room-only dance parties —
        tailored live entertainment for New England's premier celebrations.
      </PageHeader>

      {/* Main Packages Section */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {PACKAGES.map((pkg, idx) => {
            const Icon = pkg.icon;
            return (
              <Reveal key={pkg.id} delay={idx * 120} className="h-full">
                <article
                  className={`relative flex h-full flex-col justify-between rounded-3xl border bg-card/80 p-8 transition-all duration-500 hover:-translate-y-1.5 ${
                    pkg.isFeatured
                      ? "border-primary/80 shadow-glow bg-gradient-to-b from-card to-card/95 ring-1 ring-primary/40"
                      : "border-border hover:border-primary/50 hover:shadow-lg"
                  }`}
                >
                  {pkg.isFeatured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md">
                      {pkg.badge}
                    </div>
                  )}

                  <div>
                    {/* Header info */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 text-primary" />
                        {pkg.duration}
                      </span>
                    </div>

                    <h2 className="mt-5 text-3xl font-bold">{pkg.title}</h2>
                    <p className="mt-1 text-accent font-[family-name:var(--font-script)] text-2xl">
                      {pkg.tagline}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {pkg.description}
                    </p>

                    {/* Features checklist */}
                    <div className="mt-6 border-t border-border/70 pt-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        What's Included:
                      </p>
                      <ul className="mt-3 space-y-2.5 text-sm text-foreground/90">
                        {pkg.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ideal for note */}
                    <div className="mt-6 rounded-2xl border border-border/50 bg-secondary/30 p-3.5 text-xs text-muted-foreground">
                      <strong className="text-foreground">Ideal for: </strong>
                      {pkg.bestFor}
                    </div>
                  </div>

                  {/* Package CTA */}
                  <div className="mt-8 pt-4">
                    <Link
                      to="/contact"
                      search={{ package: pkg.packageParam, type: pkg.packageParam }}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all duration-300 ${
                        pkg.isFeatured
                          ? "bg-gold text-primary-foreground shadow-glow hover:scale-[1.02]"
                          : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      Inquire About {pkg.title}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Included with Every Booking Trust Grid */}
      <section className="mx-auto mt-24 max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Professional Standards
          </p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Included With Every Performance
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Bobby provides full-service musical entertainment, so you and your guests can simply relax and enjoy the moment.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUDED_BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-border bg-card/60 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-glow">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg text-foreground">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {b.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Tailored For Your Event Showcase */}
      <section className="mx-auto mt-28 max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Image with overlay badge */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
                <img
                  src={events}
                  alt="Bobby Diamond performing live at restaurants, dinner parties, weddings and office parties"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-primary/30 bg-slate-900/90 p-4 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-wider text-primary font-semibold">
                    New England & Beyond
                  </p>
                  <p className="text-sm font-medium text-slate-200">
                    Captivating audiences at private venues, country clubs & grand ballrooms for over 30 years.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Event Occasion Cards */}
          <div className="lg:col-span-7 space-y-4">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Tailored Repertoire
              </p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                Customized for Every Occasion
              </h2>
              <p className="mt-2 text-muted-foreground">
                No two events are alike. Bobby works directly with you to craft a customized musical program suited to your guests' age groups and musical tastes.
              </p>
            </Reveal>

            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              {EVENT_OCCASIONS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={idx * 80}>
                    <div className="rounded-2xl border border-border bg-card/60 p-5 transition-all duration-300 hover:border-primary/40">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-base font-bold text-foreground">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        {/* Event tags pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {EVENT_PILLS.map((e, i) => (
            <Reveal key={e} delay={i * 40}>
              <span className="inline-block rounded-full border border-border bg-secondary/80 px-4 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-primary hover:text-primary">
                {e}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How the Evening Unfolds Timeline */}
      <section className="mx-auto mt-28 max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Event Flow
          </p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            How The Evening Unfolds
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            A seamless musical progression that matches the energy and mood of your celebration from start to finish.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINE_STEPS.map((t, idx) => (
            <Reveal key={t.step} delay={idx * 100}>
              <div className="relative h-full rounded-2xl border border-border bg-card/70 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-glow">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-gold">
                    {t.step}
                  </span>
                  <span className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-[11px] text-muted-foreground">
                    {t.time}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">{t.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {t.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="mx-auto mt-28 max-w-4xl px-6">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Booking Details
          </p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Have questions about logistics, equipment, or booking? Here are the most common questions from clients.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-10 rounded-3xl border border-border bg-card/70 p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/60">
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="mx-auto mt-28 max-w-5xl px-6 pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-tr from-card via-card/90 to-primary/10 p-8 md:p-14 text-center shadow-2xl">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl pointer-events-none" />

            <div className="relative">
              <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                Dates Fill Months in Advance
              </span>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl md:text-5xl">
                Ready to make your event unforgettable?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                Get in touch with Bobby to check date availability, discuss special song requests, and receive a tailored quote for your event.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
                >
                  Check Availability & Pricing
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/songs"
                  search={{ q: "", field: "all" }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Music className="h-4 w-4 text-primary" />
                  Browse 1,200+ Song Repertoire
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground border-t border-border/60 pt-6">
                <span>Or reach out directly:</span>
                <a href={`tel:${PHONE}`} className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors">
                  <PhoneCall className="h-3.5 w-3.5 text-primary" />
                  {PHONE}
                </a>
                <span>·</span>
                <a href={`mailto:${EMAIL}`} className="text-foreground hover:text-primary transition-colors">
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}