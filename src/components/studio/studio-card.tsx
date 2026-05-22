import { cn } from "@/lib/utils/cn";

interface StudioCardProps {
  children: React.ReactNode;
  wide?: boolean;
  className?: string;
}

export function StudioCard({ children, wide, className }: StudioCardProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border bg-white",
        wide && "col-span-2",
        className,
      )}
      style={{ borderColor: "var(--lineage-line)" }}
    >
      {children}
    </section>
  );
}

export function StudioCardHead({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div
      className="flex items-center justify-between border-b p-5"
      style={{ borderColor: "#f0f2f5" }}
    >
      <h3 className="font-semibold">{title}</h3>
      {action && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="text-sm font-semibold hover:underline"
        >
          {action}
        </button>
      ) : null}
    </div>
  );
}
