import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "General",
          "Services",
          "Training & Internships",
          "Products",
          "Investment",
          "Working With Us",
          "Aquaculture",
          "Consultancy",
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      description: "Lower numbers appear first within the category",
      type: "number",
      initialValue: 99,
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category",
    },
  },
});