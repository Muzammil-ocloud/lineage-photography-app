import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "gold";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

const variants = {
  default: "bg-lineage-ink text-white hover:bg-black",
  gold: "bg-[var(--lineage-gold-btn)] text-black hover:bg-[var(--lineage-gold-btn-hover)]",
  secondary: "bg-white text-slate-950 border hover:bg-slate-50",
  outline: "border bg-transparent hover:bg-slate-50",
  ghost: "hover:bg-slate-100",
  destructive: "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-xl px-3 text-sm",
  lg: "h-11 rounded-xl px-8",
  icon: "h-10 w-10",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading,
      disabled,
      children,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        (variant === "secondary" || variant === "outline") &&
          "border-[var(--lineage-line)]",
        className,
      )}
      disabled={disabled ?? isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  ),
);

Button.displayName = "Button";
