"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, Image, Link, ShieldCheck, Share2, Upload } from "lucide-react";
import { useStudio } from "@/hooks/use-studio";
import { ROUTES } from "@/lib/constants/routes";
import { slug } from "@/lib/mock/studio.utils";
import { SearchBox } from "../search-box";
import { StatCard } from "../stat-card";
import { StudioButton } from "../studio-button";
import { StudioCard } from "../studio-card";

interface JobGalleryViewProps {
  jobId: string;
}

export function JobGalleryView({ jobId }: JobGalleryViewProps) {
  const router = useRouter();
  const {
    getJob,
    getClient,
    getGalleryForJob,
    shareGallery,
    addImages,
    ensureGalleryForJob,
  } = useStudio();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (jobId) ensureGalleryForJob(jobId);
  }, [jobId, ensureGalleryForJob]);

  const j = getJob(jobId);
  const g = getGalleryForJob(jobId);
  const c = j ? getClient(j.clientId) : undefined;

  const imgs = useMemo(
    () =>
      (g?.images || []).map((u, i) => ({
        u,
        name: `${slug(j?.title ?? "job")}-${String(i + 1).padStart(3, "0")}.jpg`,
        status: i % 5 === 0 ? "Favorite" : i % 3 === 0 ? "Ready" : "Needs Edit",
      })),
    [g?.images, j?.title],
  );

  const visible = imgs.filter(
    (p) =>
      (filter === "All" || p.status === filter) &&
      p.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (!j) {
    return (
      <StudioCard>
        <div className="p-8">
          <StudioButton onClick={() => router.push(ROUTES.jobs)}>
            Back to Jobs
          </StudioButton>
          <p className="mt-4">Job not found.</p>
        </div>
      </StudioCard>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => router.push(ROUTES.jobs)}
            className="text-sm font-semibold text-slate-500 hover:text-black"
          >
            ← Back to Jobs
          </button>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            {j.title}
          </h2>
          <p className="mt-1 text-sm" style={{ color: "var(--lineage-muted)" }}>
            {c?.name} · {j.date} · {j.time} · {j.location}
          </p>
        </div>
        <div className="flex gap-2">
          {g ? (
            <StudioButton onClick={() => shareGallery(g)} icon={Share2}>
              Share Link
            </StudioButton>
          ) : null}
          {g ? (
            <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border bg-black px-4 text-sm font-semibold text-white hover:bg-slate-900">
              <Upload size={16} />
              Upload Photos
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={(e) => addImages(g.id, e.target.files)}
              />
            </label>
          ) : null}
        </div>
      </div>
      {g ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Gallery Status"
              value={g.status}
              description={g.privacy}
              icon={ShieldCheck}
            />
            <StatCard
              title="Photos"
              value={imgs.length}
              description="Uploaded to this job"
              icon={Image}
            />
            <StatCard
              title="Client Link Views"
              value={Math.max(12, imgs.length * 9)}
              description="Simulated activity"
              icon={Link}
            />
            <StatCard
              title="Delivery"
              value={j.status}
              description={j.notes || "No notes"}
              icon={Clock}
            />
          </div>
          <StudioCard>
            <div
              className="flex flex-wrap items-center justify-between gap-3 border-b p-5"
              style={{ borderColor: "#f0f2f5" }}
            >
              <div>
                <h3 className="font-semibold">Job photo gallery</h3>
                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--lineage-muted)" }}
                >
                  Search, filter, upload, and share this client gallery from one
                  full-page job workspace.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <SearchBox value={search} onChange={setSearch} />
                {["All", "Ready", "Needs Edit", "Favorite"].map((x) => (
                  <button
                    key={x}
                    type="button"
                    onClick={() => setFilter(x)}
                    className={`h-10 rounded-xl border px-3 text-sm font-semibold ${
                      filter === x
                        ? "bg-black text-white"
                        : "bg-white hover:bg-slate-50"
                    }`}
                    style={{ borderColor: "var(--lineage-line)" }}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-5">
              <div
                className="mb-5 flex items-center justify-between gap-3 rounded-xl border bg-slate-50 p-3"
                style={{ borderColor: "var(--lineage-line)" }}
              >
                <span className="truncate text-sm">https://{g.url}</span>
                <StudioButton onClick={() => shareGallery(g)} icon={Link}>
                  Copy Share Link
                </StudioButton>
              </div>
              {visible.length ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                  {visible.map((p) => (
                    <div
                      key={p.name}
                      className="overflow-hidden rounded-2xl border bg-white"
                      style={{ borderColor: "var(--lineage-line)" }}
                    >
                      <img
                        src={p.u}
                        alt={p.name}
                        className="aspect-square w-full object-cover"
                      />
                      <div className="p-3">
                        <b className="block truncate text-sm">{p.name}</b>
                        <p
                          className="mt-1 text-xs"
                          style={{ color: "var(--lineage-muted)" }}
                        >
                          {p.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="rounded-2xl border border-dashed p-12 text-center"
                  style={{ borderColor: "var(--lineage-line)" }}
                >
                  <Image className="mx-auto text-slate-300" />
                  <h3 className="mt-3 font-semibold">
                    No photos match this view
                  </h3>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--lineage-muted)" }}
                  >
                    Upload photos or adjust the search and filter.
                  </p>
                </div>
              )}
            </div>
          </StudioCard>
        </>
      ) : null}
    </div>
  );
}
