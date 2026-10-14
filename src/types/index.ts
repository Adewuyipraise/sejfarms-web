// ============================================================
// Core primitives
// ============================================================

export interface Metric {
  value: string;
  label: string;
  verified: boolean;
}

export interface ValueProp {
  title: string;
  description: string;
}

export interface Partner {
  name: string;
  logo: string;
  url?: string;
}

// ============================================================
// Leadership
// ============================================================

export interface Leader {
  name: string;
  role: string;
  bio: string;
  photo?: string;
}

// ============================================================
// Services (grouped)
// ============================================================

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  groupSlug: string;
  image?: string;
}

export interface ServiceGroup {
  slug: string;
  number: string;
  title: string;
  description: string;
  services: Service[];
}

export interface ServiceDetail {
  slug: string;
  overview: string;
  offering?: { title: string; description: string }[];
  process?: { step: string; title: string; description: string }[];
  faqs?: { q: string; a: string }[];
  heroImage?: string;
}

// ============================================================
// Subsidiaries
// ============================================================

export interface Subsidiary {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  href: string;
  image?: string;
  whatsapp?: string;
  heroImage?: string;   
  email?: string;
}

export interface SubsidiaryDetail {
  slug: string;
  about: string;
  heroImage?: string;
  services: { title: string; description: string }[];
}

// ============================================================
// Products (empty until admin populates)
// ============================================================

export type ProductCategory =
  | "Smoked Fish"
  | "Frozen Fish"
  | "Fish Snacks"
  | "Fish Derivatives"
  | "Fresh Fish";

export interface Product {
  slug: string;
  name: string;
  price: number;
  unit: string;
  category: ProductCategory;
  description: string;
  image?: string;
  sizes?: string[];
  available: boolean;
}

// ============================================================
// Testimonials
// ============================================================

export interface Testimonial {
  slug: string;
  author: string;
  role: string;
  institution: string;
  quote: string;
  photo?: string;
  featured?: boolean;
}

export interface InstitutionReview {
  slug: string;
  institution: string;
  faculty?: string;
  department: string;
  summary: string;
  pdfUrl?: string;
  featured?: boolean;
}

// ============================================================
// Events
// ============================================================

export type EventType =
  | "One-off"
  | "Multi-day"
  | "Online"
  | "Application";

export interface Event {
  slug: string;
  title: string;
  type: EventType;
  startDate: string;
  endDate?: string;
  location: string;
  locationType: "In-person" | "Online" | "Hybrid";
  description: string;
  requiresRegistration: boolean;
  capacity?: number;
  image?: string;
  publishedAt: string;
  past: boolean;
}

// ============================================================
// Gallery (album-based)
// ============================================================

export type GalleryCategory =
  | "Farms"
  | "Trainings"
  | "Events"
  | "Teams"
  | "Products"
  | "Other";

export interface GalleryMedia {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  caption?: string;
}

export interface GalleryAlbum {
  slug: string;
  title: string;
  description?: string;
  category: GalleryCategory;
  year: number;
  coverImage: string;
  media: GalleryMedia[];
}

// ============================================================
// Projects
// ============================================================

export interface Project {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  challenge: string;
  approach: string[];
  outcome: string[];
  image: string;
  featured: boolean;
}

// ============================================================
// Knowledge Hub (articles, news, social media posts)
// ============================================================

export type PostType = "Article" | "News" | "Social";

export type PostCategory =
  | "Aquaculture"
  | "Farm Management"
  | "Value Addition"
  | "Training"
  | "Company News"
  | "Partnership"
  | "Industry"
  | "Sustainability";

export interface Post {
  slug: string;
  type: PostType;
  title: string;
  excerpt: string;
  category: PostCategory;
  author: string;
  publishedAt: string;
  readingTime: number;
  coverImage?: string;
  body: string[];
  featured?: boolean;
  externalUrl?: string;
}

// ============================================================
// Careers
// ============================================================

export type JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Volunteer";

export interface JobPosting {
  slug: string;
  title: string;
  department: string;
  type: JobType;
  location: string;
  postedAt: string;
  closesAt?: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  howToApply: string;
  open: boolean;
}


// ============================================================
// Legacy aliases (kept for backward compat — will be removed)
// ============================================================

export type Article = Post;
export type NewsPost = Post;
export type CaseStudy = Project;


// ============================================================
// FAQs
// ============================================================

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}


export interface Resource {
  slug: string;
  title: string;
  description: string;
  format: string;
  fileSize: string;
  fileUrl: string;
  category: string;
  gated: boolean;
}


export type Business = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
  image?: string;
};

// ============================================================
// Contact / Enquiry
// ============================================================

export const INTEREST_OPTIONS = [
  "Training",
  "Consultancy",
  "Farm Setup & Design",
  "Pond Construction",
  "Pond Lease",
  "Hatchery & Broodstock",
  "Investment",
  "Internship",
  "Staff Training",
  "Farm Inputs",
  "Farmland Acquisition",
  "Ornamental Fisheries",
  "Cage Culture",
  "Products",
  "Partnership",
  "Careers",
  "Other",
] as const;

export type Interest = (typeof INTEREST_OPTIONS)[number];