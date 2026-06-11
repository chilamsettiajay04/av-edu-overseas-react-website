import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { GraduationCap, FileCheck, Globe2 } from "lucide-react";
import { SiteLayout, Reveal } from "@/components/site/SiteLayout";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Av Edu — Your Gateway to Global Opportunities" },
      {
        name: "description",
        content:
          "Av Edu guides students and professionals through study abroad, visa, and immigration journeys across 25+ countries.",
      },
      { property: "og:title", content: "Av Edu" },
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
    slug: "united-kingdom",
    desc: "Top-ranked universities, post-study work visa options",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Canada",
    slug: "canada",
    desc: "PR pathways, co-op programs, and multicultural cities",
    image:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Australia",
    slug: "australia",
    desc: "World-class education with a relaxed, high-quality lifestyle",
    image:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "United States",
    slug: "united-states",
    desc: "Ivy League and top research universities",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Germany",
    slug: "germany",
    desc: "Tuition-free public universities, strong engineering programs",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Ireland",
    slug: "ireland",
    desc: "EU access, tech hub, and English-speaking culture",
    image:
      "https://images.unsplash.com/photo-1564959130747-897fb406b9af?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Europe",
    slug: "europe",
    desc: "Study across 27 countries with diverse cultures and world-class education",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Dubai",
    slug: "dubai",
    desc: "Global business hub with world-class universities and tax-free lifestyle",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Singapore",
    slug: "singapore",
    desc: "Asia's leading education hub with globally ranked universities",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Mauritius",
    slug: "mauritius",
    desc: "Emerging study destination with multicultural charm and quality education",
    image:
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1400&q=80",
  },
];

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <Stats />
      <Intro />
      <FeaturedServices />
      <FeaturedDestinations />
      <Faqs />
      <Cta />
    </SiteLayout>
  );
}

function Hero() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX = useRef(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "ArrowRight") go(index + 1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const diff = touchX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        go(index + (diff > 0 ? 1 : -1));
      }
    };

    el.addEventListener("keydown", onKeyDown);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("keydown", onKeyDown);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [index]);

  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      className="relative w-full overflow-hidden bg-black min-h-[max(480px,100dvh)] md:min-h-[max(480px,calc(100dvh-40px))] outline-none"
    >
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/70" />
        </div>
      ))}

      <div className="absolute inset-0 z-10 flex items-center px-6 sm:px-12">
        <div className="mx-auto max-w-7xl w-full">
          <div key={index} className="animate-fade-in">
            <p className="font-serif text-[11px] uppercase tracking-[0.4em] text-white/60">
              Your Gateway to Global Opportunities
            </p>
            <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-white sm:text-5xl md:text-7xl">
              {HERO_SLIDES[index].title}
            </h1>
            <p className="mt-3 font-serif text-lg italic tracking-wide text-white/80 sm:text-xl md:text-2xl">
              {HERO_SLIDES[index].subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-px transition-all duration-500 ${
              i === index ? "w-10 bg-primary" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-white">
      <div className="pi-section">
      <Reveal>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
            <iframe
              src="https://www.youtube.com/embed/3oYDDQKctxk?rel=0&modestbranding=1&controls=1"
              title="Study Abroad"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Trusted Since 2012</p>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl accent-underline">
              Welcome to <span className="text-primary">Av Edu</span>
            </h2>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
              A trusted boutique consultancy dedicated to guiding students and professionals through
              every step of their overseas education and immigration journey. Our expertise spans
              visa processing, university admissions, career pathways, and settlement support across
              25+ countries worldwide.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
              From the moment you walk through our doors to the day you set foot on foreign soil,
              our team of seasoned counselors stands by your side with personalised guidance,
              transparent processes, and a genuine commitment to turning your aspirations into
              achievements.
            </p>
          </div>
        </div>
      </Reveal>
      </div>
    </section>
  );
}

