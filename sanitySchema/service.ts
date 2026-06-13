import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "service_icon_name",
      title: "Icon Name",
      description: "Lucide React icon identifier.",
      type: "string",
      initialValue: "GraduationCap",
      options: {
        list: [
          { title: "Graduation Cap (University Admissions)", value: "GraduationCap" },
          { title: "File Check (Visa Assistance)", value: "FileCheck" },
          { title: "Globe (Immigration Consulting)", value: "Globe2" },
          { title: "Compass (Career Counseling)", value: "Compass" },
          { title: "Book Open (Test Prep)", value: "BookOpen" },
          { title: "Home (Post-Arrival Support)", value: "Home" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "service_title",
      title: "Service Title",
      description: 'e.g. "University Admissions", "Student Visa Assistance".',
      type: "string",
      initialValue: "University Admissions",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "service_description",
      title: "Description",
      description: "Short one-line description of the service.",
      type: "string",
      initialValue: "End-to-end application support for top universities worldwide",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "service_display_number",
      title: "Display Number",
      description: 'Optional decorative number e.g. "01", "02", "03".',
      type: "string",
      initialValue: "01",
    }),
    defineField({
      name: "service_sort_order",
      title: "Sort Order",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 1,
    }),
  ],
});
