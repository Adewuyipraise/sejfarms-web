import { type SchemaTypeDefinition } from "sanity";

import { post } from "./post";
import { product } from "./product";
import { event } from "./event";
import { galleryAlbum } from "./galleryAlbum";
import { testimonial } from "./testimonial";
import { institutionReview } from "./institutionReview";
import { jobPosting } from "./jobPosting";
import { siteSettings } from "./siteSettings";
import { service } from "./service";
import { subsidiary } from "./subsidiary";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    product,
    event,
    galleryAlbum,
    testimonial,
    institutionReview,
    jobPosting,
    siteSettings,
    service,
    subsidiary,
  ],
};