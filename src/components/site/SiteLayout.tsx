import { Link, NavLink, useLocation } from "react-router-dom";
import { JSX, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Phone, Mail, Menu, X, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import { Office } from "@/sanity/queries";

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
  const s = useSiteSettings();
  return (
    <div className="hidden h-10 border-b border-primary/20 bg-primary text-xs text-primary-foreground md:block">
      <div className="mx-auto flex h-full max-w-full px-10 md:px-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${s?.primaryPhone?.replace(/\s/g, "") || "+13056434771"}`}
            className="flex items-center gap-2 transition-colors hover:text-white/80"
          >
            <Phone className="h-3.5 w-3.5" /> {s?.primaryPhone || "+1.305.643.4771"}
          </a>
          <a
            href={`mailto:${s?.primaryEmail || "info@radoverseas.com"}`}
            className="flex items-center gap-2 transition-colors hover:text-white/80"
          >
            <Mail className="h-3.5 w-3.5" /> {s?.primaryEmail || "info@radoverseas.com"}
          </a>
        </div>
        <SocialIcons size={14} />
      </div>
    </div>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="32" height="32" rx="6" fill="#000" />
      <path
        d="M19.798 9h2.681l-5.858 6.694L24 24.5h-5.396l-4.226-5.526L9.582 24.5H6.899l6.266-7.161L7.5 9h5.533l3.82 5.052L19.798 9zm-.941 13.924h1.486L12.58 10.506h-1.595l7.872 12.418z"
        fill="#fff"
      />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="32" height="32" rx="6" fill="#3A559F" />
      <path
        d="M26.8,15.4C26.6,15.2,26.3,15,26,15h-5v-3.8c0-0.1,0.1-0.2,0.2-0.2H25c0.6,0,1-0.4,1-1V7c0-0.6-0.4-1-1-1h-4 c-3.3,0-5,2.7-5,6v3h-4c-0.6,0-1,0.4-1,1v3c0,0.6,0.4,1,1,1h4v12h5V20h3c0.4,0,0.8-0.2,0.9-0.6l2-3C27.1,16.1,27,15.7,26.8,15.4z"
        fill="#fff"
      />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="32" height="32" rx="6" fill="#0097D3" />
      <path
        d="M12,25c0,0.6-0.4,1-1,1H7c-0.6,0-1-0.4-1-1V13c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V25z M9,11c-1.7,0-3-1.3-3-3 s1.3-3,3-3s3,1.3,3,3S10.7,11,9,11z M26,25c0,0.6-0.4,1-1,1h-3c-0.6,0-1-0.4-1-1v-3.5v-1v-2c0-0.8-0.7-1.5-1.5-1.5S18,17.7,18,18.5 v2v1V25c0,0.6-0.4,1-1,1h-3c-0.6,0-1-0.4-1-1V13c0-0.6,0.4-1,1-1h4c0.3,0,0.5,0.1,0.7,0.3c0.6-0.2,1.2-0.3,1.8-0.3 c3,0,5.5,2.5,5.5,5.5V25z"
        fill="#fff"
      />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_87_7153)" />
      <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)" />
      <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)" />
      <path
        d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z"
        fill="white"
      />
      <defs>
        <radialGradient
          id="paint0_radial_87_7153"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)"
        >
          <stop stopColor="#B13589" />
          <stop offset="0.79309" stopColor="#C62F94" />
          <stop offset="1" stopColor="#8A3AC8" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_87_7153"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)"
        >
          <stop stopColor="#E0E8B7" />
          <stop offset="0.444662" stopColor="#FB8A2E" />
          <stop offset="0.71474" stopColor="#E2425C" />
          <stop offset="1" stopColor="#E2425C" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_87_7153"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)"
        >
          <stop offset="0.156701" stopColor="#406ADC" />
          <stop offset="0.467799" stopColor="#6A45BE" />
          <stop offset="1" stopColor="#6A45BE" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const SOCIAL_ICON_MAP: Record<string, (props: React.SVGProps<SVGSVGElement>) => JSX.Element> = {
  twitter: TwitterIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
};

