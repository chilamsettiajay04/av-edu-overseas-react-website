import { Link, NavLink, useLocation } from "react-router-dom";
import { JSX, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Phone, Mail, Menu, X, MapPin, Clock, ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import { submitToSheet } from "@/lib/sheetSubmit";
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
      <ScrollToTop />
      <Footer />
    </div>
  );
}

function TopBar() {
  const s = useSiteSettings();
  return (
    <div className="h-10 border-b border-primary/20 bg-primary text-xs text-primary-foreground">
      <div className="mx-auto flex h-full max-w-full items-center justify-between px-4 md:px-16">
        <div className="flex items-center gap-4 md:gap-6">
          <a
            href={`tel:${s?.primaryPhone?.replace(/\s/g, "") || "+13056434771"}`}
            className="text-xs md:text-sm flex items-center gap-1 md:gap-2 transition-colors hover:text-white/80"
          >
            <Phone className="h-3 w-3 md:h-4 md:w-4" />{" "}
            <span>{s?.primaryPhone || "+1.305.643.4771"}</span>
          </a>
          <a
            href={`mailto:${s?.primaryEmail || "info@radoverseas.com"}`}
            className="text-xs md:text-sm flex items-center gap-1 md:gap-2 transition-colors hover:text-white/80"
          >
            <Mail className="h-3 w-3 md:h-4 md:w-4" />{" "}
            <span>{s?.primaryEmail || "info@radoverseas.com"}</span>
          </a>
        </div>
        <div className="hidden md:block">
          <SocialIcons size={18} />
        </div>
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
    <svg
      viewBox="0 0 3364.7 3364.7"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      {...props}
      style={{ background: "#c13584", borderRadius: "15%", ...(props.style ?? {}) }}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <defs>
          <radialGradient
            id="0"
            cx="217.76"
            cy="3290.99"
            r="4271.92"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".09" stopColor="#fa8f21"></stop>
            <stop offset=".78" stopColor="#d82d7e"></stop>
          </radialGradient>
          <radialGradient
            id="1"
            cx="2330.61"
            cy="3182.95"
            r="3759.33"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".64" stopColor="#8c3aaa" stopOpacity="0"></stop>
            <stop offset="1" stopColor="#8c3aaa"></stop>
          </radialGradient>
        </defs>

        {/* Fallback solid bg rect in case radialGradient fails to render */}
        <rect width="3364.7" height="3364.7" rx="504" fill="#c13584" />

        <path
          d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9"
          fill="url(#0)"
        ></path>

        <path
          d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9"
          fill="url(#1)"
        ></path>

        <path
          d="M1269.25,1689.52c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7-416.6-186.59-416.6-416.7m-225.26,0c0,354.5,287.36,641.86,641.86,641.86s641.86-287.36,641.86-641.86-287.36-641.86-641.86-641.86S1044,1335,1044,1689.52m1159.13-667.31a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M1180.85,2707c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27S2059.13,666,2191,672c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M1170.5,447.09c-133.07,6.06-224,27.16-303.41,58.06-82.19,31.91-151.86,74.72-221.43,144.18S533.39,788.47,501.48,870.76c-30.9,79.46-52,170.34-58.06,303.41-6.16,133.28-7.57,175.89-7.57,515.35s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43s139.14,112.18,221.43,144.18c79.56,30.9,170.34,52,303.41,58.06,133.35,6.06,175.89,7.57,515.35,7.57s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2586.8,537.06,2504.71,505.15c-79.56-30.9-170.44-52.1-303.41-58.06C2068,441,2025.41,439.52,1686,439.52s-382.1,1.41-515.45,7.57"
          fill="#ffffff"
        ></path>
      </g>
    </svg>
  );
}

function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="32" height="32" rx="6" fill="#D8362A" />
      <path
        d="M24.2 11.3c-.4-1.3-1.4-2.3-2.6-2.7C20 8 16 8 16 8s-4 0-5.6.6c-1.2.4-2.2 1.4-2.6 2.7C7 13 7 16 7 16s0 3 .4 4.7c.4 1.3 1.4 2.3 2.6 2.7C12 24 16 24 16 24s4 0 5.6-.6c1.2-.4 2.2-1.4 2.6-2.7.4-1.7.4-4.7.4-4.7s0-3-.4-4.7z"
        fill="#fff"
      />
      <polygon points="14,12.5 14,19.5 20.5,16" fill="#D8362A" />
    </svg>
  );
}

const SOCIAL_ICON_MAP: Record<string, (props: React.SVGProps<SVGSVGElement>) => JSX.Element> = {
  twitter: TwitterIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
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

  const isValid = (url?: string) => url && url !== "#" && url.trim() !== "";

  const filtered = links.filter((l) => isValid(l.url));

  if (filtered.length === 0) return null;

  return (
    <div className="flex items-center gap-4">
      {filtered.map((link) => {
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
      } top-0 z-50 w-full h-16 transition-[color,box-shadow,background-color] duration-500 ${
        transparent
          ? open ? "bg-white top-10" : "bg-transparent top-14"
          : scrolled
            ? "bg-white/95 shadow-sm backdrop-blur-md"
            : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-full max-w-full px-10 md:px-16 items-center justify-between">
        <Logo tone={transparent && !open ? "light" : "dark"} />
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `text-[11px] uppercase tracking-[0.22em] transition-colors hover:text-primary ${
                  transparent && !open ? "text-white/80" : "text-foreground/80"
                } ${isActive ? "text-primary" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          aria-label="Toggle menu"
          onClick={() => {
            setOpen((v) => !v);
            if (!open) window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`lg:hidden transition-colors ${transparent && !open ? "text-white" : "text-foreground"}`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-white lg:hidden">
          <nav className="flex flex-col px-6 py-4">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `py-3 text-xs uppercase tracking-[0.22em] transition-colors hover:text-primary ${
                    isActive ? "text-primary font-semibold" : "text-foreground/80"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
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
    tone === "light" ? s?.companyLogoLight || "/companyLogoLight.png" : s?.companyLogoDark || "/companyLogoDark.png";
  const name = s?.companyName || "Av Edu Overseas Consultancy";
  // const tagline = s?.logoTagline || "Overseas Consultancy";
  return (
    <Link to="/" className="flex flex-col leading-none items-start">
      <img src={logoSrc} alt={name} className="h-14 w-auto object-contain" />
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

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
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
              <SocialIcons size={24} tone="light" />
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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    try {
      await submitToSheet({
        source: "footer",
        name: (fd.get("name") as string) || "",
        email: (fd.get("email") as string) || "",
        message: (fd.get("message") as string) || "",
      });
      form.reset();
      toast.success("Message sent — we'll be in touch shortly.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h4 className="text-xl font-semibold text-white">Send Us a Message</h4>
      <div className="mt-2 h-px w-10 bg-primary" />
      <form onSubmit={onSubmit} className="mt-6 space-y-1">
        <input name="_hp" type="text" className="sr-only" tabIndex={-1} autoComplete="off" />
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
          <input
            required
            name="name"
            type="text"
            placeholder="Name"
            className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-primary focus:outline-none"
          />
          <input
            required
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-primary focus:outline-none"
          />
        </div>
        <textarea
          required
          name="message"
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
