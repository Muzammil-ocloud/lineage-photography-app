import { JobGalleryView } from "@/components/studio/pages/job-gallery-view";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  return <JobGalleryView jobId={jobId} />;
}
