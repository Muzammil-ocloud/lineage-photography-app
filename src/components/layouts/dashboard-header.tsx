"use client";

import { Link, Plus } from "lucide-react";
import { LineageLogo } from "@/components/brand/lineage-logo";
import { useStudio } from "@/hooks/use-studio";
import { StudioButton } from "@/components/studio/studio-button";

export function DashboardHeader() {
  const { openModal } = useStudio();

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-black/80 bg-black px-6 text-white">
      <div className="flex items-center gap-5">
        <LineageLogo variant="light" />
        <div className="hidden h-9 w-px bg-white/15 sm:block" />
        <div className="hidden sm:block">
          <h1 className="text-sm font-semibold tracking-tight">
            Photography Admin OS
          </h1>
          <p className="text-xs text-white/55">
            Clients, jobs, galleries, photos, schedule, and studio settings
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <StudioButton
          variant="dark"
          onClick={() => openModal("gallery")}
          icon={Link}
        >
          New Gallery
        </StudioButton>
        <StudioButton
          variant="gold"
          onClick={() => openModal("job")}
          icon={Plus}
        >
          New Job
        </StudioButton>
      </div>
    </header>
  );
}
