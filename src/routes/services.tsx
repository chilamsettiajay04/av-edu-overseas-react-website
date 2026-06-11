import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, FileCheck, Globe2, Compass, BookOpen, Home } from "lucide-react";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Av Edu" },
      { name: "description", content: "End-to-end overseas education and immigration services — admissions, visa, immigration, career counseling and more." },
      { property: "og:title", content: "Our Services — Av Edu" },
      { property: "og:description", content: "Admissions, visa, immigration, and settlement support — under one roof." },
    ],
  }),
  component: Services,
});

const SERVICES = [
  { Icon: GraduationCap, title: "University Admissions", desc: "End-to-end application support for top universities", accent: "from-amber-600/20 to-amber-600/5", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
  { Icon: FileCheck, title: "Student Visa Assistance", desc: "Expert guidance for student visa applications", accent: "from-emerald-600/20 to-emerald-600/5", iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { Icon: Globe2, title: "Immigration Consulting", desc: "PR, skilled worker, and family visa pathways", accent: "from-blue-600/20 to-blue-600/5", iconBg: "bg-blue-50", iconColor: "text-blue-600" },
  { Icon: Compass, title: "Career Counseling", desc: "Find the right course and country for your goals", accent: "from-purple-600/20 to-purple-600/5", iconBg: "bg-purple-50", iconColor: "text-purple-600" },
  { Icon: BookOpen, title: "Test Preparation Referrals", desc: "IELTS, TOEFL, GRE, GMAT guidance", accent: "from-rose-600/20 to-rose-600/5", iconBg: "bg-rose-50", iconColor: "text-rose-600" },
  { Icon: Home, title: "Post-Arrival Support", desc: "Accommodation, banking, and settlement help", accent: "from-teal-600/20 to-teal-600/5", iconBg: "bg-teal-50", iconColor: "text-teal-600" },
];

function Services() {
  return (
    <SiteLayout>
      <PageHero
        title="Our Services"
        subtitle="Comprehensive support at every stage of your overseas journey"
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=80"
      />
      <section className="bg-white">
          <div className="pi-section">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ Icon, title, desc, accent, iconBg, iconColor }, i) => (
              <Reveal key={title}>
                <div
                  className="h-full group relative overflow-hidden bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${accent} opacity-100`}
                  />
                  <div className="relative z-10 flex flex-col items-start p-8">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconBg} ${iconColor} shadow-lg`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
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