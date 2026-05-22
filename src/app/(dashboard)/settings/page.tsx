"use client";

import { PageHeader } from "@/components/studio/page-header";
import { SettingsView } from "@/components/studio/pages/settings-view";

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" showSearch={false} />
      <SettingsView />
    </>
  );
}
