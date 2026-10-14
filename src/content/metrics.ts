import type { Metric } from "@/types";

export const metrics: Metric[] = [
  { value: "59+",  label: "Fish Ponds Developed",     verified: true },
  { value: "10+",  label: "Farmlands Under Management", verified: true },
  { value: "20+", label: "Farmers Supported",         verified: true },
  { value: "1000+", label: "Students Trained",            verified: true },
  { value: "10+",  label: "Projects & Partnerships",   verified: true },
];

export const verifiedMetrics = metrics.filter((m) => m.verified);