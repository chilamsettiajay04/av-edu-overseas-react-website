import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  FileCheck,
  Globe2,
  Compass,
  BookOpen,
  Home,
  type LucideIcon,
} from "lucide-react";
import { SiteLayout, Reveal } from "@/components/site/SiteLayout";
import { AnnouncementPopup } from "@/components/site/AnnouncementPopup";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import { useSEO } from "@/lib/useSEO";
import { organizationSchema, webpageSchema, faqSchema } from "@/lib/seo";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  getServices,
  getDestinations,
  getFaqs,
  getStats,
  getSiteSettingsShared,
  getHeroSections,
  getMainCta,
  type ServiceData,
  type DestinationListItem,
  type FaqData,
  type StatData,
  type SiteSettings,
  type HeroSection,
  type MainCta,
} from "@/sanity/queries";

const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  FileCheck,
  Globe2,
  Compass,
  BookOpen,
  Home,
};

const STYLES = [
  {
    accent: "from-amber-600/20 to-amber-600/5",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    accent: "from-emerald-600/20 to-emerald-600/5",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  { accent: "from-blue-600/20 to-blue-600/5", iconBg: "bg-blue-50", iconColor: "text-blue-600" },
  {
    accent: "from-purple-600/20 to-purple-600/5",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  { accent: "from-rose-600/20 to-rose-600/5", iconBg: "bg-rose-50", iconColor: "text-rose-600" },
  { accent: "from-teal-600/20 to-teal-600/5", iconBg: "bg-teal-50", iconColor: "text-teal-600" },
];

export default function HomePage() {
  const { featuredServices, featuredDestinations, faqs, stats, heroSlides, mainCta, siteSettings } =
    useLoaderData() as {
      featuredServices: ServiceData[];
      featuredDestinations: DestinationListItem[];
      faqs: FaqData[];
      stats: StatData[];
      siteSettings: SiteSettings | null;
      heroSlides: { image: string; heading?: string; subtitle?: string }[];
      mainCta: MainCta | null;
    };

  const s = siteSettings;
  const name = s?.companyName || "Av Edu Overseas Consultancy";
  const seoTitle = s?.seoTitle || `${name} — Your Gateway to Global Opportunities`;
  const seoDesc =
    s?.seoDescription ||
    "Your trusted partner for overseas education and immigration consultancy. Expert guidance for students and professionals seeking global opportunities.";
  useSEO({
    title: seoTitle,
    description: seoDesc,
    ogImage: s?.seoOgImage,
    canonicalPath: "/",
    jsonLd: [
      organizationSchema(s),
      webpageSchema(seoTitle, seoDesc, "https://av-edu-overseas-react-website.vercel.app/"),
      ...(faqs.length > 0 ? [faqSchema(faqs)] : []),
    ],
  });

  const popupEnabled = s?.announcementPopupEnabled ?? false;
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (!popupEnabled) return;
    const shown = sessionStorage.getItem("announcement-popup-shown");
    if (shown !== "true") {
      setPopupOpen(true);
      sessionStorage.setItem("announcement-popup-shown", "true");
    }
  }, [popupEnabled]);

  return (
    <SiteLayout>
      {popupEnabled && (
        <AnnouncementPopup
          open={popupOpen}
          onOpenChange={setPopupOpen}
          message={s?.announcementPopupMessage || "New intakes open for 2025! Apply now for UK, USA, Canada, Australia & Europe."}
          ctaText={s?.announcementPopupCtaText || "Contact Us Now"}
          ctaLink={s?.announcementPopupCtaLink || "/contact"}
          image={s?.announcementPopupImage || undefined}
        />
      )}
      <Hero slides={heroSlides} />
      <Stats stats={stats} />
      <Intro />
      <FeaturedServices services={featuredServices} />
      <FeaturedDestinations destinations={featuredDestinations} />
      <Faqs faqs={faqs} />
      <Cta cta={mainCta} />
    </SiteLayout>
  );
}

