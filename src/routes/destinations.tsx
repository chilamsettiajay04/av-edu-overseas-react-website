import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
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
import { breadcrumbSchema, webpageSchema, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/destinations")({
  loader: async () => {
    const [destinations, siteSettings, heroSections] = await Promise.all([
      getDestinations(),
      getSiteSettingsShared(),
      getHeroSections(),
    ]);
    const hero = heroSections.find((h) => h.page === "destinations");
    return { destinations, siteSettings, hero };
  },
  head: ({ loaderData }) => {
    const { siteSettings } = loaderData as {
      destinations: DestinationListItem[];
      siteSettings: SiteSettings | null;
    };
    const name = siteSettings?.companyName || "Av Edu Overseas Consultancy";
    const title = `Study Abroad Destinations — ${name}`;
    const desc = `Explore study abroad and immigration destinations across 25+ countries with ${name}. Find your perfect path.`;
    const siteUrl = "https://rad-architecture-showcase.vercel.app/destinations";
    const schemas = [
      webpageSchema(title, desc, siteUrl),
      breadcrumbSchema([
        { name: "Home", url: "https://rad-architecture-showcase.vercel.app" },
        { name: "Destinations", url: siteUrl },
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
  component: Destinations,
});

function Destinations() {
  const { destinations, hero } = Route.useLoaderData() as {
    destinations: DestinationListItem[];
    siteSettings: SiteSettings | null;
    hero: HeroSection | undefined;
  };
  const matches = useRouterState({ select: (s) => s.matches });
  const hasSlugChild = matches.some((m) => m.routeId === "/destinations/$slug");
  const slide = hero?.slides?.[0];

  if (hasSlugChild) return <Outlet />;

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
