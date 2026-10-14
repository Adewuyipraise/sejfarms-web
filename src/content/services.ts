import type { Service, ServiceGroup } from "@/types";

export const services: Service[] = [
  // Group: Farm Operations & Infrastructure
  { slug: "pond-construction",         title: "Pond Construction",                       shortDescription: "High-quality earthen and concrete ponds built for productivity.",              groupSlug: "farm-operations" },
  { slug: "pond-lease",                title: "Pond Lease",                              shortDescription: "Access to constructed, production-ready ponds without land ownership.",         groupSlug: "farm-operations" },
  { slug: "hatchery-broodstock",       title: "Fish Hatchery & Broodstock Bank",         shortDescription: "Quality fingerlings and genetically superior broodstock.",                      groupSlug: "farm-operations" },
  { slug: "cage-culture",              title: "Cage Culture Design, Setup & Management", shortDescription: "Open-water cage systems for optimised production.",                             groupSlug: "farm-operations" },
  { slug: "farm-inputs",               title: "Farm Inputs & Accessories Supply",        shortDescription: "Feed, aeration, pumps, supplements, and handling equipment.",                   groupSlug: "farm-operations" },
  { slug: "farmland-acquisition",      title: "Farmland Acquisition & Recommendations",  shortDescription: "Identifying and acquiring suitable farmland for fish farming.",                 groupSlug: "farm-operations" },
  { slug: "ornamental-fisheries",      title: "Ornamental Fisheries & Aquarium Designs", shortDescription: "Setup and management of ornamental fish farms and aquariums.",                  groupSlug: "farm-operations" },

  // Group: Consultancy & Investment
  { slug: "consultancy",               title: "Consultancy",                             shortDescription: "Personalised consulting for challenges, growth, and optimisation.",             groupSlug: "consultancy-investment" },
  { slug: "farm-setup-design",         title: "Farm Set Up & Design",                    shortDescription: "Site selection, layout, and integrated systems design.",                        groupSlug: "consultancy-investment" },
  { slug: "investment-planning",       title: "Aquaculture Investment Planning",         shortDescription: "Comprehensive investment plans aligned with financial goals.",                  groupSlug: "consultancy-investment" },
  { slug: "investment-opportunities",  title: "Investment Opportunities",                shortDescription: "Partner with us in new or expanding fish farms with feasibility studies.",      groupSlug: "consultancy-investment" },

  // Group: Training & Development
  { slug: "training",                  title: "Training for Existing & Intending Farmers", shortDescription: "Practical and theoretical training in fish farming and management.",          groupSlug: "training-development" },
  { slug: "internship",                title: "Internship Programs",                     shortDescription: "Structured placements for students, graduates, and individuals.",               groupSlug: "training-development" },
  { slug: "staff-training",            title: "Staff Training & Recruitment",            shortDescription: "Technical and management training via AIID Institute.",                         groupSlug: "training-development" },

  // Group: Innovation & Specialty
  { slug: "research-development",      title: "Research & Development",                  shortDescription: "Applied research in breeding, feed, health, and sustainability.",               groupSlug: "innovation-specialty" },

  // Group: Market & Value Chain
  { slug: "sales-marketing",           title: "Sales & Marketing",                       shortDescription: "Market identification, strategy, and buyer connections for farmers.",           groupSlug: "market-value-chain" },
  { slug: "fish-value-addition",       title: "Fish Value Addition",                     shortDescription: "Processing, preservation, and packaging via Mosnerifoods.",                     groupSlug: "market-value-chain" },
];

export const serviceGroups: ServiceGroup[] = [
  {
    slug: "farm-operations",
    number: "01",
    title: "Farm Operations & Infrastructure",
    description:
      "Everything you need to establish and run a productive fish farm — from pond construction and hatchery operations through to inputs and open-water systems.",
    services: services.filter((s) => s.groupSlug === "farm-operations"),
  },
  {
    slug: "consultancy-investment",
    number: "02",
    title: "Consultancy & Investment",
    description:
      "Technical consulting, farm design, investment planning, and opportunities to partner with us in the growing aquaculture sector.",
    services: services.filter((s) => s.groupSlug === "consultancy-investment"),
  },
  {
    slug: "training-development",
    number: "03",
    title: "Training & Development",
    description:
      "Practical training for farmers and interns, plus staff training and recruitment services through AIID Institute.",
    services: services.filter((s) => s.groupSlug === "training-development"),
  },
  {
    slug: "innovation-specialty",
    number: "04",
    title: "Innovation & Specialty",
    description:
      "Cutting-edge research and development advancing aquaculture practice — breeding, feed, biosecurity, and sustainability.",
    services: services.filter((s) => s.groupSlug === "innovation-specialty"),
  },
  {
    slug: "market-value-chain",
    number: "05",
    title: "Market & Value Chain",
    description:
      "Connecting farmers to buyers and transforming raw fish into higher-margin value-added products through Mosnerifoods.",
    services: services.filter((s) => s.groupSlug === "market-value-chain"),
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getGroupForService(slug: string) {
  const service = getServiceBySlug(slug);
  if (!service) return null;
  return serviceGroups.find((g) => g.slug === service.groupSlug) ?? null;
}