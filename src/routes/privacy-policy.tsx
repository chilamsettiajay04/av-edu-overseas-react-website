import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import {
  getPrivacyPolicy,
  getSiteSettingsShared,
  getHeroSections,
  type PrivacyPolicyData,
  type SiteSettings,
  type HeroSection,
} from "@/sanity/queries";
import { breadcrumbSchema, webpageSchema, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  loader: async () => {
    const [data, siteSettings, heroSections] = await Promise.all([
      getPrivacyPolicy(),
      getSiteSettingsShared(),
      getHeroSections(),
    ]);
    const hero = heroSections.find((h) => h.page === "privacy-policy");
    return { data, siteSettings, hero };
  },
  head: ({ loaderData }) => {
    const { data, siteSettings } = loaderData as {
      data: PrivacyPolicyData | null;
      siteSettings: SiteSettings | null;
    };
    const name = siteSettings?.companyName || "Av Edu Overseas Consultancy";
    const title = data?.metaTitle || `Privacy Policy — ${name}`;
    const desc =
      data?.metaDescription ||
      `Read the Privacy Policy of ${name} — learn how we collect, use, and protect your personal information.`;
    const siteUrl = "https://rad-architecture-showcase.vercel.app/privacy-policy";
    const schemas = [
      webpageSchema(title, desc, siteUrl),
      breadcrumbSchema([
        { name: "Home", url: "https://rad-architecture-showcase.vercel.app" },
        { name: "Privacy Policy", url: siteUrl },
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
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  const { data, hero } = Route.useLoaderData() as {
    data: PrivacyPolicyData | null;
    siteSettings: SiteSettings | null;
    hero: HeroSection | undefined;
  };

  if (!data) return null;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const slide = hero?.slides?.[0];

  return (
    <SiteLayout>
      <PageHero
        title={slide?.heading || data.title}
        subtitle={slide?.subtitle || "How we collect, use, and protect your information"}
        image={slide?.image}
      />
      <section className="bg-white">
        <div className="pi-section">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Last Updated: {formatDate(data.lastUpdated)}
              </p>
              {data.sections.map((section, i) => (
                <div key={i}>
                  {i === 0 && (
                    <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{section.heading}</h2>
                  )}
                  {i > 0 && <h2 className="mt-12 text-2xl font-semibold">{section.heading}</h2>}
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                    {section.body}
                  </p>
                  {section.listItems && section.listItems.length > 0 && (
                    <ul className="mt-4 list-disc pl-6 space-y-2 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                      {section.listItems.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <div className="mx-auto mt-16 h-px w-16 bg-primary" />
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
