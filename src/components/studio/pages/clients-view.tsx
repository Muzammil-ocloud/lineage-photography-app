"use client";

import { useMemo } from "react";
import { useStudio } from "@/hooks/use-studio";
import { DataTable } from "../data-table";
import { StudioCard, StudioCardHead } from "../studio-card";

export function ClientsView() {
  const { clients, jobs, searchQuery, openModal } = useStudio();

  const rows = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return clients.filter((c) => JSON.stringify(c).toLowerCase().includes(q));
  }, [clients, searchQuery]);

  return (
    <StudioCard>
      <StudioCardHead
        title="Client list"
        action="Add client"
        onAction={() => openModal("client")}
      />
      <DataTable
        heads={["Client", "Contact", "Jobs", "Notes"]}
        rows={rows.map((c) => [
          c.name,
          <span key={c.id}>
            {c.email}
            <br />
            <small>{c.phone}</small>
          </span>,
          jobs.filter((j) => j.clientId === c.id).length,
          c.notes,
        ])}
      />
    </StudioCard>
  );
}
