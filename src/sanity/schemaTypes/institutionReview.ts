import { defineField, defineType } from "sanity";

export const institutionReview = defineType({
  name: "institutionReview",
  title: "Institution Review",
  type: "document",
  fields: [
    defineField({
      name: "institution",
      title: "Institution Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "institution" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "faculty",
      title: "Faculty",
      type: "string",
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "pdfUrl",
      title: "Original Letter (PDF)",
      description: "Upload the original signed review letter",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "institution",
      subtitle: "department",
    },
  },
});