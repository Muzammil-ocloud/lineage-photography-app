"use client";

import { Upload } from "lucide-react";
import { useStudio } from "@/hooks/use-studio";
import { StudioCard, StudioCardHead } from "../studio-card";

export function PhotosView() {
  const { galleries, addImages } = useStudio();

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {galleries.map((g) => (
        <StudioCard key={g.id}>
          <StudioCardHead title={g.name} />
          <div className="p-5">
            <label
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-6 hover:bg-slate-50"
              style={{ borderColor: "var(--lineage-line)" }}
            >
              <Upload size={20} />
              <b className="mt-2 text-sm">Upload photos</b>
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--lineage-muted)" }}
              >
                Add images to this gallery
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={(e) => addImages(g.id, e.target.files)}
              />
            </label>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {g.images.map((u, i) => (
                <img
                  key={i}
                  src={u}
                  alt=""
                  className="aspect-square rounded-xl object-cover"
                />
              ))}
            </div>
          </div>
        </StudioCard>
      ))}
    </div>
  );
}
