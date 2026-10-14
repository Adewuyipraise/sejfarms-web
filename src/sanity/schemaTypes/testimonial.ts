import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      description: "e.g., Intern, Client, Student",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "institution",
      title: "Institution",
      description: "School, company, or — if none",
      type: "string",
      initialValue: "—",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      description: "Show on the homepage rotation",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "author" },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "institution",
      media: "photo",
    },
  },
});