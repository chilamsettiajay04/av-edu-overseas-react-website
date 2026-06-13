import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { DestinationCard } from "./index";
import {
  getDestinations,
  getSiteSettingsShared,
  getHeroSections,
  type DestinationListItem,
  type SiteSettings,
  type HeroSection,
} from "@/sanity/queries";

export default function DestinationsPage() {
  const { destinations, hero, siteSettings } = useLoaderData() as {
    destinations: DestinationListItem[];
    siteSettings: SiteSettings | null;
    hero: HeroSection | undefined;
  };
  const slide = hero?.slides?.[0];

  useEffect(() => {
    const name = siteSettings?.companyName || "Av Edu Overseas Consultancy";
    document.title = `Study Abroad Destinations — ${name}`;
  }, [siteSettings]);

  return (
    <SiteLayout>
      <PageHero
        title={slide?.heading || "Our Destinations"}
        subtitle={
          slide?.subtitle ||
          "Choose from 25+ countries — each with unique opportunities for your future"
        }
        image={slide?.image}
      />
      <section className="bg-white">
        <div className="pi-section">
          <Reveal className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Top Picks
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl md:text-5xl">
              Where Will You Go?
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d: DestinationListItem, i: number) => (
              <DestinationCard key={d.name} d={d} index={i} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

async function loader() {
  const [destinations, siteSettings, heroSections] = await Promise.all([
    getDestinations(),
    getSiteSettingsShared(),
    getHeroSections(),
  ]);
  const hero = heroSections.find((h) => h.page === "destinations");
  return { destinations, siteSettings, hero };
}

DestinationsPage.loader = loader;
