import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { Star } from "lucide-react";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import {
  getTestimonials,
  getSiteSettingsShared,
  getHeroSections,
  type TestimonialData,
  type SiteSettings,
  type HeroSection,
} from "@/sanity/queries";

export default function TestimonialsPage() {
  const { testimonials, hero, siteSettings } = useLoaderData() as {
    testimonials: TestimonialData[];
    siteSettings: SiteSettings | null;
    hero: HeroSection | undefined;
  };
  const slide = hero?.slides?.[0];

  useEffect(() => {
    const name = siteSettings?.companyName || "Av Edu Overseas Consultancy";
    document.title = `Student Success Stories — ${name}`;
  }, [siteSettings]);

  return (
    <SiteLayout>
      <PageHero
        title={slide?.heading || "Student Success Stories"}
        subtitle={slide?.subtitle || "Real journeys. Real outcomes."}
        image={slide?.image}
      />
      <section className="bg-white">
        <div className="pi-section">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t: TestimonialData, i: number) => (
              <Reveal key={t.testimonial_student_name}>
                <div
                  className="flex h-full flex-col bg-card p-8 shadow-sm"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="flex gap-1 text-muted-foreground">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star
                        key={k}
                        className={`h-4 w-4 ${k < t.testimonial_rating ? "fill-current text-yellow-500" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-lg italic leading-relaxed text-foreground">
                    "{t.testimonial_quote}"
                  </p>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="text-sm font-semibold">{t.testimonial_student_name}</p>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                      {t.testimonial_student_country}
                    </p>
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

async function loader() {
  const [testimonials, siteSettings, heroSections] = await Promise.all([
    getTestimonials(),
    getSiteSettingsShared(),
    getHeroSections(),
  ]);
  const hero = heroSections.find((h) => h.page === "testimonials");
  return { testimonials, siteSettings, hero };
}

TestimonialsPage.loader = loader;
