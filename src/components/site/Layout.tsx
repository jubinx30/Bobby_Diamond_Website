import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Mail, ArrowUpRight } from "lucide-react";

export const PHONE = "508-285-4191";
export const EMAIL = "bobby@bobbydiamond.com";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/songs", label: "Song Finder" },
  { to: "/packages", label: "Events & Packages" },
  { to: "/videos", label: "Videos" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "bg-background/90 backdrop-blur-md border-b border-border" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-[family-name:var(--font-display)] text-2xl tracking-wide"><span className="text-gold">Bobby Diamond</span></Link>
        <nav className="hidden gap-8 md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/", includeSearch: false }} className="relative text-sm uppercase tracking-[0.18em] text-white transition-colors hover:text-primary data-[status=active]:text-primary after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full data-[status=active]:after:w-full">{n.label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-6 lg:flex">
          <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-primary transition-colors">
            <Phone className="h-3.5 w-3.5 text-primary" />
            <span>+1 {PHONE}</span>
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105"
          >
            <span>Contact us</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="animate-rise flex flex-col gap-1 px-6 pb-6 md:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: n.to === "/", includeSearch: false }} className="py-3 text-lg font-[family-name:var(--font-display)] text-white border-b border-border data-[status=active]:text-primary">{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl text-gold">Bobby Diamond</p>
          <p className="mt-2 text-sm text-muted-foreground">Vocalist · Percussionist · Entertainer · Master of Ceremonies. New England based.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a href={`tel:${PHONE}`} className="flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4 text-primary" />{PHONE}</a>
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-primary"><Mail className="h-4 w-4 text-primary" />{EMAIL}</a>
        </div>
        <p className="text-sm text-muted-foreground md:text-right">© {new Date().getFullYear()} Bobby Diamond. All rights reserved.</p>
      </div>
    </footer>
  );
}
