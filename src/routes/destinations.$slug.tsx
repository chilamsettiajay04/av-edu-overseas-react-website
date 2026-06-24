import { useRef, useState } from "react";
import {
  Link,
  useLoaderData,
  useParams,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
import { SiteLayout, Reveal } from "@/components/site/SiteLayout";
import { Globe } from "lucide-react";
import { useSEO } from "@/lib/useSEO";
import { organizationSchema, webpageSchema, breadcrumbSchema, destinationSchema } from "@/lib/seo";
import {
  getDestinationBySlug,
  getSiteSettingsShared,
  type DestInfo,
  type SiteSettings,
} from "@/sanity/queries";

export default function DestinationDetailPage() {
  const { dest, siteSettings } = useLoaderData() as {
    dest: DestInfo;
    siteSettings: SiteSettings | null;
  };

  const { slug } = useParams();
  const name = siteSettings?.companyName || "Av Edu Overseas Consultancy";
  const title = `${dest.name} — Study Abroad with ${name}`;
  const desc = dest.tagline;
  useSEO({
    title,
    description: desc,
    canonicalPath: `/destinations/${slug}`,
    jsonLd: [
      organizationSchema(siteSettings),
      webpageSchema(
        title,
        desc,
        `https://av-edu-overseas-react-website.vercel.app/destinations/${slug}`,
      ),
      breadcrumbSchema([
        { name: "Home", url: "https://av-edu-overseas-react-website.vercel.app/" },
        {
          name: "Destinations",
          url: "https://av-edu-overseas-react-website.vercel.app/destinations",
        },
        {
          name: dest.name,
          url: `https://av-edu-overseas-react-website.vercel.app/destinations/${slug}`,
        },
      ]),
      destinationSchema(dest, siteSettings),
    ],
  });

  const stats = [
    { label: dest.statTuitionLabel || "Tuition / Year", value: dest.costOfStudyShort },
    { label: dest.statLivingCostLabel || "Living Cost", value: dest.costOfLivingShort },
    { label: dest.statRankingLabel || "Global Ranking", value: dest.rankingShort },
    { label: dest.statIntakesLabel || "Intakes", value: dest.intakes?.length ? dest.intakes.join(", ") : "N/A" },
    { label: dest.statWorkRightsLabel || "Work Rights", value: dest.workRightsShort },
  ];

  // Tab state for Universities/Visa/Courses/Scholarships
  const [activeTab, setActiveTab] = useState<"universities" | "visa" | "courses" | "scholarships">("universities");

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
      <div className="relative z-10 mx-auto -mt-14 max-w-7xl px-6">
        <p className="text-[12px] text-white/70 mb-4 text-center">
          All amounts are shown in {dest.name} currency
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px overflow-hidden rounded-xl border border-border bg-border shadow-xl">
          {stats.map((s, i) => (
            <div key={s.label} className={`bg-white p-6 md:p-8 ${i === stats.length - 1 ? "col-span-2 md:col-span-1" : ""}`}>
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
          <div className="grid gap-6 md:gap-12 md:grid-cols-3">
            <div className="col-span-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                {dest.overviewSectionLabel || "Overview"}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">{dest.overviewHeading}</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">{dest.overview}</p>
            </div>
            <div>
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

      {/* Universities & Visa - New Toggle + Grid Section */}
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

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-2 md:flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => setActiveTab("universities")}
                className={`px-6 py-3 text-sm font-medium transition-all md:rounded-l-lg ${
                  activeTab === "universities"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-200`}
              >
                Universities
              </button>
              <button
                onClick={() => setActiveTab("courses")}
                className={`px-6 py-3 text-sm font-medium transition-all ${
                  activeTab === "courses"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-200`}
              >
                Courses
              </button>
              <button
                onClick={() => setActiveTab("visa")}
                className={`px-6 py-3 text-sm font-medium transition-all ${
                  activeTab === "visa"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-200`}
              >
                Visa Options
              </button>
              <button
                onClick={() => setActiveTab("scholarships")}
                className={`px-6 py-3 text-sm font-medium transition-all md:rounded-r-lg ${
                  activeTab === "scholarships"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-200`}
              >
                Scholarships
              </button>
            </div>
          </div>

          {/* Universities Grid */}
          {activeTab === "universities" && (
            <div>
              {(!dest.universities || dest.universities.length === 0) ? (
                <p className="text-center text-muted-foreground py-12">
                  No universities listed for {dest.name} yet.
                </p>
              ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
              {[...dest.universities]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((u, index) => (
                  <div
                    key={u.name}
                    className="group relative bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col items-start justify-between">
                      <div className="text-xs mb-1 flex items-start justify-between w-full">
                        <span className=" text-xs font-medium text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {u.badge && (
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            {u.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 pr-2">{u.name}</h3>
                    </div>
                </div>
              ))}
            </div>
              )}
            </div>
          )}

          {/* Courses Grid */}
          {activeTab === "courses" && (
            <div>
              {(!dest.courses || dest.courses.length === 0) ? (
                <p className="text-center text-muted-foreground py-12">
                  No courses available for {dest.name} at the moment.
                </p>
              ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
              {dest.courses.map((c) => (
                <div
                  key={c.name + c.university}
                  className="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="mb-3">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {c.level}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900">{c.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{c.university}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span>Duration: {c.duration}</span>
                    <span className="text-primary font-semibold">Fees: {c.fees}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed flex-1">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>
              )}
            </div>
          )}

          {/* Visa Options Grid */}
          {activeTab === "visa" && (
            <div>
              {(!dest.visaOptions || dest.visaOptions.length === 0) ? (
                <p className="text-center text-muted-foreground py-12">
                  No visa options listed for {dest.name} yet.
                </p>
              ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
              {dest.visaOptions.map((v) => (
                <div
                  key={v.name}
                  className="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-900">{v.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
              )}
            </div>
          )}

          {/* Scholarships Grid */}
          {activeTab === "scholarships" && (
            <div>
              {(!dest.scholarships || dest.scholarships.length === 0) ? (
                <p className="text-center text-muted-foreground py-12">
                  No scholarship information available for {dest.name} yet.
                </p>
              ) : (
                <div className="max-w-3xl mx-auto">
                  <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Eligibility Criteria
                    </h3>
                    <ul className="space-y-3">
                      {dest.scholarships.map((criteria, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 leading-relaxed">{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
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

export function DestinationErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
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
    );
  }

  const message = error instanceof Error ? error.message : "Something went wrong";

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-serif text-4xl mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-8">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="inline-block border border-primary bg-primary px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
        >
          Try again
        </button>
      </div>
    </SiteLayout>
  );
}

async function loader({ params }: { params: { slug?: string } }) {
  const [dest, siteSettings] = await Promise.all([
    getDestinationBySlug(params.slug!),
    getSiteSettingsShared(),
  ]);
  if (!dest) throw new Response("Not Found", { status: 404 });
  return { dest, siteSettings };
}

DestinationDetailPage.loader = loader;
