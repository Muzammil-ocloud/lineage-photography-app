import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface StudioButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  variant?: "default" | "primary" | "dark" | "gold";
}

export function StudioButton({
  children,
  onClick,
  icon: Icon,
  variant = "default",
  type = "button",
  className,
  ...props
}: StudioButtonProps) {
  const cls =
    variant === "gold"
      ? "bg-[var(--lineage-gold-btn)] text-black hover:bg-[var(--lineage-gold-btn-hover)]"
      : variant === "dark"
        ? "bg-black text-white border-white/20 hover:bg-white/10"
        : variant === "primary"
          ? "bg-lineage-ink text-white hover:bg-black"
          : "bg-white text-slate-950 hover:bg-slate-50";

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold",
        cls,
        className,
      )}
      style={{
        borderColor:
          variant === "dark" ? "rgba(255,255,255,.18)" : "var(--lineage-line)",
      }}
      {...props}
    >
      {Icon ? <Icon size={16} /> : null}
      {children}
    </button>
  );
}
