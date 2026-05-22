"use client";

interface SegmentControlProps {
  value: string;
  onChange: (value: string) => void;
  items: string[];
}

export function SegmentControl({
  value,
  onChange,
  items,
}: SegmentControlProps) {
  return (
    <div
      className="flex h-10 items-center rounded-xl border bg-white p-1"
      style={{ borderColor: "var(--lineage-line)" }}
    >
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`h-8 rounded-lg px-3 text-xs font-semibold ${
            value === item
              ? "bg-black text-white"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
