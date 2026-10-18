import type { Metric as MetricType } from "@/types";
import { CountUp } from "@/components/motion/count-up";

export function Metric({ value, label }: MetricType) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <CountUp
        value={value}
        className="font-display text-5xl font-bold text-brand md:text-6xl"
      />
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
