import { defineType, defineField } from "sanity";

export default defineType({
  name: "mainCta",
  title: "Main CTA (Call to Action)",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Small uppercase label above the heading.",
      initialValue: "Get Started Today",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Your Global Journey Starts Here",
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "text",
      rows: 3,
      initialValue:
        "Book a free consultation with our experts and take the first step toward studying, working, or living abroad.",
    }),
    defineField({
      name: "image",
      title: "Background Image URL",
      type: "url",
      description: "Background image for the CTA section.",
      initialValue:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "Book a Consultation",
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "string",
      description: "Internal route path or external URL.",
      initialValue: "/contact",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "label",
    },
  },
});
