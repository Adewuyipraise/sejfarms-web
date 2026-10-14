import { cn } from "@/lib/utils";

type SectionProps = {
  className?: string;
  children: React.ReactNode;
  id?: string;
  as?: "section" | "div";
};

export function Section({ className, children, id, as: Tag = "section" }: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn("py-16 md:py-24", className)}
    >
      {children}
    </Tag>
  );
}