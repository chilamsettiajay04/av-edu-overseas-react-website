import type { SiteSettings, FaqData, DestInfo } from "@/sanity/queries";

type BreadcrumbItem = { name: string; url: string };

export function organizationSchema(s: SiteSettings | null) {
  const name = s?.companyName || "Av Edu Overseas Consultancy";
  const phone = s?.primaryPhone || "+1.305.643.4771";
  const email = s?.primaryEmail || "info@radoverseas.com";
  const logo = s?.companyLogoDark || "/logo.png";
  const primaryOffice = s?.offices?.find((o) => o.isMainBranch) || s?.offices?.[0];

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: "https://rad-architecture-showcase.vercel.app",
    logo,
    description:
      s?.seoDescription || "Your gateway to global education and immigration opportunities.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phone,
      email,
      contactType: "customer service",
      availableLanguage: ["English"],
    },
    sameAs: s?.socialLinks?.map((l) => l.url).filter(Boolean) || [],
    ...(primaryOffice && {
      address: {
        "@type": "PostalAddress",
        streetAddress: primaryOffice.officeAddress?.split(",")[0]?.trim(),
        addressLocality: primaryOffice.officeAddress?.split(",").slice(-3, -1).join(",").trim(),
        addressCountry: primaryOffice.officeAddress?.split(",").pop()?.trim(),
      },
    }),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: FaqData[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function webpageSchema(title: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
  };
}

export function destinationSchema(dest: DestInfo, s: SiteSettings | null) {
  const name = s?.companyName || "Av Edu Overseas Consultancy";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Study in ${dest.name}`,
    description: dest.tagline,
    brand: { "@type": "Organization", name },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: dest.costOfStudy?.replace(/[^0-9.]/g, ""),
      offerCount: "1",
      availability: "https://schema.org/InStock",
    },
  };
}

export function localBusinessSchema(s: SiteSettings | null) {
  const name = s?.companyName || "Av Edu Overseas Consultancy";
  const phone = s?.primaryPhone || "+1.305.643.4771";
  const primaryOffice = s?.offices?.find((o) => o.isMainBranch) || s?.offices?.[0];

  if (!primaryOffice) return null;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    telephone: phone,
    image: s?.companyLogoDark || "/logo.png",
    url: "https://rad-architecture-showcase.vercel.app",
    ...(primaryOffice?.officeAddress && {
      address: {
        "@type": "PostalAddress",
        streetAddress: primaryOffice.officeAddress.split(",")[0]?.trim(),
        addressLocality: primaryOffice.officeAddress.split(",").slice(-2, -1)[0]?.trim(),
        addressCountry: primaryOffice.officeAddress.split(",").pop()?.trim(),
      },
    }),
    ...(primaryOffice?.officeHours && {
      openingHoursSpecification: primaryOffice.officeHours
        .map((h) => {
          const days = h.match(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/gi);
          const times = h.match(/(\d{1,2}:\d{2}(am|pm))\s*[-–]\s*(\d{1,2}:\d{2}(am|pm))/i);
          if (!days || !times) return null;
          return {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: days.map((d) => d.charAt(0).toUpperCase() + d.slice(1)),
            opens: times[1],
            closes: times[3],
          };
        })
        .filter(Boolean),
    }),
  };
}

export function jsonLdScript(data: Record<string, unknown>) {
  return {
    type: "application/ld+json",
    innerHTML: JSON.stringify(data),
  };
}
