import { cn } from "@/lib/utils";

type Level = 1 | 2 | 3 | 4;

const styles: Record<Level, string> = {
  1: "text-h1 font-display font-bold text-balance",
  2: "text-h2 font-display font-bold text-balance",
  3: "text-h3 font-display font-semibold text-balance",
  4: "text-h4 font-display font-semibold",
};

export function Heading({
  level = 2,
  className,
  children,
  as,
}: {
  level?: Level;
  className?: string;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const Tag = (as ?? (`h${level}` as keyof React.JSX.IntrinsicElements));
  return <Tag className={cn(styles[level], className)}>{children}</Tag>;
}