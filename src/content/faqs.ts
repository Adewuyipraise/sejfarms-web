import type { FAQItem } from "@/types";

export const faqs: FAQItem[] = [
  { category: "General", question: "What is Sejfarms Consults Limited?", answer: "Sejfarms Consults Limited is a leading one-stop-solution fish farm consultancy and training company focused on empowering existing and intending fish farmers to succeed in the aquaculture industry. We provide a comprehensive range of services across the aquaculture value chain." },
  { category: "General", question: "Where is Sejfarms located?", answer: "Our operations are based in Badagry, Lagos State, Nigeria — a peaceful and historic West African border corridor and coastal town." },
  { category: "General", question: "Do you work outside Lagos?", answer: "Yes. While our primary operations are in Lagos State, we support farms and clients across Nigeria and partner with institutions nationally." },

  { category: "Services", question: "What services do you offer?", answer: "We offer a wide range of services across five groups: Farm Operations & Infrastructure, Consultancy & Investment, Training & Development, Innovation & Specialty, and Market & Value Chain. See our Services page for the complete list." },
  { category: "Services", question: "Do you offer pond construction?", answer: "Yes. We construct high-quality earthen and concrete ponds designed for optimal fish growth, using industry-leading techniques and materials." },
  { category: "Services", question: "Can I lease a pond instead of building?", answer: "Yes. We offer pond leases for farmers who want to enter the industry without land ownership. Our leased ponds come with essential infrastructure for hassle-free operations." },
  { category: "Services", question: "Do you supply fingerlings?", answer: "Yes. Our hatchery produces healthy fingerlings with excellent growth potential, and we maintain a broodstock bank for consistent supply of genetically superior stock." },

  { category: "Training & Internships", question: "Do you offer internships?", answer: "Yes. We run structured internship programs for Fisheries and Agriculture students and graduates from institutions across Nigeria. We have trained over 1,000 students through various programmes." },
  { category: "Training & Internships", question: "How do I apply for an internship?", answer: "Submit an enquiry through our Contact page and select 'Internship' as your interest. Our team will follow up with next steps." },
  { category: "Training & Internships", question: "Do you train staff for other organisations?", answer: "Yes. Through our AIID Institute, we offer staff training and recruitment services tailored to the aquaculture industry and to non-aquaculture organisations as well." },

  { category: "Products", question: "Can I buy processed fish products?", answer: "Yes — through Mosnerifoods, our value addition subsidiary. Products include smoked and frozen steaks and fillets, kilishi, crackers, chinchin, oil, eggs, and more." },
  { category: "Products", question: "How do I place an order?", answer: "Browse our Products page, add items to your order, and you'll be redirected to WhatsApp to complete your order with the Mosnerifoods team." },

  { category: "Investment", question: "Can I invest in aquaculture through Sejfarms?", answer: "Yes. We offer investment opportunities both in establishing new fish farms and expanding existing operations. Our team conducts thorough feasibility studies to help ensure attractive returns and minimise risk." },
  { category: "Investment", question: "Do you prepare investment plans?", answer: "Yes. We provide comprehensive investment plans covering market analysis, costs, risks, and returns — aligned with our clients' financial goals." },
];

export const faqCategories = Array.from(new Set(faqs.map((f) => f.category)));