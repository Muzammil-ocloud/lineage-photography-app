"use client";

import { PageHeader } from "@/components/studio/page-header";
import { PhotosView } from "@/components/studio/pages/photos-view";

export default function PhotosPage() {
  return (
    <>
      <PageHeader title="Photos" />
      <PhotosView />
    </>
  );
}
