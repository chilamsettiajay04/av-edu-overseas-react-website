import { defineType, defineField } from "sanity";

export default defineType({
  name: "stat",
  title: "Stat",
  type: "document",
  fields: [
    defineField({
      name: "stat_value",
      title: "Value",
      description: 'e.g. "15,000+", "98%"',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stat_label",
      title: "Label",
      description: 'e.g. "Students Placed", "Visa Success Rate"',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stat_sort_order",
      title: "Sort Order",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 1,
    }),
  ],
});
