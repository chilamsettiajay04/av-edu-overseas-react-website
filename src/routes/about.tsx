import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — RAD Overseas Consultancy" },
      { name: "description", content: "Learn about RAD Overseas Consultancy — our story, our team, and our mission to guide students worldwide." },
      { property: "og:title", content: "About Us — RAD Overseas Consultancy" },
      { property: "og:description", content: "Our story, our team, our mission." },
    ],
  }),
  component: About,
});

const TEAM = [
  { name: "Rakesh A. Desai", role: "Founder & CEO", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" },
  { name: "Anita Sharma", role: "Head of Admissions", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
  { name: "David Chen", role: "Senior Immigration Advisor", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
];

function About() {
  return (
    <SiteLayout>
      <PageHero
        title="About Us"
        subtitle="Our story, our team, our mission"
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80"
      />
      <section className="bg-background px-6 py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Who We Are</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Built on Trust, Driven by Results</h2>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
            Founded over a decade ago, RAD Overseas Consultancy has helped thousands of students and
            professionals achieve their global ambitions. We combine deep regulatory expertise with
            personalized counseling, walking with you from your first application to your first day
            abroad — and beyond. Honesty, transparency, and long-term outcomes define everything we do.
          </p>
        </Reveal>
      </section>
      <section className="bg-[#f4f2ee] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Our Team</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Meet the Experts</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {TEAM.map((m, i) => (
              <Reveal key={m.name}>
                <div
                  className="bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-lg"
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <img src={m.photo} alt={m.name} className="mx-auto h-32 w-32 rounded-full object-cover" />
                  <h3 className="mt-6 text-xl font-semibold">{m.name}</h3>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-gold">{m.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}