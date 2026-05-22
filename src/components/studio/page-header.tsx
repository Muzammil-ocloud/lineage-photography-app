"use client";

import { Link, Plus, Users } from "lucide-react";
import { useStudio } from "@/hooks/use-studio";
import { SearchBox } from "./search-box";
import { StudioButton } from "./studio-button";

const PAGE_SUBTITLES: Record<string, string> = {
  Dashboard: "A simple command center for one photographer.",
  Schedule: "View and manage upcoming photography jobs.",
  Clients: "Add clients and keep every job attached to the right customer.",
  Jobs: "Click any job row to open its full-page photo gallery.",
  Galleries:
    "Filter galleries, scan thumbnails, and open any gallery as a full-page workspace.",
  Photos: "Upload and review images by gallery.",
  Settings:
    "Studio defaults for privacy, watermarks, delivery, and notifications.",
  Profile: "Update your name, bio, and avatar for this account.",
};

interface PageHeaderProps {
  title: string;
  showSearch?: boolean;
  showActions?: boolean;
}

export function PageHeader({
  title,
  showSearch = true,
  showActions = true,
}: PageHeaderProps) {
  const { searchQuery, setSearchQuery, openModal } = useStudio();
  const subtitle = PAGE_SUBTITLES[title] ?? "";

  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm" style={{ color: "var(--lineage-muted)" }}>
          {subtitle}
        </p>
      </div>
      {showActions ? (
        <div className="flex gap-2">
          {showSearch && title !== "Dashboard" && title !== "Settings" ? (
            <SearchBox value={searchQuery} onChange={setSearchQuery} />
          ) : null}
          <StudioButton onClick={() => openModal("client")} icon={Users}>
            Client
          </StudioButton>
          <StudioButton onClick={() => openModal("job")} icon={Plus}>
            Job
          </StudioButton>
          <StudioButton
            variant="primary"
            onClick={() => openModal("gallery")}
            icon={Link}
          >
            Gallery
          </StudioButton>
        </div>
      ) : null}
    </div>
  );
}
