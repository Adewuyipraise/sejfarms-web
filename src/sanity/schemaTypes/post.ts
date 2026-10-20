import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Knowledge Hub Post",
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
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      title: "Post Type",
      type: "string",
      options: {
        list: [
          { title: "Article", value: "Article" },
          { title: "News", value: "News" },
          { title: "Social", value: "Social" },
        ],
        layout: "radio",
      },
      initialValue: "Article",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Aquaculture",
          "Farm Management",
          "Mosnerifoods",
          "Training",
          "Company News",
          "Partnership",
          "Industry",
          "Sustainability",
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Short summary shown on cards. Max 200 characters.",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "Sejfarms Team",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      validation: (r) => r.min(1).max(60),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" }, 
        { type: 'youtube' }, 
        { 
          type: "image", 
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
            {
              name: "alt",
              title: "Alt Text (for accessibility)",
              type: "string",
            }
          ]
        }], 
    }),
    defineField({
      name: "featured",
      title: "Featured",
      description: "Show this post on the homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "likes",
      title: "Likes",
      type: "number",
      initialValue: 0,
      readOnly: true, // So the admin can't accidentally change it manually
    }),    
    defineField({
      name: "externalUrl",
      title: "External URL",
      description: "For social posts that link out to Facebook, LinkedIn, etc.",
      type: "url",
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