import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Star } from "lucide-react";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { useSEO } from "@/lib/useSEO";
import { organizationSchema, webpageSchema, breadcrumbSchema } from "@/lib/seo";
import {
  getTestimonials,
  getSiteSettingsShared,
  getHeroSections,
  type TestimonialData,
  type SiteSettings,
  type HeroSection,
} from "@/sanity/queries";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TestimonialsPage() {
  const { testimonials, hero, siteSettings } = useLoaderData() as {
    testimonials: TestimonialData[];
    siteSettings: SiteSettings | null;
    hero: HeroSection | undefined;
  };
  const slide = hero?.slides?.[0];

  const name = siteSettings?.companyName || "Av Edu Overseas Consultancy";
  const title = `Student Success Stories — ${name}`;
  const desc =
    "Read inspiring success stories from students who achieved their study abroad dreams with Av Edu Overseas Consultancy.";
  useSEO({
    title,
    description: desc,
    canonicalPath: "/testimonials",
    jsonLd: [
      organizationSchema(siteSettings),
      webpageSchema(title, desc, "https://av-edu-overseas-react-website.vercel.app/testimonials"),
      breadcrumbSchema([
        { name: "Home", url: "https://av-edu-overseas-react-website.vercel.app/" },
        {
          name: "Testimonials",
          url: "https://av-edu-overseas-react-website.vercel.app/testimonials",
        },
      ]),
    ],
  });

  const [selected, setSelected] = useState<TestimonialData | null>(null);

  const isLong = (text: string) => text.length > 150;

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
                  <div className="mt-4 flex-1 flex flex-col">
                    <p className="text-lg italic leading-relaxed text-foreground line-clamp-3">
                      "{t.testimonial_quote}"
                    </p>
                    {isLong(t.testimonial_quote) && (
                      <button
                        onClick={() => setSelected(t)}
                        className="mt-2 text-sm font-medium text-primary hover:underline text-left self-start"
                      >
                        Read more
                      </button>
                    )}
                  </div>
                  <div className="mt-6 border-t border-border pt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-primary/10">
                        {t.testimonial_profile_image ? (
                          <img
                            src={t.testimonial_profile_image}
                            alt={t.testimonial_student_name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-primary">
                            {t.testimonial_student_name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.testimonial_student_name}</p>
                        <p className="w-fit text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                          {t.testimonial_student_country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-primary/10">
                {selected?.testimonial_profile_image ? (
                  <img
                    src={selected.testimonial_profile_image}
                    alt={selected.testimonial_student_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-primary">
                    {selected?.testimonial_student_name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold">{selected?.testimonial_student_name}</p>
                <p className="w-fit text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {selected?.testimonial_student_country}
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-1 text-muted-foreground mb-2">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star
                key={k}
                className={`h-4 w-4 ${selected && k < selected.testimonial_rating ? "fill-current text-yellow-500" : "text-muted-foreground"}`}
              />
            ))}
          </div>
          <p className="text-base italic leading-relaxed text-foreground">
            "{selected?.testimonial_quote}"
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            — {selected?.testimonial_student_name}, {selected?.testimonial_student_country}
          </p>
        </DialogContent>
      </Dialog>
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
