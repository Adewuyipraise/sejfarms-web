import { defineField, defineType } from "sanity";

export const trainingPartner = defineType({
  name: "trainingPartner",
  title: "Training Partner",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Partner Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "program",
      title: "Program / Collaboration",
      type: "string",
      description: "e.g., Innovative Youth Project on Fish Value Addition",
    }),
    defineField({
      name: "logo", // <-- Added image field
      title: "Partner Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "year",
      title: "Year (Optional)",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 99,
    }),
  ],
});