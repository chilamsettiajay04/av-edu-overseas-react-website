import { defineType, defineField } from "sanity";

export default defineType({
  name: "termsConditions",
  title: "Terms & Conditions",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Terms & Conditions",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "date",
      initialValue: "2024-01-01",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImageUrl",
      title: "Hero Background Image URL",
      type: "url",
      initialValue:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2400&q=80",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "body",
              title: "Body Content",
              type: "text",
              rows: 5,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "listItems",
              title: "Bullet Points (optional)",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
      initialValue: [
        {
          heading: "Acceptance of Terms",
          body: "By accessing or using the Av Edu website and services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use our website or services.",
        },
        {
          heading: "Services",
          body: "Av Edu Overseas Consultancy provides educational consulting and immigration guidance services. We assist students and professionals with university applications, visa processing, and related documentation. All services are provided on a best-effort basis, and outcomes are not guaranteed.",
        },
        {
          heading: "User Responsibilities",
          body: "As a user of our services, you agree to provide accurate, complete, and up-to-date information. You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account.",
          listItems: [
            "Provide truthful and accurate personal and academic information",
            "Submit all required documents in a timely manner",
            "Comply with all applicable laws and regulations",
            "Not misuse our website or services for any unlawful purpose",
          ],
        },
        {
          heading: "Intellectual Property",
          body: "All content on this website, including text, graphics, logos, and images, is the property of Av Edu Overseas Consultancy and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.",
        },
        {
          heading: "Limitation of Liability",
          body: "Av Edu Overseas Consultancy shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or services. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim.",
        },
        {
          heading: "Changes to Terms",
          body: "We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting to this page. Your continued use of our services after any changes constitutes acceptance of the new terms.",
        },
        {
          heading: "Contact Us",
          body: "If you have any questions about these Terms & Conditions, please contact us at info@radoverseas.com or call +1.305.643.4771.",
        },
      ],
    }),
    defineField({
      name: "metaTitle",
      title: "SEO Meta Title",
      type: "string",
      initialValue: "Terms & Conditions — Av Edu Overseas Consultancy",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Meta Description",
      type: "text",
      rows: 2,
      initialValue:
        "Av Edu Overseas Consultancy Terms & Conditions — the terms governing your use of our website and services.",
    }),
  ],
});
