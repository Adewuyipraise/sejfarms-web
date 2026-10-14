import { cn } from "@/lib/utils";

export function Prose({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-[68ch] text-body text-charcoal/85 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-h2 [&_h2]:font-bold [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-h3 [&_h3]:font-semibold [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-2 [&_a]:text-brand [&_a]:underline",
        className,
      )}
    >
      {children}
    </div>
  );
}