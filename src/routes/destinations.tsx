<<<<<<< HEAD
import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
=======
import { createFileRoute } from "@tanstack/react-router";
>>>>>>> 9c9e85c18e6c8bc96dd1590965d696eb60cbd36f
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { DESTINATIONS, DestinationCard } from "./index";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
<<<<<<< HEAD
      { title: "Destinations — Av Edu" },
      { name: "description", content: "Explore study and immigration destinations across 25+ countries with Av Edu." },
      { property: "og:title", content: "Our Destinations — Av Edu" },
=======
      { title: "Destinations — RAD Overseas Consultancy" },
      { name: "description", content: "Explore study and immigration destinations across 25+ countries with RAD Overseas Consultancy." },
      { property: "og:title", content: "Our Destinations — RAD Overseas Consultancy" },
>>>>>>> 9c9e85c18e6c8bc96dd1590965d696eb60cbd36f
      { property: "og:description", content: "Explore study and immigration destinations across 25+ countries." },
    ],
  }),
  component: Destinations,
});

function Destinations() {
<<<<<<< HEAD
  const matches = useRouterState({ select: (s) => s.matches });
  const hasSlugChild = matches.some((m) => m.routeId === "/destinations/$slug");

  if (hasSlugChild) return <Outlet />;

=======
>>>>>>> 9c9e85c18e6c8bc96dd1590965d696eb60cbd36f
  return (
    <SiteLayout>
      <PageHero
        title="Our Destinations"
        subtitle="Choose from 25+ countries — each with unique opportunities for your future"
        image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2400&q=80"
      />
<<<<<<< HEAD
      <section className="bg-white">
          <div className="pi-section">
          <Reveal className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Top Picks</p>
=======
      <section className="bg-background px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Top Picks</p>
>>>>>>> 9c9e85c18e6c8bc96dd1590965d696eb60cbd36f
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl md:text-5xl">Where Will You Go?</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DESTINATIONS.map((d, i) => (
              <DestinationCard key={d.name} d={d} index={i} />
            ))}
          </div>
<<<<<<< HEAD
          </div>
      </section>
    </SiteLayout>
  );
}
=======
        </div>
      </section>
    </SiteLayout>
  );
}
>>>>>>> 9c9e85c18e6c8bc96dd1590965d696eb60cbd36f