async function loader() {
  const [services, destinations, faqs, stats, siteSettings, heroSections, mainCta] =
    await Promise.all([
      getServices(),
      getDestinations(),
      getFaqs(),
      getStats(),
      getSiteSettingsShared(),
      getHeroSections(),
      getMainCta(),
    ]);
  const homeHero = heroSections.find((h) => h.page === "home");
  return {
    featuredServices: services.slice(0, 3),
    featuredDestinations: destinations.slice(0, 6),
    faqs: faqs.slice(0, 5),
    stats,
    siteSettings,
    heroSlides: homeHero?.slides || [],
    mainCta,
  };
}

HomePage.loader = loader;

function Hero({ slides }: { slides: { image: string; heading?: string; subtitle?: string }[] }) {
  const s = useSiteSettings();
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX = useRef(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const go = (n: number) => {
    setIndex((n + slides.length) % slides.length);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
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
      className="relative w-full overflow-hidden bg-black min-h-[max(480px,calc(100dvh-64px))] md:min-h-[max(480px,calc(100dvh-104px))] outline-none"
    >
      {slides.map((slide, i) => (
        <div
          key={slide.heading}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={slide.image}
            alt={slide.heading}
            className={`h-full w-full object-cover transition-transform duration-[8000ms] ease-out ${
              i === index ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/10 to-black/0" />
        </div>
      ))}

      <div className="absolute inset-0 z-10 flex items-center pr-6 md:pr-12">
        <div className="ml-0 my-auto max-w-7xl w-fit bg-primary/60 p-6">
          <div key={index} className="animate-fade-in">
            <p className="font-serif text-[11px] uppercase tracking-[0.4em] text-white/60">
              {s?.companyTagline || "Your Gateway to Global Opportunities"}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-white sm:text-5xl md:text-7xl">
              {slides[index].heading}
            </h1>
            <p className="mt-3 font-serif text-lg italic tracking-wide text-white/80 sm:text-xl md:text-2xl">
              {slides[index].subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
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

function toEmbedUrl(url: string): string {
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  if (ytMatch)
    return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1&controls=1`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

function Intro() {
  const s = useSiteSettings();
  const name = s?.companyName || "Av Edu Overseas Consultancy";
  const aboutParagraphs = [s?.homeAboutDescription, s?.homeAboutDescription2].filter(
    Boolean,
  ) as string[];
  const videoUrl = s?.homeAboutVideo;
  const embedSrc = videoUrl ? toEmbedUrl(videoUrl) : null;

  return (
    <section className="bg-white">
      <div className="pi-section">
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
              {embedSrc ? (
                <iframe
                  src={embedSrc}
                  title="Home About Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-sm">
                  Video not available
                </div>
              )}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Built on trust, driven by results
              </p>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl accent-underline">
                Welcome to <span className="text-primary">{name}</span>
              </h2>
              {aboutParagraphs.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "mt-8 text-base leading-relaxed text-muted-foreground sm:text-[17px]"
                      : "mt-5 text-base leading-relaxed text-muted-foreground sm:text-[17px]"
                  }
                >
                  {p}
                </p>
              ))}
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
        to={`/destinations/${d.slug}`}
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

function FeaturedDestinations({ destinations }: { destinations: DestinationListItem[] }) {
  return (
    <section className="bg-white">
      <div className="pi-section">
        <Reveal className="mb-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Where Will You Go?
          </p>
          <h2 className="mt-4 accent-underline text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
            Popular Destinations
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
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

function FeaturedServices({ services }: { services: ServiceData[] }) {
  return (
    <section className="bg-[#fafafa]">
      <div className="pi-section">
        <Reveal className="mb-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            What We Offer
          </p>
          <h2 className="mt-4 accent-underline text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
            Our Areas of Expertise
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = ICON_MAP[s.service_icon_name] || GraduationCap;
            const { accent, iconBg, iconColor } = STYLES[i % STYLES.length];
            return (
              <Reveal key={s.service_title}>
                <div
                  className="group relative overflow-hidden bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${accent} opacity-100 transition-opacity duration-500`}
                  />
                  <div className="absolute right-4 top-4 text-[4rem] font-black leading-none text-black/5 select-none">
                    {s.service_display_number}
                  </div>
                  <div className="relative z-10 flex flex-col items-start p-8">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconBg} ${iconColor} shadow-lg transition-all duration-500`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">{s.service_title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {s.service_description}
                    </p>
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
            );
          })}
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

function Faqs({ faqs }: { faqs: FaqData[] }) {
  return (
    <section className="bg-[#fafafa]">
      <div className="pi-section">
        <Reveal className="mb-14 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Have Questions?
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl accent-underline">
            Frequently Asked Questions
          </h2>
        </Reveal>
        <Reveal>
          <Accordion type="single" collapsible className="mx-auto max-w-4xl">
            {faqs.map((faq, i) => (
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

function Cta({ cta }: { cta: MainCta | null }) {
  if (!cta) return null;
  return (
    <section
      className="w-full bg-black py-24"
      style={
        cta.image
          ? {
              backgroundImage: `linear-gradient(rgba(15,15,15,0.8), rgba(15,15,15,0.8)), url('${cta.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }
          : undefined
      }
    >
      <Reveal className="text-center pi-section">
        <p className="text-[10px] uppercase tracking-[0.45em] text-white/60">{cta.label}</p>
        <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
          {cta.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80">{cta.body}</p>
        <Link
          to={cta.buttonLink || "/contact"}
          className="mt-10 inline-block border border-primary bg-primary px-12 py-4 text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
        >
          {cta.buttonText}
        </Link>
        <div className="mx-auto mt-10 h-px w-16 bg-primary" />
      </Reveal>
    </section>
  );
}

const STAT_STYLES: {
  color: string;
  text: string;
  height: number;
  pattern: string;
  patternSize?: string;
}[] = [
  {
    color: "from-stone-700 to-stone-600",
    text: "text-stone-100",
    height: 140,
    pattern:
      "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.04) 8px, rgba(255,255,255,0.04) 16px)",
  },
  {
    color: "from-teal-800 to-teal-700",
    text: "text-teal-100",
    height: 200,
    pattern: "radial-gradient(circle at 20px 20px, rgba(255,255,255,0.04) 2px, transparent 2px)",
    patternSize: "40px 40px",
  },
  {
    color: "from-slate-700 to-slate-600",
    text: "text-slate-100",
    height: 180,
    pattern:
      "repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(255,255,255,0.04) 12px, rgba(255,255,255,0.04) 13px)",
  },
  {
    color: "from-neutral-600 to-neutral-500",
    text: "text-neutral-100",
    height: 160,
    pattern:
      "repeating-linear-gradient(-45deg, transparent, transparent 6px, rgba(255,255,255,0.04) 6px, rgba(255,255,255,0.04) 12px), repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.04) 6px, rgba(255,255,255,0.04) 12px)",
  },
];

function Stats({ stats }: { stats: StatData[] }) {
  return (
    <section className="bg-black px-8 py-12">
      <p className="text-[10px] uppercase tracking-[0.4em] text-white/60 mb-8">
        Results That Speak
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 items-end">
        {stats.map((s, i) => {
          const style = STAT_STYLES[i % STAT_STYLES.length];
          return (
            <div
              key={s.label}
              style={{ height: `${style.height}px` }}
              className={`bg-gradient-to-b ${style.color} p-5 flex flex-col justify-end relative overflow-hidden`}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: style.pattern,
                  backgroundSize: style.patternSize || "auto",
                }}
              />
              <div className="relative z-10">
                <div
                  className={`text-[2.4rem] font-extrabold tracking-tight leading-none ${style.text} mb-3`}
                >
                  {s.value}
                </div>
                <div className={`text-[10px] uppercase tracking-[0.14em] ${style.text} opacity-85`}>
                  {s.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
