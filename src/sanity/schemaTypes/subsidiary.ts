import { defineField, defineType, type Rule } from "sanity";

export const subsidiary = defineType({
  name: "subsidiary",
  title: "Subsidiary",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Card Image",
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
      name: "whatsapp",
      title: "WhatsApp Number",
      description: "Include country code, e.g. +234...",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "about",
      title: "About",
      description: "Long-form description shown on the detail page",
      type: "text",
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "services",
      title: "What We Do",
      type: "array",
      of: [
        {
          type: "object",
          name: "subsidiaryService",
          fields: [
            { name: "title", title: "Title", type: "string", validation: (r: Rule) => r.required() },
            { name: "description", title: "Description", type: "text", rows: 2, validation: (r: Rule) => r.required() },
          ],
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 99,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
      media: "image",
    },
  },
});