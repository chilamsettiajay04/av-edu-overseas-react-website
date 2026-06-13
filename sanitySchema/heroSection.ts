import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroSection",
  title: "Hero Sections",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Internal Label",
      type: "string",
      description: "Just so you know which is which in the list.",
      initialValue: "Home Page Hero",
    }),
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "home",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "About", value: "about" },
          { title: "Contact", value: "contact" },
          { title: "Destinations", value: "destinations" },
          { title: "Services", value: "services" },
          { title: "Testimonials", value: "testimonials" },
          { title: "Privacy Policy", value: "privacy-policy" },
          { title: "Terms & Conditions", value: "terms-conditions" },
        ],
      },
    }),
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      description: "For the home page, add multiple slides that rotate. For other pages, just add one.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Background Image URL",
              type: "url",
              description: "Paste an image URL (Unsplash, etc.)",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              description: "Large hero text (e.g. 'Study in the United Kingdom')",
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
              description: "Smaller text below the heading (e.g. 'World-Class Universities Await')",
            }),
          ],
        },
      ],
      initialValue: [
        {
          image:
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2400&q=80",
          heading: "Study in the United Kingdom",
          subtitle: "World-Class Universities Await",
        },
        {
          image:
            "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=2400&q=80",
          heading: "Immigrate to Canada",
          subtitle: "Build Your Future in North America",
        },
        {
          image:
            "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=2400&q=80",
          heading: "Explore Australia & New Zealand",
          subtitle: "Live, Work, and Thrive",
        },
      ],
    }),
    defineField({
      name: "overlayOpacity",
      title: "Overlay Opacity",
      type: "number",
      description: "How dark the gradient overlay should be (0 = transparent, 100 = fully black).",
      initialValue: 75,
      validation: (Rule) => Rule.min(0).max(100),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "page",
      media: "slides.0.image",
    },
  },
});
