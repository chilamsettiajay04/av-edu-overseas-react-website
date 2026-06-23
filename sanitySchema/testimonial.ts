import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "testimonial_student_name",
      title: "Student Name",
      type: "string",
      initialValue: "Priya Mehta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "testimonial_profile_image",
      title: "Profile Image",
      type: "image",
      description: "Upload the student's profile photo.",
      options: { hotspot: true },
    }),
    defineField({
      name: "testimonial_student_country",
      title: "Country Studied In",
      description: "The destination country the student studied in.",
      type: "string",
      initialValue: "Canada",
    }),
    defineField({
      name: "testimonial_quote",
      title: "Quote",
      description: "The student's testimonial text.",
      type: "text",
      rows: 4,
      initialValue:
        "Av Edu made my PR process seamless. From documentation to landing in Toronto — they were with me at every step.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "testimonial_rating",
      title: "Rating (1–5)",
      description: "Star rating out of 5.",
      type: "number",
      initialValue: 5,
      options: { list: [1, 2, 3, 4, 5] },
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "testimonial_display_order",
      title: "Display Order",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 1,
    }),
  ],
});
