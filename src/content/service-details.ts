import type { ServiceDetail } from "@/types";

export const serviceDetails: Record<string, ServiceDetail> = {
  // ---------- Farm Operations ----------
  "pond-construction": {
    slug: "pond-construction",
    overview:
      "Our team of professionals offers pond construction services using industry-leading techniques and materials. We build high-quality ponds tailored to the requirements of different fish species — designed for optimal growth, durability, and productivity.",
    offering: [
      { title: "Earthen ponds",     description: "Cost-effective ponds for large-scale production, sited and constructed to specification." },
      { title: "Concrete ponds",    description: "Durable, controllable systems suited to intensive production and specific species." },
      { title: "Site preparation",  description: "Levelling, drainage, and access infrastructure for efficient operations." },
      { title: "Water management",  description: "Inlet, outlet, and aeration systems integrated into the pond design." },
    ],
    process: [
      { step: "01", title: "Site assessment",  description: "Topography, soil, water source, and drainage evaluation." },
      { step: "02", title: "Design",           description: "Pond sizing, layout, and infrastructure planning." },
      { step: "03", title: "Construction",     description: "Build with quality control at every stage." },
      { step: "04", title: "Handover",         description: "Operational readiness check and documentation." },
    ],
    faqs: [
      { q: "How long does pond construction take?", a: "Timelines depend on scale and site conditions — we provide a schedule with every quote." },
      { q: "What areas do you construct in?",       a: "We operate primarily in the South West and South South, and support projects across Nigeria." },
    ],
  },
  "pond-lease": {
    slug: "pond-lease",
    overview:
      "For those who want to enter fish farming but lack land resources, we offer pond leases — constructed ponds with the essential infrastructure for hassle-free farming operations.",
    offering: [
      { title: "Ready-to-stock ponds",  description: "Fully constructed ponds available for lease." },
      { title: "Infrastructure access", description: "Water, aeration, and storage systems available on site." },
      { title: "Technical guidance",    description: "Optional support for stocking and operations." },
      { title: "Flexible terms",        description: "Lease arrangements structured for the production cycle." },
    ],
    faqs: [
      { q: "What is the minimum lease period?", a: "Terms are structured around production cycles — contact us to discuss." },
      { q: "Can I lease and stock with your fingerlings?", a: "Yes — combined arrangements are common." },
    ],
  },
  "hatchery-broodstock": {
    slug: "hatchery-broodstock",
    overview:
      "We operate state-of-the-art hatchery facilities producing healthy fish seeds with excellent growth potential, and maintain a broodstock bank ensuring consistent supply of high-quality fingerlings and genetically superior broodstock.",
    offering: [
      { title: "Fingerling production",  description: "Healthy, uniform fingerlings from vetted broodstock lines." },
      { title: "Broodstock supply",      description: "Genetically superior broodstock for hatchery operators." },
      { title: "Selective breeding",     description: "Ongoing programmes for improved growth and survival rates." },
      { title: "Technical support",      description: "Hatchery setup and operational guidance." },
    ],
    faqs: [
      { q: "Which species do you produce?", a: "Primarily catfish — contact us for current availability of other species." },
      { q: "Do you supply in bulk?",        a: "Yes — bulk orders for commercial operations are common." },
    ],
  },
  "cage-culture": {
    slug: "cage-culture",
    overview:
      "We offer expertise in designing, setting up, and managing cage systems for fish farming — enabling farmers to optimise production and utilise open-water resources.",
    offering: [
      { title: "Cage design",       description: "Engineered cage systems suited to species and water body." },
      { title: "Setup",             description: "Installation and mooring in rivers, lakes, or reservoirs." },
      { title: "Management",        description: "Feeding, health, and harvest support for cage operations." },
      { title: "Training",          description: "Knowledge transfer for ongoing cage culture operations." },
    ],
    faqs: [
      { q: "Which species work best in cages?", a: "Tilapia and catfish are commonly farmed in cages — selection depends on your water body and market." },
      { q: "Do you help with regulatory approval?", a: "We advise on site selection and requirements." },
    ],
  },
  "farm-inputs": {
    slug: "farm-inputs",
    overview:
      "As a complete fish farming solutions provider, we offer a wide range of farm inputs and accessories — from feed and aeration systems to water pumps, health supplements, and handling equipment.",
    offering: [
      { title: "Fish feed",                 description: "Quality feed sourced from reliable suppliers." },
      { title: "Aeration systems",          description: "Aerators and diffusers for adequate dissolved oxygen." },
      { title: "Water pumps",               description: "Pumping systems for water management." },
      { title: "Health supplements",        description: "Vaccines, treatments, and growth supplements." },
      { title: "Handling equipment",        description: "Nets, buckets, weighing scales, and more." },
    ],
    faqs: [
      { q: "Do you deliver inputs?", a: "Yes — delivery is available for bulk orders." },
      { q: "Can you supply on credit?", a: "Terms are discussed per customer and volume." },
    ],
  },
  "farmland-acquisition": {
    slug: "farmland-acquisition",
    overview:
      "We assist individuals and organisations in identifying and acquiring suitable farmland for fish farming operations — evaluating land quality, water resources, and infrastructure.",
    offering: [
      { title: "Land identification",  description: "Sourcing suitable parcels based on your requirements." },
      { title: "Site evaluation",      description: "Soil, water, and infrastructure assessment." },
      { title: "Acquisition support",  description: "Guidance through documentation and transaction." },
      { title: "Development planning", description: "Farm layout and infrastructure planning post-acquisition." },
    ],
    faqs: [
      { q: "Where do you operate?", a: "Primarily Lagos, Ogun, and neighbouring states." },
      { q: "Do you handle legal documentation?", a: "We guide and coordinate with your legal advisers." },
    ],
  },
  "ornamental-fisheries": {
    slug: "ornamental-fisheries",
    overview:
      "We specialise in ornamental fisheries, catering to the growing market for exotic and decorative fish species. We provide consultancy and assistance in setting up and managing ornamental fish farms and aquariums.",
    offering: [
      { title: "Ornamental farm setup",  description: "Design and construction for ornamental species." },
      { title: "Aquarium design",        description: "Custom aquariums for homes, offices, and public spaces." },
      { title: "Species sourcing",       description: "Access to exotic and decorative fish species." },
      { title: "Ongoing management",     description: "Care and maintenance arrangements." },
    ],
    faqs: [
      { q: "Do you supply to individuals?", a: "Yes — aquariums for homes and offices are a growing part of our work." },
    ],
  },

  // ---------- Consultancy & Investment ----------
  consultancy: {
    slug: "consultancy",
    overview:
      "Our team of aquaculture experts provides personalised consulting services to help you address specific challenges, explore growth opportunities, and optimise your fish farming operations.",
    offering: [
      { title: "Operational review",   description: "Diagnostic assessment of your farm's performance." },
      { title: "Growth strategy",      description: "Expansion planning and market positioning." },
      { title: "Problem-solving",      description: "Targeted support for specific operational challenges." },
      { title: "Ongoing advisory",     description: "Retained consulting for continuous improvement." },
    ],
    process: [
      { step: "01", title: "Discovery",       description: "Understanding your goals, resources, and constraints." },
      { step: "02", title: "Assessment",      description: "Technical and financial review." },
      { step: "03", title: "Recommendation",  description: "Costed, practical recommendations delivered in writing." },
      { step: "04", title: "Support",         description: "Ongoing advisory as recommendations are implemented." },
    ],
    faqs: [
      { q: "How is consultancy priced?", a: "Engagements are scoped and quoted individually based on complexity and duration." },
      { q: "Do you work outside Lagos?", a: "Yes — we support farms across Nigeria." },
    ],
  },
  "farm-setup-design": {
    slug: "farm-setup-design",
    overview:
      "A well-designed and properly constructed fish farm is crucial to long-term productivity and profitability. We assist aspiring fish farmers in creating efficient and sustainable aquaculture operations — from site selection and space utilisation through to water management and technology integration.",
    offering: [
      { title: "Site selection",          description: "Identifying and assessing suitable locations." },
      { title: "Layout design",           description: "Maximising space and operational efficiency." },
      { title: "Pond sizing",             description: "Optimal dimensions for your target production." },
      { title: "Water systems",           description: "Integrated water management design." },
      { title: "Technology integration",  description: "Aeration, monitoring, and automation where appropriate." },
    ],
    process: [
      { step: "01", title: "Consultation",  description: "Understanding your goals, budget, and site." },
      { step: "02", title: "Site visit",    description: "Physical assessment of the location." },
      { step: "03", title: "Design",        description: "Detailed plans and specifications." },
      { step: "04", title: "Handover",      description: "Documentation and, if desired, construction coordination." },
    ],
    faqs: [
      { q: "Can you work with existing farms?", a: "Yes — we audit existing operations and design improvement programmes." },
      { q: "Is design separate from construction?", a: "Design can stand alone or be bundled with construction." },
    ],
  },
  "investment-planning": {
    slug: "investment-planning",
    overview:
      "We understand the importance of financial planning for successful fish farming ventures. We provide comprehensive investment plans considering market analysis, costs, risks, and returns — aligned with your financial goals.",
    offering: [
      { title: "Feasibility studies",     description: "Market, technical, and financial analysis." },
      { title: "Investment modelling",    description: "Cash flow projections and break-even analysis." },
      { title: "Risk assessment",         description: "Identification and mitigation of key risks." },
      { title: "Financing guidance",      description: "Connecting you with appropriate finance options." },
    ],
    faqs: [
      { q: "What scale of projects do you plan for?", a: "From smallholder operations to commercial multi-pond farms." },
      { q: "Do you help with bank financing?", a: "We prepare plans in formats suitable for lending discussions." },
    ],
  },
  "investment-opportunities": {
    slug: "investment-opportunities",
    overview:
      "Investors looking to tap into the thriving aquaculture industry can partner with us. We offer a range of investment opportunities, both in establishing new fish farms and expanding existing operations — with thorough feasibility studies.",
    offering: [
      { title: "New farm partnerships",     description: "Participation in establishing new operations." },
      { title: "Expansion capital",         description: "Investment in existing operations with growth plans." },
      { title: "Structured arrangements",   description: "Terms designed for both parties' success." },
      { title: "Feasibility studies",       description: "Transparent, thorough due diligence." },
    ],
    faqs: [
      { q: "What is the minimum investment?", a: "Varies by opportunity — contact us to discuss." },
      { q: "Are returns fixed?", a: "Terms are structured per deal — we don't offer fixed-return products." },
    ],
  },

  // ---------- Training & Development ----------
  training: {
    slug: "training",
    overview:
      "We provide comprehensive training programs designed to equip both newcomers eager to enter the industry and experienced fish farmers looking to enhance their skills. Our experienced trainers deliver practical and theoretical knowledge on fish farming practice, disease prevention, feed formulation, water quality management, profitable marketing strategies, and more.",
    offering: [
      { title: "Foundational training",  description: "For intending farmers entering the industry." },
      { title: "Advanced training",      description: "For existing farmers seeking to improve performance." },
      { title: "Disease management",     description: "Prevention, diagnosis, and treatment." },
      { title: "Feed formulation",       description: "Cost-effective, nutritionally balanced feed." },
      { title: "Water quality",          description: "Monitoring and management." },
      { title: "Market strategy",        description: "Profitable marketing of fish products." },
    ],
    faqs: [
      { q: "Do you offer online training?", a: "Selected modules are available online — most training is hands-on at our facilities." },
      { q: "Do you issue certificates?", a: "Yes, participants receive a certificate of completion." },
    ],
  },
  internship: {
    slug: "internship",
    overview:
      "Our internship program is tailored to expose Fisheries and Agriculture students and graduates to up-to-date technicalities in the field and the immense opportunities in the industry. We have trained well over 1,000 students from institutions across Nigeria. The programme also extends to individuals looking to gain hands-on experience in fish farming and agricultural management.",
    offering: [
      { title: "SIWES / IT placements",   description: "Structured placements for students." },
      { title: "Graduate programmes",     description: "Extended internships for recent graduates." },
      { title: "Hands-on experience",     description: "Direct work in ponds, hatchery, grow-out, and processing." },
      { title: "Mentorship",              description: "Guidance from our technical team." },
      { title: "Digital exposure",        description: "Familiarity with modern farming technologies." },
    ],
    faqs: [
      { q: "How long is the internship?", a: "Typically 3–6 months, aligned with SIWES requirements." },
      { q: "Is it residential?", a: "Accommodation arrangements vary — contact us for details." },
    ],
  },
  "staff-training": {
    slug: "staff-training",
    overview:
      "Through our Aquaculture Incubation Innovation Development Centre (AIID Institute), we offer comprehensive staff training programs tailored to the aquaculture industry — technical know-how, management skills, and best practices. We also provide recruitment services and custom training for non-aquaculture organisations.",
    offering: [
      { title: "Technical training",       description: "Practical skills for farm staff at all levels." },
      { title: "Management training",      description: "Leadership and operational management." },
      { title: "Best practice training",   description: "Industry-standard approaches and protocols." },
      { title: "Recruitment services",     description: "Sourcing skilled personnel from our professional network." },
      { title: "Custom programmes",        description: "Tailored training for non-aquaculture clients." },
    ],
    faqs: [
      { q: "Where is training delivered?", a: "Primarily at AIID Institute facilities, with on-site options available." },
      { q: "Do you recruit for other companies?", a: "Yes — we offer recruitment services across sectors." },
    ],
  },

  // ---------- Innovation & Specialty ----------
  "research-development": {
    slug: "research-development",
    overview:
      "With a focus on continuous improvement and innovation, our dedicated R&D team conducts studies to develop and refine fish farming techniques, breeding, feed formulations, biosecurity measures, disease management strategies, and sustainable practices. We collaborate with industry experts and organisations to stay at the forefront of aquaculture technology.",
    offering: [
      { title: "Applied research",         description: "Trials that answer practical production questions." },
      { title: "Breeding programmes",      description: "Improvement of growth and survival traits." },
      { title: "Feed formulation",         description: "Cost-effective, high-performance formulations." },
      { title: "Biosecurity",              description: "Disease prevention and farm hygiene protocols." },
      { title: "Sustainability research",  description: "Reducing environmental footprint of production." },
    ],
    faqs: [
      { q: "Do you partner with universities?", a: "Yes — collaboration with academic and research institutions is central to our R&D." },
      { q: "Can research be commissioned?", a: "Selectively — contact us with your research question and scope." },
    ],
  },

  // ---------- Market & Value Chain ----------
  "sales-marketing": {
    slug: "sales-marketing",
    overview:
      "We offer comprehensive sales and marketing support by identifying market opportunities and developing effective strategies. Our network connects fish farmers with buyers, retailers, and distributors, ensuring a steady market for their products and achieving higher profitability.",
    offering: [
      { title: "Market identification",   description: "Understanding target markets and opportunities." },
      { title: "Strategy development",    description: "Tailored marketing plans for your products." },
      { title: "Buyer connections",       description: "Access to our network of buyers and distributors." },
      { title: "Sales support",           description: "Ongoing commercial representation." },
    ],
    faqs: [
      { q: "Do you buy produce directly?", a: "In some categories yes; in others we broker. Contact us with your product." },
      { q: "Is there a fee?", a: "Terms vary — we discuss per product and volume." },
    ],
  },
  "fish-value-addition": {
    slug: "fish-value-addition",
    overview:
      "We recognise the growing demand for value-added fish products. Through our subsidiary Mosnerifoods, we provide processing, preservation, and packaging services — transforming fish into a range of products including smoked and frozen steaks, fillets, kilishi, crackers, chinchin, oil, eggs, and more. We also offer value addition services to farmers at affordable rates, helping diversify their income streams.",
    offering: [
      { title: "Fish processing",          description: "Smoking, freezing, and preparation to food-grade standards." },
      { title: "Value-added products",     description: "Kilishi, crackers, chinchin, oil, eggs, and more." },
      { title: "Packaging",                description: "Retail-ready packaging for market and regulatory compliance." },
      { title: "Wholesale & retail",       description: "Direct sales to consumers and businesses." },
      { title: "Event catering",           description: "Indoor and outdoor supply for corporate and social events." },
      { title: "Service for farmers",      description: "Value addition for partner farms at affordable rates." },
    ],
    faqs: [
      { q: "Can you process my farm's output?", a: "Yes — we process for partner farms under agreed terms." },
      { q: "Do you sell retail?", a: "Yes — see our Products page for details." },
    ],
  },
};

export function getServiceDetail(slug: string) {
  return serviceDetails[slug];
}