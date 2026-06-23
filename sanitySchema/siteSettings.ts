import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "identity", title: "Identity" },
    { name: "footer", title: "Footer" },
    { name: "social", title: "Social Media" },
    { name: "contact", title: "Contact" },
    { name: "offices", title: "Offices" },
    { name: "about", title: "About" },
    { name: "seo", title: "SEO Defaults" },
  ],
  fields: [
    // ── Identity ──
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      initialValue: "Av Edu",
      group: "identity",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyLogoDark",
      title: "Company Logo  (Dark Variant)",
      type: "image",
      group: "identity",
      description: "Dark logo variant for light backgrounds.",
    }),
    defineField({
      name: "companyShortLogoDark",
      title: "Company Short Logo  (Dark Variant)",
      type: "image",
      group: "identity",
      description: "Dark logo variant for light backgrounds.",
    }),
    defineField({
      name: "companyLogoLight",
      title: "Company Logo (Light Variant)",
      type: "image",
      group: "identity",
      description: "Light logo variant for dark backgrounds.",
    }),
    defineField({
      name: "companyShortLogoLight",
      title: "Company Short Logo (Light Variant)",
      type: "image",
      group: "identity",
      description: "Light logo variant for dark backgrounds.",
    }),
    defineField({
      name: "logoTagline",
      title: "Logo Tagline",
      type: "string",
      initialValue: "Overseas Consultancy",
      group: "identity",
    }),
    defineField({
      name: "companyTagline",
      title: "Company Tagline",
      type: "string",
      initialValue: "Your Gateway to Global Opportunities",
      group: "identity",
    }),

    // ── Footer ──
    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "text",
      rows: 3,
      initialValue:
        "A trusted boutique consultancy guiding students and professionals through overseas education and immigration journeys since 2012.",
      group: "footer",
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      initialValue: "© 2024. Av Edu. All rights reserved.",
      group: "footer",
    }),

    // ── Social Media ──
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      group: "social",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Twitter / X", value: "twitter" },
                  { title: "Facebook", value: "facebook" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Threads", value: "threads" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "Profile URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "handle",
              title: "Handle (optional)",
              description: 'e.g. "@AvEdu"',
              type: "string",
            }),
          ],
        },
      ],
      initialValue: [
        { platform: "twitter", url: "https://x.com/AvEdu", handle: "@AvEdu" },
        { platform: "facebook", url: "https://facebook.com/AvEdu" },
        { platform: "linkedin", url: "https://linkedin.com/company/avedu" },
        { platform: "instagram", url: "https://instagram.com/AvEdu" },
      ],
    }),

    // ── Contact ──
    defineField({
      name: "primaryPhone",
      title: "Primary Phone",
      type: "string",
      initialValue: "+1.305.643.4771",
      group: "contact",
    }),
    defineField({
      name: "primaryEmail",
      title: "Primary Email",
      type: "string",
      initialValue: "info@radoverseas.com",
      group: "contact",
    }),

    // ── Offices ──
    defineField({
      name: "offices",
      title: "Offices",
      type: "array",
      group: "offices",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "officeTitle",
              title: "Office Title",
              type: "string",
              initialValue: "India Office",
              validation: (Rule) => Rule.required(),
            }),

            // ✅ NEW FIELD
            defineField({
              name: "isMainBranch",
              title: "Main Branch?",
              type: "boolean",
              initialValue: false,
              description: "Mark this office as the main branch",
            }),

            defineField({
              name: "officeAddress",
              title: "Address",
              type: "text",
              rows: 2,
              initialValue: "Banjara Hills, Hyderabad, Telangana, India 500034",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "officePhone",
              title: "Phone",
              type: "string",
              initialValue: "+91 98765 43210",
            }),
            defineField({
              name: "officeEmail",
              title: "Email",
              type: "string",
              initialValue: "india@radoverseas.com",
            }),
            defineField({
              name: "officeHours",
              title: "Business Hours",
              type: "array",
              of: [{ type: "string" }],
              initialValue: ["Monday–Friday 10:00am–7:00pm (IST)", "Sat–Sun Closed"],
            }),
            defineField({
              name: "officeMapUrl",
              title: "Google Maps URL (optional)",
              type: "url",
            }),
          ],
        },
      ],
      initialValue: [
        {
          officeTitle: "Hyderabad Office",
          isMainBranch: true, // ✅ default main branch
          officeAddress: "Banjara Hills, Hyderabad, Telangana, India 500034",
          officePhone: "+91 98765 43210",
          officeEmail: "india@radoverseas.com",
          officeHours: ["Mon–Fri 10:00am–7:00pm (IST)", "Sat–Sun Closed"],
        },
      ],
    }),

    // ── About ──
    defineField({
      name: "aboutHeading",
      title: "About — Section Heading",
      type: "string",
      initialValue: "Built on Trust, Driven by Results",
      group: "about",
    }),
    defineField({
      name: "aboutDescription",
      title: "About — Description",
      type: "text",
      rows: 5,
      initialValue:
        "Founded over a decade ago, Av Edu has helped thousands of students and professionals achieve their global ambitions. We combine deep regulatory expertise with personalized counseling, walking with you from your first application to your first day abroad — and beyond. Honesty, transparency, and long-term outcomes define everything we do.",
      group: "about",
    }),
    defineField({
      name: "aboutDescription2",
      title: "About — Description_2",
      type: "text",
      rows: 5,
      initialValue:
        "From the moment you walk through our doors to the day you set foot on foreign soil, our team of seasoned counselors stands by your side with personalised guidance, transparent processes, and a genuine commitment to turning your aspirations into achievements.",
      group: "about",
    }),
    defineField({
      name: "homeAboutDescription",
      title: "Home - About — Description",
      type: "text",
      rows: 5,
      initialValue:
        "Founded over a decade ago, Av Edu has helped thousands of students and professionals achieve their global ambitions. We combine deep regulatory expertise with personalized counseling, walking with you from your first application to your first day abroad — and beyond. Honesty, transparency, and long-term outcomes define everything we do.",
      group: "about",
    }),
    defineField({
      name: "HomeAboutDescription2",
      title: "Home - About — Description 2",
      type: "text",
      rows: 5,
      initialValue:
        "From the moment you walk through our doors to the day you set foot on foreign soil, our team of seasoned counselors stands by your side with personalised guidance, transparent processes, and a genuine commitment to turning your aspirations into achievements.",
      group: "about",
    }),
    defineField({
      name: "homeAboutVideo",
      title: "Home - About — Video",
      type: "url",
      description: "Add YouTube or Vimeo video link",
      group: "about",
    }),
    defineField({
      name: "missionLabel",
      title: "About — Mission Label",
      type: "string",
      initialValue: "Our Mission",
      group: "about",
    }),
    defineField({
      name: "missionQuote",
      title: "About — Mission Quote",
      type: "text",
      rows: 3,
      initialValue:
        '"To empower every student and professional with honest guidance, transparent processes, and unwavering support — turning their dream of studying or living abroad into a successful reality."',
      group: "about",
    }),
    defineField({
      name: "missionBgImage",
      title: "About — Mission Background Image URL",
      type: "url",
      description: "Background image for the mission quote section.",
      group: "about",
    }),

    // ── SEO Defaults ──
    defineField({
      name: "seoTitle",
      title: "SEO — Default Site Title",
      type: "string",
      initialValue: "Av Edu — Your Gateway to Global Opportunities",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO — Default Meta Description",
      type: "text",
      rows: 2,
      initialValue:
        "Av Edu — Your gateway to global education and immigration opportunities. We guide students and professionals through study abroad, visa, and immigration journeys across 25+ countries.",
      group: "seo",
    }),
    defineField({
      name: "seoOgImage",
      title: "SEO — Default Open Graph Image",
      type: "image",
      group: "seo",
    }),
  ],
});
