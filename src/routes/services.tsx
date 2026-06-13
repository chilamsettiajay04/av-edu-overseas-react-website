import { createFileRoute } from "@tanstack/react-router";
import {
  GraduationCap,
  FileCheck,
  Globe2,
  Compass,
  BookOpen,
  Home,
  type LucideIcon,
} from "lucide-react";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import {
  getServices,
  getSiteSettingsShared,
  getHeroSections,
  type ServiceData,
  type SiteSettings,
  type HeroSection,
} from "@/sanity/queries";
import { breadcrumbSchema, webpageSchema, jsonLdScript } from "@/lib/seo";

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

export const Route = createFileRoute("/services")({
  loader: async () => {
    const [services, siteSettings, heroSections] = await Promise.all([
      getServices(),
      getSiteSettingsShared(),
      getHeroSections(),
    ]);
    const hero = heroSections.find((h) => h.page === "services");
    return { services, siteSettings, hero };
  },
  head: ({ loaderData }) => {
    const { siteSettings } = loaderData as {
      services: ServiceData[];
      siteSettings: SiteSettings | null;
    };
    const name = siteSettings?.companyName || "Av Edu Overseas Consultancy";
    const title = `Our Services — ${name}`;
    const desc = `End-to-end overseas education and immigration services — admissions, visa, immigration, career counseling and more by ${name}.`;
    const siteUrl = "https://rad-architecture-showcase.vercel.app/services";
    const schemas = [
      webpageSchema(title, desc, siteUrl),
      breadcrumbSchema([
        { name: "Home", url: "https://rad-architecture-showcase.vercel.app" },
        { name: "Services", url: siteUrl },
      ]),
    ];
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: siteUrl },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: siteUrl }],
      scripts: schemas.map(jsonLdScript),
    };
  },
  component: Services,
});

function Services() {
  const { services, hero } = Route.useLoaderData() as {
    services: ServiceData[];
    siteSettings: SiteSettings | null;
    hero: HeroSection | undefined;
  };
  const slide = hero?.slides?.[0];

  return (
    <SiteLayout>
      <PageHero
        title={slide?.heading || "Our Services"}
        subtitle={
          slide?.subtitle || "Comprehensive support at every stage of your overseas journey"
        }
        image={slide?.image}
      />
      <section className="bg-white">
        <div className="pi-section">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s: ServiceData, i: number) => {
              const Icon = ICON_MAP[s.service_icon_name] || GraduationCap;
              const { accent, iconBg, iconColor } = STYLES[i % STYLES.length];
              return (
                <Reveal key={s.service_title}>
                  <div
                    className="h-full group relative overflow-hidden bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-b ${accent} opacity-100`} />
                    <div className="relative z-10 flex flex-col items-start p-8">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconBg} ${iconColor} shadow-lg`}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="mt-6 text-xl font-semibold">{s.service_title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {s.service_description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
