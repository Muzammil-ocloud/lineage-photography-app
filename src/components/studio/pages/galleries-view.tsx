"use client";

import { useMemo, useState } from "react";
import { Camera, Clock, Image, Plus, Share2 } from "lucide-react";
import { useStudio } from "@/hooks/use-studio";
import { GalleryTile } from "../gallery-tile";
import { SegmentControl } from "../segment-control";
import { StatCard } from "../stat-card";
import { StudioButton } from "../studio-button";
import { StudioCard } from "../studio-card";

export function GalleriesView() {
  const {
    galleries,
    searchQuery,
    getJob,
    getClient,
    shareGallery,
    addImages,
    openJob,
    openModal,
  } = useStudio();
  const [status, setStatus] = useState("All");
  const [privacy, setPrivacy] = useState("All");

  const rows = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return galleries.filter((g) => JSON.stringify(g).toLowerCase().includes(q));
  }, [galleries, searchQuery]);

  const list = rows.filter(
    (g) =>
      (status === "All" || g.status === status) &&
      (privacy === "All" || g.privacy === privacy),
  );

  const totalPhotos = rows.reduce((n, g) => n + g.images.length, 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Galleries"
          value={rows.length}
          description="Across active jobs"
          icon={Image}
        />
        <StatCard
          title="Shared"
          value={rows.filter((g) => g.status === "Shared").length}
          description="Client links live"
          icon={Share2}
        />
        <StatCard
          title="Draft / Review"
          value={rows.filter((g) => g.status !== "Shared").length}
          description="Needs delivery"
          icon={Clock}
        />
        <StatCard
          title="Photos"
          value={totalPhotos}
          description="Gallery thumbnails"
          icon={Camera}
        />
      </div>
      <StudioCard>
        <div
          className="flex flex-wrap items-center justify-between gap-3 border-b p-5"
          style={{ borderColor: "#f0f2f5" }}
        >
          <div>
            <h3 className="font-semibold">Client galleries</h3>
            <p
              className="mt-1 text-xs"
              style={{ color: "var(--lineage-muted)" }}
            >
              Click Open Gallery to review photos, search, filter, upload, and
              share the client link.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <SegmentControl
              value={status}
              onChange={setStatus}
              items={["All", "Shared", "Review", "Draft", "Scheduled"]}
            />
            <SegmentControl
              value={privacy}
              onChange={setPrivacy}
              items={["All", "Private link", "Password", "Invite only"]}
            />
            <StudioButton onClick={() => openModal("gallery")} icon={Plus}>
              Create
            </StudioButton>
          </div>
        </div>
        {list.length ? (
          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">
            {list.map((g) => {
              const j = getJob(g.jobId);
              return (
                <GalleryTile
                  key={g.id}
                  gallery={g}
                  job={j}
                  client={j ? getClient(j.clientId) : undefined}
                  onShare={() => shareGallery(g)}
                  onOpen={() => openJob(g.jobId)}
                  onUpload={(files) => addImages(g.id, files)}
                />
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Image className="mx-auto text-slate-300" />
            <h3 className="mt-3 font-semibold">
              No galleries match these filters
            </h3>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--lineage-muted)" }}
            >
              Try another status, privacy filter, or create a new gallery.
            </p>
          </div>
        )}
      </StudioCard>
    </div>
  );
}
