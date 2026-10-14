import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "text-sm font-semibold uppercase tracking-[0.18em] text-brand",
        className,
      )}
    >
      {children}
    </p>
  );
}