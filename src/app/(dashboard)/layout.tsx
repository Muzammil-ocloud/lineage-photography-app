import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/lib/constants/routes";
import { profileService } from "@/services/profile.service";
import { StudioProvider } from "@/providers/studio-provider";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import type { HeaderUser } from "@/components/shared/user-menu";

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

  const profile = await profileService.getProfile(user.id).catch(() => null);

  const headerUser: HeaderUser = {
    email: user.email ?? "",
    fullName:
      profile?.full_name ??
      (user.user_metadata?.full_name as string | undefined) ??
      null,
    avatarUrl: profile?.avatar_url ?? null,
  };

  return (
    <StudioProvider>
      <DashboardShell user={headerUser}>{children}</DashboardShell>
    </StudioProvider>
  );
}