export function DestinationCard({
  d,
  index = 0,
}: {
  d: { name: string; slug: string; desc: string; image: string };
  index?: number;
}) {
  return (
    <Reveal>
      <Link
        to="/destinations/$slug"
        params={{ slug: d.slug }}
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
          <span className="mt-4 inline-block text-[10px] uppercase tracking-[0.3em] text-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            Learn More →
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function FeaturedDestinations() {
  return (
    <section className="bg-white">
      <div className="pi-section">
      <Reveal className="mb-16 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Where Will You Go?</p>
        <h2 className="mt-4 accent-underline text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          Popular Destinations
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {DESTINATIONS.slice(0, 6).map((d, i) => (
          <DestinationCard key={d.name} d={d} index={i} />
        ))}
      </div>

      <Reveal className="mt-16 text-center">
        <Link
          to="/destinations"
          className="inline-block border border-primary bg-primary px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
        >
          Explore All Destinations
        </Link>
      </Reveal>
      </div>
    </section>
  );
}

const FEATURED_SERVICES = [
  {
    Icon: GraduationCap,
    title: "University Admissions",
    desc: "End-to-end application support for top universities worldwide",
    accent: "from-amber-600/20 to-amber-600/5",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    number: "01",
  },
  {
    Icon: FileCheck,
    title: "Student Visa Assistance",
    desc: "Expert guidance for student visa applications with high success rate",
    accent: "from-emerald-600/20 to-emerald-600/5",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    number: "02",
  },
  {
    Icon: Globe2,
    title: "Immigration Consulting",
    desc: "PR, skilled worker, and family visa pathways to 25+ countries",
    accent: "from-blue-600/20 to-blue-600/5",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    number: "03",
  },
];

function FeaturedServices() {
  return (
    <section className="bg-[#fafafa]">
      <div className="pi-section">
      <Reveal className="mb-16 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">What We Offer</p>
        <h2 className="mt-4 accent-underline text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          Our Services
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_SERVICES.map(({ Icon, title, desc, accent, iconBg, iconColor, number }, i) => (
          <Reveal key={title}>
            <div
              className="group relative overflow-hidden bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-b ${accent} opacity-100 transition-opacity duration-500`}
              />
              <div className="absolute right-4 top-4 text-[2.5rem] font-black leading-none text-black/5 select-none">
                {number}
              </div>
              <div className="relative z-10 flex flex-col items-start p-8">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconBg} ${iconColor} shadow-lg transition-all duration-500`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <Link
                  to="/services"
                  className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-primary transition-all duration-300 hover:gap-3"
                >
                  Learn More
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 text-center">
        <Link
          to="/services"
          className="inline-block border border-primary bg-primary px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
        >
          Explore All Services
        </Link>
      </Reveal>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "What services does Av Edu offer?",
    a: "We provide end-to-end guidance including university selection, application assistance, visa processing, scholarship guidance, and post-arrival support for students and professionals.",
  },
  {
    q: "Which countries do you help with?",
    a: "We cover 25+ countries including the UK, Canada, Australia, the US, Germany, Ireland, New Zealand, and many more across Europe, Asia, and North America.",
  },
  {
    q: "What is your visa success rate?",
    a: "We maintain a 98% visa success rate through meticulous documentation, expert counsel, and deep knowledge of immigration regulations across jurisdictions.",
  },
  {
    q: "How long does the application process take?",
    a: "Timelines vary by country and program, but most applications are completed within 4–8 weeks. Visa processing depends on the destination country's current workload.",
  },
  {
    q: "Do you offer support after arrival?",
    a: "Yes, we provide post-arrival assistance including accommodation guidance, airport pickup coordination, bank account setup, and ongoing counseling to ensure a smooth transition.",
  },
];

function Faqs() {
  return (
    <section className="bg-[#fafafa]">
      <div className="pi-section">
      <Reveal className="mb-14 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Have Questions?</p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl accent-underline">
          Frequently Asked Questions
        </h2>
      </Reveal>
      <Reveal>
        <Accordion type="single" collapsible className="mx-auto max-w-4xl">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section
      className="w-full py-24"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15,15,15,0.8), rgba(15,15,15,0.8)), url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Reveal className="text-center pi-section">
        <p className="text-[10px] uppercase tracking-[0.45em] text-white/60">Get Started Today</p>
        <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
          Your Global Journey Starts Here
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80">
          Book a free consultation with our experts and take the first step toward studying,
          working, or living abroad.
        </p>
        <Link
          to="/contact"
          className="mt-10 inline-block border border-primary bg-primary px-12 py-4 text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
        >
          Book a Consultation
        </Link>
        <div className="mx-auto mt-10 h-px w-16 bg-primary" />
      </Reveal>
    </section>
  );
}

const STATS = [
  {
    value: "15,000+",
    label: "Students Placed",
    color: "from-stone-700 to-stone-600",
    text: "text-stone-100",
    height: 140,
    pattern:
      "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.04) 8px, rgba(255,255,255,0.04) 16px)",
  },
  {
    value: "98%",
    label: "Visa Success Rate",
    color: "from-teal-800 to-teal-700",
    text: "text-teal-100",
    height: 200,
    pattern: "radial-gradient(circle at 20px 20px, rgba(255,255,255,0.04) 2px, transparent 2px)",
    patternSize: "40px 40px",
  },
  {
    value: "25+",
    label: "Destination Countries",
    color: "from-slate-700 to-slate-600",
    text: "text-slate-100",
    height: 180,
    pattern:
      "repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(255,255,255,0.04) 12px, rgba(255,255,255,0.04) 13px)",
  },
  {
    value: "12+",
    label: "Years of Experience",
    color: "from-neutral-600 to-neutral-500",
    text: "text-neutral-100",
    height: 160,
    pattern:
      "repeating-linear-gradient(-45deg, transparent, transparent 6px, rgba(255,255,255,0.04) 6px, rgba(255,255,255,0.04) 12px), repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.04) 6px, rgba(255,255,255,0.04) 12px)",
  },
];

function Stats() {
  return (
    <section className="bg-black px-8 py-12">
      <p className="text-[10px] uppercase tracking-[0.4em] text-white/60 mb-8">Results That Speak</p>
      <div className="grid grid-cols-1 md:grid-cols-4 items-end">
        {STATS.map((s) => (
          <div
            key={s.label}
            style={{ height: `${s.height}px` }}
            className={`bg-gradient-to-b ${s.color} p-5 flex flex-col justify-end relative overflow-hidden`}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: s.pattern,
                backgroundSize: s.patternSize || "auto",
              }}
            />
            <div className="relative z-10">
              <div
                className={`text-[2.4rem] font-extrabold tracking-tight leading-none ${s.text} mb-3`}
              >
                {s.value}
              </div>
              <div className={`text-[10px] uppercase tracking-[0.14em] ${s.text} opacity-85`}>
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
