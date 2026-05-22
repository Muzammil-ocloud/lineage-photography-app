import { cn } from "@/lib/utils/cn";

interface LineageLogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function LineageLogo({ variant = "dark", className }: LineageLogoProps) {
  const isLight = variant === "light";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl border font-[family-name:var(--font-cormorant)] text-xl"
        style={{
          borderColor: "var(--lineage-gold)",
          color: "var(--lineage-gold)",
        }}
      >
        L
      </div>
      <div>
        <div
          className={cn(
            "font-[family-name:var(--font-cormorant)] text-2xl leading-5 tracking-[0.26em]",
            isLight ? "text-white" : "text-lineage-ink",
          )}
        >
          LINEAGE
        </div>
        <div
          className="mt-1 text-[10px] tracking-[0.55em]"
          style={{ color: "var(--lineage-gold)" }}
        >
          PHOTOGRAPHY
        </div>
      </div>
    </div>
  );
}
