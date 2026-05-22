export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

export type JobStatus = "Scheduled" | "Booked" | "Editing" | "Delivered";

export type Job = {
  id: string;
  clientId: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  status: JobStatus;
  notes: string;
};

export type GalleryStatus = "Draft" | "Review" | "Shared" | "Scheduled";

export type Gallery = {
  id: string;
  jobId: string;
  name: string;
  status: GalleryStatus;
  privacy: string;
  expires: string;
  url: string;
  images: string[];
};

export type StudioSettings = {
  studio: string;
  email: string;
  watermark: boolean;
  watermarkText: string;
  download: boolean;
  expiry: number;
  notify: boolean;
  defaultPrivacy: string;
  brand: string;
};

export type ModalType = "client" | "job" | "gallery" | null;

export type JobActionKind =
  | "Gallery"
  | "Invoice"
  | "Schedule"
  | "Share Link"
  | "Upload Photos"
  | "Send Update";

export type JobAction = {
  kind: JobActionKind;
  jobId: string;
};

export type JobMenuState = {
  job: Job;
  left: number;
  top: number;
} | null;

export const JOB_ACTIONS: JobActionKind[] = [
  "Gallery",
  "Invoice",
  "Schedule",
  "Share Link",
  "Upload Photos",
  "Send Update",
];

export const TODAY = "2026-07-01";
