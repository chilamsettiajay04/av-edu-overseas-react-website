import { useLoaderData } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import { useSEO } from "@/lib/useSEO";
import { organizationSchema, webpageSchema, localBusinessSchema } from "@/lib/seo";
import { submitToSheet } from "@/lib/sheetSubmit";
import {
  getDestinations,
  getSiteSettingsShared,
  getHeroSections,
  type Office,
  type SiteSettings,
  type DestinationListItem,
  type HeroSection,
} from "@/sanity/queries";

// ----------------------------------------------------------------------
// OfficeInfoPanel – single office (no tabs)
// ----------------------------------------------------------------------
function OfficeInfoPanel({
  office,
  googleMapsApiKey,
}: {
  office: Office;
  googleMapsApiKey: string | undefined;
}) {
  const mapSrc =
    office?.officeAddress && googleMapsApiKey
      ? `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(office.officeAddress)}`
      : office?.officeAddress
        ? `https://maps.google.com/maps?q=${encodeURIComponent(office.officeAddress)}&output=embed`
        : "";

  const googleMapsLink = office?.officeAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.officeAddress)}`
    : "#";

  return (
    <div className="flex flex-col md:flex-row min-h-105 overflow-hidden">
      {/* Dark left panel */}
      <div className="bg-[#0d1b2e] text-white md:w-2/5 flex flex-col justify-between p-10">
        <div>
          <h3 className="text-xl font-semibold mb-1">{office.officeTitle}</h3>
          {office.isMainBranch && (
            <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
              Main Branch
            </span>
          )}
          {office.officeAddress && (
            <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-line my-6">
              {office.officeAddress}
            </p>
          )}
          {office.officePhone && (
            <p className="text-sm text-slate-300 mb-1">
              <span className="text-white font-medium">Voice: </span>
              {office.officePhone}
            </p>
          )}
          {office.officeEmail && (
            <p className="text-sm text-slate-300 mb-1">
              <span className="text-white font-medium">Email: </span>
              {office.officeEmail}
            </p>
          )}
          {office.officeHours && office.officeHours.length > 0 && (
            <p className="text-sm text-slate-300 mt-3">{office.officeHours.join(" · ")}</p>
          )}
        </div>
        <a
          href={googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white pb-0.5 hover:opacity-70 transition-opacity mt-8 w-fit"
        >
          Open in Google Maps →
        </a>
      </div>

      {/* Map right panel */}
      <div className="md:w-3/5 h-72 md:h-auto">
        {mapSrc ? (
          <iframe
            title={`${office.officeTitle} Location`}
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "420px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="flex h-full min-h-[420px] items-center justify-center bg-muted text-muted-foreground">
            Map not available
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// OfficeTabs – multiple offices (tabs + panel)
// ----------------------------------------------------------------------
function OfficeTabs({
  offices,
  googleMapsApiKey,
}: {
  offices: Office[];
  googleMapsApiKey: string | undefined;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = offices[activeIndex];

  const activeMapSrc =
    active?.officeAddress && googleMapsApiKey
      ? `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(active.officeAddress)}`
      : active?.officeAddress
        ? `https://maps.google.com/maps?q=${encodeURIComponent(active.officeAddress)}&output=embed`
        : "";

  const googleMapsLink = active?.officeAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(active.officeAddress)}`
    : "#";

  return (
    <div>
      {/* Tabs row */}
      <div className="flex justify-center gap-0 mb-8 overflow-x-auto">
        {offices.map((office, i) => (
          <button
            key={office.officeTitle}
            onClick={() => setActiveIndex(i)}
            className={`
              relative shrink-0 px-6 py-4 text-sm font-medium transition-colors
              ${
                i === activeIndex
                  ? "border-b-2 border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }
            `}
          >
            {office.officeTitle}
          </button>
        ))}
      </div>

      {/* Panel: dark info left + map right */}
      <div className="flex flex-col md:flex-row min-h-105 overflow-hidden">
        <div className="bg-[#0d1b2e] text-white md:w-2/5 flex flex-col justify-between p-10">
          <div>
            <h3 className="text-xl font-semibold mb-1">{active.officeTitle}</h3>
            {active.isMainBranch && (
              <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                Main Branch
              </span>
            )}
            {active.officeAddress && (
              <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-line my-6">
                {active.officeAddress}
              </p>
            )}
            {active.officePhone && (
              <p className="text-sm text-slate-300 mb-1">
                <span className="text-white font-medium">Voice: </span>
                {active.officePhone}
              </p>
            )}
            {active.officeEmail && (
              <p className="text-sm text-slate-300 mb-1">
                <span className="text-white font-medium">Email: </span>
                {active.officeEmail}
              </p>
            )}
            {active.officeHours && active.officeHours.length > 0 && (
              <p className="text-sm text-slate-300 mt-3">{active.officeHours.join(" · ")}</p>
            )}
          </div>
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white pb-0.5 hover:opacity-70 transition-opacity mt-8 w-fit"
          >
            Open in Google Maps →
          </a>
        </div>
        <div className="md:w-3/5 h-72 md:h-auto">
          {activeMapSrc ? (
            <iframe
              key={activeMapSrc}
              title={`${active.officeTitle} Location`}
              src={activeMapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex h-full min-h-[420px] items-center justify-center bg-muted text-muted-foreground">
              Map not available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// ContactPage
// ----------------------------------------------------------------------
export default function ContactPage() {
  const { destinations, hero } = useLoaderData() as {
    destinations: DestinationListItem[];
    siteSettings: SiteSettings | null;
    hero: HeroSection | undefined;
  };
  const s = useSiteSettings();
  const slide = hero?.slides?.[0];
  const [submitting, setSubmitting] = useState(false);

  const name = s?.companyName || "Av Edu Overseas Consultancy";
  const title = `Contact — ${name}`;
  const desc =
    "Get in touch with Av Edu Overseas Consultancy. Contact our team for personalized overseas education and immigration guidance.";
  const lbSchema = localBusinessSchema(s);
  useSEO({
    title,
    description: desc,
    canonicalPath: "/contact",
    jsonLd: [
      organizationSchema(s),
      webpageSchema(title, desc, "https://av-edu-overseas-react-website.vercel.app/contact"),
      ...(lbSchema ? [lbSchema] : []),
    ],
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    try {
      await submitToSheet({
        source: "contact",
        name: (fd.get("name") as string) || "",
        email: (fd.get("email") as string) || "",
        phone: (fd.get("phone") as string) || "",
        destination: (fd.get("destination") as string) || "",
        message: (fd.get("message") as string) || "",
      });
      form.reset();
      toast.success("Thanks! Our team will reach out within one business day.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
            <form onSubmit={onSubmit} className="space-y-1 bg-card shadow-sm sm:p-10">
              <input name="_hp" type="text" className="sr-only" tabIndex={-1} autoComplete="off" />
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                <input
                  required
                  name="name"
                  placeholder="Full Name"
                  className="border border-border bg-transparent px-4 py-3 text-sm focus:border-primary focus:outline-none"
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="border border-border bg-transparent px-4 py-3 text-sm focus:border-primary focus:outline-none"
                />
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  className="border border-border bg-transparent px-4 py-3 text-sm focus:border-primary focus:outline-none"
                />
                <select
                  required
                  name="destination"
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
                name="message"
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

          {/* Office section: tabs only if multiple offices */}
          <div className="mt-8">
            <Reveal>
              {displayOffices.length > 1 ? (
                <OfficeTabs offices={displayOffices} googleMapsApiKey={googleMapsApiKey} />
              ) : displayOffices.length === 1 ? (
                <OfficeInfoPanel office={displayOffices[0]} googleMapsApiKey={googleMapsApiKey} />
              ) : null}
            </Reveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

async function loader() {
  const [destinations, siteSettings, heroSections] = await Promise.all([
    getDestinations(),
    getSiteSettingsShared(),
    getHeroSections(),
  ]);
  const hero = heroSections.find((h) => h.page === "contact");
  return { destinations, siteSettings, hero };
}

ContactPage.loader = loader;
