import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

interface ListRowProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  tag?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function ListRow({
  icon: Icon,
  title,
  subtitle,
  tag,
  onClick,
  children,
}: ListRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 border-b p-5 text-left last:border-b-0 hover:bg-slate-50"
      style={{ borderColor: "#f0f2f5" }}
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl border bg-slate-50"
        style={{ borderColor: "var(--lineage-line)" }}
      >
        <Icon size={17} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <b>{title}</b>
          {tag ? (
            <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
              {tag}
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-sm" style={{ color: "var(--lineage-muted)" }}>
          {subtitle}
        </p>
      </div>
      {children}
      <ChevronRight size={17} className="text-slate-400" />
    </button>
  );
}
