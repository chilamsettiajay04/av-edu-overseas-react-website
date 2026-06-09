import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, FileCheck, Globe2, Compass, BookOpen, Home } from "lucide-react";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — RAD Overseas Consultancy" },
      { name: "description", content: "End-to-end overseas education and immigration services — admissions, visa, immigration, career counseling and more." },
      { property: "og:title", content: "Our Services — RAD Overseas Consultancy" },
      { property: "og:description", content: "Admissions, visa, immigration, and settlement support — under one roof." },
    ],
  }),
  component: Services,
});

const SERVICES = [
  { Icon: GraduationCap, title: "University Admissions", desc: "End-to-end application support for top universities" },
  { Icon: FileCheck, title: "Student Visa Assistance", desc: "Expert guidance for student visa applications" },
  { Icon: Globe2, title: "Immigration Consulting", desc: "PR, skilled worker, and family visa pathways" },
  { Icon: Compass, title: "Career Counseling", desc: "Find the right course and country for your goals" },
  { Icon: BookOpen, title: "Test Preparation Referrals", desc: "IELTS, TOEFL, GRE, GMAT guidance" },
  { Icon: Home, title: "Post-Arrival Support", desc: "Accommodation, banking, and settlement help" },
];

function Services() {
  return (
    <SiteLayout>
      <PageHero
        title="Our Services"
        subtitle="Comprehensive support at every stage of your overseas journey"
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=80"
      />
      <section className="bg-background px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ Icon, title, desc }, i) => (
              <Reveal key={title}>
                <div
                  className="h-full bg-card p-8 shadow-sm transition-all hover:shadow-xl"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <Icon className="h-10 w-10 text-gold" />
                  <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}