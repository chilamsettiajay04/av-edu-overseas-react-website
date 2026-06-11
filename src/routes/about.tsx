import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Av Edu" },
      { name: "description", content: "Learn about Av Edu — our story, and our mission to guide students worldwide." },
      { property: "og:title", content: "About Us — Av Edu" },
      { property: "og:description", content: "Our story and our mission." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <PageHero
        title="About Us"
        subtitle="Our story, our team, our mission"
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80"
      />
      <section className="bg-white">
        <div className="pi-section">
        <Reveal className="text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Who We Are</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Built on Trust, Driven by Results</h2>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
            Founded over a decade ago, Av Edu has helped thousands of students and
            professionals achieve their global ambitions. We combine deep regulatory expertise with
            personalized counseling, walking with you from your first application to your first day
            abroad — and beyond. Honesty, transparency, and long-term outcomes define everything we do.
          </p>
        </Reveal>
        </div>
      </section>
      <section
        className="w-full"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,15,15,0.7), rgba(15,15,15,0.7)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Reveal className="text-center pi-section">
          <p className="text-[10px] uppercase tracking-[0.45em] text-white/60">Our Mission</p>
          <blockquote className="mt-10 text-2xl font-light italic leading-relaxed text-white sm:text-3xl md:text-4xl">
            "To empower every student and professional with honest guidance, transparent processes,
            and unwavering support — turning their dream of studying or living abroad into a
            successful reality."
          </blockquote>
          <div className="mx-auto mt-10 h-px w-16 bg-primary" />
        </Reveal>
      </section>
    </SiteLayout>
  );
}