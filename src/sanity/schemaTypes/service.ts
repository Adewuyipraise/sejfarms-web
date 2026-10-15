import { defineField, defineType, type Rule } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "groupSlug",
      title: "Group",
      type: "string",
      options: {
        list: [
          { title: "Farm Operations & Infrastructure", value: "farm-operations" },
          { title: "Consultancy & Investment", value: "consultancy-investment" },
          { title: "Training & Development", value: "training-development" },
          { title: "Innovation & Specialty", value: "innovation-specialty" },
          { title: "Market & Value Chain", value: "market-value-chain" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      description: "Used as the background on the detail page",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "overview",
      title: "Overview",
      description: "Long-form intro paragraph for the detail page",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "offering",
      title: "What We Offer",
      type: "array",
      of: [
        {
          type: "object",
          name: "offeringItem",
          fields: [
            { name: "title", title: "Title", type: "string", validation: (r: Rule) => r.required() },
            { name: "description", title: "Description", type: "text", rows: 2, validation: (r: Rule) => r.required() },
          ],
        },
      ],
    }),
    defineField({
      name: "process",
      title: "How We Work",
      type: "array",
      of: [
        {
          type: "object",
          name: "processStep",
          fields: [
            { name: "step", title: "Step Number", type: "string", validation: (r: Rule) => r.required() },
            { name: "title", title: "Title", type: "string", validation: (r: Rule) => r.required() },
            { name: "description", title: "Description", type: "text", rows: 2, validation: (r: Rule) => r.required() },
          ],
        },
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          name: "faq",
          fields: [
            { name: "q", title: "Question", type: "string", validation: (r: Rule) => r.required() },
            { name: "a", title: "Answer", type: "text", rows: 3, validation: (r: Rule) => r.required() },
          ],
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      description: "Lower numbers appear first within the group",
      type: "number",
      initialValue: 99,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "groupSlug",
      media: "image",
    },
  },
});