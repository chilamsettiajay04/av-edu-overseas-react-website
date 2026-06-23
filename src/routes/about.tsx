import { useLoaderData } from "react-router-dom";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import { useSEO } from "@/lib/useSEO";
import { organizationSchema, webpageSchema, breadcrumbSchema } from "@/lib/seo";
import {
  getSiteSettingsShared,
  getHeroSections,
  type SiteSettings,
  type HeroSection,
} from "@/sanity/queries";

export default function AboutPage() {
  const { hero, siteSettings } = useLoaderData() as {
    hero: HeroSection | undefined;
    siteSettings: SiteSettings | null;
  };
  const s = useSiteSettings();
  const aboutParagraphs = [s?.aboutDescription, s?.aboutDescription2].filter(Boolean) as string[];
  const slide = hero?.slides?.[0];

  const name = siteSettings?.companyName || "Av Edu Overseas Consultancy";
  const title = `About Us — ${name}`;
  const desc =
    siteSettings?.aboutDescription ||
    "Learn about Av Edu Overseas Consultancy — our story, our team, and our mission to help students achieve their global education dreams.";
  useSEO({
    title,
    description: desc,
    canonicalPath: "/about",
    jsonLd: [
      organizationSchema(siteSettings),
      webpageSchema(title, desc, "https://rad-architecture-showcase.vercel.app/about"),
      breadcrumbSchema([
        { name: "Home", url: "https://rad-architecture-showcase.vercel.app/" },
        { name: "About Us", url: "https://rad-architecture-showcase.vercel.app/about" },
      ]),
    ],
  });

  return (
    <SiteLayout>
      <PageHero
        title={slide?.heading || "About Us"}
        subtitle={slide?.subtitle || "Our story, our team, our mission"}
        image={slide?.image}
      />
      <section className="bg-white">
        <div className="pi-section">
          <Reveal className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Who We Are
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              {s?.aboutHeading || "Built on Trust, Driven by Results"}
            </h2>
            {aboutParagraphs.length > 0 ? (
              aboutParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-[17px]"
                >
                  {p}
                </p>
              ))
            ) : (
              <p className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                Founded over a decade ago, Av Edu has helped thousands of students and professionals
                achieve their global ambitions. We combine deep regulatory expertise with
                personalized counseling, walking with you from your first application to your first
                day abroad — and beyond. Honesty, transparency, and long-term outcomes define
                everything we do.
              </p>
            )}
          </Reveal>
        </div>
      </section>
      <section
        className="w-full bg-black"
        style={
          s?.missionBgImage
            ? {
                backgroundImage: `linear-gradient(rgba(15,15,15,0.7), rgba(15,15,15,0.7)), url('${s.missionBgImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
              }
            : undefined
        }
      >
        <Reveal className="text-center pi-section">
          <p className="text-[10px] uppercase tracking-[0.45em] text-white/60">
            {s?.missionLabel || "Our Mission"}
          </p>
          <blockquote className="mt-10 text-2xl font-light italic leading-relaxed text-white sm:text-3xl md:text-4xl">
            {s?.missionQuote ||
              '"To empower every student and professional with honest guidance, transparent processes, and unwavering support — turning their dream of studying or living abroad into a successful reality."'}
          </blockquote>
          <div className="mx-auto mt-10 h-px w-16 bg-primary" />
        </Reveal>
      </section>
    </SiteLayout>
  );
}

async function loader() {
  const [siteSettings, heroSections] = await Promise.all([
    getSiteSettingsShared(),
    getHeroSections(),
  ]);
  const hero = heroSections.find((h) => h.page === "about");
  return { siteSettings, hero };
}

AboutPage.loader = loader;
