"use client";

import { PageHeader } from "@/components/studio/page-header";
import { JobsView } from "@/components/studio/pages/jobs-view";

export default function JobsPage() {
  return (
    <>
      <PageHeader title="Jobs" />
      <JobsView />
    </>
  );
}
