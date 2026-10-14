export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Subsidiaries", href: "/subsidiaries" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
  { label: "Products", href: "/products" },
  { label: "More", href: "#", children: [
    { label: "Reviews", href: "/reviews" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Projects", href: "/projects" },
    { label: "Careers", href: "/careers" },
    { label: "FAQs", href: "/faqs" },
  ]},
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Leadership", href: "/about/leadership" },
    { label: "Mission & Vision", href: "/about/mission-vision-values" },
    { label: "Careers", href: "/careers" },
  ],
  services: [
    { label: "All Services", href: "/services" },
    { label: "Training", href: "/services/training" },
    { label: "Consultancy", href: "/services/consultancy" },
    { label: "Farm Setup & Design", href: "/services/farm-setup-design" },
    { label: "Pond Construction", href: "/services/pond-construction" },
    { label: "Pond Lease", href: "/services/pond-lease" },
    { label: "Hatchery & Broodstock", href: "/services/hatchery-broodstock" },
  ],
  subsidiaries: [
    { label: "Sejfarms Ventures", href: "/subsidiaries/sejfarms-ventures" },
    { label: "Mosnerifoods", href: "/subsidiaries/mosnerifoods" },
    { label: "AIID Institute", href: "/subsidiaries/aiid-institute" },
  ],
  resources: [
    { label: "Knowledge Hub", href: "/knowledge-hub" },
    { label: "Reviews", href: "/reviews" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "FAQs", href: "/faqs" },
  ],
} as const;

export const footerQuicklinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Subsidiaries", href: "/subsidiaries" },
  { label: "Products", href: "/products" },
  { label: "Reviews", href: "/reviews" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
  { label: "Careers", href: "/careers" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
  { label: "Work With Us", href: "/work-with-us" },
] as const;