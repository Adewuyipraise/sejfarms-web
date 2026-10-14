import { groq } from "next-sanity";

// ---------- Posts ----------
export const POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
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
    body,
    featured,
    externalUrl
  }
`;

export const POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

// ---------- Products ----------
export const PRODUCTS_QUERY = groq`
  *[_type == "product" && available == true] | order(_createdAt desc) {
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
  *[_type == "product" && slug.current == $slug][0] {
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
  *[_type == "product" && available == true && defined(slug.current)][].slug.current
`;

// ---------- Events ----------
export const EVENTS_QUERY = groq`
  *[_type == "event"] | order(startDate desc) {
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

export const EVENT_BY_SLUG_QUERY = groq`
  *[_type == "event" && slug.current == $slug][0] {
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
  *[_type == "event" && defined(slug.current)][].slug.current
`;

// ---------- Gallery ----------
export const GALLERY_ALBUMS_QUERY = groq`
  *[_type == "galleryAlbum"] | order(year desc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    year,
    "coverImage": coverImage.asset->url,
    "mediaCount": count(media)
  }
`;

export const GALLERY_ALBUM_BY_SLUG_QUERY = groq`
  *[_type == "galleryAlbum" && slug.current == $slug][0] {
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
  *[_type == "galleryAlbum" && defined(slug.current)][].slug.current
`;


// ---------- Testimonials ----------
export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(featured desc, _createdAt desc) {
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
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) {
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
  *[_type == "institutionReview"] | order(featured desc, institution asc) {
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
  *[_type == "jobPosting"] | order(postedAt desc) {
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
  *[_type == "jobPosting" && open == true] | order(postedAt desc) {
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
  *[_type == "jobPosting" && slug.current == $slug][0] {
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
  *[_type == "jobPosting" && defined(slug.current)][].slug.current
`;