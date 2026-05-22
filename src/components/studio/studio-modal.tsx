"use client";

import { X } from "lucide-react";

interface StudioModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function StudioModal({ title, onClose, children }: StudioModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/25"
      onMouseDown={onClose}
    >
      <div
        className="h-full w-[460px] bg-white shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          className="flex h-16 items-center justify-between border-b px-5"
          style={{ borderColor: "var(--lineage-line)" }}
        >
          <b>{title}</b>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-50"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
