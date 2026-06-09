import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SiteLayout, Reveal } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RAD Overseas Consultancy — Your Gateway to Global Opportunities" },
      {
        name: "description",
        content:
          "RAD Overseas Consultancy guides students and professionals through study abroad, visa, and immigration journeys across 25+ countries.",
      },
      { property: "og:title", content: "RAD Overseas Consultancy" },
      {
        property: "og:description",
        content: "Your gateway to global education and immigration opportunities.",
      },
    ],
  }),
  component: Index,
});

const HERO_SLIDES = [
  {
    title: "Study in the United Kingdom",
    subtitle: "World-Class Universities Await",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2400&q=80",
  },
  {
    title: "Immigrate to Canada",
    subtitle: "Build Your Future in North America",
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=2400&q=80",
  },
  {
    title: "Explore Australia & New Zealand",
    subtitle: "Live, Work, and Thrive",
    image:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=2400&q=80",
  },
];

export const DESTINATIONS = [
  {
    name: "United Kingdom",
    desc: "Top-ranked universities, post-study work visa options",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Canada",
    desc: "PR pathways, co-op programs, and multicultural cities",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Australia",
    desc: "World-class education with a relaxed, high-quality lifestyle",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "United States",
    desc: "Ivy League and top research universities",
    image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Germany",
    desc: "Tuition-free public universities, strong engineering programs",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "New Zealand",
    desc: "Safe, welcoming environment with open work rights",
    image: "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Ireland",
    desc: "EU access, tech hub, and English-speaking culture",
    image: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Dubai / UAE",
    desc: "Business and hospitality programs, zero tax lifestyle",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Singapore",
    desc: "Asia's top education hub with global career opportunities",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=80",
  },
];

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <Intro />
      <FeaturedDestinations />
      <Mission />
      <Stats />
    </SiteLayout>
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
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Your Gateway to Global Opportunities</p>
            <h1 className="mt-4 font-serif text-3xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
              {HERO_SLIDES[index].title}
            </h1>
            <p className="mt-3 font-serif text-lg italic tracking-wide text-white/80 sm:text-xl">
              {HERO_SLIDES[index].subtitle}
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

function Intro() {
  return (
    <section className="bg-background px-6 py-24 md:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Trusted Since 2012</p>
        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Welcome to RAD <span className="text-gold">Overseas Consultancy</span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-[17px]">
          A trusted boutique consultancy dedicated to guiding students and professionals through every
          step of their overseas education and immigration journey. Our expertise spans visa processing,
          university admissions, career pathways, and settlement support across 25+ countries worldwide.
        </p>
      </Reveal>
    </section>
  );
}

export function DestinationCard({ d, index = 0 }: { d: { name: string; desc: string; image: string }; index?: number }) {
  return (
    <Reveal>
      <Link
        to="/destinations"
        className="group relative block overflow-hidden bg-card shadow-sm transition-shadow hover:shadow-xl"
        style={{ transitionDelay: `${index * 50}ms` }}
      >
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={d.image}
            alt={d.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/95" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="text-xl font-semibold text-white sm:text-2xl">{d.name}</h3>
          <p className="mt-2 text-sm text-white/80">{d.desc}</p>
          <span className="mt-4 inline-block text-[10px] uppercase tracking-[0.3em] text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            Learn More →
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function FeaturedDestinations() {
  return (
    <section className="bg-[#f4f2ee] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Where Will You Go?</p>
          <h2 className="mt-4 gold-underline text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
            Popular Destinations
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((d, i) => (
            <DestinationCard key={d.name} d={d} index={i} />
          ))}
        </div>

        <Reveal className="mt-16 text-center">
          <Link
            to="/destinations"
            className="inline-block border border-gold bg-gold px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-gold-foreground transition-all duration-300 hover:bg-transparent hover:text-gold"
          >
            Explore All Destinations
          </Link>
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
          "linear-gradient(rgba(15,15,15,0.92), rgba(15,15,15,0.96)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2400&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Reveal className="mx-auto max-w-4xl text-center">
        <p className="text-[10px] uppercase tracking-[0.45em] text-gold">Our Mission</p>
        <blockquote className="mt-10 font-serif text-2xl font-light italic leading-relaxed text-white sm:text-3xl md:text-4xl">
          "To empower every student and professional with honest guidance, transparent processes,
          and unwavering support — turning their dream of studying or living abroad into a
          successful reality."
        </blockquote>
        <div className="mx-auto mt-10 h-px w-16 bg-gold" />
      </Reveal>
    </section>
  );
}

const STATS = [
  { value: "15,000+", label: "Students Placed" },
  { value: "25+", label: "Destination Countries" },
  { value: "98%", label: "Visa Success Rate" },
  { value: "12+", label: "Years of Experience" },
];

function Stats() {
  return (
    <section className="border-y border-border bg-card px-6 py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-12 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} className="text-center">
            <div
              className="text-4xl font-extrabold text-gold sm:text-5xl md:text-6xl"
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