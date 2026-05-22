"use client";

import { useMemo } from "react";
import { Briefcase, ChevronRight, MoreHorizontal } from "lucide-react";
import { useStudio } from "@/hooks/use-studio";
import type { Job } from "@/lib/mock/studio.types";
import { JobMenuOverlay } from "../job-action-modal";
import { StudioCard, StudioCardHead } from "../studio-card";

export function JobsView() {
  const {
    jobs,
    galleries,
    searchQuery,
    getClient,
    openJob,
    openJobMenu,
    openModal,
    jobMenu,
    setJobMenu,
  } = useStudio();

  const rows = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return jobs.filter((j) => JSON.stringify(j).toLowerCase().includes(q));
  }, [jobs, searchQuery]);

  const openMenu = (e: React.MouseEvent, job: Job) => {
    e.preventDefault();
    e.stopPropagation();
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const w = 260;
    const h = 330;
    const left = Math.max(
      12,
      Math.min(r.right - w, window.innerWidth - w - 12),
    );
    let top = r.bottom + 8;
    if (top + h > window.innerHeight - 12) top = Math.max(12, r.top - h - 8);
    setJobMenu({ job, left, top });
  };

  return (
    <>
      <StudioCard>
        <StudioCardHead
          title="Job pipeline"
          action="New job"
          onAction={() => openModal("job")}
        />
        <div>
          {rows.map((j) => {
            const g = galleries.find((x) => x.jobId === j.id);
            const count = g?.images.length || 0;
            return (
              <div
                key={j.id}
                className="relative border-b last:border-b-0 hover:bg-slate-50"
                style={{ borderColor: "#f0f2f5" }}
              >
                <button
                  type="button"
                  onClick={() => openJob(j.id)}
                  className="flex w-full items-center gap-4 p-5 pr-16 text-left"
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border bg-slate-50"
                    style={{ borderColor: "var(--lineage-line)" }}
                  >
                    <Briefcase size={17} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <b>{j.title}</b>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                        {j.status}
                      </span>
                    </div>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "var(--lineage-muted)" }}
                    >
                      {getClient(j.clientId)?.name} · {j.date} · {j.time} ·{" "}
                      {j.location}
                    </p>
                  </div>
                  <div className="mr-2 hidden text-right xl:block">
                    <p className="text-xs font-semibold">
                      {g ? g.name : "Gallery auto-created on open"}
                    </p>
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "var(--lineage-muted)" }}
                    >
                      {count} photos · row opens gallery
                    </p>
                  </div>
                  <ChevronRight size={17} className="text-slate-400" />
                </button>
                <button
                  type="button"
                  onClick={(e) => openMenu(e, j)}
                  className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl hover:bg-slate-100"
                >
                  <MoreHorizontal size={17} />
                </button>
              </div>
            );
          })}
        </div>
      </StudioCard>
      <JobMenuOverlay
        menu={jobMenu}
        hasGallery={!!galleries.find((x) => x.jobId === jobMenu?.job.id)}
        onClose={() => setJobMenu(null)}
        onAction={openJobMenu}
      />
    </>
  );
}
