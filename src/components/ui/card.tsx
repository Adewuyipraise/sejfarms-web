import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-white p-6 transition-all hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}