export function SocialIcons({
  size = 16,
  tone = "muted",
}: {
  size?: number;
  tone?: "muted" | "light";
}) {
  const s = useSiteSettings();
  const base =
    tone === "light" ? "text-white/70 hover:text-primary" : "text-foreground/60 hover:text-primary";
  const links = s?.socialLinks || [];

  if (links.length === 0) {
    const defaults = [
      { platform: "twitter", url: "#", label: "Twitter" },
      { platform: "facebook", url: "#", label: "Facebook" },
      { platform: "linkedin", url: "#", label: "LinkedIn" },
      { platform: "instagram", url: "#", label: "Instagram" },
    ];
    return (
      <div className="flex items-center gap-4">
        {defaults.map(({ platform, url, label }) => {
          const Icon = SOCIAL_ICON_MAP[platform];
          if (!Icon) return null;
          return (
            <a key={platform} href={url} aria-label={label} className={`transition-colors ${base}`}>
              <Icon style={{ width: size, height: size }} />
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {links.map((link) => {
        const Icon = SOCIAL_ICON_MAP[link.platform];
        if (!Icon) return null;
        return (
          <a
            key={link.platform}
            href={link.url}
            aria-label={link.platform}
            className={`transition-colors ${base}`}
          >
            <Icon style={{ width: size, height: size }} />
          </a>
        );
      })}
    </div>
  );
}

function MainNav() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${
        isHome ? "fixed" : "sticky"
      } top-0 z-50 w-full h-16 transition-[color,box-shadow] duration-500 ${
        transparent
          ? "bg-transparent top-6 md:top-14"
          : scrolled
            ? "bg-white/95 shadow-sm backdrop-blur-md"
            : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-full max-w-full px-10 md:px-16 items-center justify-between">
        <Logo tone={transparent ? "light" : "dark"} />
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `text-[11px] uppercase tracking-[0.22em] transition-colors hover:text-primary ${
                  transparent ? "text-white/80" : "text-foreground/80"
                } ${isActive ? "text-primary" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden transition-colors ${transparent ? "text-white" : "text-foreground"}`}
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
                className="py-3 text-xs uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-primary"
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
  const s = useSiteSettings();
  const logoSrc =
    tone === "light" ? s?.companyLogoLight || "/logo-light.png" : s?.companyLogoDark || "/logo.png";
  const name = s?.companyName || "Av Edu Overseas Consultancy";
  const tagline = s?.logoTagline || "Overseas Consultancy";
  return (
    <Link to="/" className="flex flex-col leading-none items-start">
      <img src={logoSrc} alt={name} className="h-5 w-auto object-contain" />
      <span
        className={`mt-1 text-[9px] uppercase tracking-[0.4em] ${tone === "light" ? "text-white/60" : "text-primary"}`}
      >
        {tagline}
      </span>
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
  const s = useSiteSettings();
  const name = s?.companyName || "Av Edu Overseas Consultancy";
  const offices = s?.offices || [];
  const fallbackOffices: Office[] = [
    {
      officeTitle: "India Office",
      isMainBranch: true,
      officeAddress: "Banjara Hills, Hyderabad, Telangana, India 500034",
      officePhone: "+91 98765 43210",
      officeEmail: "india@radoverseas.com",
      officeHours: ["Monday–Friday 10:00am–7:00pm (IST)", "Sat–Sun Closed"],
    },
  ];
  const mainBranch = offices.find((o) => o.isMainBranch) || offices[0] || fallbackOffices[0];

  return (
    <footer className="bg-black text-white">
      <div className="pi-section pb-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <Logo tone="light" />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {s?.footerDescription ||
                "A trusted boutique consultancy guiding students and professionals through overseas education and immigration journeys since 2012."}
            </p>
            <div className="mt-6">
              <SocialIcons size={16} tone="light" />
            </div>
            <p className="mt-6 text-[11px] tracking-[0.2em] text-white/60">
              {s?.copyrightText || `© 2024. ${name}. All rights reserved.`}
            </p>
            <p className="mt-2 text-[11px] tracking-[0.2em] text-white/60">
              <a href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span className="mx-2">|</span>
              <a href="/terms-and-conditions" className="hover:text-white transition-colors">
                Terms &amp; Conditions
              </a>
            </p>
          </div>
          <OfficeBlock
            key={mainBranch.officeTitle}
            title={mainBranch.officeTitle}
            address={mainBranch.officeAddress}
            phone={mainBranch.officePhone}
            email={mainBranch.officeEmail}
            hours={mainBranch.officeHours || []}
          />
          <ContactForm />
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
  phone?: string;
  email?: string;
  hours: string[];
}) {
  return (
    <div>
      <h4 className="text-xl font-semibold text-white">{title}</h4>
      <div className="mt-2 h-px w-10 bg-primary" />
      <ul className="mt-6 space-y-4 text-sm text-white/70">
        <li className="flex gap-3">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/60" />
          <span>{address}</span>
        </li>
        {phone && (
          <li className="flex gap-3">
            <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/60" />
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-white/80">
              {phone}
            </a>
          </li>
        )}
        {email && (
          <li className="flex gap-3">
            <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/60" />
            <a href={`mailto:${email}`} className="hover:text-white/80">
              {email}
            </a>
          </li>
        )}
        {hours.length > 0 && (
          <li className="flex gap-3">
            <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/60" />
            <span>
              {hours.map((h) => (
                <span key={h} className="block">
                  {h}
                </span>
              ))}
            </span>
          </li>
        )}
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
      <div className="mt-2 h-px w-10 bg-primary" />
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            required
            type="text"
            placeholder="Name"
            className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-primary focus:outline-none"
          />
          <input
            required
            type="email"
            placeholder="Email"
            className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-primary focus:outline-none"
          />
        </div>
        <textarea
          required
          placeholder="Message"
          rows={2}
          className="w-full resize-none border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full border border-primary bg-primary px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send"}
        </button>
      </form>
    </div>
  );
}

export function PageHero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) {
  const s = useSiteSettings();
  return (
    <section className="relative h-[44vh] min-h-[320px] w-full overflow-hidden bg-black">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.45em] text-white/60">
          {s?.companyName || "Av Edu Overseas Consultancy"}
        </p>
        <h1 className="mt-4 font-serif text-4xl font-light text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-sm tracking-wide text-white/80 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
