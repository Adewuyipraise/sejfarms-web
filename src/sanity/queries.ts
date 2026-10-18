import { groq } from "next-sanity";

/**
 * Shared GROQ fragments.
 *
 * `PUBLISHED_FILTER` excludes draft documents and anything with a future
 * `publishedAt`, so unpublished/scheduled content never leaks onto the site
 * (or into `generateStaticParams` / the sitemap).
 */
const PUBLISHED_FILTER = `!(_id in path("drafts.**")) && (!defined(publishedAt) || publishedAt <= now())`;

// ---------- Posts ----------
export const POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && ${PUBLISHED_FILTER}] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    type,
    category,
    excerpt,
    author,
    publishedAt,
    readingTime,
    "coverImage": coverImage.asset->url,
    body[] {
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      }
    },
    featured,
    externalUrl
  }
`;

export const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    type,
    category,
    excerpt,
    author,
    publishedAt,
    readingTime,
    "coverImage": coverImage.asset->url,
    body[] {
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      }
    },
    featured,
    externalUrl
  }
`;

export const FEATURED_POSTS_QUERY = groq`
  *[_type == "post" && featured == true && defined(slug.current) && ${PUBLISHED_FILTER}] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    type,
    category,
    excerpt,
    author,
    publishedAt,
    readingTime,
    "coverImage": coverImage.asset->url,
    featured,
    externalUrl
  }
`;

export const POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && ${PUBLISHED_FILTER}][].slug.current
`;

// ---------- Products ----------
export const PRODUCTS_QUERY = groq`
  *[_type == "product" && available == true && ${PUBLISHED_FILTER}] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    price,
    unit,
    category,
    description,
    "image": image.asset->url,
    sizes,
    available
  }
`;

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug && ${PUBLISHED_FILTER}][0] {
    _id,
    name,
    "slug": slug.current,
    price,
    unit,
    category,
    description,
    "image": image.asset->url,
    sizes,
    available
  }
`;

export const PRODUCT_SLUGS_QUERY = groq`
  *[_type == "product" && available == true && defined(slug.current) && ${PUBLISHED_FILTER}][].slug.current
`;

// ---------- Events ----------
//
// `isPast` is derived from `endDate ?? startDate` so events automatically move
// from "Upcoming" to "Past" without an editor toggling anything. Kept in sync
// with the `past` fallback for legacy documents that set it manually.
export const EVENTS_QUERY = groq`
  *[_type == "event" && ${PUBLISHED_FILTER}] | order(startDate asc) {
    _id,
    title,
    "slug": slug.current,
    type,
    startDate,
    endDate,
    location,
    locationType,
    description,
    requiresRegistration,
    capacity,
    "image": image.asset->url,
    past,
    "isPast": coalesce(past, false) || (coalesce(endDate, startDate) < now())
  }
`;

export const EVENT_BY_SLUG_QUERY = groq`
  *[_type == "event" && slug.current == $slug && ${PUBLISHED_FILTER}][0] {
    _id,
    title,
    "slug": slug.current,
    type,
    startDate,
    endDate,
    location,
    locationType,
    description,
    requiresRegistration,
    capacity,
    "image": image.asset->url,
    past
  }
`;

export const EVENT_SLUGS_QUERY = groq`
  *[_type == "event" && defined(slug.current) && ${PUBLISHED_FILTER}][].slug.current
`;

// ---------- Gallery ----------
export const GALLERY_ALBUMS_QUERY = groq`
  *[_type == "galleryAlbum" && ${PUBLISHED_FILTER}] | order(year desc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    year,
    "coverImage": coverImage.asset->url,
    "imageCount": count(coalesce(images, [])),
    "videoCount": count(coalesce(videos, [])),
    "mediaCount": count(coalesce(images, [])) + count(coalesce(videos, []))
  }
`;

export const GALLERY_ALBUM_BY_SLUG_QUERY = groq`
  *[_type == "galleryAlbum" && slug.current == $slug && ${PUBLISHED_FILTER}][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    year,
    "coverImage": coverImage.asset->url,
    "images": coalesce(images, [])[] {
      _key,
      "url": asset->url,
      caption
    },
    "videos": coalesce(videos, [])[] {
      _key,
      url,
      caption
    }
  }
`;

export const GALLERY_ALBUM_SLUGS_QUERY = groq`
  *[_type == "galleryAlbum" && defined(slug.current) && ${PUBLISHED_FILTER}][].slug.current
`;

// ---------- Testimonials ----------
export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && ${PUBLISHED_FILTER}] | order(featured desc, _createdAt desc) {
    _id,
    author,
    "slug": slug.current,
    role,
    institution,
    quote,
    "photo": photo.asset->url,
    featured
  }
`;

export const FEATURED_TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && featured == true && ${PUBLISHED_FILTER}] | order(_createdAt desc) {
    _id,
    author,
    "slug": slug.current,
    role,
    institution,
    quote,
    "photo": photo.asset->url,
    featured
  }
`;

// ---------- Institution Reviews ----------
export const INSTITUTION_REVIEWS_QUERY = groq`
  *[_type == "institutionReview" && ${PUBLISHED_FILTER}] | order(featured desc, institution asc) {
    _id,
    institution,
    "slug": slug.current,
    faculty,
    department,
    summary,
    "pdfUrl": pdfUrl.asset->url,
    featured
  }
`;

