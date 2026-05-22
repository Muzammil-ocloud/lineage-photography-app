"use client";

import type { ReactNode } from "react";
import { useStudio } from "@/hooks/use-studio";
import {
  ClientForm,
  GalleryForm,
  JobForm,
} from "@/components/studio/modals/studio-forms";
import { JobActionModal } from "@/components/studio/job-action-modal";
import { StudioModal } from "@/components/studio/studio-modal";
import { DashboardHeader } from "./dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const {
    activeModal,
    closeModal,
    jobAction,
    setJobAction,
    clients,
    jobs,
    addClient,
    addJob,
    addGallery,
    getJob,
    getClient,
    getGalleryForJob,
    shareGallery,
    openJob,
  } = useStudio();

  const modalTitle =
    activeModal === "client"
      ? "Add Client"
      : activeModal === "job"
        ? "Add Job"
        : activeModal === "gallery"
          ? "Create Gallery"
          : "";

  const job = jobAction ? getJob(jobAction.jobId) : undefined;

  return (
    <div className="min-h-screen" style={{ background: "var(--lineage-bg)" }}>
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto w-full max-w-[1280px]">{children}</div>
        </main>
      </div>

      {activeModal ? (
        <StudioModal title={modalTitle} onClose={closeModal}>
          {activeModal === "client" ? (
            <ClientForm
              onSave={(data) =>
                addClient({
                  name: data.name ?? "",
                  email: data.email ?? "",
                  phone: data.phone ?? "",
                  notes: data.notes,
                })
              }
            />
          ) : null}
          {activeModal === "job" ? (
            <JobForm
              clients={clients}
              onSave={(data) =>
                addJob({
                  clientId: data.clientId ?? "",
                  title: data.title ?? "",
                  type: data.type ?? "",
                  date: data.date ?? "",
                  time: data.time ?? "",
                  location: data.location ?? "",
                  notes: data.notes,
                })
              }
            />
          ) : null}
          {activeModal === "gallery" ? (
            <GalleryForm
              jobs={jobs}
              onSave={(data) =>
                addGallery({
                  jobId: data.jobId ?? "",
                  name: data.name,
                  privacy: data.privacy ?? "Private link",
                  expires: data.expires ?? "",
                })
              }
            />
          ) : null}
        </StudioModal>
      ) : null}

      {jobAction && job ? (
        <StudioModal
          title={`${jobAction.kind} · ${job.title}`}
          onClose={() => setJobAction(null)}
        >
          <JobActionModal
            kind={jobAction.kind}
            job={job}
            client={getClient(job.clientId)}
            gallery={getGalleryForJob(job.id)}
            onClose={() => setJobAction(null)}
            onShare={shareGallery}
            onOpenJob={openJob}
          />
        </StudioModal>
      ) : null}
    </div>
  );
}
