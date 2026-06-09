import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  Phone,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Menu,
  X,
  MapPin,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const NAV: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Destinations", to: "/destinations" },
  { label: "Services", to: "/services" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact", to: "/contact" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <TopBar />
      <MainNav />
      {children}
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <div className="hidden border-b border-border bg-[#f0eeea] text-xs text-foreground/70 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
        <div className="flex items-center gap-6">
          <a href="tel:+13056434771" className="flex items-center gap-2 transition-colors hover:text-gold">
            <Phone className="h-3.5 w-3.5" /> +1.305.643.4771
          </a>
          <a href="mailto:info@radoverseas.com" className="flex items-center gap-2 transition-colors hover:text-gold">
            <Mail className="h-3.5 w-3.5" /> info@radoverseas.com
          </a>
        </div>
        <SocialIcons size={14} />
      </div>
    </div>
  );
}

export function SocialIcons({ size = 16, tone = "muted" }: { size?: number; tone?: "muted" | "light" }) {
  const base = tone === "light" ? "text-white/70 hover:text-gold" : "text-foreground/60 hover:text-gold";
  const icons = [
    { Icon: Instagram, label: "Instagram" },
    { Icon: Facebook, label: "Facebook" },
    { Icon: Linkedin, label: "LinkedIn" },
    { Icon: Youtube, label: "YouTube" },
  ];
  return (
    <div className="flex items-center gap-4">
      {icons.map(({ Icon, label }) => (
        <a key={label} href="#" aria-label={label} className={`transition-colors ${base}`}>
          <Icon style={{ width: size, height: size }} />
        </a>
      ))}
    </div>
  );
}

function MainNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 border-b ${
        scrolled
          ? "border-border bg-white/95 shadow-sm backdrop-blur-md"
          : "border-border/60 bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="text-[11px] uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-foreground lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-white lg:hidden">
          <nav className="flex flex-col px-6 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="py-3 text-xs uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const primary = tone === "light" ? "text-white" : "text-foreground";
  return (
    <Link to="/" className="flex flex-col leading-none">
      <span className={`font-serif text-2xl tracking-[0.3em] ${primary}`}>RAD</span>
      <span className="mt-1 text-[9px] uppercase tracking-[0.4em] text-gold">Overseas Consultancy</span>
    </Link>
  );
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1a1a1a] px-6 pt-20 pb-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <OfficeBlock
            title="Miami Office"
            address="117 N.W. 42nd Ave., Suite CU #3, Miami, FL 33126"
            phone="+1 305-643-4771"
            email="info@radoverseas.com"
            hours={["Monday–Friday 9:00am–6:00pm", "Sat–Sun Closed"]}
          />
          <OfficeBlock
            title="India Office"
            address="Banjara Hills, Hyderabad, Telangana, India 500034"
            phone="+91 98765 43210"
            email="india@radoverseas.com"
            hours={["Monday–Friday 10:00am–7:00pm (IST)", "Sat–Sun Closed"]}
          />
          <ContactForm />
        </div>

        <div className="mt-16 border-t border-white/15 pt-10">
          <div className="flex flex-col items-center gap-6">
            <Logo tone="light" />
            <SocialIcons size={16} tone="light" />
            <p className="text-[11px] tracking-[0.2em] text-white/60">
              © 2024. RAD Overseas Consultancy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function OfficeBlock({
  title,
  address,
  phone,
  email,
  hours,
}: {
  title: string;
  address: string;
  phone: string;
  email: string;
  hours: string[];
}) {
  return (
    <div>
      <h4 className="text-xl font-semibold text-white">{title}</h4>
      <div className="mt-2 h-px w-10 bg-gold" />
      <ul className="mt-6 space-y-4 text-sm text-white/70">
        <li className="flex gap-3">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
          <span>{address}</span>
        </li>
        <li className="flex gap-3">
          <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-gold">{phone}</a>
        </li>
        <li className="flex gap-3">
          <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
          <a href={`mailto:${email}`} className="hover:text-gold">{email}</a>
        </li>
        <li className="flex gap-3">
          <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
          <span>
            {hours.map((h) => (
              <span key={h} className="block">{h}</span>
            ))}
          </span>
        </li>
      </ul>
    </div>
  );
}

function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message sent — we'll be in touch shortly.");
    }, 600);
  };

  return (
    <div>
      <h4 className="text-xl font-semibold text-white">Send Us a Message</h4>
      <div className="mt-2 h-px w-10 bg-gold" />
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          required
          type="text"
          placeholder="Name"
          className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-gold focus:outline-none"
        />
        <input
          required
          type="email"
          placeholder="Email"
          className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-gold focus:outline-none"
        />
        <textarea
          required
          placeholder="Message"
          rows={4}
          className="w-full resize-none border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full border border-gold bg-gold px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-gold-foreground transition-all duration-300 hover:bg-transparent hover:text-gold disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send"}
        </button>
      </form>
    </div>
  );
}

export function PageHero({ title, subtitle, image }: { title: string; subtitle?: string; image: string }) {
  return (
    <section className="relative h-[44vh] min-h-[320px] w-full overflow-hidden bg-black">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.45em] text-gold">RAD Overseas</p>
        <h1 className="mt-4 font-serif text-4xl font-light text-white sm:text-5xl md:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-sm tracking-wide text-white/80 sm:text-base">{subtitle}</p>
        )}
      </div>
    </section>
  );
}