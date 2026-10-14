import type { Metric as MetricType } from "@/types";

export function Metric({ value, label }: MetricType) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="font-display text-5xl font-bold text-brand md:text-6xl">
        {value}
      </span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}