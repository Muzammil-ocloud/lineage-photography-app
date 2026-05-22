"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  initialClients,
  initialGalleries,
  initialJobs,
  initialSettings,
} from "@/lib/mock/studio.data";
import { slug, uid } from "@/lib/mock/studio.utils";
import type {
  Client,
  Gallery,
  Job,
  JobAction,
  JobMenuState,
  ModalType,
  StudioSettings,
} from "@/lib/mock/studio.types";
import { ROUTES } from "@/lib/constants/routes";

type ClientFormData = {
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

type JobFormData = {
  clientId: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  notes?: string;
};

type GalleryFormData = {
  jobId: string;
  name?: string;
  privacy: string;
  expires: string;
};

type StudioContextValue = {
  clients: Client[];
  jobs: Job[];
  galleries: Gallery[];
  settings: StudioSettings;
  activeModal: ModalType;
  jobAction: JobAction | null;
  jobMenu: JobMenuState;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
  setJobAction: (action: JobAction | null) => void;
  setJobMenu: (menu: JobMenuState) => void;
  getClient: (id: string) => Client | undefined;
  getJob: (id: string) => Job | undefined;
  getGalleryForJob: (jobId: string) => Gallery | undefined;
  addClient: (data: ClientFormData) => void;
  addJob: (data: JobFormData) => void;
  addGallery: (data: GalleryFormData) => void;
  ensureGalleryForJob: (jobId: string) => void;
  openJob: (jobId: string) => void;
  openJobMenu: (kind: JobAction["kind"], jobId: string) => void;
  shareGallery: (gallery: Gallery) => void;
  addImages: (galleryId: string, files: FileList | null) => void;
  updateSettings: (
    updater: StudioSettings | ((prev: StudioSettings) => StudioSettings),
  ) => void;
  upcomingJobs: Job[];
};

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [galleries, setGalleries] = useState<Gallery[]>(initialGalleries);
  const [settings, setSettings] = useState<StudioSettings>(initialSettings);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [jobAction, setJobAction] = useState<JobAction | null>(null);
  const [jobMenu, setJobMenu] = useState<JobMenuState>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getClient = useCallback(
    (id: string) => clients.find((c) => c.id === id),
    [clients],
  );

  const getJob = useCallback(
    (id: string) => jobs.find((j) => j.id === id),
    [jobs],
  );

  const getGalleryForJob = useCallback(
    (jobId: string) => galleries.find((g) => g.jobId === jobId),
    [galleries],
  );

  const makeGallery = useCallback(
    (jobId: string): Gallery => {
      const j = jobs.find((x) => x.id === jobId);
      const name = `${j?.title || "Job"} Gallery`;
      return {
        id: uid(),
        jobId,
        name,
        status: "Draft",
        privacy: settings.defaultPrivacy,
        expires: "2026-09-15",
        url: `lineage.photo/g/${slug(name)}`,
        images: [],
      };
    },
    [jobs, settings.defaultPrivacy],
  );

  const ensureGalleryForJob = useCallback(
    (jobId: string) => {
      setGalleries((prev) =>
        prev.some((g) => g.jobId === jobId)
          ? prev
          : [...prev, makeGallery(jobId)],
      );
    },
    [makeGallery],
  );

  const openJob = useCallback(
    (jobId: string) => {
      setGalleries((prev) =>
        prev.some((g) => g.jobId === jobId)
          ? prev
          : [...prev, makeGallery(jobId)],
      );
      setSearchQuery("");
      router.push(ROUTES.job(jobId));
    },
    [makeGallery, router],
  );

  const openJobMenu = useCallback(
    (kind: JobAction["kind"], jobId: string) => {
      if (kind === "Gallery") {
        openJob(jobId);
      } else if (kind === "Schedule") {
        setSearchQuery("");
        router.push(ROUTES.schedule);
      } else {
        setJobAction({ kind, jobId });
      }
    },
    [openJob, router],
  );

  const addClient = useCallback((data: ClientFormData) => {
    setClients((prev) => [
      ...prev,
      {
        id: uid(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        notes: data.notes || "",
      },
    ]);
    setActiveModal(null);
    toast.success("Client added");
  }, []);

  const addJob = useCallback((data: JobFormData) => {
    setJobs((prev) => [
      ...prev,
      {
        id: uid(),
        clientId: data.clientId,
        title: data.title,
        type: data.type,
        date: data.date,
        time: data.time,
        location: data.location,
        status: "Scheduled",
        notes: data.notes || "",
      },
    ]);
    setActiveModal(null);
    toast.success("Job created");
  }, []);

  const addGallery = useCallback(
    (data: GalleryFormData) => {
      const j = jobs.find((x) => x.id === data.jobId);
      const name = data.name || `${j?.title || "Job"} Gallery`;
      setGalleries((prev) => [
        ...prev,
        {
          id: uid(),
          jobId: data.jobId,
          name,
          status: "Draft",
          privacy: data.privacy,
          expires: data.expires,
          url: `lineage.photo/g/${slug(name)}`,
          images: [],
        },
      ]);
      setActiveModal(null);
      toast.success("Gallery created");
    },
    [jobs],
  );

  const shareGallery = useCallback((gallery: Gallery) => {
    if (typeof navigator !== "undefined") {
      void navigator.clipboard?.writeText(`https://${gallery.url}`);
    }
    setGalleries((prev) =>
      prev.map((g) => (g.id === gallery.id ? { ...g, status: "Shared" } : g)),
    );
    toast.success("Share link copied");
  }, []);

  const addImages = useCallback((galleryId: string, files: FileList | null) => {
    const urls = [...(files || [])].map((f) => URL.createObjectURL(f));
    if (!urls.length) return;
    setGalleries((prev) =>
      prev.map((g) =>
        g.id === galleryId ? { ...g, images: [...urls, ...g.images] } : g,
      ),
    );
    toast.success(`${urls.length} photo(s) uploaded`);
  }, []);

  const upcomingJobs = useMemo(
    () =>
      jobs
        .filter((j) => j.date >= "2026-07-01")
        .sort((a, b) => a.date.localeCompare(b.date)),
    [jobs],
  );

  const value: StudioContextValue = {
    clients,
    jobs,
    galleries,
    settings,
    activeModal,
    jobAction,
    jobMenu,
    searchQuery,
    setSearchQuery,
    openModal: setActiveModal,
    closeModal: () => setActiveModal(null),
    setJobAction,
    setJobMenu,
    getClient,
    getJob,
    getGalleryForJob,
    addClient,
    addJob,
    addGallery,
    ensureGalleryForJob,
    openJob,
    openJobMenu,
    shareGallery,
    addImages,
    updateSettings: setSettings,
    upcomingJobs,
  };

  return (
    <StudioContext.Provider value={value}>{children}</StudioContext.Provider>
  );
}

export function useStudioContext() {
  const ctx = useContext(StudioContext);
  if (!ctx) {
    throw new Error("useStudioContext must be used within StudioProvider");
  }
  return ctx;
}
