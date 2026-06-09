import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Phone,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RAD Architecture INC — Boutique Hospitality & Resort Design" },
      {
        name: "description",
        content:
          "RAD Architecture INC is a boutique design firm specializing in hospitality, luxury resorts, and residential architecture worldwide.",
      },
      { property: "og:title", content: "RAD Architecture INC" },
      {
        property: "og:description",
        content:
          "Boutique design firm specializing in hospitality, luxury resorts, and residential architecture.",
      },
    ],
  }),
  component: Index,
});

const HERO_SLIDES = [
  {
    title: "Regent Palms Resort & Spa",
    location: "Turks and Caicos Islands, B.W.I",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2400&q=80",
  },
  {
    title: "Plunge — Bar and Grill",
    location: "Turks and Caicos Islands, B.W.I",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2400&q=80",
  },
  {
    title: "Veranda Resort Village",
    location: "Turks and Caicos Islands, B.W.I",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2400&q=80",
  },
];

const PROJECTS = [
  {
    name: "The Watermark",
    location: "Grand Cayman, Cayman Islands",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Guanica Dreams Resort",
    location: "Guanica, Puerto Rico",
    image: "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Six Senses Sayulita",
    location: "Sayulita, Mexico",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Sunrise VNT — Phu Quoc",
    location: "Phu Quoc, Vietnam",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "The Shore Club",
    location: "Providenciales, Turks & Caicos Islands",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "The Shore Club Beach Villas",
    location: "Providenciales, Turks & Caicos Islands",
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Stone Island",
    location: "Grand Cayman, Cayman Islands",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Freedom Bay Six Senses",
    location: "Malgretoute Bay, St. Lucia",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Trend Tower",
    location: "Rockwall, Texas",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1400&q=80",
  },
];

const NAV = ["Home", "About Us", "Projects", "Publications", "FTP Access", "Contact"];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster theme="dark" />
      <TopBar />
      <MainNav />
      <Hero />
      <Intro />
      <FeaturedProjects />
      <Mission />
      <Stats />
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <div className="hidden border-b border-border/60 bg-black/60 text-xs text-muted-foreground md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
        <div className="flex items-center gap-6">
          <a href="tel:+13056434771" className="flex items-center gap-2 transition-colors hover:text-gold">
            <Phone className="h-3.5 w-3.5" /> +1.305.643.4771
          </a>
          <a href="mailto:info@radmiami.com" className="flex items-center gap-2 transition-colors hover:text-gold">
            <Mail className="h-3.5 w-3.5" /> info@radmiami.com
          </a>
        </div>
        <SocialIcons size={14} />
      </div>
    </div>
  );
}

