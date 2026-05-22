"use client";

import { Calendar, FileText, Image, Mail, Share2, Upload } from "lucide-react";
import {
  JOB_ACTIONS,
  type Job,
  type JobMenuState,
} from "@/lib/mock/studio.types";
import { slug } from "@/lib/mock/studio.utils";
import type { Client, Gallery } from "@/lib/mock/studio.types";
import type { JobActionKind } from "@/lib/mock/studio.types";
import { StudioButton } from "@/components/studio/studio-button";

const ICONS: Record<JobActionKind, React.ComponentType<{ size?: number }>> = {
  Gallery: Image,
  Invoice: FileText,
  Schedule: Calendar,
  "Share Link": Share2,
  "Upload Photos": Upload,
  "Send Update": Mail,
};

const HELP: Record<JobActionKind, (hasGallery: boolean) => string> = {
  Gallery: (has) => (has ? "Open full gallery" : "Create + open gallery"),
  Invoice: () => "Prepare client invoice",
  Schedule: () => "View job on calendar",
  "Share Link": () => "Copy client gallery link",
  "Upload Photos": () => "Open gallery uploader",
  "Send Update": () => "Draft client status note",
};

interface JobMenuOverlayProps {
  menu: JobMenuState;
  hasGallery: boolean;
  onClose: () => void;
  onAction: (kind: JobActionKind, jobId: string) => void;
}

export function JobMenuOverlay({
  menu,
  hasGallery,
  onClose,
  onAction,
}: JobMenuOverlayProps) {
  if (!menu) return null;

  return (
    <>
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{ position: "fixed", inset: 0, zIndex: 9998 }}
      />
      <div
        role="menu"
        style={{
          position: "fixed",
          left: menu.left,
          top: menu.top,
          zIndex: 9999,
          borderColor: "var(--lineage-line)",
        }}
        className="w-64 rounded-2xl border bg-white p-2 shadow-2xl ring-1 ring-black/5"
      >
        {JOB_ACTIONS.map((label) => {
          const Icon = ICONS[label];
          return (
            <button
              type="button"
              role="menuitem"
              key={label}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
                onAction(label, menu.job.id);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-slate-50"
            >
              <Icon size={16} />
              <span>
                <b className="block text-sm">{label}</b>
                <small className="text-slate-500">
                  {HELP[label](hasGallery)}
                </small>
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

interface JobActionModalProps {
  kind: JobActionKind;
  job: Job;
  client: Client | undefined;
  gallery: Gallery | undefined;
  onClose: () => void;
  onShare: (gallery: Gallery) => void;
  onOpenJob: (jobId: string) => void;
}

export function JobActionModal({
  kind,
  job,
  client,
  gallery,
  onClose,
  onShare,
  onOpenJob,
}: JobActionModalProps) {
  const isInvoice = kind === "Invoice";
  const isShare = kind === "Share Link";
  const isUpload = kind === "Upload Photos";
  const isMail = kind === "Send Update";

  return (
    <div className="space-y-4">
      <div
        className="rounded-2xl border bg-slate-50 p-4"
        style={{ borderColor: "var(--lineage-line)" }}
      >
        <b className="block">{client?.name}</b>
        <p className="mt-1 text-sm" style={{ color: "var(--lineage-muted)" }}>
          {job.date} · {job.time} · {job.location}
        </p>
      </div>
      {isInvoice ? (
        <div>
          <h3 className="font-semibold">Recommended invoice workflow</h3>
          <p className="mt-2 text-sm" style={{ color: "var(--lineage-muted)" }}>
            Create a simple job invoice, attach it to this client, and keep the
            gallery delivery separate from payment.
          </p>
          <div
            className="mt-4 rounded-xl border p-4"
            style={{ borderColor: "var(--lineage-line)" }}
          >
            <div className="flex justify-between text-sm">
              <span>{job.type} photography job</span>
              <b>$850.00</b>
            </div>
            <div className="mt-3 flex justify-between text-sm">
              <span>Editing + gallery delivery</span>
              <b>$250.00</b>
            </div>
            <div
              className="mt-3 flex justify-between border-t pt-3 font-semibold"
              style={{ borderColor: "var(--lineage-line)" }}
            >
              <span>Total</span>
              <span>$1,100.00</span>
            </div>
          </div>
        </div>
      ) : null}
      {isShare ? (
        <div>
          <p className="text-sm" style={{ color: "var(--lineage-muted)" }}>
            Client gallery link copied when you confirm sharing.
          </p>
          <div
            className="mt-3 truncate rounded-xl border bg-slate-50 p-3 text-sm"
            style={{ borderColor: "var(--lineage-line)" }}
          >
            https://{gallery?.url || `lineage.photo/g/${slug(job.title)}`}
          </div>
        </div>
      ) : null}
      {isUpload ? (
        <p className="text-sm" style={{ color: "var(--lineage-muted)" }}>
          Open the full gallery page to upload photos directly into this job
          workspace.
        </p>
      ) : null}
      {isMail ? (
        <div>
          <p className="text-sm" style={{ color: "var(--lineage-muted)" }}>
            Draft a calm client update for gallery progress, delivery timing, or
            next steps.
          </p>
          <div
            className="mt-3 rounded-xl border p-4 text-sm leading-6"
            style={{ borderColor: "var(--lineage-line)" }}
          >
            Hi {client?.name?.split(" ")[0]}, your {job.title} gallery is in
            progress. I&apos;ll send the private gallery link once the final
            review is complete.
          </div>
        </div>
      ) : null}
      <div className="flex justify-end gap-2 pt-2">
        <StudioButton onClick={onClose}>Cancel</StudioButton>
        <StudioButton
          variant="primary"
          icon={
            isInvoice ? FileText : isMail ? Mail : isUpload ? Upload : Share2
          }
          onClick={() => {
            if (isShare && gallery) onShare(gallery);
            if (isUpload || isShare) onOpenJob(job.id);
            onClose();
          }}
        >
          {isInvoice
            ? "Create Invoice"
            : isMail
              ? "Save Draft"
              : isUpload
                ? "Open Gallery"
                : "Share Link"}
        </StudioButton>
      </div>
    </div>
  );
}
