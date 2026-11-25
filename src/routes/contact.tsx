import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useState } from "react";
import { Phone, Mail, CalendarHeart } from "lucide-react";
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
    </>
  );
}
