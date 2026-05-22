"use client";

import { Calendar } from "lucide-react";
import { useStudio } from "@/hooks/use-studio";
import { ListRow } from "../list-row";
import { StudioCard, StudioCardHead } from "../studio-card";

export function ScheduleView() {
  const { upcomingJobs, getClient, openJob, openModal } = useStudio();

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <StudioCard wide className="lg:col-span-2">
        <StudioCardHead
          title="Upcoming jobs"
          action="New job"
          onAction={() => openModal("job")}
        />
        {upcomingJobs.map((j) => (
          <ListRow
            key={j.id}
            icon={Calendar}
            title={j.title}
            subtitle={`${j.date} · ${j.time} · ${j.location} · ${getClient(j.clientId)?.name ?? ""}`}
            tag={j.status}
            onClick={() => openJob(j.id)}
          />
        ))}
      </StudioCard>
      <StudioCard>
        <StudioCardHead title="This month" />
        <div className="space-y-4 p-5">
          {upcomingJobs.slice(0, 5).map((j) => (
            <button
              key={j.id}
              type="button"
              onClick={() => openJob(j.id)}
              className="w-full rounded-xl border p-4 text-left hover:bg-slate-50"
              style={{ borderColor: "var(--lineage-line)" }}
            >
              <p
                className="text-xs font-semibold"
                style={{ color: "var(--lineage-muted)" }}
              >
                {j.date}
              </p>
              <b className="mt-1 block text-sm">{j.title}</b>
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--lineage-muted)" }}
              >
                {j.time} · {j.type}
              </p>
            </button>
          ))}
        </div>
      </StudioCard>
    </div>
  );
}
