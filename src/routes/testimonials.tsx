import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Student Success Stories — Av Edu" },
      { name: "description", content: "Read real student success stories from Av Edu alumni studying around the world." },
      { property: "og:title", content: "Student Success Stories — Av Edu" },
      { property: "og:description", content: "Hear from students who built their global careers with us." },
    ],
  }),
  component: Testimonials,
});

const TESTIMONIALS = [
  { name: "Priya Mehta", country: "Canada", quote: "Av Edu made my PR process seamless. From documentation to landing in Toronto — they were with me at every step." },
  { name: "Arjun Reddy", country: "United Kingdom", quote: "Got admitted to my dream university in London. The counselors knew exactly which programs fit my profile." },
  { name: "Sneha Patel", country: "Australia", quote: "I was rejected once before. With Av Edu's guidance, my second visa application was approved in three weeks." },
  { name: "Mohammed Ali", country: "Germany", quote: "Tuition-free engineering in Munich felt impossible. Av Edu turned it into reality with honest, careful planning." },
  { name: "Kavya Iyer", country: "United States", quote: "From SOP edits to F-1 mock interviews — every detail was handled with care. Now I'm at a top US grad school." },
  { name: "Rohan Sharma", country: "New Zealand", quote: "The post-arrival support was a lifesaver. They helped me with housing and a bank account in week one." },
];

function Testimonials() {
  return (
    <SiteLayout>
      <PageHero
        title="Student Success Stories"
        subtitle="Real journeys. Real outcomes."
        image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2400&q=80"
      />
      <section className="bg-white">
          <div className="pi-section">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name}>
                <div
                  className="flex h-full flex-col bg-card p-8 shadow-sm"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="flex gap-1 text-muted-foreground">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-lg italic leading-relaxed text-foreground">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{t.country}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          </div>
      </section>
    </SiteLayout>
  );
}