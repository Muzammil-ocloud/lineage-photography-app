"use client";

import { PageHeader } from "@/components/studio/page-header";
import { ClientsView } from "@/components/studio/pages/clients-view";

export default function ClientsPage() {
  return (
    <>
      <PageHeader title="Clients" />
      <ClientsView />
    </>
  );
}
