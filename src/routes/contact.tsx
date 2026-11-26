import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useState } from "react";
import { Phone, Mail, CalendarHeart, Clock, Music2, Sparkles, MapPin } from "lucide-react";
import { PageHeader, Reveal } from "@/components/site/Reveal";
import { EMAIL, PHONE } from "@/components/site/Layout";

const searchSchema = z.object({
  type: fallback(z.string(), "").default(""),
  package: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/contact")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Book Bobby Diamond — Contact" },
      { name: "description", content: "Call or email Bobby Diamond to book live entertainment for your wedding, party or corporate event." },
      { property: "og:title", content: "Book Bobby Diamond" },
      { property: "og:description", content: "Get in touch to check availability for your event." },
    ],
  }),
  component: Contact,
});

const EVENT_TYPES = [
  "The Party Package",
  "Cocktail Hours",
  "Custom / Full Event",
  "Wedding",
  "Cocktail Hour",
  "Birthday",
  "Anniversary",
  "Office / Christmas Party",
  "Corporate Event",
  "Reunion",
  "Other",
];

function Contact() {
  const search = Route.useSearch();
  const initialType = search.type || search.package || "";

  const [form, setForm] = useState({
    name: "",
    date: "",
    type: initialType,
    message: search.package ? `Hi Bobby, I would like to check your availability for "${search.package}".` : "",
  });

  const body = `Name: ${form.name}\nEvent date: ${form.date}\nEvent type / Package: ${form.type}\n\n${form.message}`;
  const field = "w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary";

  return (
    <>
      <PageHeader eyebrow="Let's make it magic" title="Book Bobby">
        If you have any questions, call or e‑mail — Bobby will get right back to you.
      </PageHeader>
      <section className="mx-auto grid max-w-5xl gap-8 px-6 md:grid-cols-5">
        <Reveal className="md:col-span-2 space-y-4">
          <a href={`tel:${PHONE}`} className="flex items-center gap-4 rounded-2xl border border-border bg-card/70 p-6 transition-all hover:border-primary hover:shadow-glow">
            <Phone className="h-6 w-6 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Call</p>
              <p className="text-lg">{PHONE}</p>
            </div>
          </a>
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 rounded-2xl border border-border bg-card/70 p-6 transition-all hover:border-primary hover:shadow-glow">
            <Mail className="h-6 w-6 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">E‑mail</p>
              <p className="text-lg break-all">{EMAIL}</p>
            </div>
          </a>
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/70 p-6">
            <CalendarHeart className="h-6 w-6 text-accent" />
            <p className="text-sm text-muted-foreground">Public & private events throughout New England and beyond.</p>
          </div>
        </Reveal>
        <Reveal delay={150} className="md:col-span-3">
          <form
            className="space-y-4 rounded-3xl border border-border bg-card/70 p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Booking inquiry: " + (form.type || "event"))}&body=${encodeURIComponent(body)}`;
            }}
          >
            <h2 className="text-3xl">Event inquiry</h2>
            <input
              required
              placeholder="Your name"
              className={field}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="date"
                className={field}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              <select
                className={field}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="">Event type / Package</option>
                {EVENT_TYPES.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
                {initialType && !EVENT_TYPES.includes(initialType) && (
                  <option value={initialType}>{initialType}</option>
                )}
              </select>
            </div>
            <textarea
              rows={4}
              placeholder="Tell Bobby about your event, location, venue and favorite songs…"
              className={field}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button className="w-full rounded-xl bg-gold py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">
              Send inquiry
            </button>
          </form>
        </Reveal>
      </section>

      {/* Booking Details & What to Expect */}
      <section className="mx-auto mt-16 max-w-5xl px-6">
        <Reveal>
          <div className="rounded-3xl border border-border/70 bg-card/50 p-8 sm:p-10 md:p-12 backdrop-blur-sm">
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-[family-name:var(--font-script)] text-2xl sm:text-3xl text-accent">
                Peace of Mind
              </span>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground sm:text-3xl">
                What to expect when you book
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Whether planning an intimate private gathering or a grand ballroom gala, booking live entertainment should be straightforward, personal, and stress-free.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/60 bg-card/60 p-6 transition-colors hover:border-primary/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <h4 className="mt-4 font-semibold text-foreground">Direct & Fast Response</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Bobby handles each inquiry personally. Expect a prompt response within 24 to 48 hours to confirm availability and discuss details.
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/60 p-6 transition-colors hover:border-primary/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Music2 className="h-5 w-5" />
                </div>
                <h4 className="mt-4 font-semibold text-foreground">Tailored Repertoire</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Select your favorites from Bobby's 1,200+ song library, or let him curate the musical flow from cocktail hour through the grand finale.
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/60 p-6 transition-colors hover:border-primary/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h4 className="mt-4 font-semibold text-foreground">Complete Audio & Setup</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Professional sound equipment, wireless mics, and live percussion provided — tailored seamlessly to any indoor or outdoor venue.
                </p>
              </div>
            </div>

            {/* Service Footnote */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-center text-xs text-muted-foreground sm:flex-row sm:text-left sm:text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span>Serving Massachusetts, Rhode Island, Connecticut, New England, and events nationwide.</span>
              </div>
              <p className="text-slate-400">
                Need an immediate answer? Call <a href={`tel:${PHONE}`} className="font-medium text-primary hover:underline">{PHONE}</a>
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
