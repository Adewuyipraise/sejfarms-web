/**
 * Downloadable resources served from `public/resources`.
 *
 * The `/api/resource-request` route resolves files from this allow-list so
 * that a client can never make the site email an arbitrary URL. Add new
 * resources here *and* drop the file into `public/resources/`.
 */
export const resources = [
  {
    slug: "aquaculture-startup-guide",
    title: "Aquaculture Startup Guide",
    file: "/resources/aquaculture-startup-guide.pdf",
  },
  {
    slug: "farm-business-plan-template",
    title: "Farm Business Plan Template",
    file: "/resources/farm-business-plan-template.xlsx",
  },
  {
    slug: "fish-farming-checklist",
    title: "Fish Farming Checklist",
    file: "/resources/fish-farming-checklist.pdf",
  },
  {
    slug: "fish-feeding-guide",
    title: "Fish Feeding Guide",
    file: "/resources/fish-feeding-guide.pdf",
  },
  {
    slug: "pond-management-guide",
    title: "Pond Management Guide",
    file: "/resources/pond-management-guide.pdf",
  },
] as const;

export type Resource = (typeof resources)[number];

export function getResource(slug: string): Resource | undefined {
  return resources.find((resource) => resource.slug === slug);
}
