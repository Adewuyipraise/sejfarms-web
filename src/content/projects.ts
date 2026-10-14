import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "fish-farm-development",
    title: "Fish Farm Development",
    category: "Aquaculture",
    location: "Nigeria",
    year: "2024",
    description:
      "End-to-end design, pond construction, stocking, and technical support for a commercial fish farm.",
    challenge: "Detailed challenge narrative to be added via admin.",
    approach: [
      "Site assessment covering water source, soil, drainage, and access.",
      "Farm layout design to match production volume and site.",
      "Pond construction with quality control at each stage.",
      "Stocking from Sejfarms broodstock lines.",
      "Ongoing technical support through the first production cycle.",
    ],
    outcome: [
      "Farm operational and stocked within schedule.",
      "First full production cycle completed with viable yield.",
      "Client capable of running routine operations independently.",
    ],
    image: "/images/projects/fish-farm-development.jpg",
    featured: true,
  },
  {
    slug: "sustainable-crop-production",
    title: "Sustainable Crop Production",
    category: "Agriculture",
    location: "Nigeria",
    year: "2024",
    description:
      "Sustainable crop production programme integrating soil health, irrigation, and farmer training.",
    challenge: "Detailed challenge narrative to be added via admin.",
    approach: [
      "Soil testing and amendment planning.",
      "Irrigation system design and installation.",
      "Farmer training on sustainable practices.",
    ],
    outcome: ["Improved yields and soil health.", "Farmers trained on sustainable practices."],
    image: "/images/projects/sustainable-crop-production.jpg",
    featured: true,
  },
  {
    slug: "farmer-capacity-development",
    title: "Farmer Capacity Development Programme",
    category: "Training",
    location: "Nigeria",
    year: "2023",
    description:
      "Structured training programme equipping farmers with practical aquaculture and agribusiness skills.",
    challenge: "Detailed challenge narrative to be added via admin.",
    approach: [
      "Diagnostic sessions on current practices.",
      "Structured on-farm training.",
      "Follow-up visits and mentoring.",
    ],
    outcome: ["Consistent practices adopted across participants.", "Measurable improvement in performance."],
    image: "/images/projects/farmer-capacity-development.jpg",
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}