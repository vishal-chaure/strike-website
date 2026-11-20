import { cn } from "@/lib/cn";

const variants = {
  /** The main action: ink by day, lamp amber by night. */
  primary:
    "bg-ink text-paper shadow-button hover:-translate-y-px lamp-on:bg-linear-to-b lamp-on:from-amber-light lamp-on:to-amber-deep lamp-on:text-ink",
  /** A quiet outlined button. */
  ghost: "border border-hairline text-text hover:border-text-faint",
} as const;

const sizes = {
  sm: "h-9 gap-2 px-4 text-sm",
  lg: "h-13 gap-2.5 px-6 text-base",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

/**
 * The classes for a button (or a link that looks like one), so <a> and
 * <button> share one look.
 */
export function buttonClassName({
  variant = "primary",
  size = "lg",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cn(
    "inline-flex items-center justify-center rounded-full font-display whitespace-nowrap transition-[translate,box-shadow,border-color,color] duration-200 ease-typewriter active:translate-y-px",
    variants[variant],
    sizes[size],
    className,
  );
}