function SocialIcons({ size = 16 }: { size?: number }) {
  const icons = [
    { Icon: Instagram, label: "Instagram" },
    { Icon: Facebook, label: "Facebook" },
    { Icon: Linkedin, label: "LinkedIn" },
    { Icon: Youtube, label: "YouTube" },
  ];
  return (
    <div className="flex items-center gap-4">
      {icons.map(({ Icon, label }) => (
        <a
          key={label}
          href="#"
          aria-label={label}
          className="text-muted-foreground transition-colors hover:text-gold"
        >
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
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-border/60 bg-background/90 backdrop-blur-md"
          : "border-b border-transparent bg-background/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item}
              href="#"
              className="text-[11px] uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-gold"
            >
              {item}
            </a>
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
        <div className="border-t border-border/60 bg-background lg:hidden">
          <nav className="flex flex-col px-6 py-4">
            {NAV.map((item) => (
              <a
                key={item}
                href="#"
                className="py-3 text-xs uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <a href="#" className="flex flex-col leading-none">
      <span className="font-serif text-2xl tracking-[0.3em] text-foreground">RAD</span>
      <span className="mt-1 text-[9px] uppercase tracking-[0.4em] text-gold">Architecture</span>
    </a>
  );
}

function Hero() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const go = (n: number) => {
    setIndex((n + HERO_SLIDES.length) % HERO_SLIDES.length);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 6000);
  };

  return (
    <section className="relative -mt-[1px] h-[88vh] min-h-[560px] w-full overflow-hidden bg-black">
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className={`h-full w-full object-cover transition-transform duration-[8000ms] ease-out ${
              i === index ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-20 sm:px-12 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <div key={index} className="animate-fade-in">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Featured Work</p>
            <h1 className="mt-4 font-serif text-3xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
              {HERO_SLIDES[index].title}
            </h1>
            <p className="mt-3 text-sm tracking-[0.18em] text-white/75 sm:text-base">
              {HERO_SLIDES[index].location}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 bg-black/20 p-3 text-white backdrop-blur-sm transition-all hover:border-gold hover:text-gold sm:left-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 bg-black/20 p-3 text-white backdrop-blur-sm transition-all hover:border-gold hover:text-gold sm:right-8"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-[2px] transition-all duration-500 ${
              i === index ? "w-10 bg-gold" : "w-5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

function Intro() {
  return (
    <section className="bg-background px-6 py-24 md:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Est. 1999</p>
        <h2 className="mt-6 font-serif text-3xl font-light tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Welcome to RAD Architecture <span className="italic text-gold">INC</span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-[17px]">
          A boutique design firm dedicated to providing a full range of architectural services
          and building excellence at every stage of the development process while understanding
          the client's needs. Our practice, although broad, focuses on Hospitality with an
          emphasis in destination resorts and Luxury Residential Projects.
        </p>
      </Reveal>
    </section>
  );
}

function FeaturedProjects() {
  return (
    <section className="bg-card px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Portfolio</p>
          <h2 className="mt-4 gold-underline font-serif text-3xl font-light text-foreground sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} className="" >
              <a
                href="#"
                className="group relative block overflow-hidden bg-black"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/95" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-serif text-xl font-light text-white sm:text-2xl">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/65">
                    {p.location}
                  </p>
                  <span className="mt-4 inline-block text-[10px] uppercase tracking-[0.3em] text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    View Project →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 text-center">
          <a
            href="#"
            className="inline-block border border-gold px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-all duration-300 hover:bg-gold hover:text-gold-foreground"
          >
            View Full Portfolio
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section
      className="relative bg-background px-6 py-28 md:py-40"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15,15,15,0.92), rgba(15,15,15,0.96)), url('https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2400&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Reveal className="mx-auto max-w-4xl text-center">
        <p className="text-[10px] uppercase tracking-[0.45em] text-gold">Our Mission Statement</p>
        <blockquote className="mt-10 font-serif text-2xl font-light italic leading-relaxed text-foreground sm:text-3xl md:text-4xl">
          "Attain a superior design through the engagement of exceptional practices, principles,
          and people while delivering rigorous personal service and exemplary results for our
          clientele."
        </blockquote>
        <div className="mx-auto mt-10 h-px w-16 bg-gold" />
      </Reveal>
    </section>
  );
}

const STATS = [
  { value: "15M SF", label: "Sq. Feet Designed" },
  { value: "8,000", label: "Hotel Rooms" },
  { value: "25+", label: "Years of Experience" },
  { value: "25+", label: "Countries Covered" },
];

function Stats() {
  return (
    <section className="border-y border-border bg-card px-6 py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-12 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} className="text-center">
            <div
              className="font-serif text-4xl font-light text-gold sm:text-5xl md:text-6xl"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {s.value}
            </div>
            <div className="mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {s.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black px-6 pt-20 pb-10 text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <OfficeBlock
            title="RAD Miami Office"
            address="117 N.W. 42nd Ave., Suite CU #3, Miami, FL 33126"
            phone="+1 305-643-4771"
            email="info@radmiami.com"
            hours={["Monday–Friday 9:00am–6:00pm (GMT -4)", "Sat–Sun Closed"]}
          />
          <OfficeBlock
            title="RAD Córdoba Office"
            address="Achaval Rodriguez 70 1°A, Nueva Córdoba, Córdoba, Argentina 5000"
            phone="+54 351-423-1355"
            email="info@radmiami.com"
            hours={["Monday–Friday 9:00am–6:00pm (GMT -3)", "Sat–Sun Closed"]}
          />
          <ContactForm />
        </div>

        <div className="mt-16 border-t border-border/50 pt-10">
          <div className="flex flex-col items-center gap-6">
            <Logo />
            <SocialIcons size={16} />
            <p className="text-[11px] tracking-[0.2em] text-muted-foreground">
              © 2014. RAD Architecture. All rights reserved.
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
      <h4 className="font-serif text-xl text-foreground">{title}</h4>
      <div className="mt-2 h-px w-10 bg-gold" />
      <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
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
      <h4 className="font-serif text-xl text-foreground">Send Us a Message</h4>
      <div className="mt-2 h-px w-10 bg-gold" />
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          required
          type="text"
          placeholder="Name"
          className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none"
        />
        <input
          required
          type="email"
          placeholder="Email"
          className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none"
        />
        <textarea
          required
          placeholder="Message"
          rows={4}
          className="w-full resize-none border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none"
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
