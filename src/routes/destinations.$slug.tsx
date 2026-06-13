import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, Reveal } from "@/components/site/SiteLayout";
import { Globe } from "lucide-react";
import {
  getDestinationBySlug,
  getSiteSettingsShared,
  type DestInfo,
  type SiteSettings,
} from "@/sanity/queries";
import { breadcrumbSchema, webpageSchema, destinationSchema, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/destinations/$slug")({
  loader: async ({ params: { slug } }) => {
    const [dest, siteSettings] = await Promise.all([
      getDestinationBySlug(slug),
      getSiteSettingsShared(),
    ]);
    if (!dest) throw notFound();
    return { dest, siteSettings };
  },
  head: ({ loaderData }) => {
    const data = loaderData as { dest: DestInfo; siteSettings: SiteSettings | null } | undefined;
    if (!data) return { meta: [{ title: "Destination" }] };
    const name = data.siteSettings?.companyName || "Av Edu Overseas Consultancy";
    const title = `${data.dest.name} — Study Abroad with ${name}`;
    const desc = `Study, work, and immigrate to ${data.dest.name}. Tuition, cost of living, top universities, and visa pathways.`;
    const siteUrl = `https://rad-architecture-showcase.vercel.app/destinations/${data.dest.name.toLowerCase().replace(/\s+/g, "-")}`;
    const schemas = [
      webpageSchema(title, desc, siteUrl),
      destinationSchema(data.dest, data.siteSettings),
      breadcrumbSchema([
        { name: "Home", url: "https://rad-architecture-showcase.vercel.app" },
        { name: "Destinations", url: "https://rad-architecture-showcase.vercel.app/destinations" },
        { name: data.dest.name, url: siteUrl },
      ]),
    ];
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content: `study in ${data.dest.name}, ${data.dest.name} universities, ${data.dest.name} student visa, study abroad ${data.dest.name}, immigration ${data.dest.name}`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: data.dest.tagline },
        { property: "og:url", content: siteUrl },
        { property: "og:image", content: data.dest.heroImage },
        { property: "og:image:alt", content: `Study in ${data.dest.name}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: data.dest.tagline },
        { name: "twitter:image", content: data.dest.heroImage },
      ],
      links: [{ rel: "canonical", href: siteUrl }],
      scripts: schemas.map(jsonLdScript),
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-serif text-5xl mb-4">Destination not found</h1>
        <p className="text-muted-foreground mb-8">
          We don't have a guide for this destination yet.
        </p>
        <Link
          to="/"
          className="inline-block border border-primary bg-primary px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
        >
          Back home
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error, reset }: { error: Error; reset: () => void }) => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-serif text-4xl mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-8">{error.message}</p>
        <button
          onClick={reset}
          className="inline-block border border-primary bg-primary px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
        >
          Try again
        </button>
      </div>
    </SiteLayout>
  ),
  component: DestinationDetail,
});

function DestinationDetail() {
  const { dest } = Route.useLoaderData() as { dest: DestInfo; siteSettings: SiteSettings | null };

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [gridStyle, setGridStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const measure = () => {
      if (leftRef.current && rightRef.current) {
        if (window.innerWidth >= 768) {
          const leftH = leftRef.current.scrollHeight;
          const rightH = rightRef.current.scrollHeight;
          setGridStyle({ maxHeight: Math.min(leftH, rightH) });
        } else {
          setGridStyle({});
        }
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [dest]);

  const stats = [
    { label: dest.statTuitionLabel || "Tuition / Year", value: dest.costOfStudyShort },
    { label: dest.statLivingCostLabel || "Living Cost", value: dest.costOfLivingShort },
    { label: dest.statRankingLabel || "Global Ranking", value: dest.rankingShort },
    { label: dest.statWorkRightsLabel || "Work Rights", value: dest.workRightsShort },
  ];

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative h-[44vh] min-h-[320px] w-full overflow-hidden bg-black">
        <img
          src={dest.heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.45em] text-white/60">{dest.region}</p>
          <h1 className="mt-4 font-serif text-4xl font-light text-white sm:text-5xl md:text-6xl">
            {dest.name}
          </h1>
          <p className="mt-4 max-w-2xl text-sm tracking-wide text-white/80 sm:text-base">
            {dest.tagline}
          </p>
        </div>
      </section>

      {/* Stats Row */}
      <div className="relative z-10 mx-auto -mt-12 max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-xl border border-border bg-border shadow-xl">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-6 md:p-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-2 text-xl font-bold tracking-tight text-foreground">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Overview + Highlights */}
      <section className="bg-white">
        <div className="pi-section">
          <div className="grid gap-6 md:gap-12 md:grid-cols-2">
            <div ref={leftRef}>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                {dest.overviewSectionLabel || "Overview"}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">{dest.overviewHeading}</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">{dest.overview}</p>
            </div>
            <div ref={rightRef}>
              <div className="rounded-2xl pt-0 md:pt-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {dest.keyHighlightsHeading || "Key Highlights"}
                </h3>
                <ul className="mt-4 space-y-3">
                  {dest.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="text-blue-600">→</span>
                      <span className="text-gray-700">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Fact */}
      <section
        className="relative overflow-hidden"
        style={
          dest.funFactBg
            ? {
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${dest.funFactBg}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : { backgroundColor: "#000" }
        }
      >
        <div className="pi-section">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,80,180,0.10),transparent_60%)]" />

          <Reveal className="relative z-10 text-center max-w-3xl mx-auto">
            <Globe className="mx-auto h-10 w-10 text-white/60" />
            <p className="mt-4 text-xs uppercase tracking-[0.4em] text-white/60">
              {dest.funFactLabel}
            </p>
            <p className="mt-6 text-lg italic leading-relaxed text-white/90 sm:text-xl">
              "{dest.funFact}"
            </p>
          </Reveal>
        </div>
      </section>

      {/* Universities & Visa */}
      <section className="bg-[#fafafa]">
        <div className="pi-section">
          <Reveal className="mb-14 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              {dest.academicsLabel || "Academics & Immigration"}
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              {dest.academicsHeading || "Premier Institutions & Visa Pathways"}
            </h2>
          </Reveal>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-xl overflow-hidden"
            style={gridStyle}
          >
            <div ref={leftRef} className="bg-white p-10 md:p-12 md:overflow-y-auto">
              <h3 className="text-2xl font-semibold mb-8">
                {dest.universitiesHeading || "Leading Universities"}
              </h3>
              <div className="space-y-5">
                {dest.universities.map((u, i) => (
                  <div
                    key={u.name}
                    className="group flex items-center justify-between border-b border-border pb-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-muted-foreground tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {u.name}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      {u.badge}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div ref={rightRef} className="bg-card p-10 md:p-12 md:overflow-y-auto">
              <h3 className="text-2xl font-semibold mb-8">
                {dest.visaOptionsHeading || "Visa Options"}
              </h3>
              <div className="space-y-4">
                {dest.visaOptions.map((v) => (
                  <div
                    key={v.name}
                    className="rounded-xl border border-border bg-white p-6 shadow-sm"
                  >
                    <p className="font-bold">{v.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{v.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="w-full py-24"
        style={{
          backgroundImage: `linear-gradient(rgba(15,15,15,0.85), rgba(15,15,15,0.85)), url('${dest.heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Reveal className="text-center pi-section">
          <p className="text-[10px] uppercase tracking-[0.45em] text-white/60">
            {dest.ctaLabel || "Get Started Today"}
          </p>
          <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            {(dest.ctaHeadingTemplate || "Ready to start your {{country}} journey?").replace(
              "{{country}}",
              dest.name,
            )}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80">
            {(
              dest.ctaDescriptionTemplate ||
              "Speak with our expert consultants today and receive a personalized roadmap for your {{country}} education."
            ).replace("{{country}}", dest.name)}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-block border border-primary bg-primary px-12 py-4 text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
            >
              {dest.ctaButtonText || "Book Free Consultation"}
            </Link>
            <Link
              to="/destinations"
              className="inline-block border border-white/30 px-12 py-4 text-[11px] uppercase tracking-[0.3em] text-white transition-all duration-300 hover:border-primary hover:text-primary"
            >
              {dest.browseAllButtonText || "Browse All Destinations"}
            </Link>
          </div>
          <div className="mx-auto mt-10 h-px w-16 bg-primary" />
        </Reveal>
      </section>
    </SiteLayout>
  );
}
