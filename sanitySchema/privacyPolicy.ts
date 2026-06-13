import { defineType, defineField } from "sanity";

export default defineType({
  name: "privacyPolicy",
  title: "Privacy Policy",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Privacy Policy",
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
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=80",
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
          heading: "Introduction",
          body: 'Av Edu Overseas Consultancy ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
        },
        {
          heading: "Information We Collect",
          body: "We may collect personal information that you voluntarily provide to us when you fill out a contact form, subscribe to our newsletter, or communicate with us. This may include your name, email address, phone number, and educational background.",
        },
        {
          heading: "How We Use Your Information",
          body: "We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations. We do not sell your personal information to third parties.",
          listItems: [
            "To respond to your inquiries and provide consultation services",
            "To process applications and supporting documentation",
            "To send administrative information, such as updates and support messages",
            "To comply with applicable laws and regulations",
          ],
        },
        {
          heading: "Data Protection",
          body: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.",
        },
        {
          heading: "Your Rights",
          body: "Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal data. You may also have the right to withdraw consent or object to certain processing activities.",
        },
        {
          heading: "Contact Us",
          body: "If you have any questions about this Privacy Policy, please contact us at info@radoverseas.com or call +1.305.643.4771.",
        },
      ],
    }),
    defineField({
      name: "metaTitle",
      title: "SEO Meta Title",
      type: "string",
      initialValue: "Privacy Policy — Av Edu Overseas Consultancy",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Meta Description",
      type: "text",
      rows: 2,
      initialValue:
        "Av Edu Overseas Consultancy Privacy Policy — how we collect, use, and protect your personal information.",
    }),
  ],
});
