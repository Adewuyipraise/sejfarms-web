import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("post").title("Knowledge Hub Posts"),
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("event").title("Events"),
      S.documentTypeListItem("galleryAlbum").title("Gallery Albums"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("institutionReview").title("Institution Reviews"),
      S.documentTypeListItem("jobPosting").title("Job Postings"),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("subsidiary").title("Subsidiaries"),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("leader").title("Leadership"),      // ← new
      S.documentTypeListItem("faq").title("FAQs"),               // ← new
    ]);