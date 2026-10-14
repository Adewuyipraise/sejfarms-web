import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
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
      name: "type",
      title: "Event Type",
      type: "string",
      options: {
        list: ["One-off", "Multi-day", "Online", "Application"],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      description: "Leave empty for one-off events",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "locationType",
      title: "Location Type",
      type: "string",
      options: {
        list: ["In-person", "Online", "Hybrid"],
      },
      initialValue: "In-person",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "requiresRegistration",
      title: "Requires Registration",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      description: "Leave empty for unlimited",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Event Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "past",
      title: "Past Event",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      media: "image",
    },
  },
});