// ---------- Job Postings ----------
export const JOBS_QUERY = groq`
  *[_type == "jobPosting" && ${PUBLISHED_FILTER}] | order(postedAt desc) {
    _id,
    title,
    "slug": slug.current,
    department,
    type,
    location,
    postedAt,
    closesAt,
    summary,
    responsibilities,
    requirements,
    niceToHave,
    howToApply,
    open
  }
`;

export const OPEN_JOBS_QUERY = groq`
  *[_type == "jobPosting" && open == true && (!defined(closesAt) || closesAt >= now()) && ${PUBLISHED_FILTER}] | order(postedAt desc) {
    _id,
    title,
    "slug": slug.current,
    department,
    type,
    location,
    postedAt,
    closesAt,
    summary,
    responsibilities,
    requirements,
    niceToHave,
    howToApply,
    open
  }
`;

export const JOB_BY_SLUG_QUERY = groq`
  *[_type == "jobPosting" && slug.current == $slug && ${PUBLISHED_FILTER}][0] {
    _id,
    title,
    "slug": slug.current,
    department,
    type,
    location,
    postedAt,
    closesAt,
    summary,
    responsibilities,
    requirements,
    niceToHave,
    howToApply,
    open
  }
`;

export const JOB_SLUGS_QUERY = groq`
  *[_type == "jobPosting" && defined(slug.current) && ${PUBLISHED_FILTER}][].slug.current
`;

// ---------- Services ----------
export const SERVICES_QUERY = groq`
  *[_type == "service" && ${PUBLISHED_FILTER}] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    groupSlug,
    shortDescription,
    "image": image.asset->url
  }
`;

export const SERVICE_BY_SLUG_QUERY = groq`
  *[_type == "service" && slug.current == $slug && ${PUBLISHED_FILTER}][0] {
    _id,
    title,
    "slug": slug.current,
    groupSlug,
    shortDescription,
    "image": image.asset->url,
    "heroImage": heroImage.asset->url,
    overview,
    offering[] {
      title,
      description
    },
    process[] {
      step,
      title,
      description
    },
    faqs[] {
      q,
      a
    }
  }
`;

export const SERVICE_SLUGS_QUERY = groq`
  *[_type == "service" && defined(slug.current) && ${PUBLISHED_FILTER}][].slug.current
`;

// ---------- Subsidiaries ----------
export const SUBSIDIARIES_QUERY = groq`
  *[_type == "subsidiary" && ${PUBLISHED_FILTER}] | order(order asc) {
    _id,
    name,
    shortName,
    "slug": slug.current,
    tagline,
    description,
    "image": image.asset->url,
    whatsapp,
    email
  }
`;

export const SUBSIDIARY_BY_SLUG_QUERY = groq`
  *[_type == "subsidiary" && slug.current == $slug && ${PUBLISHED_FILTER}][0] {
    _id,
    name,
    shortName,
    "slug": slug.current,
    tagline,
    description,
    "image": image.asset->url,
    "heroImage": heroImage.asset->url,
    whatsapp,
    email,
    about,
    services[] {
      title,
      description
    }
  }
`;

export const SUBSIDIARY_SLUGS_QUERY = groq`
  *[_type == "subsidiary" && defined(slug.current) && ${PUBLISHED_FILTER}][].slug.current
`;


// ---------- Projects ----------
export const PROJECTS_QUERY = groq`
  *[_type == "project" && ${PUBLISHED_FILTER}] | order(order asc, year desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    location,
    year,
    description,
    "image": image.asset->url,
    featured
  }
`;

export const FEATURED_PROJECTS_QUERY = groq`
  *[_type == "project" && featured == true && ${PUBLISHED_FILTER}] | order(order asc, year desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    location,
    year,
    description,
    "image": image.asset->url,
    featured
  }
`;

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug && ${PUBLISHED_FILTER}][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    location,
    year,
    description,
    challenge,
    approach,
    outcome,
    "image": image.asset->url,
    featured
  }
`;

export const PROJECT_SLUGS_QUERY = groq`
  *[_type == "project" && defined(slug.current) && ${PUBLISHED_FILTER}][].slug.current
`;


// ---------- Leadership ----------
export const LEADERS_QUERY = groq`
  *[_type == "leader" && ${PUBLISHED_FILTER}] | order(order asc) {
    _id,
    name,
    role,
    bio,
    "photo": photo.asset->url,
    order
  }
`;

// ---------- FAQs ----------
export const FAQS_QUERY = groq`
  *[_type == "faq" && ${PUBLISHED_FILTER}] | order(category asc, order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;


// ---------- Mosnerifoods Page ----------
export const MOSNERI_POSTS_QUERY = groq`
  *[_type == "post" && category == "Mosnerifoods" && defined(slug.current)] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "coverImage": coverImage.asset->url
  }
`;


// ---------- Training Partners Page ----------
export const TRAINING_PARTNERS_QUERY = groq`
  *[_type == "trainingPartner"] | order(order asc) {
    _id,
    name,
    program,
    year,
    "logo": logo.asset->url
  }
`;

