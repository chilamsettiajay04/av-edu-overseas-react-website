import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import {
  getDestinations,
  getSiteSettingsShared,
  getHeroSections,
  type Office,
  type SiteSettings,
  type DestinationListItem,
  type HeroSection,
} from "@/sanity/queries";
import { breadcrumbSchema, webpageSchema, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  loader: async () => {
    const [destinations, siteSettings, heroSections] = await Promise.all([
      getDestinations(),
      getSiteSettingsShared(),
      getHeroSections(),
    ]);
    const hero = heroSections.find((h) => h.page === "contact");
    return { destinations, siteSettings, hero };
  },
  head: ({ loaderData }) => {
    const { siteSettings } = loaderData as { siteSettings: SiteSettings | null };
    const name = siteSettings?.companyName || "Av Edu Overseas Consultancy";
    const title = `Contact — ${name}`;
    const desc = `Get in touch with ${name} — our team is ready to support your overseas education and immigration journey.`;
    const siteUrl = "https://rad-architecture-showcase.vercel.app/contact";
    const schemas = [
      webpageSchema(title, desc, siteUrl),
      breadcrumbSchema([
        { name: "Home", url: "https://rad-architecture-showcase.vercel.app" },
        { name: "Contact", url: siteUrl },
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
  component: Contact,
});

function Contact() {
  const { destinations, hero } = Route.useLoaderData() as {
    destinations: DestinationListItem[];
    siteSettings: SiteSettings | null;
    hero: HeroSection | undefined;
  };
  const s = useSiteSettings();
  const slide = hero?.slides?.[0];
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thanks! Our team will reach out within one business day.");
    }, 600);
  };

  const offices = s?.offices || [];
  const fallbackOffices: Office[] = [
    {
      officeTitle: "Miami Office",
      isMainBranch: true,
      officeAddress: "117 N.W. 42nd Ave., Suite CU #3, Miami, FL 33126",
      officePhone: "+1 305-643-4771",
      officeEmail: "info@radoverseas.com",
      officeHours: ["Mon–Fri 9:00am–6:00pm"],
    },
    {
      officeTitle: "Hyderabad Office",
      officeAddress: "Banjara Hills, Hyderabad, Telangana, India 500034",
      officePhone: "+91 98765 43210",
      officeEmail: "india@radoverseas.com",
      officeHours: ["Mon–Fri 10:00am–7:00pm (IST)"],
    },
  ];
  const displayOffices = offices.length > 0 ? offices : fallbackOffices;

  return (
    <SiteLayout>
      <PageHero
        title={slide?.heading || "Get In Touch"}
        subtitle={slide?.subtitle || "Tell us where you want to go — we'll help you get there"}
        image={slide?.image}
      />
      <section className="bg-white">
        <div className="pi-section">
          <Reveal>
            <form onSubmit={onSubmit} className="space-y-5 bg-card p-8 shadow-sm sm:p-10">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <input
                  required
                  placeholder="Full Name"
                  className="border border-border bg-transparent px-4 py-3 text-sm focus:border-primary focus:outline-none"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="border border-border bg-transparent px-4 py-3 text-sm focus:border-primary focus:outline-none"
                />
                <input
                  required
                  type="tel"
                  placeholder="Phone"
                  className="border border-border bg-transparent px-4 py-3 text-sm focus:border-primary focus:outline-none"
                />
                <select
                  required
                  defaultValue=""
                  className="border border-border bg-transparent px-4 py-3 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="" disabled>
                    Destination Country
                  </option>
                  {destinations.map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
              <textarea
                required
                rows={5}
                placeholder="Tell us about your goals"
                className="w-full resize-none border border-border bg-transparent px-4 py-3 text-sm focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full border border-primary bg-primary px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Submit"}
              </button>
            </form>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {displayOffices.map((o) => (
              <Reveal key={o.officeTitle}>
                <div className="h-full bg-card p-8 shadow-sm">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold">{o.officeTitle}</h3>
                    {o.isMainBranch && (
                      <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                        Main Branch
                      </span>
                    )}
                  </div>
                  <div className="mt-2 h-px w-10 bg-primary" />
                  <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      {o.officeAddress}
                    </li>
                    {o.officePhone && (
                      <li className="flex gap-3">
                        <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        {o.officePhone}
                      </li>
                    )}
                    {o.officeEmail && (
                      <li className="flex gap-3">
                        <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        {o.officeEmail}
                      </li>
                    )}
                    {o.officeHours && o.officeHours.length > 0 && (
                      <li className="flex gap-3">
                        <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        <span>
                          {o.officeHours.map((h) => (
                            <span key={h} className="block">
                              {h}
                            </span>
                          ))}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
