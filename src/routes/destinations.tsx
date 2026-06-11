import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { DESTINATIONS, DestinationCard } from "./index";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — Av Edu" },
      { name: "description", content: "Explore study and immigration destinations across 25+ countries with Av Edu." },
      { property: "og:title", content: "Our Destinations — Av Edu" },
      { property: "og:description", content: "Explore study and immigration destinations across 25+ countries." },
    ],
  }),
  component: Destinations,
});

function Destinations() {
  const matches = useRouterState({ select: (s) => s.matches });
  const hasSlugChild = matches.some((m) => m.routeId === "/destinations/$slug");

  if (hasSlugChild) return <Outlet />;

  return (
    <SiteLayout>
      <PageHero
        title="Our Destinations"
        subtitle="Choose from 25+ countries — each with unique opportunities for your future"
        image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2400&q=80"
      />
      <section className="bg-white">
          <div className="pi-section">
          <Reveal className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Top Picks</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl md:text-5xl">Where Will You Go?</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DESTINATIONS.map((d, i) => (
              <DestinationCard key={d.name} d={d} index={i} />
            ))}
          </div>
          </div>
      </section>
    </SiteLayout>
  );
}
