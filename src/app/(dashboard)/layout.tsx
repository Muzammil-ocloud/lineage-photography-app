import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/lib/constants/routes";
import { profileService } from "@/services/profile.service";
import { StudioProvider } from "@/providers/studio-provider";
import { DashboardShell } from "@/components/layouts/dashboard-shell";

export default async function DashboardGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.login);
  }

  await profileService.ensureProfile(
    user.id,
    user.email ?? "",
    (user.user_metadata?.full_name as string | undefined) ?? null,
  );

  return (
    <StudioProvider>
      <DashboardShell>{children}</DashboardShell>
    </StudioProvider>
  );
}
