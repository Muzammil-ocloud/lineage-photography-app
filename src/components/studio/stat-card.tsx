import type { LucideIcon } from "lucide-react";
import { StudioCard } from "./studio-card";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <StudioCard>
      <div className="flex justify-between p-5">
        <div>
          <p className="text-xs font-semibold text-slate-500">{title}</p>
          <div className="mt-2 text-2xl font-semibold">{value}</div>
          <p className="mt-2 text-xs" style={{ color: "var(--lineage-muted)" }}>
            {description}
          </p>
        </div>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl border"
          style={{ borderColor: "var(--lineage-line)" }}
        >
          <Icon size={17} />
        </div>
      </div>
    </StudioCard>
  );
}
