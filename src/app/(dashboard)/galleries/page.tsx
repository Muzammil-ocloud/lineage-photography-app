"use client";

import { PageHeader } from "@/components/studio/page-header";
import { GalleriesView } from "@/components/studio/pages/galleries-view";

export default function GalleriesPage() {
  return (
    <>
      <PageHeader title="Galleries" />
      <GalleriesView />
    </>
  );
}
