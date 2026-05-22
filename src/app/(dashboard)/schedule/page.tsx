"use client";

import { PageHeader } from "@/components/studio/page-header";
import { ScheduleView } from "@/components/studio/pages/schedule-view";

export default function SchedulePage() {
  return (
    <>
      <PageHeader title="Schedule" />
      <ScheduleView />
    </>
  );
}
