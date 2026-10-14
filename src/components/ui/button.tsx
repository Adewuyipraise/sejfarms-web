import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-button font-semibold transition-all focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:  "bg-brand text-white hover:bg-brand-dark shadow-soft hover:shadow-lift",
        secondary:"bg-white text-brand border border-brand/20 hover:border-brand hover:bg-brand/5",
        ghost:    "text-charcoal hover:text-brand hover:bg-brand/5",
        whatsapp: "bg-[#25D366] text-white hover:bg-[#1DA851] shadow-soft",
        outline:  "border border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-charcoal/5",
      },
      size: {
        sm: "h-9  px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = VariantProps<typeof buttonStyles> & {
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  href,
  external,
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(buttonStyles({ variant, size }), className);

  if (href) {
    if (external || href.startsWith("http")) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}