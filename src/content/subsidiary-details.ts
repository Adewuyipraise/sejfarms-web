import type { SubsidiaryDetail } from "@/types";

export const subsidiaryDetails: Record<string, SubsidiaryDetail> = {
  "sejfarms-ventures": {
    slug: "sejfarms-ventures",
    about:
      "Sejfarms Ventures is the commercial and enterprise arm of Sejfarms Consults Limited. It develops and operates agricultural businesses across the aquaculture value chain — exploring opportunities to expand production, processing, and market reach.",
    heroImage: "/images/projects/fish-farm-development.jpg",
    services: [
      { title: "Commercial production",  description: "Direct aquaculture production at scale." },
      { title: "Venture development",    description: "Building and operating agricultural businesses within the group." },
      { title: "Investment projects",    description: "Structured opportunities for aquaculture investment." },
      { title: "Partnership ventures",   description: "Joint ventures with aligned partners." },
    ],
  },
  mosnerifoods: {
    slug: "mosnerifoods",
    about:
      "Mosnerifoods is the food processing and value-addition subsidiary of Sejfarms Consults Limited. It transforms fish into a range of high-quality, market-ready products — smoked and frozen steaks and fillets, kilishi, crackers, chinchin, oil, eggs, and more. Products are sold wholesale and retail, and supplied for corporate and social events.",
    heroImage: "/images/hero/processingbanner.jpg",
    services: [
      { title: "Fish processing",         description: "Smoking, freezing, and preparing fish to food-grade standards." },
      { title: "Value-added products",    description: "Smoked and frozen steaks and fillets, kilishi, crackers, chinchin, oil, eggs." },
      { title: "Packaging",               description: "Retail-ready packaging meeting regulatory requirements." },
      { title: "Wholesale & retail",      description: "Direct sales to individuals, retailers, and institutions." },
      { title: "Event catering",          description: "Indoor and outdoor supply for corporate and social events." },
      { title: "Service for farmers",     description: "Value addition services at affordable rates." },
    ],
  },
  "aiid-institute": {
    slug: "aiid-institute",
    about:
      "Aquaculture Incubation Innovation Development Centre (AIID Institute) is the training and development subsidiary of Sejfarms Consults Limited. It delivers structured training programmes for aquaculture professionals, interns, and staff of other organisations — building capacity across the industry.",
    heroImage: "/images/case-studies/farmer-capacity-programme.jpg",
    services: [
      { title: "Student internships",     description: "SIWES and extended placements for students and graduates." },
      { title: "Professional training",   description: "Technical and management courses for farm staff." },
      { title: "Staff recruitment",       description: "Sourcing skilled personnel from our professional network." },
      { title: "Custom programmes",       description: "Tailored training for non-aquaculture organisations." },
      { title: "Innovation projects",     description: "Applied development work improving industry practice." },
    ],
  },
};

export function getSubsidiaryDetail(slug: string) {
  return subsidiaryDetails[slug];
}