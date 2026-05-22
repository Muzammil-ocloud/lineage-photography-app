"use client";

import { PageHeader } from "@/components/studio/page-header";
import { DashboardView } from "@/components/studio/pages/dashboard-view";

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" showSearch={false} />
      <DashboardView />
    </>
  );
}
