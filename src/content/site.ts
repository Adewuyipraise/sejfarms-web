export const site = {
  name: "Sejfarms Consults Limited",
  shortName: "Sejfarms",
  groupLabel: "Sejfarms Group",
  tagline:
    "Empowering Fish Farmers and Nurturing Sustainable Aquaculture Practices in Africa and Beyond",
  subline:
    "We are Taking Small Steps to Make Aquaculture a Better Practice in Africa and Beyond",

  // Simple aliases for legacy compatibility — point at the primary Sejfarms contact
  email: "sejfarmsconsultltd@gmail.com",
  phone: "08060025961",
  address: "Badagry, Lagos State, Nigeria",

  // Structured contacts
  addressStructured: {
    line1: "Badagry",
    line2: "Lagos State, Nigeria",
    full: "Badagry, Lagos State, Nigeria",
  },
  contacts: {
    sejfarms: {
      phone: "08060025961",
      whatsapp: "+2348153764742",
      email: "sejfarmsconsultltd@gmail.com",
    },
    mosnerifoods: {
      whatsapp: "+2347045941045",
      email: "mosnerifoods@gmail.com",
    },
    aiid: {
      email: "aiidcentre@gmail.com",
    },
  },
  social: {
    facebook: "https://www.facebook.com/sejfarmgroup",
    instagram: "https://www.instagram.com/sejfarmsgroup/",
    linkedin: "https://www.linkedin.com/company/sejfarmsgroup",
    youtube: "https://www.youtube.com/@Sejfarmsgroup",
    tiktok: "https://www.tiktok.com/@sejfarmsgroup",
  },
} as const;