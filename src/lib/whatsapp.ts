const SEJFARMS_WHATSAPP = "2348153764742";
const MOSNERIFOODS_WHATSAPP = "2347045941045";

export function whatsappLink(
  message?: string,
  line: "sejfarms" | "mosnerifoods" = "sejfarms",
) {
  const number = line === "mosnerifoods" ? MOSNERIFOODS_WHATSAPP : SEJFARMS_WHATSAPP;
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const whatsappMessages = {
  general:
    "Hello Sejfarms, I'd like to find out more about your services.",
  training:
    "Hello Sejfarms, I'm interested in your training or internship programme.",
  consultancy:
    "Hello Sejfarms, I'd like to speak with a consultant about my fish farm.",
  investment:
    "Hello Sejfarms, I'd like to discuss an aquaculture investment opportunity.",
  productOrder:
    "Hello Mosnerifoods, I'd like to place an order for the following products:",
} as const;