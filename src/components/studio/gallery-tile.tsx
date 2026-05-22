"use client";

import { Image, Share2, Upload } from "lucide-react";
import type { Client, Gallery, Job } from "@/lib/mock/studio.types";
import { StudioButton } from "./studio-button";

interface GalleryTileProps {
  gallery: Gallery;
  job?: Pick<Job, "title">;
  client?: Pick<Client, "name">;
  onShare: () => void;
  onOpen: () => void;
  onUpload?: (files: FileList | null) => void;
}

export function GalleryTile({
  gallery: g,
  job,
  client,
  onShare,
  onOpen,
  onUpload,
}: GalleryTileProps) {
  return (
    <div
      className="overflow-hidden rounded-2xl border bg-white transition hover:shadow-sm"
      style={{ borderColor: "var(--lineage-line)" }}
    >
      <button type="button" onClick={onOpen} className="block w-full text-left">
        <div className="relative h-52 bg-slate-100">
          <div className="absolute inset-0 grid grid-cols-3 gap-1 p-1">
            {g.images.length ? (
              g.images
                .slice(0, 3)
                .map((u, i) => (
                  <img
                    key={i}
                    src={u}
                    alt=""
                    className={`${i === 0 ? "col-span-2 row-span-2" : ""} h-full w-full rounded-xl object-cover`}
                  />
                ))
            ) : (
              <div className="col-span-3 flex items-center justify-center text-slate-400">
                <Image />
              </div>
            )}
          </div>
          <div className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold shadow-sm">
            {g.images.length} photos
          </div>
          <div className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold shadow-sm">
            {g.status}
          </div>
        </div>
      </button>
      <div className="p-4">
        <div className="min-h-[72px]">
          <h3 className="text-base font-semibold leading-6 tracking-tight text-slate-950">
            {g.name}
          </h3>
          <p
            className="mt-1 text-xs leading-5"
            style={{ color: "var(--lineage-muted)" }}
          >
            {job?.title}
            {client?.name ? ` · ${client.name}` : ""}
          </p>
          <p className="mt-1 text-xs" style={{ color: "var(--lineage-muted)" }}>
            {g.privacy} · expires {g.expires}
          </p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <StudioButton variant="primary" onClick={onOpen} icon={Image}>
            Open
          </StudioButton>
          <StudioButton onClick={onShare} icon={Share2}>
            Share
          </StudioButton>
          <label
            className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold hover:bg-slate-50"
            style={{ borderColor: "var(--lineage-line)" }}
          >
            <Upload size={15} />
            Photos
            <input
              type="file"
              multiple
              accept="image/*"
              hidden
              onChange={(e) => onUpload?.(e.target.files)}
            />
          </label>
        </div>
        <p className="mt-3 truncate text-[11px] text-slate-400">
          https://{g.url}
        </p>
      </div>
    </div>
  );
}
