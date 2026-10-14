import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subline",
      title: "Subline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "contactPhone",
      title: "Primary Phone",
      type: "string",
    }),
    defineField({
      name: "contactWhatsapp",
      title: "WhatsApp Number",
      type: "string",
    }),
    defineField({
      name: "contactEmail",
      title: "Primary Email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "socialFacebook",
      title: "Facebook URL",
      type: "url",
    }),
    defineField({
      name: "socialInstagram",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "socialLinkedin",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "socialYoutube",
      title: "YouTube URL",
      type: "url",
    }),
    defineField({
      name: "socialTiktok",
      title: "TikTok URL",
      type: "url",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});