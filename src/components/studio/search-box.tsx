"use client";

import { Search } from "lucide-react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBox({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: SearchBoxProps) {
  return (
    <div
      className={`flex h-10 w-64 items-center gap-2 rounded-xl border bg-white px-3 ${className ?? ""}`}
      style={{ borderColor: "var(--lineage-line)" }}
    >
      <Search size={16} className="text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>
  );
}
