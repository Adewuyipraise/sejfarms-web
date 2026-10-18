import { defineField, defineType, type Rule } from "sanity";

export const galleryAlbum = defineType({
  name: "galleryAlbum",
  title: "Gallery Album",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Album Title",
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Farms", "Trainings", "Events", "Teams", "Products", "Other"],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (r) => r.required().min(2000).max(2100),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      description:
        "Drag and drop multiple images here. Captions are optional — expand each image to add one.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional — shows in the lightbox",
            },
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    }),
    defineField({
      name: "videos",
      title: "Videos",
      description:
        "Add video URLs (YouTube, Vimeo, or direct .mp4 links).",
      type: "array",
      of: [
        {
          type: "object",
          name: "videoItem",
          fields: [
            {
              name: "url",
              title: "Video URL",
              type: "url",
              validation: (r: Rule) => r.required(),
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional",
            },
          ],
          preview: {
            select: {
              title: "caption",
              subtitle: "url",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});