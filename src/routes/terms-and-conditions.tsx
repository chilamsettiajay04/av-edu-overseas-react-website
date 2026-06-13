import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import {
  getTermsConditions,
  getSiteSettingsShared,
  getHeroSections,
  type TermsConditionsData,
  type SiteSettings,
  type HeroSection,
} from "@/sanity/queries";

export default function TermsPage() {
  const { data, hero, siteSettings } = useLoaderData() as {
    data: TermsConditionsData | null;
    siteSettings: SiteSettings | null;
    hero: HeroSection | undefined;
  };

  useEffect(() => {
    const name = siteSettings?.companyName || "Av Edu Overseas Consultancy";
    document.title = data?.metaTitle || `Terms & Conditions — ${name}`;
  }, [data, siteSettings]);

  if (!data) return null;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const slide = hero?.slides?.[0];

  return (
    <SiteLayout>
      <PageHero
        title={slide?.heading || data.title}
        subtitle={slide?.subtitle || "Terms governing your use of our website and services"}
        image={slide?.image}
      />
      <section className="bg-white">
        <div className="pi-section">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Last Updated: {formatDate(data.lastUpdated)}
              </p>
              {data.sections.map((section, i) => (
                <div key={i}>
                  {i === 0 && (
                    <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{section.heading}</h2>
                  )}
                  {i > 0 && <h2 className="mt-12 text-2xl font-semibold">{section.heading}</h2>}
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                    {section.body}
                  </p>
                  {section.listItems && section.listItems.length > 0 && (
                    <ul className="mt-4 list-disc pl-6 space-y-2 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                      {section.listItems.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <div className="mx-auto mt-16 h-px w-16 bg-primary" />
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}

async function loader() {
  const [data, siteSettings, heroSections] = await Promise.all([
    getTermsConditions(),
    getSiteSettingsShared(),
    getHeroSections(),
  ]);
  const hero = heroSections.find((h) => h.page === "terms-conditions");
  return { data, siteSettings, hero };
}

TermsPage.loader = loader;
