"use client";

import {
  Calendar,
  Camera,
  ChevronRight,
  Image,
  Link,
  Upload,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useStudio } from "@/hooks/use-studio";
import { ROUTES } from "@/lib/constants/routes";
import { GalleryTile } from "../gallery-tile";
import { ListRow } from "../list-row";
import { StatCard } from "../stat-card";
import { StudioCard, StudioCardHead } from "../studio-card";

export function DashboardView() {
  const router = useRouter();
  const { upcomingJobs, galleries, clients, getClient, shareGallery, openJob } =
    useStudio();

  const stats = [
    {
      title: "Upcoming Jobs",
      value: upcomingJobs.length,
      description: `Next: ${upcomingJobs[0]?.date || "None"}`,
      icon: Calendar,
    },
    {
      title: "Active Clients",
      value: clients.length,
      description: "All jobs tied to clients",
      icon: Users,
    },
    {
      title: "Galleries",
      value: galleries.length,
      description: `${galleries.filter((g) => g.status === "Shared").length} shared`,
      icon: Image,
    },
    {
      title: "Photos",
      value: galleries.reduce((n, g) => n + g.images.length, 0),
      description: "Across all galleries",
      icon: Camera,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <StudioCard wide className="lg:col-span-2">
          <StudioCardHead
            title="Studio queue"
            action="View schedule"
            onAction={() => router.push(ROUTES.schedule)}
          />
          <div>
            {upcomingJobs.slice(0, 4).map((j) => (
              <ListRow
                key={j.id}
                icon={Camera}
                title={j.title}
                subtitle={`${getClient(j.clientId)?.name ?? ""} · ${j.date} · ${j.time}`}
                tag={j.status}
              >
                <div className="h-1.5 w-32 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-950"
                    style={{
                      width: j.status === "Editing" ? "62%" : "28%",
                    }}
                  />
                </div>
              </ListRow>
            ))}
          </div>
        </StudioCard>
        <StudioCard>
          <StudioCardHead title="Fast actions" />
          <div className="space-y-3 p-5 pt-0">
            {(
              [
                [
                  "Add client",
                  Users,
                  "Create a customer record",
                  ROUTES.clients,
                ],
                ["Book job", Calendar, "Schedule a shoot", ROUTES.jobs],
                [
                  "Create gallery",
                  Link,
                  "Start a private gallery",
                  ROUTES.galleries,
                ],
                [
                  "Upload photos",
                  Upload,
                  "Add images to a gallery",
                  ROUTES.photos,
                ],
              ] as const
            ).map(([t, Icon, d, href]) => (
              <button
                key={t}
                type="button"
                onClick={() => router.push(href)}
                className="flex w-full items-center justify-between rounded-xl border p-4 text-left hover:bg-slate-50"
                style={{ borderColor: "var(--lineage-line)" }}
              >
                <span className="flex items-center gap-3">
                  <Icon size={17} />
                  <span>
                    <b className="text-sm">{t}</b>
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "var(--lineage-muted)" }}
                    >
                      {d}
                    </p>
                  </span>
                </span>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        </StudioCard>
      </div>
      <StudioCard>
        <StudioCardHead
          title="Recent galleries"
          action="Manage galleries"
          onAction={() => router.push(ROUTES.galleries)}
        />
        <div className="grid grid-cols-1 gap-4 p-5 pt-0 md:grid-cols-2 xl:grid-cols-3">
          {galleries.map((g) => (
            <GalleryTile
              key={g.id}
              gallery={g}
              job={{ title: g.name }}
              onShare={() => shareGallery(g)}
              onOpen={() => openJob(g.jobId)}
            />
          ))}
        </div>
      </StudioCard>
    </div>
  );
}
